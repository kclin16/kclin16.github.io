/* TODO
[ ] NTH: Can carousel size be draggable?
[ ] NTH: Can carousel have better response time?
[ ] NTH: Can I unzip the EPUB with the production verison of zip.js instead of the debug version?
[ ] NTH: Other ebook formats?
[ ] More code comments for the GitHub community
*/

var is_rtl;
var is_shifted;
var page_loc;
var pages = [];
var blank_page;
var is_fullscreen = false;
var last_recorded_height = window.innerHeight;
var loaded_book;
const cover_bg = document.getElementById('cover_bg');
const pages_bg = document.getElementById('pages_bg');
const cover_page = document.getElementById('page_cover');
const left_page = document.getElementById('page_left');
const right_page = document.getElementById('page_right');
const carousel = document.getElementById('carousel');
const controls = document.getElementById('controls');
const fullscreen_toggle = document.getElementById('toggle_fullscreen');
const max_svg = document.getElementById('maximize');
const min_svg = document.getElementById('minimize');
const help_pane = document.getElementById('help_pane');
const f11_event = new KeyboardEvent('keydown', {
    key: 'F11',
    code: 'F11',
    which: 122,
    keyCode: 122,
    bubbles: true,
    cancelable: true
});

function init(){
    load_global();
    if(request_fullscreen()){
        fullscreen_toggle.appendChild(max_svg);
        window.addEventListener('resize', check_for_exit_fullscreen.bind(this));
        window.addEventListener('keydown', toggle_custom_fullscreen.bind(this));
        fullscreen_toggle.addEventListener('click', toggle_fullscreen);
    }
    else{
        document.getElementById('top-bar').removeChild(fullscreen_toggle);
    }
    document.getElementById('open_control').onchange = load_book;
    document.getElementById('rtl').addEventListener('change', toggle_rtl);
    document.getElementById('shift').addEventListener('change', toggle_shift);
    // ArrowUp and ArrowDown are used for showing and hiding the menu, so disable in the slider.
    // ArrowLeft and Arrow right are still usable and more intuitive.
    document.getElementById('spacing').addEventListener('keydown', (e) => {if(e.code == 'ArrowDown' || e.code == 'ArrowUp') e.preventDefault();});
    document.getElementById('spacing').addEventListener('input', update_page_gap);
    document.getElementById('background').addEventListener('input', update_background_color);
    document.getElementById('close_menu').addEventListener('click', hide_controls);
    document.getElementById('flip_left').addEventListener('click', flip_left_page);
    document.getElementById('flip_right').addEventListener('click', flip_right_page);
    document.addEventListener('keyup', check_key);
    document.getElementById('summon_controls').addEventListener('click', show_controls);
    const carousel_observer = new ResizeObserver(scroll_carousel_to_page_loc);
    carousel_observer.observe(carousel, {box: 'content-box'});
    document.getElementById('help').addEventListener('click', () => {help_pane.style.visibility = 'visible';});
    document.getElementById('close_help').addEventListener('click', () => {help_pane.style.visibility = 'hidden';});
}
init();

function toggle_custom_fullscreen(event){
    if (event.key === "F11") {
        event.preventDefault();
        toggle_fullscreen();
      }
}

function request_fullscreen() {
    return (
        document.body.requestFullscreen ||
        document.body["mozRequestFullscreen"] ||
        document.body["msRequestFullscreen"] ||
        document.body["webkitRequestFullscreen"]
    );
}

function exit_fullscreen() {
    return (
        document["webkitExitFullscreen"] ||
        document["msExitFullscreen"] ||
        document["mozCancelFullScreen"] ||
        document.exitFullscreen
    );
}

function toggle_fullscreen(){
    if(!is_fullscreen && request_fullscreen()){
        request_fullscreen().call(document.body).catch(err => {
            console.log(err)
        }).then(() => {
            fullscreen_toggle.replaceChildren(min_svg);
            is_fullscreen = true;
        });
    }
    else if(is_fullscreen && exit_fullscreen()){
        exit_fullscreen().call(document)
        is_fullscreen = false;
        fullscreen_toggle.replaceChildren(max_svg);
    }
}

function check_for_exit_fullscreen(){
    let current_height = window.innerHeight;
    if (is_fullscreen && current_height <= last_recorded_height) {
        fullscreen_toggle.replaceChildren(max_svg);
        is_fullscreen = false;
    }
    last_recorded_height = current_height;
}

function toggle_rtl(e){
    is_rtl = e.target.checked;
    populate_carousel();
    set_page();
}

function toggle_shift(e){
    is_shifted = e.target.checked;
    if(pages.length === 0){
        return;  // No book loaded.
    }
    if(is_shifted){
        pages.splice(1, 0, blank_page);
    }
    else{
        pages.splice(1, 1);
    }
    // Substract 1 for the cover
    if(pages.length - 1 % 2 !== 0){
        if(pages[pages.length-1] === blank_page){
            pages.pop();
        }
        else{
            pages.push(blank_page);
        }
    }
    populate_carousel();
    set_page();
}

function show_controls(){
    scroll_carousel_to_page_loc();
    controls.style.visibility = 'visible';
}

function hide_controls(){
    controls.style.visibility = 'hidden';
}

function check_key(e){
    if(controls.style.visibility == 'hidden'){
        if(e.code === 'ArrowLeft'){
            flip_left_page();
        }
        else if(e.code == 'ArrowRight'){
            flip_right_page();
        }
    }
    if(e.code == 'ArrowUp'){
        show_controls();
    }
    else if(e.code == 'ArrowDown'){
        hide_controls();
    }

}

function update_page_gap(e){
    let space = e.target.value;
    left_page.style.marginRight = `${space}px`;
    right_page.style.marginLeft = `${space}px`;
    save_global();
}

function update_background_color(e){
    document.body.style.backgroundColor = e.target.value;
    save_global();
}

async function load_book(){
    disable_controls(true);
    const selected_file = document.getElementById("open_control").files[0];
    if(!selected_file){
        disable_controls(false);
        return;
    }
    reset_progress_bar();
    console.log(selected_file);
    loaded_book = selected_file.name;
    load_book_settings();
    const reader = new zip.ZipReader(new zip.BlobReader(selected_file));
    let entries = await reader.getEntries();
    pages = [];
    if(entries && entries.length){
        entries = entries.filter( (entry) => {return entry.filename.startsWith('cover') || entry.filename.startsWith('images/') && entry.filename.length > 7});
        entries.sort( (a, b) => {a.filename < b.filename ? -1 : 1});
        let counter = 0;
        for(let entry of entries){
            const page_image = await entry.getData(
                new zip.Data64URIWriter()
            );
            pages.push(page_image);
            // Behold, the awful readability of the post-increment operator!
            // Sorry, I need to be bad in my hobby time. :)
            set_progress_bar(counter++ * 100 / entries.length);
        }
    }
    await reader.close();

    // Generate white PNG the same size as a single page. Then, continue setup.
    let temp_img = new Image();
    temp_img.onload = () => {
        blank_page = generate_blank_image(temp_img.naturalWidth, temp_img.naturalHeight);
        setup_reader();
    }
    temp_img.src = pages[1];
}

function setup_reader(){
    console.log(`Before shift: ${pages.length}`);
    if(is_shifted){
        pages.splice(1, 0, blank_page);
    }
    console.log(`After shift: ${pages.length}`);
    // Substract 1 for the cover
    if((pages.length - 1) % 2 !== 0){
        pages.push(blank_page);
    }
    console.log(`After normalize: ${pages.length}`);
    hide_progress_bar();
    populate_carousel();
    disable_controls(false);
    document.getElementById('page_cover').src = pages[0];
    set_page();
}

function flip_left_page(){
    hide_controls();
    if(page_loc === 0 && is_rtl){
        page_loc = 1;
    }
    else{
        page_loc += is_rtl ? 2 : -2;
    }
    //console.log(`flip left: ${page_loc}`);
    set_page();
}

function flip_right_page(){
    hide_controls();
    if(page_loc === 0 && !is_rtl){
        page_loc = 1;
    }
    else{
        page_loc += is_rtl ? -2 : 2;
    }
    
    //console.log(`flip right: ${page_loc}`);
    set_page();
}

function set_page(){
    if(pages.length === 0){
        return;  // No book loaded.
    }
    page_loc = page_loc < 0 ? 0 : page_loc;
    page_loc = page_loc > pages.length - 2 ? pages.length - 2 : page_loc;
    cover_bg.style.visibility = page_loc === 0 ? 'visible' : 'hidden';
    pages_bg.style.visibility = page_loc > 0 ? 'visible' : 'hidden';
    if(page_loc > 0){
        let left_index = is_rtl ? page_loc + 1 : page_loc;
        let right_index = is_rtl ? page_loc : page_loc + 1;
        //console.log(`Indexes: ${left_index}, ${right_index}`);
        left_page.src = pages[left_index];
        right_page.src = pages[right_index];
    }
    select_carousel_page();
    save_book();
}

function select_carousel_page(){
    for(let child of carousel.children){
        child.classList.remove('selected');
    }
    let index = Math.floor((page_loc - 1) / 2 + 1);
    if(is_rtl){
        index = carousel.children.length - 1 - index;
    }
    carousel.children[index].classList.add('selected');
}

function disable_controls(is_disabled){
    document.getElementById('open_control').disabled = is_disabled;
    document.getElementById('rtl').disabled = is_disabled;
    document.getElementById('shift').disabled = is_disabled;
}

function reset_progress_bar(){
    const bar = document.getElementById('progress');
    bar.value = 0;
    bar.innerText = '0%';
    bar.style.visibility = 'visible';
}

function set_progress_bar(percent){
    const bar = document.getElementById('progress');
    bar.value = percent;
    bar.innerText = `${percent}%`;
}

function hide_progress_bar(){
    document.getElementById('progress').style.visibility = 'hidden';
}

function populate_carousel(){
    if(pages.length === 0){
        return;  // No book loaded.
    }
    let horses = [];
    const cover_horse = document.createElement('a');
    cover_horse.setAttribute('class', 'horse');
    cover_horse.addEventListener('click', (e) => {
        page_loc = 0;
        set_page();
        scroll_carousel_to_page_loc();
    });
    horses.push(cover_horse);

    const cover_spread = document.createElement('img');
    cover_spread.setAttribute('src', pages[0]);
    cover_spread.setAttribute('class', 'thumbnail');
    cover_horse.appendChild(cover_spread);

    for(let i = 1; i < pages.length; i += 2){
        let left_index = is_rtl ? i + 1 : i;
        let right_index = is_rtl ? i : i + 1;
        const spread_horse = document.createElement('a');
        spread_horse.setAttribute('class', 'horse');
        spread_horse.addEventListener('click', (e) => {
            page_loc = i;
            set_page();
            scroll_carousel_to_page_loc();
        });
        horses.push(spread_horse);

        const left_page = document.createElement('img');
        left_page.setAttribute('src', pages[left_index]);
        left_page.setAttribute('class', 'thumbnail');
        spread_horse.appendChild(left_page);

        const right_page = document.createElement('img');
        right_page.setAttribute('src', pages[right_index]);
        right_page.setAttribute('class', 'thumbnail');
        spread_horse.appendChild(right_page);
    }

    if(is_rtl){
        horses.reverse();
    }
    carousel.replaceChildren(...horses);
}

function scroll_carousel_to_page_loc(){
    if(pages.length > 0){
        let index = Math.floor((page_loc - 1) / 2 + 1);
        if(is_rtl) index = carousel.children.length - 1 - index;
        carousel.scrollLeft = carousel.children[index].offsetLeft + (carousel.children[index].offsetWidth - carousel.offsetWidth) / 2;
    }
}

function generate_blank_image(width, height){
    let canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    let context = canvas.getContext('2d');
    for(let r = 0; r < canvas.height; r++){
        for(let c = 0; c < canvas.width; c++){
            context.fillStyle = '#FFFFFF';
            context.fillRect(c, r, 1, 1);
        }
    }
    return canvas.toDataURL('image/png');
}

// ------------- SAVING/LOADING ---------------
function save_global(){
    localStorage.setItem('comic_bgcolor', document.body.style.backgroundColor);
    // Only save one side, since the values are equal.
    localStorage.setItem('comic_panelgap', left_page.style.marginRight);
}

function save_book(){
    if(loaded_book){
        console.log(`Saving: ${page_loc} ${is_rtl} ${is_shifted}`);
        localStorage.setItem(`comic_${loaded_book}`, `${page_loc} ${is_rtl} ${is_shifted}`);
    }
}

function load_global(){
    const bgcolor = localStorage.getItem('comic_bgcolor');
    document.getElementById('background').value = bgcolor ? rgb_to_hex(bgcolor) : '#000000';
    document.body.style.backgroundColor = bgcolor ? bgcolor : document.getElementById('background').value;
    const panel_gap = localStorage.getItem('comic_panelgap');
    document.getElementById('spacing').value = panel_gap ? parseInt(panel_gap) : 0;
    left_page.style.marginRight = panel_gap ? panel_gap : `${document.getElementById('spacing').value}px`;
    right_page.style.marginLeft = panel_gap ? panel_gap : `${document.getElementById('spacing').value}px`;
}

function load_book_settings(){
    if(loaded_book){
        const settings = localStorage.getItem(`comic_${loaded_book}`).split(' ');
        if(settings){
            console.log(`Loading: ${settings}`);
            is_rtl = settings[1] == 'true';
            document.getElementById('rtl').checked = settings[1] == 'true';
            is_shifted = settings[2] == 'true';
            document.getElementById('shift').checked = settings[2] == 'true';
            page_loc = parseInt(settings[0]);
        }
        else{
            is_rtl = document.getElementById('rtl').checked;
            is_shifted = document.getElementById('shift').checked;
            page_loc = 0;
        }
    }
}

function rgb_to_hex(rgb){
    let components = rgb.slice(4, -1).split(',');
    let r = parseInt(components[0]);
    let g = parseInt(components[1]);
    let b = parseInt(components[2]);
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}