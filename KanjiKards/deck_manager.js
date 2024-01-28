var deck;
var current_card;
var kanji_side = true;
var kanji_default_side = true;
var correct = 0;
var incorrect = 0;

function init(){
    render_lessons();
    let save_present = load();
    if(!save_present){
        build_deck(false);
    }
    return false;
}

function build_deck(sequence, forgotten_qty=false){
    deck = [];
    let deck_buffer = [];
    if(forgotten_qty){
        let qty = Math.min(parseInt(eid('forgotten_qty').value), kanji.length);
        let remembrance_score = [];
        for(let kanji_entry of kanji){
            remembrance_score.push({
                index: kanji_entry['index'],
                score: kanji_entry['last_reviewed'] - kanji_entry['wrong_count']
            });
        }
        remembrance_score.sort((a, b) => {a.score - b.score});
        for(let i = 0; i < qty; i++){
            deck_buffer.push(kanji[remembrance_score[i].index]);
        }
    }
    else{
        let lesson_boxes = document.getElementsByClassName('lesson_option');
        for(let box_index = 0; box_index < lesson_boxes.length; box_index++){
            if(lesson_boxes[box_index].checked){
                let lesson_number = parseInt(lesson_boxes[box_index].getAttribute('id'));
                let min = lesson_indexes[lesson_number];
                let max = lesson_indexes[lesson_number+1];
                for(let index = min; index < max; index++){
                    deck_buffer.push(kanji[index]);
                }
            }
        }
    }
    
    if(sequence){
        deck = deck_buffer;
    }
    else{
        while(deck_buffer.length > 0){
            let rand_index = Math.floor(Math.random() * deck_buffer.length);
            let card = deck_buffer.splice(rand_index, 1)[0];
            deck.push(card);
        }
    }
    deck.push(blank_card);
    next_card();
    correct = incorrect = 0;
    return render_stats();
}

function right_answer(){
    if(current_card !== blank_card){
        correct++;
        // It can go negative for now. I might limit it to 0.
        kanji[current_card['index']]['wrong_count'] = kanji[current_card['index']]['wrong_count']--;
        next_card();
    }
    return render_stats();;
}

function next_card(){
    if(deck.length > 0){
        current_card = deck.splice(0, 1)[0];
        kanji_side = kanji_default_side;
        if(current_card !== blank_card)
            kanji[current_card['index']]['last_reviewed'] = Date.now();
        render_card();
        save();
    }
    return false;
}

function wrong_answer(){
    if(current_card !== blank_card){
        incorrect++;
        kanji[current_card['index']]['wrong_count']++;
        insert_card();
    }
    return render_stats();
}

function insert_card(){
    deck.splice(-1, 0, current_card);
    return next_card();
}

function flip_card(){
    kanji_side = !kanji_side;
    return render_card();
}

function flip_cards(){
    kanji_side = kanji_default_side = !kanji_default_side;
    render_card();
    save();
    return false;
}

function render_card(){
    let cardface = eid('cardface');
    while(cardface.firstChild){
        cardface.removeChild(cardface.firstChild);
    }
    if(kanji_side){
        if(current_card['kanji'].endsWith('.png')){
            let img = document.createElement('img');
            img.setAttribute('src', current_card['kanji']);
            img.setAttribute('class', 'primitive');
            cardface.appendChild(img);
        }
        else{
            let header = document.createElement('h1');
            header.innerHTML = current_card['kanji'];
            cardface.appendChild(header);
        }
    }
    else{
        let box = document.createElement('div');
        box.setAttribute('class', 'box');
        let header = document.createElement('h3');
        header.innerHTML = current_card['keyword'];
        box.appendChild(header);
        if(current_card['primitive_keywords'].length > 0){
            let list = document.createElement('ul');
            for(let index in current_card['primitive_keywords']){
                let list_item = document.createElement('li');
                let item_text = document.createTextNode(current_card['primitive_keywords'][index]);
                list_item.appendChild(item_text);
                list.appendChild(list_item);
            }
            box.appendChild(list);
        }
        cardface.appendChild(box);
    }
    return false;
}

function render_stats(){
    let stats_box = eid('stats');
    while(stats_box.firstChild){
        stats_box.removeChild(stats_box.firstChild);
    }
    
    let correct_box = document.createElement('span');
    correct_box.setAttribute('style', 'color: #00B700;');
    correct_box.innerText = correct;
    let slash_text = document.createTextNode('/');
    let incorrect_box = document.createElement('span');
    incorrect_box.setAttribute('style', 'color: #FF0000;');
    incorrect_box.innerText = incorrect;
    let tab_text1 = document.createElement('span');
    tab_text1.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;';
    let tab_text2 = document.createElement('span');
    tab_text2.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;';
    let accuracy_box = document.createElement('span');
    let accuracy = 0;
    if(correct > 0 || incorrect > 0){
        accuracy = Math.round(100 * correct / (correct + incorrect));
    }
    accuracy_box.innerText = accuracy + '%';
    let remaining_cards_box = document.createElement('span');
    remaining_cards_box.innerText = deck.length;
    
    stats_box.appendChild(correct_box);
    stats_box.appendChild(slash_text);
    stats_box.appendChild(incorrect_box);
    stats_box.appendChild(tab_text1);
    stats_box.appendChild(accuracy_box);
    stats_box.appendChild(tab_text2);
    stats_box.appendChild(remaining_cards_box);
    
    return false;
}

function render_lessons(){
    lessons_list = eid('lessons');
    // Remember: Lessons start at 1, and the last index is the end of the kanji array.
    for(let lesson_index = 1; lesson_index < lesson_indexes.length-1; lesson_index++){
        let label = "Lesson " + lesson_index;
        let li = document.createElement('li');
        let checkbox_node = document.createElement('input');
        checkbox_node.setAttribute('type', 'checkbox');
        checkbox_node.setAttribute('id', ('' + lesson_index));
        checkbox_node.setAttribute('name', label);
        checkbox_node.setAttribute('class', 'lesson_option');
        let checkbox_label = document.createElement('label');
        checkbox_label.setAttribute('for', label);
        checkbox_label.innerText = label;
        li.appendChild(checkbox_node);
        li.appendChild(checkbox_label);
        lessons_list.appendChild(li);
    }
    let label = "Check All";
    let li = document.createElement('li');
    let checkbox_node = document.createElement('input');
    checkbox_node.setAttribute('type', 'checkbox');
    checkbox_node.setAttribute('id', 'all');
    checkbox_node.setAttribute('name', label);
    checkbox_node.setAttribute('onclick', 'return toggle_check_all();');
    let checkbox_label = document.createElement('label');
    checkbox_label.setAttribute('for', label);
    checkbox_label.innerText = label;
    li.appendChild(checkbox_node);
    li.appendChild(checkbox_label);
    lessons_list.appendChild(li);
}

let checked = false;
function toggle_check_all(){
    checked = !checked;
    let lesson_boxes = document.getElementsByClassName('lesson_option');
    for(let lesson_box in lesson_boxes){
        lesson_boxes[lesson_box].checked = checked;
    }
}

function eid(id){
    return window.document.getElementById(id);
}

// Deck storage for cookie --------------------------------

// The charset is 64 characters so I can do bit-shifts for speed.
const charset = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ&?';
const char_list = charset.split('');
var char_dict = {};
for(let index = 0; index < char_list.length; index++){
    char_dict[char_list[index]] = index;
}

function save(){
    let raw_deck_string = encode_deck();
    let compressed_deck_string = compress_raw_string(raw_deck_string);
    localStorage.setItem('kanji_deck', compressed_deck_string);
    let raw_stats_string = encode_stats();
    let compressed_stats_string = compress_raw_string(raw_stats_string);
    localStorage.setItem('kanji_stats', compressed_stats_string);
    localStorage.setItem('kanji_right', correct + '');
    localStorage.setItem('kanji_wrong', incorrect + '');
    localStorage.setItem('kanji_default_side', kanji_default_side ? 'T' : 'F');
}

function load(){
    let compressed_deck_string = localStorage.getItem('kanji_deck');
    if(compressed_deck_string){
        // Load these first thing.
        correct = parseInt(localStorage.getItem('kanji_right'));
        incorrect = parseInt(localStorage.getItem('kanji_wrong'));
        kanji_side = kanji_default_side = (localStorage.getItem('kanji_default_side') == 'T');
        let compressed_stats_string = localStorage.getItem('kanji_stats');
        let decompressed_stats_string = decompress_string(compressed_stats_string);
        decode_stats(decompressed_stats_string);
        let decompressed_deck_string = decompress_string(compressed_deck_string);
        decode_deck(decompressed_deck_string);
        next_card();
        render_stats();
        return true;
    }
    return false;
}

function encode_stats(){
    let raw_stats_string = '';
    for(let index in kanji){
        let wrong_count = kanji[index]['wrong_count'];
        let last_reviewed = kanji[index]['last_reviewed'];
        raw_stats_string += wrong_count + ',' + last_reviewed + ';';
    }
    return raw_stats_string;
}

function decode_stats(raw_stats_string){
    let stats_strings = raw_stats_string.split(';');
    // Last element is empty because of trailing semi-colon.
    stats_strings.pop();
    for(let index in stats_strings){
        let split_stats_strings = stats_strings[index].split(',');
        kanji[index]['wrong_count'] = parseInt(split_stats_strings[0]);
        kanji[index]['last_reviewed'] = parseInt(split_stats_strings[1]);
    }
}

function encode_deck(){
    // Copy deck
    let deck_buffer = deck.slice();
    // Put current_card back at the top of the deck.
    deck_buffer.splice(0, 0, current_card);
    // Remove blank card.
    deck_buffer.pop();

    let raw_deck_string = '';
    for(let index in deck_buffer){
        let deci_entry = deck_buffer[index]['index'];
        // The fast divide-by-64.
        let msd = deci_entry >> 6;
        let lsd = deci_entry - (msd << 6);
        raw_deck_string += char_list[msd] + char_list[lsd];
    }
    return raw_deck_string;
}

function decode_deck(raw_deck_string){
    deck = [];

    for(let index = 0; index < raw_deck_string.length-1; index+=2){
        let msd = raw_deck_string[index];
        let lsd = raw_deck_string[index+1];
        // The bit-shift is a fast multiply-by-64.
        let kanji_index = (char_dict[msd] << 6) + char_dict[lsd];
        deck.push(kanji[kanji_index]);
    }
    deck.push(blank_card);
}

function compress_raw_string(raw_string){
    //console.log("Size of raw string: " + raw_string.length);
    let compressed_string = LZString.compressToUTF16 (raw_string);
    //console.log("Size of compressed string: " + compressed_string.length);
    return compressed_string;
}

function decompress_string(compressed_string){
    let raw_string = LZString.decompressFromUTF16(compressed_string);
    //console.log("Size of decompressed string: " + raw_string.length);
    return raw_string;
}
