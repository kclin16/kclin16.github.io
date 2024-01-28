/*
	----------------------------------------------------------
	MIDI.Player : 0.3.1 : 2015-03-26
	----------------------------------------------------------
	https://github.com/mudcube/MIDI.js
	----------------------------------------------------------
*/

if (typeof MIDI === 'undefined') MIDI = {};
if (typeof MIDI.Player === 'undefined') MIDI.Player = {};

(function() { 'use strict';

var midi = MIDI.Player;
midi.currentTime = 0;
midi.endTime = 0; 
midi.restart = 0; 
midi.playing = false;
midi.timeWarp = 1;
midi.startDelay = 0;
// Need to set this for each song, manually.
midi.BPM = 210;

midi.start =
midi.resume = function(onsuccess) {
    if (midi.currentTime < -1) {
    	midi.currentTime = -1;
    }
    startAudio(midi.currentTime, null, onsuccess);
};

midi.pause = function() {
	let tmp = midi.restart;
	stopAudio();
	midi.restart = tmp;
};

midi.stop = function() {
	stopAudio();
	midi.restart = 0;
	midi.currentTime = 0;
};

midi.addListener = function(onsuccess) {
	onMidiEvent = onsuccess;
};

midi.removeListener = function() {
	onMidiEvent = undefined;
};

midi.clearAnimation = function() {
	if (midi.animationFrameId)  {
		cancelAnimationFrame(midi.animationFrameId);
	}
};

midi.setAnimation = function(callback) {
	let currentTime = 0;
	let tOurTime = 0;
	let tTheirTime = 0;
	//
	midi.clearAnimation();
	///
	let frame = function() {
		midi.animationFrameId = requestAnimationFrame(frame);
		///
		if (midi.endTime === 0) {
			return;
		}
		if (midi.playing) {
			currentTime = (tTheirTime === midi.currentTime) ? tOurTime - Date.now() : 0;
			if (midi.currentTime === 0) {
				currentTime = 0;
			} else {
				currentTime = midi.currentTime - currentTime;
			}
			if (tTheirTime !== midi.currentTime) {
				tOurTime = Date.now();
				tTheirTime = midi.currentTime;
			}
		} else { // paused
			currentTime = midi.currentTime;
		}
		///
		let endTime = midi.endTime;
		let percent = currentTime / endTime;
		let total = currentTime / 1000;
		let minutes = total / 60;
		let seconds = total - (minutes * 60);
		let t1 = minutes * 60 + seconds;
		let t2 = (endTime / 1000);
		///
		if (t2 - t1 < -1.0) {
			return;
		} else {
			callback({
				now: t1,
				end: t2,
				events: noteRegistrar
			});
		}
	};
	///
	requestAnimationFrame(frame);
};

// helpers

midi.loadMidiFile = function(onsuccess, onprogress, onerror) {
	try {
		midi.replayer = new Replayer(MidiFile(midi.currentData), midi.timeWarp, null, midi.BPM);
		midi.data = midi.replayer.getData();
		midi.endTime = getLength();
		///
		MIDI.loadPlugin({
// 			instruments: midi.getFileInstruments(),
			onsuccess: onsuccess,
			onprogress: onprogress,
			onerror: onerror
		});
	} catch(event) {
		onerror && onerror(event);
	}
};

midi.loadFile = function(file, onsuccess, onprogress, onerror) {
	midi.stop();
	if (file.indexOf('base64,') !== -1) {
		let data = window.atob(file.split(',')[1]);
		midi.currentData = data;
		midi.loadMidiFile(onsuccess, onprogress, onerror);
	} else {
		let fetch = new XMLHttpRequest();
		fetch.open('GET', file);
		fetch.overrideMimeType('text/plain; charset=x-user-defined');
		fetch.onreadystatechange = function() {
			if (this.readyState === 4) {
				if (this.status === 200) {
					let t = this.responseText || '';
					let ff = [];
					let mx = t.length;
					let scc = String.fromCharCode;
					for (let z = 0; z < mx; z++) {
						ff[z] = scc(t.charCodeAt(z) & 255);
					}
					///
					let data = ff.join('');
					midi.currentData = data;
					midi.loadMidiFile(onsuccess, onprogress, onerror);
				} else {
					onerror && onerror('Unable to load MIDI file');
				}
			}
		};
		fetch.send();
	}
};

midi.getFileInstruments = function() {
	let instruments = {};
	let programs = {};
	for (let n = 0; n < midi.data.length; n ++) {
		let event = midi.data[n][0].event;
		if (event.type !== 'channel') {
			continue;
		}
		let channel = event.channel;
		switch(event.subtype) {
			case 'controller':
//				console.log(event.channel, MIDI.defineControl[event.controllerType], event.value);
				break;
			case 'programChange':
				programs[channel] = event.programNumber;
				break;
			case 'noteOn':
				let program = programs[channel];
				let gm = MIDI.GM.byId[isFinite(program) ? program : channel];
				instruments[gm.id] = true;
				break;
		}
	}
	let ret = [];
	for (let key in instruments) {
		ret.push(key);
	}
	return ret;
};

// Playing the audio

var eventQueue = []; // hold events to be triggered
var queuedTime; // 
var startTime = 0; // to measure time elapse
var noteRegistrar = {}; // get event for requested note
var onMidiEvent = undefined; // listener
var scheduleTracking = function(channel, note, program, currentTime, offset, message, velocity, time) {
	return setTimeout(function() {
		let data = {
			channel: channel,
			note: note,
			program: program,
			now: currentTime,
			end: midi.endTime,
			message: message,
			velocity: velocity
		};
		//
		if (message === 128) {
			delete noteRegistrar[note];
		} else {
			noteRegistrar[note] = data;
		}
		if (onMidiEvent) {
			onMidiEvent(data);
		}
		midi.currentTime = currentTime;
		///
		eventQueue.shift();
		///
		if (eventQueue.length < 1000) {
			startAudio(queuedTime, true);
		} else if (midi.currentTime === queuedTime && queuedTime < midi.endTime) { // grab next sequence
			startAudio(queuedTime, true);
		}
	}, currentTime - offset);
};

var getContext = function() {
	if (MIDI.api === 'webaudio') {
		return MIDI.WebAudio.getContext();
	} else {
		midi.ctx = {currentTime: 0};
	}
	return midi.ctx;
};

var getLength = function() {
	let data =  midi.data;
	let length = data.length;
	let totalTime = 0.5;
	for (let n = 0; n < length; n++) {
		totalTime += data[n][1];
	}
	return totalTime;
};

var __now;
var getNow = function() {
    if (window.performance && window.performance.now) {
        return window.performance.now();
    } else {
		return Date.now();
	}
};

var startAudio = function(currentTime, fromCache, onsuccess) {
	// console.log(`currentTime: ${currentTime}`);
	if (!midi.replayer) {
		return;
	}
	if (!fromCache) {
		if (typeof currentTime === 'undefined') {
			currentTime = midi.restart;
		}
		///
		midi.playing && stopAudio();
		midi.playing = true;
		midi.data = midi.replayer.getData();
		midi.endTime = getLength();
	}
	// console.log(`currentTime: ${currentTime}`);
	///
	let note;
	let offset = 0;
	let messages = 0;
	let data = midi.data;
	let ctx = getContext();
	let length = data.length;
	let current_programs = [];
	//
	queuedTime = 0.5;
	///
	let interval = eventQueue[0] && eventQueue[0].interval || 0;
	let foffset = currentTime - midi.currentTime;
	///
	if (MIDI.api !== 'webaudio') { // set currentTime on ctx
		let now = getNow();
		__now = __now || now;
		ctx.currentTime = (now - __now) / 1000;
	}
	///
	startTime = ctx.currentTime;
	///
	for (let n = 0; n < length && messages < 100; n++) {
		let event_time = data[n];
		// This is me.
		// if(event_time[0].event.subtype === "programChange"){
		// 	console.log(`Track: ${event_time[0].track} Channel: ${event_time[0].event.channel+1} Program: ${event_time[0].event.programNumber+1} Time Delta: ${event_time[0].event.deltaTime}`);
		// }
		if ((queuedTime += event_time[1]) <= currentTime) {
			let event = event_time[0].event;
			let delay = ctx.currentTime + ((currentTime + foffset + midi.startDelay) / 1000);
			switch (event.subtype) {
				case 'controller':
					MIDI.setController(event.channel, event.controllerType, event.value, delay);
					continue;
				case 'programChange':
					MIDI.programChange(event.channel, event.programNumber, delay);
					current_programs[event.channel] = event.programNumber;
					continue;
				case 'pitchBend':
					MIDI.pitchBend(event.channel, event.value, delay);
					continue;
			}
			offset = queuedTime;
			// console.log(`Skipping...${queuedTime}, ${event_time[1]}, ${currentTime}, ${event_time[0].event.subtype}`);
			continue;
		}
		// console.log(`Running...${queuedTime}, ${event_time[1]}, ${currentTime}, ${event_time[0].event.subtype}`);
		///
		currentTime = queuedTime - offset;
		///
		let event = event_time[0].event;
		if (event.type !== 'channel') {
			continue;
		}
		///
		let channelId = event.channel;
		let channel = MIDI.channels[channelId];
		let delay = ctx.currentTime + ((currentTime + foffset + midi.startDelay) / 1000);
		let queueTime = queuedTime - offset + midi.startDelay;
		switch (event.subtype) {
			case 'controller':
				MIDI.setController(channelId, event.controllerType, event.value, delay);
				break;
			case 'programChange':
				MIDI.programChange(channelId, event.programNumber, delay);
				current_programs[event.channel] = event.programNumber;
				break;
			case 'pitchBend':
				MIDI.pitchBend(channelId, event.value, delay);
				break;
			case 'noteOn':
				if (channel.mute) break;
				note = event.noteNumber - (midi.MIDIOffset || 0);
				eventQueue.push({
				    event: event,
				    time: queueTime,
				    source: MIDI.noteOn(channelId, event.noteNumber, event.velocity, delay),
				    interval: scheduleTracking(channelId, note, current_programs[channelId], queuedTime + midi.startDelay, offset - foffset, 144, event.velocity)
				});
				messages++;
				break;
			case 'noteOff':
				if (channel.mute) break;
				note = event.noteNumber - (midi.MIDIOffset || 0);
				eventQueue.push({
				    event: event,
				    time: queueTime,
				    source: MIDI.noteOff(channelId, event.noteNumber, delay),
				    interval: scheduleTracking(channelId, note, current_programs[channelId], queuedTime, offset - foffset, 128, 0)
				});
				break;
			default:
				break;
		}
	}
	///
	onsuccess && onsuccess(eventQueue);
};

var stopAudio = function() {
	midi.playing = false;
	midi.restart += (getContext().currentTime - startTime) * 1000;;
	// stop the audio, and intervals
	while (eventQueue.length) {
		let o = eventQueue.pop();
		window.clearTimeout(o.interval);
		if (!o.source) continue; // is not webaudio
		if (typeof(o.source) === 'number') {
			window.clearTimeout(o.source);
		} else { // webaudio
			o.source.disconnect(0);
		}
	}
	// run callback to cancel any notes still playing
	for (let key in noteRegistrar) {
		let o = noteRegistrar[key]
		if (noteRegistrar[key].message === 144 && onMidiEvent) {
			onMidiEvent({
				channel: o.channel,
				note: o.note,
				now: o.now,
				end: o.end,
				message: 128,
				velocity: o.velocity
			});
		}
	}
	// reset noteRegistrar
	noteRegistrar = {};
};

})();