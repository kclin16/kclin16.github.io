// Notes must be in this order.
const NOTES = ['C', 'Cs', 'D', 'Ds', 'E', 'F', 'Fs', 'G', 'Gs', 'A', 'As', 'B'];
const NOTE_COLORS = ['red', 'red', 'orange', 'orange', 'green', 'blue', 'blue', 'yellow', 'yellow', 'green', 'purple', 'purple'];
const COLUMN_NOTES = ['a', 'b', 'c'];
const WINDOW_NOTES = ['upperwindowa', 'upperwindowb', 'upperwindowc', 'lowerwindowa', 'lowerwindowb', 'door', 'wreath'];
const INSTRUMENTS = [
    "acoustic_bass", // 32
    "acoustic_grand_piano", // 0
    "acoustic_guitar_steel", // 25
    "bassoon", // 70
    "bright_acoustic_piano", // 2
    "church_organ", // 19
    "clarinet", // 71
    "electric_bass_finger", // 33
    "electric_bass_pick", // 34
    "flute", // 73
    "french_horn", // 60
    "fretless_bass", // 35
    "glockenspiel", // 9
    "gunshot", // 127
    "oboe", // 68
    "orchestral_harp", // 46
    "pizzicato_strings", // 45
    "reverse_cymbal", // 119
    "string_ensemble_1", // 48
    "synthbrass_1", // 62
    "synthbrass_2", // 63
    "tremolo_strings", // 44
    "timpani", // 47
    "trombone", // 57
    "trumpet", // 56
    "tubular_bells", // 14
    "tuba", // 58
    "percussion"];

const LIGHT_CLASSES = [
    "roof_notes",
    "porch_notes",
    "columna",
    "columnb",
    "columnc",
    "drapes",
    "brick",
    "brickwindowa",
    "brickwindowb",
    "brickwindowc",
    "tree",
    "wreath",
    "door",
    "lowerwindowa",
    "lowerwindowb",
    "underscore",
    "icicles",
    "outline",
    "bush"
];

const TEMPOS = {
    "sleigh_ride": 112,
    "carol_of_the_bells": 210,
    "silver_bells": 100,
    "go_tell_it_on_the_mountain": 115
};

const PROGRAM_MAPS = {
    sleigh_ride: {
        48: "roof_notes", // string_ensemble_1
        45: "roof_notes", // pizzicato_strings
        44: "roof_notes", // temolo_strings
        0: "porch_notes", // acoustic_grand_piano
        1: "porch_notes", // bright_acoustic_piano
        47: "tree", // timpani (not played)
        60: "brickwindowa,brickwindowb", // french_horn
        68: "columna,columnb,columnc", // oboe
        73: "porch_notes", // flute
        71: "porch_notes", // clarinet
        56: "bush,brick", // trumpet
        70: "columna,columnb,columnc", // basoon
        119: "white outline", // reverse_cymbal
        57: "columna,columnb,columnc", // trombone
        46: "upperwindowa,upperwindowb,upperwindowc", // orchestral_harp (not played)
        32: "lowerwindowa,lowerwindowb", // acoustic_base
        8: "upperwindowa,upperwindowb,upperwindowc,drapes", // gunshot
        percussion: {
            83: "tree", // sleigh_bells
            38: "porch outline", // acoustic_snare
            77: "upperwindowc", // low_wood_block
            76: "upperwindowa", // high_wood_block
            28: "upperwindowa,upperwindowb,upperwindowc,drapes", // whip
            40: "roof outline", // electric_snare
            50: "underscore", // high_tom
        }
    },
    carol_of_the_bells: {
        14: "roof_notes", // tubular_bells
        62: "porch_notes", // synthbrass_1
        63: "porch_notes", // synthbrass_2
        35: "tree_notes", // fretless_bass
        58: "underscore", // tuba
        56: "porch_notes", // trumpet
        61: "brick,bush,white outline,underscore,tree,roof outline,porch outline", // brass_section
        60: "drapes", // french_horn
        percussion: {
            81: "brick", // open_triangle
            54: "brickwindowa,brickwindowb", // tambourine
            83: "columna,columnb,columnc", // sleigh_bells
            36: "bush", // bass drum
            49: "upperwindowa,upperwindowb,upperwindowc,lowerwindowa,lowerwindowb", // crash_cymbal
            75: "brickwindowc" // claves
        }
    },
    silver_bells: {
        25: "roof_notes", // acoustic_guitar_steel
        9: "porch_notes", // glockenspiel
        0: "roof_notes", // acoustic_grand_piano
        19: "brick,white outline,roof outline,porch outline", // church_organ
        33: "column_notes", // electric_bass_finger
        68: "tree_notes", // oboe
        percussion: {
            42: "brickwindowa,brickwindowb,underscore", // closed_high_hat
            36: "bush", // bass_drum
            37: "upperwindowa,upperwindowb,upperwindowc,lowerwindowa,lowerwindowb,brickwindowc" // side_kick
        }
    },
    go_tell_it_on_the_mountain: {
        56: "roof_notes", // trumpet
        1: "porch_notes", // bright_acoustic_piano
        25: "tree_notes", // acoustic_guitar_steel
        34: "column_notes", // electic_bass_pick
        percussion: {
            35: "brick", // acoustic_bass_drum
            42: "porch outline", // closed_high_hat
            46: "roof outline", // open_high_hat
            38: "brickwindowa,brickwindowb", // acoustic_snare
            37: "white outline", // side_kick
            49: "brickwindowc,bush", // crash_cymbal
            41: "upperwindowa", // low_floor_tom
            48: "upperwindowb", // high_mid_tom
            45: "upperwindowc", // low_tom
            51: "underscore", // ride_Cymbal
            54: "lowerwindowa,lowerwindowb" // tambourine
        }
    }
};

// function conductor(data) {
//     let now = data.now; // where we are now
//     let end = data.end; // time when song ends
//     let channel = data.channel; // channel note is playing on
//     let message = data.message; // 128 is noteOff, 144 is noteOn
//     let note = data.note; // the note
//     let velocity = data.velocity; // the velocity of the note
// }


// MIDI.Player.currentTime = integer; // time we are at now within the song.
// MIDI.Player.endTime = integer; // time when song ends.
// MIDI.Player.playing = boolean; // are we playing? yes or no.
// MIDI.Player.loadFile("tracks/sleigh.mid", onsuccess); // load .MIDI from base64 or binary XML request.
// MIDI.Player.addListener(conductor);
// MIDI.Player.start(); // start the MIDI track (you can put this in the loadFile callback)
// MIDI.Player.resume(); // resume the MIDI track from pause.
// MIDI.Player.pause(); // pause the MIDI track.
// MIDI.Player.stop(); // stops all audio being played, and resets currentTime to 0.

/*
.red { opacity: 0; }
.orange { opacity: 0; }
.yellow { opacity: 0; }
.green { opacity: 0; }
.blue { opacity: 0; }
.purple { opacity: 0; }
.white { opacity: 0; }
.ice.underscore { opacity: 0; }
*/
var house_svg;
var loaded_song;
function load(){
    var svg_doc = window.document.getElementById("house").contentDocument;
    house_svg = svg_doc.getElementById("house_svg");
    //MIDI.loader = new sketch.ui.Timer;
    MIDI.loadPlugin({
        soundfontUrl: "./fatboy_soundfont/",
        instruments: INSTRUMENTS,
        onprogress: progress_bar,
        onsuccess: function() {
            toggle_progress_bar(false);
            console.log("Player loaded");
            /// this is the language we are running in
            // var title = document.getElementById("title");
            console.log("Sound being generated with " + MIDI.api + " " + JSON.stringify(MIDI.supports));

            /// this sets up the MIDI.Player and gets things going...
            player = MIDI.Player;
            player.timeWarp = 1; // speed the song is played back

            /// controls the lights
            player.addListener(function(data) {
                let program = data.program;
                let note_letter = NOTES[(data.note - 21) % 12];
                if(data.channel === 9){
                    // percussion channel
                    if(!PROGRAM_MAPS[loaded_song].percussion[data.note]) console.log(data.note);
                    set_lights(PROGRAM_MAPS[loaded_song].percussion[data.note], data);
                }
                else if(PROGRAM_MAPS[loaded_song][program]){
                    switch(PROGRAM_MAPS[loaded_song][program]){
                        case "roof_notes":
                            set_lights(`roof note${note_letter}`, data);
                            break;
                        case "porch_notes":
                            set_lights(`porch note${note_letter}`, data);
                            break;
                        case "tree_notes":
                            set_lights(`${NOTE_COLORS[(data.note - 21) % 12]} tree`, data);
                            break;
                        case "column_notes":
                            set_lights(`column${COLUMN_NOTES[(data.note - 21) % 3]}`, data);
                            break;
                        case "window_notes":
                            set_lights(WINDOW_NOTES[(data.note - 21) % 6], data);
                            break;
                        default:
                            set_lights(PROGRAM_MAPS[loaded_song][program], data);
                            break;
                    }
                }
            });
        }
    });

    document.getElementById("play_pause").addEventListener("click", play_song);

    document.getElementById("load").addEventListener("click", load_song);
}

function set_lights(light_classes, data){
    let classes = light_classes.split(",");
    let lights = [];
    for(let light_class of classes){
        lights.push(...house_svg.getElementsByClassName(light_class));
    }
    for(let light of lights){
        light.style.opacity = data.message === 144 ? 100 : 0;
    }
}

function illuminate_all(){    
    let lights = build_lights(LIGHT_CLASSES);
    for(let light of lights){
        light.style.opacity = 1;
    }
}

function darken_by_program(song){
    // Set everything in program to transparant
    let dark_classes = new Set();
    for(let program in PROGRAM_MAPS[song]){
        if(program !== "percussion"){
            let classes = PROGRAM_MAPS[song][program].split(",");
            for(let _class of classes){
                dark_classes.add(_class);
            }
        }
        else{
            for(let note in PROGRAM_MAPS[song].percussion){
                let classes = PROGRAM_MAPS[song].percussion[note].split(",");
                for(let _class of classes){
                    dark_classes.add(_class);
                }
            }
        }
    }
    let darks = build_lights(dark_classes);
    for(let dark of darks){
        dark.style.opacity = 0;
    }
}

function build_lights(light_classes){
    let lights = [];
    for(let light_class of light_classes){
        if(light_class === "roof_notes"){
            lights.push(...house_svg.getElementsByClassName("roof noteA"));
            lights.push(...house_svg.getElementsByClassName("roof noteAs"));
            lights.push(...house_svg.getElementsByClassName("roof noteB"));
            lights.push(...house_svg.getElementsByClassName("roof noteC"));
            lights.push(...house_svg.getElementsByClassName("roof noteCs"));
            lights.push(...house_svg.getElementsByClassName("roof noteD"));
            lights.push(...house_svg.getElementsByClassName("roof noteDs"));
            lights.push(...house_svg.getElementsByClassName("roof noteE"));
            lights.push(...house_svg.getElementsByClassName("roof noteF"));
            lights.push(...house_svg.getElementsByClassName("roof noteFs"));
            lights.push(...house_svg.getElementsByClassName("roof noteG"));
            lights.push(...house_svg.getElementsByClassName("roof noteGs"));
        }
        else if(light_class === "porch_notes"){
            lights.push(...house_svg.getElementsByClassName("porch noteA"));
            lights.push(...house_svg.getElementsByClassName("porch noteAs"));
            lights.push(...house_svg.getElementsByClassName("porch noteB"));
            lights.push(...house_svg.getElementsByClassName("porch noteC"));
            lights.push(...house_svg.getElementsByClassName("porch noteCs"));
            lights.push(...house_svg.getElementsByClassName("porch noteD"));
            lights.push(...house_svg.getElementsByClassName("porch noteDs"));
            lights.push(...house_svg.getElementsByClassName("porch noteE"));
            lights.push(...house_svg.getElementsByClassName("porch noteF"));
            lights.push(...house_svg.getElementsByClassName("porch noteFs"));
            lights.push(...house_svg.getElementsByClassName("porch noteG"));
            lights.push(...house_svg.getElementsByClassName("porch noteGs"));
        }
        else if(light_class === "tree_notes"){
            lights.push(...house_svg.getElementsByClassName("tree"));
        }
        else if(light_class === "column_notes"){
            lights.push(...house_svg.getElementsByClassName("columna"));
            lights.push(...house_svg.getElementsByClassName("columnb"));
            lights.push(...house_svg.getElementsByClassName("columnc"));
        }
        else if(light_class === "window_notes"){
            lights.push(...WINDOW_NOTES);
        }
        else{
            lights.push(...house_svg.getElementsByClassName(light_class));
        }
        // lights.push(...house_svg.getElementsByClassName("columna"));
        // lights.push(...house_svg.getElementsByClassName("columnb"));
        // lights.push(...house_svg.getElementsByClassName("columnc"));
        // lights.push(...house_svg.getElementsByClassName("red drapes"));
        // lights.push(...house_svg.getElementsByClassName("green drapes"));
        // lights.push(...house_svg.getElementsByClassName("upperwindowa"));
        // lights.push(...house_svg.getElementsByClassName("upperwindowb"));
        // lights.push(...house_svg.getElementsByClassName("upperwindowc"));
        // lights.push(...house_svg.getElementsByClassName("lowerwindowa"));
        // lights.push(...house_svg.getElementsByClassName("lowerwindowb"));
        // lights.push(...house_svg.getElementsByClassName("lowerwindowc"));
        // lights.push(...house_svg.getElementsByClassName("brickwindowa"));
        // lights.push(...house_svg.getElementsByClassName("brickwindowb"));
        // lights.push(...house_svg.getElementsByClassName("brickwindowc"));
        // lights.push(...house_svg.getElementsByClassName("wreath"));
        // lights.push(...house_svg.getElementsByClassName("door"));
        // lights.push(...house_svg.getElementsByClassName("red brick"));
        // lights.push(...house_svg.getElementsByClassName("green brick"));
        // lights.push(...house_svg.getElementsByClassName("red bush"));
        // lights.push(...house_svg.getElementsByClassName("white bush"));
        // lights.push(...house_svg.getElementsByClassName("light bush"));
        // lights.push(...house_svg.getElementsByClassName("tree"));
        // lights.push(...house_svg.getElementsByClassName("underscore"));

        // lights.push(...house_svg.getElementsByClassName("roof outline"));
        // lights.push(...house_svg.getElementsByClassName("porch outline"));
        // lights.push(...house_svg.getElementsByClassName("white outline"));
    }
    return lights;
}

function load_song(){
    let chosen_song = document.getElementById("songs").value;
    if(loaded_song !== chosen_song){
        illuminate_all();
        toggle_progress_bar(true);
        // Need to set this first because it gets passed into the Replayer.
        // God, this architecture is stupid!
        MIDI.Player.BPM = TEMPOS[chosen_song];
        MIDI.Player.loadFile(
            `tracks/${chosen_song}.mid`,
            function(){
                toggle_progress_bar(false);
                darken_by_program(chosen_song);
                loaded_song = chosen_song;
                console.log(`Loaded ${chosen_song}`);
                play_song();
            },
            progress_bar
        );
    }
    else{
        MIDI.Player.stop();
        play_song();
    }
}

function play_song() {
    if(!loaded_song) return;

    if(MIDI.Player.playing){
        MIDI.Player.pause();
        document.getElementById("play_pause").value = "Play Music";
    }
    else{
        MIDI.Player.resume();
        document.getElementById("play_pause").value = "Pause Music";
    }
}

function toggle_progress_bar(on){
    if(on){
        document.getElementById("progress").style.visibility = "visible";
        document.getElementById("controls").style.visibility = "hidden";
    }
    else{
        document.getElementById("progress").style.visibility = "hidden";
        document.getElementById("controls").style.visibility = "visible";
    }
    
}

function progress_bar(state, progress) {
    //MIDI.loader.setValue(progress * 100);
    //console.log(`Progress: ${progress}`);
    document.getElementById("bar").style.width = `${progress * 100}%`;
}