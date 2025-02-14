/* TODO
[x] Center cover
[x] Populate Carousel
[x] Jump-to on carousel click
[x] Click-areas for forward/backward
[x] Arrow keys for forward/backward
[x] Click-area for menu summon
[x] RTL/LTR
[x] Shift pages by 1
[x] page spacing control
[x] Set background color
[ ] Fix all BUG
[x] Set border around page_loc on carousel
[x] Scroll Carousel to page_loc WHEN MENU OPENS
[x] Change number counter to a slider.
[ ] NTH: Can carousel size be draggable?
[ ] NTH: Can carousel have better response time?
[ ] NTH: Can I unzip the EPUB with the production verison of zip.js instead of the debug version?
[ ] NTH: Other ebook formats?
[ ] Basic help pane & zip.js license credit
[ ] Save direction, shift, and page location settings per comic book.
[ ] Save the other settings globally.
[ ] Load settings per comic book.
[x] Library licensing i&t
[ ] More code comments for the GitHub community
*/

var is_rtl;
var is_shifted;
var page_loc;
var pages = [];
// BUG: This needs to be the exact size of the pages, whatever size they are. So, dynamic, somehow.
// Transparent 1000-pixel PNG
const blank_page = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAPoCAYAAAAftpReAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAYdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCA1LjEuMvu8A7YAAAC2ZVhJZklJKgAIAAAABQAaAQUAAQAAAEoAAAAbAQUAAQAAAFIAAAAoAQMAAQAAAAIAAAAxAQIAEAAAAFoAAABphwQAAQAAAGoAAAAAAAAA8nYBAOgDAADydgEA6AMAAFBhaW50Lk5FVCA1LjEuMgADAACQBwAEAAAAMDIzMAGgAwABAAAAAQAAAAWgBAABAAAAlAAAAAAAAAACAAEAAgAEAAAAUjk4AAIABwAEAAAAMDEwMAAAAACOO8FX0xe8TgAAABxJREFUWEftwTEBAAAAwqD1T20KP6AAAAAAgLcBE4gAAe0qMoEAAAAASUVORK5CYII=";
const cover_bg = document.getElementById('cover_bg');
const pages_bg = document.getElementById('pages_bg');
const cover_page = document.getElementById('page_cover');
const left_page = document.getElementById('page_left');
const right_page = document.getElementById('page_right');
const carousel = document.getElementById('carousel');
const controls = document.getElementById('controls');

function init(){
    document.body.style.backgroundColor = document.getElementById('background').value;
    document.getElementById('open_control').onchange = load_book;
    document.getElementById('rtl').addEventListener('change', toggle_rtl);
    document.getElementById('shift').addEventListener('change', toggle_shift);
    // Disable typing in number field.
    document.getElementById('spacing').addEventListener('keydown', (e) => {if(e.code == 'ArrowDown' || e.code == 'ArrowUp') e.preventDefault();});
    document.getElementById('spacing').addEventListener('input', update_page_gap);
    document.getElementById('background').addEventListener('input', update_background_color);
    document.getElementById('close').addEventListener('click', hide_controls);
    is_rtl = document.getElementById('rtl').checked;
    is_shifted = document.getElementById('shift').checked;
    document.getElementById('flip_left').addEventListener('click', flip_left_page);
    document.getElementById('flip_right').addEventListener('click', flip_right_page);
    document.addEventListener('keyup', check_key);
    document.getElementById('summon_controls').addEventListener('click', show_controls);
    const carousel_observer = new ResizeObserver(scroll_carousel_to_page_loc);
    carousel_observer.observe(carousel, {box: 'content-box'});
}
init();

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

// BUG Carousel scrollbars respond to arrow keys.
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
    space = Math.floor(Math.max(0, space));
    e.target.value = space;
    left_page.style.marginRight = `${space}px`;
    right_page.style.marginLeft = `${space}px`;
}

function update_background_color(e){
    document.body.style.backgroundColor = e.target.value;
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
    if(is_shifted){
        pages.splice(1, 0, blank_page);
    }
    // Substract 1 for the cover
    if(pages.length - 1 % 2 !== 0){
        pages.push(blank_page);
    }
    hide_progress_bar();
    populate_carousel();
    disable_controls(false);
    page_loc = 0;
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
