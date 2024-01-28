// setting up more arrays and variables
// onscreen says whether item should be shown
// 0 = yes, 1 = no(in inventory or just not supposed to be shown)
var show_screen = new Array();
show_screen[0] = '0:dbrick0';
show_screen[1] = '0:dhairpin0';
show_screen[2] = '1:dmatches0';
show_screen[3] = '0:dsock0';
show_screen[4] = '0:ddresser0';
show_screen[5] = '0:dmagnet0';
show_screen[6] = '1:ddrawerkey0';
show_screen[7] = '1:dnickel0';
show_screen[8] = '0:dcord0';
show_screen[9] = '0:dshredder0';
show_screen[10] = '0:dpaper0';
show_screen[11] = '0:dtape0';
show_screen[12] = '0:dbattery0a';
show_screen[13] = '0:dvacuum0';
show_screen[14] = '0:dtongs0';
show_screen[15] = '0:dstring0';
show_screen[16] = '0:dcandle0a';
show_screen[17] = '0:dbattery0b';
show_screen[18] = '0:dcheese0';
show_screen[19] = '1:dcandle1';
show_screen[20] = '1:dcandle0b';

// since associative arrays have no length property, we make a function
function alength(assoray){
    var len = 0;
    for(var i in assoray){
        len++;
    }
    return len;
}

// some code to check if an element in an associative array exists 
function acheck(assarray, element_name){
    var there = false;
    for (var check in assarray){
        if (check  ==  element_name){
            there = true;
            return true;
        }
    }
    if(!there){
        return false;
    }
}

// for associative inventory array, 1 = in inventory, 0 = not in invetory(in game still)
var inventory = new Array();
inventory['batteries'] = 0;
inventory['candle'] = 0;
inventory['card'] = 0;
inventory['cheese'] = 0;
inventory['cord'] = 0;
inventory['drawerkey'] = 0;
inventory['dresserkey'] = 0;
inventory['hairpin'] = 0;
inventory['magnet'] = 0;
inventory['matches'] = 0;
inventory['nickel'] = 0;
inventory['paper'] = 0;
inventory['sock'] = 0;
inventory['string'] = 0;
inventory['tape'] = 0;
inventory['tongs'] = 0;
inventory['vacuum'] = 0;
inventory['display'] = 0;

// active0/1 will be the variables that hold the selections for combo validation
var active0 = '0:0';
var active1 = '0:0';

// each item and image map gets a number(second#)(except rotateview areas)
// each group of combos gets another number too(first#)
// the rest get zeros
var combo_number = new Array();
combo_number['batteries'] = '4:4';
combo_number['candle'] = '5:4';
combo_number['card'] = '4:5';
combo_number['cheese'] = '6:0';
combo_number['cord'] = '7:4';
combo_number['drawerkey'] = '8:0';
combo_number['dresserkey'] = '9:0';
combo_number['hairpin'] = '10:0';
combo_number['magnet'] = '11:4';
combo_number['matches'] = '5:5';
combo_number['nickel'] = '12:0';
combo_number['paper'] = '13:0';
combo_number['sock'] = '7:5';
combo_number['string'] = '11:5';
combo_number['tape'] = '13:0';
combo_number['tongs'] = '5:6';
combo_number['vacuum'] = '7:6';
combo_number['mousehole'] = '6:0';
combo_number['machine'] = '12:0';
combo_number['camera'] = '4:6';
combo_number['grate'] = '11:6';
combo_number['drawer'] = '8:0';
combo_number['door'] = '10:0';
combo_number['ern'] = '5:7';
combo_number['udresser'] = '7:7';
combo_number['dresser'] = '9:0';
combo_number['candleern'] = '5:11';
combo_number['cheesehole'] = '6:0';
combo_number['drawerkeydrawer'] = '8:0';
combo_number['dresserkeydresser'] = '9:0';
combo_number['hairpindoor'] = '10:0';
combo_number['magnetstring'] = '11:9';
combo_number['magnetstringgrate'] = '11:15';
combo_number['matchescandleern'] = '5:16';
combo_number['nickelmachine'] = '12:0';
combo_number['papertape'] = '13:0';
combo_number['tongsmatchescandleern'] = '5:22';
combo_number['vacuumcord'] = '7:10';
combo_number['vacuumsock'] = '7:11';
combo_number['vacuumcordsock'] = '7:15';
combo_number['vacuumcordsockudresser'] = '7:22';
combo_number['camerabatteries'] = '4:10';
combo_number['cameracard'] = '4:11';
combo_number['cameracardbatteries'] = '4:15';

// so only one battery will apear out of the cut-out-book
var battery_given = 0;
// only one nickel will drop
var nickel_drop = 0;
// allows the brick to dissappear
var brick_gone = 0;

// if these equal 0, you can't access these views because you need to open them first (with a key or hairpin)
var lock_view0b = 0;
var lock_view0c = 0;
var lock_view1b = 0;

// these arrays hold the name of each div for each screen
// some arrays are empty for there are no divs on that screen
// there is one screen that has no array for it doesn't use the rotate function
var view0a_divs = new Array('dbrick0', 'dhairpin0', 'dmatches0');
var view0b_divs = new Array('dbrick0', 'dhairpin0', 'ddresser0', 'dsock0');
var view0c_divs = new Array();
var view1a_divs = new Array('dnickel0', 'ddrawerkey0');
var view1b_divs = new Array('dnickel0', 'dmagnet0');
var view2a_divs = new Array('dtape0', 'dcord0', 'dshredder0', 'dpaper0');
var view2b_divs = new Array('dtape0', 'dcord0', 'dshredder0', 'dpaper0', 'dbattery0a', 'dvacuum0');
var view3a_divs = new Array('dtongs0', 'dcandle1', 'dcandle0b');
var view3b_divs = new Array('dtongs0', 'dcandle1', 'dbattery0b', 'dcheese0', 'dcandle0b');
var view3c_divs = new Array('dtongs0', 'dcandle1', 'dcandle0a', 'dstring0', 'dcandle0b');
var view4a_divs = new Array();

// preloading inventory images
var ibattery0 = new Image();
var ibattery1 = new Image();
var ibattery2 = new Image();
var ibattery3 = new Image();
var icandle0 = new Image();
var icard0 = new Image();
var icheese0 = new Image();
var icord0 = new Image();
var idrawerkey0 = new Image();
var idresserkey0 = new Image();
var ihairpin0 = new Image();
var imagnet0 = new Image();
var imagnet1 = new Image();
var imatches0 = new Image();
var inickel0 = new Image();
var ipaper0 = new Image();
var ipaper1 = new Image();
var isock0 = new Image();
var istring0 = new Image();
var itape0 = new Image();
var itongs0 = new Image();
var ivacuum0 = new Image();
var ivacuum1 = new Image();
var ivacuum2 = new Image();
var ivacuum3 = new Image();
ibattery0.src = 'ibattery0.gif';
ibattery1.src = 'ibattery1.gif';
ibattery2.src = 'ibattery2.gif';
ibattery3.src = 'ibattery3.gif';
icandle0.src = 'icandle0.gif';
icard0.src = 'icard0.gif';
icheese0.src = 'icheese0.gif';
icord0.src = 'icord0.gif';
idrawerkey0.src = 'idrawerkey0.gif';
idresserkey0.src = 'idresserkey0.gif';
ihairpin0.src = 'ihairpin0.gif';
imagnet0.src = 'imagnet0.gif';
imagnet1.src = 'imagnet1.gif';
imatches0.src = 'imatches0.gif';
inickel0.src = 'inickel0.gif';
ipaper0.src = 'ipaper0.gif';
ipaper1.src = 'ipaper1.gif';
isock0.src = 'isock0.gif';
istring0.src = 'istring0.gif';
itape0.src = 'itape0.gif';
itongs0.src = 'itongs0.gif';
ivacuum0.src = 'ivacuum0.gif';
ivacuum1.src = 'ivacuum1.gif';
ivacuum2.src = 'ivacuum2.gif';
ivacuum3.src = 'ivacuum3.gif';

// hide divs, hide screen div, show new screen div, show new divs
function rotateView(screen_show, screen_hide, hide_array, show_array){
    for(var loop1 = 0;loop1 < hide_array.length;loop1++){
        var vari1 = hide_array[loop1];
        document.getElementById(vari1).style.visibility = 'hidden';
    }

    document.getElementById(screen_hide).style.visibility = 'hidden';
    document.getElementById(screen_show).style.visibility = 'visible';

    for(var loop2 = 0;loop2 < show_array.length;loop2++){
        var vari2 = show_array[loop2];
        for(var loop3 = 0;loop3 < show_screen.length;loop3++){
            if(show_screen[loop3].indexOf(vari2) != -1){
                var numeral = parseInt(show_screen[loop3]);
                if(numeral == 0){
                    document.getElementById(vari2).style.visibility = 'visible';
                }
            }
        }
    }
}

// hides div, keeps it hidden, adds item to inventory, swaps image
function takeItem(div_name, iname, inventory_name){
    document.getElementById('takeitem').play();
    var change_string = '1:' + div_name;
    document.getElementById(div_name).style.visibility = 'hidden';
    for(var loop = 0;loop < show_screen.length;loop++){
        if(show_screen[loop].indexOf(div_name) != -1){
            show_screen[loop] = change_string;
        }
    }
    if((div_name == 'dbattery0a') || (div_name == 'dbattery0b')){
        if(inventory[iname] == 3){
            inventory[iname] = 4;
            document.getElementById(iname).src = ibattery3.src;;
        }
        if(inventory[iname] == 2){
            inventory[iname] = 3;
            document.getElementById(iname).src = ibattery2.src;
        }
        if(inventory[iname] == 1){
            inventory[iname] = 2;
            document.getElementById(iname).src = ibattery1.src;
        }
        if(inventory[iname] == 0){
            inventory[iname] = 1;
            document.getElementById(iname).src = ibattery0.src;
        }
    }else{
        inventory[iname] = 1;
        document.getElementById(iname).src = inventory_name.src;
    }
}

// shows div, keeps it shown
function showItem(div_name){
    var change_string = '0:' + div_name;
    document.getElementById(div_name).style.visibility = 'visible';
    for(var loop = 0;loop < show_screen.length;loop++){
        if(show_screen[loop].indexOf(div_name)  != -1){
            show_screen[loop] = change_string;
        }
    }
}

// hides brick, keeps it hidden
function brickHide(){show_screen[0] = '1:dbrick0';document.getElementById('dbrick0').style.visibility = 'hidden';}

// adds item to inventory, swaps image
function giveItem(iname, inventory_name){
    if(iname == 'batteries'){
        if(inventory[iname] == 3){
            inventory[iname] = 4;
            document.getElementById(iname).src = ibattery3.src;
        }
        if(inventory[iname] == 2){
            inventory[iname] = 3;
            document.getElementById(iname).src = ibattery2.src;
        }
        if(inventory[iname] == 1){
            inventory[iname] = 2;
            document.getElementById(iname).src = ibattery1.src;
        }
        if(inventory[iname] == 0){
            inventory[iname] = 1;
            document.getElementById(iname).src = ibattery0.src;
        }
    }else{
        inventory[iname] = 1;
        document.getElementById(iname).src = inventory_name.src;
    }
}

// so the iname can be changed
var slot_name = new Array();
slot_name[0] = 'magnet';
slot_name[1] = 'vacuum';
slot_name[2] = 'camera';
slot_name[3] = 'ern';
slot_name[4] = 'paper';

// if the combo is invalid, the selected item must be unselected using the value stored here
var filter0, filtering;

// see if there's something already selected
// if not makes it selected
// else, makes it secondary selected and sees if it's a valid combo
function selectingItem(iname, sname){
    filtering = sname + 'cell';
    var position0 = active0.indexOf(':');
    var numeral0 = active0.substring(0, position0);
    if(numeral0 != 0){
        active1 = combo_number[iname];
        var position1 = active1.indexOf(':');
        var numeral1 = active1.substring(0, position1);
        var filt = filter0.indexOf('cell');
        var fi = filter0.substring(0, filt);
        if((numeral0 == numeral1) && (sname != fi) && (numeral0 != 5) && (numeral1 != 5) && (numeral0 != 4) && (numeral1 != 4)){
            validCombo(numeral1);
        }else{
            active0 = active1;
            document.getElementById(filter0).style.opacity = 1.0;
            document.getElementById(filter0).style.filter ='invert(0%)';
            document.getElementById(filtering).style.filter = 'invert(100%)';
            filter0 = sname + 'cell';
            active1 = 0;
            return;
        }
    }
    if(numeral0 == 0){
        active0 = combo_number[iname];
        filter0 = sname + 'cell';
        document.getElementById(filtering).style.filter = 'invert(100%)';
        return;
    }
}

// if something's not selected then no combo can occur
// if something is, then we see if it's a valid combo
function selectingArea(iname){
    var position0 = active0.indexOf(':');
    var numeral0 = active0.substring(0, position0);
    if(numeral0 == 0){
        return;
    }
    if(numeral0 != 0){
        active1 = combo_number[iname];
        var position1 = active1.indexOf(':');
        var numeral1 = active1.substring(0, position1);
        if(numeral0 == numeral1){
            validCombo(numeral1);
        }else{
            active1 = 0;
            return;
        }
    }
}

// see's if the product is valid
// if so, then go to corresponding function
// else, select the second one as primary selection and have active1 = 0
function validCombo(numeral){
    var position0 = active0.indexOf(':');
    var position1 = active1.indexOf(':');
    var numeral0 = active0.substring(position0 + 1, active0.length);
    var numeral1 = active1.substring(position1 + 1, active1.length);
    numeral0 = parseInt(numeral0);
    numeral1 = parseInt(numeral1);
    numeral = parseInt(numeral);
    var production = numeral0 + numeral1;
    if((numeral == 5) && (production == 11)){
        candleErn();
    }else if(numeral == 6){
        cheeseHole();
    }else if(numeral == 8){
        drawerkeyDrawer();
    }else if(numeral == 9){
        dresserkeyDresser();
    }else if(numeral == 10){
        hairpinDoor();
    }else if((numeral == 11) && (production == 9)){
        magnetString();
    }else if((numeral == 11) && (production == 15)){
        magnetStringGrate();
    }else if((numeral == 5) && (production == 16)){
        matchesCandleErn();
    }else if(numeral == 12){
        nickelMachine();
    }else if(numeral == 13){
        paperTape();
    }else if((numeral == 5) && (production == 22)){
        tongsMatchesCandleErn();
    }else if((numeral == 7) && (production == 9)){
        if(numeral1 == 4){
            active0 = '7:4';
            document.getElementById('sockcell').style.opacity = 1.0;
            document.getElementById('cordcell').style.filter = 'invert(100%)';
            filter0 = 'cordcell';
            active1 = 0;
            return;
        }
        if(numeral1 == 5){
            active0 = '7:5';
            document.getElementById('cordcell').style.opacity = 1.0;
            document.getElementById('sockcell').style.filter = 'invert(100%)';
            filter0 = 'sockcell';
            active1 = 0;
            return;
        }
    }else if((numeral == 7) && (production == 10)){
        vacuumCord();
    }else if((numeral == 7) && (production == 11)){
        vacuumSock();
    }else if((numeral == 7) && (production == 15)){
        vacuumCordSock();
    }else if((numeral == 7) && (production == 22)){
        vacuumCordSockUdresser();
    }else if((numeral == 4) && (production == 10)){
        cameraBatteries();
    }else if((numeral == 4) && (production == 11)){
        cameraCard();
    }else if((numeral == 4) && (production == 15)){
        cameraCardBatteries();
    }else{
        return;
    }
}

function candleErn(){
    document.getElementById('dropitem').play();
    document.getElementById('candlecell').style.filter = 'invert(0%)';
    document.getElementById('candlecell').style.opacity = 0.5;
    document.getElementById('dcandle0b').style.visibility = 'visible';
    inventory['candle'] = 0;
    slot_name[3] = 'candleern';
    show_screen[20] = '0:dcandle0b';
    active0 = '0:0';
    active1 = '0:0';
}

function cheeseHole(){
    document.getElementById('mousesqueak').play();
    document.getElementById('cheesecell').style.filter = 'invert(0%)';
    document.getElementById('cheesecell').style.opacity = 0.5;
    document.getElementById('dmatches0').style.visibility = 'visible';
    inventory['cheese'] = 0;
    show_screen[2] = '0:dmatches0';
    active0 = '0:0';
    active1 = '0:0';
}

function drawerkeyDrawer(){
    document.getElementById('unlockdrawer').play();
    document.getElementById('drawerkeycell').style.filter = 'invert(0%)';
    document.getElementById('drawerkeycell').style.opacity = 0.5;
    inventory['drawerkey'] = 0;
    lock_view1b = 1;
    active0 = '0:0';
    active1 = '0:0';
}

function dresserkeyDresser(){
    document.getElementById('unlockdrawer').play();
    document.getElementById('dresserkeycell').style.filter = 'invert(0%)';
    document.getElementById('dresserkeycell').style.opacity = 0.5;
    inventory['dresserkey'] = 0;
    lock_view0b = 1;
    active0 = '0:0';
    active1 = '0:0';
}

function hairpinDoor(){
    document.getElementById('unlockdoor').play();
    document.getElementById('hairpincell').style.filter = 'invert(0%)';
    document.getElementById('hairpincell').style.opacity = 0.5;
    inventory['hairpin'] = 0;
    lock_view0c = 1;
    active0 = '0:0';
    active1 = '0:0';
}

function magnetString(){
    document.getElementById('magnetcell').style.opacity = 1.0;
    document.getElementById('stringcell').style.filter = 'invert(0%)';
    document.getElementById('stringcell').style.opacity = 0.5;
    document.images['magnet'].src = imagnet1.src;
    document.getElementById('magnetcell').style.filter = 'invert(100%)';
    inventory['string'] = 0;
    slot_name[0] = 'magnetstring';
    active0 = combo_number['magnetstring'];
    active1 = '0:0';
    filter0 = 'magnetcell';
}

function magnetStringGrate(){
    document.getElementById('magnetclink').play();
    document.getElementById('magnetcell').style.filter = 'invert(0%)';
    document.getElementById('magnetcell').style.opacity = 0.5;
    inventory['magnet'] = 0;
    active0 = '0:0';
    active1 = '0:0';
    giveItem('batteries', ibattery0);
}

function matchesCandleErn(){
    document.getElementById('matcheslight').play();
    document.getElementById('matchescell').style.filter = 'invert(0%)';
    document.getElementById('matchescell').style.opacity = 0.5;
    document.getElementById('dcandle0b').style.visibility = 'hidden';
    document.getElementById('dcandle1').style.visibility = 'visible';
    inventory['matches'] = 0;
    slot_name[3] = 'matchescandleern';
    show_screen[20] = '1:dcandle0b';
    show_screen[19] = '0:dcandle1';
    active0 = '0:0';
    active1 = '0:0';
}

function nickelMachine(){
    document.getElementById('candymachine').play();
    document.getElementById('nickelcell').style.filter = 'invert(0%)';
    document.getElementById('nickelcell').style.opacity = 0.5;
    inventory['nickel'] = 0;
    document.getElementById('ddrawerkey0').style.visibility = 'visible';
    show_screen[6] = '0:ddrawerkey0';
    active0 = '0:0';
    active1 = '0:0';
}

function paperTape(){
    document.getElementById('tapepaper').play();
    document.getElementById('papercell').style.filter = 'invert(100%)';
    document.getElementById('tapecell').style.filter = 'invert(0%)';
    document.getElementById('tapecell').style.opacity = 0.5;
    document.images['paper'].src = ipaper1.src;
    inventory['tape'] = 0;
    slot_name[4] = 'papertape';
    active0 = combo_number['papertape'];
    active1 = '0:0';
    filter0 = 'papercell';
}

function tongsMatchesCandleErn(){
    document.getElementById('recieveitem').play();
    document.getElementById('tongscell').style.filter = 'invert(0%)';
    document.getElementById('tongscell').style.opacity = 0.5;
    document.getElementById('dcandle1').style.visibility = 'hidden';
    show_screen[19] = '1:dcandle1';
    inventory['tongs'] = 0;
    active0 = '0:0';
    active1 = '0:0';
    giveItem('dresserkey', idresserkey0);
}

function vacuumCord(){
    document.getElementById('vacuumcell').style.filter = 'invert(100%)';
    document.getElementById('cordcell').style.filter = 'invert(0%)';
    document.getElementById('cordcell').style.opacity = 0.5;
    document.images['vacuum'].src = ivacuum2.src;
    inventory['cord'] = 0;
    slot_name[1] = 'vacuumcord';
    active0 = combo_number['vacuumcord'];
    active1 = '0:0';
    filter0 = 'vacuumcell';
}

function vacuumSock(){
    document.getElementById('vacuumcell').style.filter = 'invert(100%)';
    document.getElementById('sockcell').style.filter = 'invert(0%)';
    document.getElementById('sockcell').style.opacity = 0.5;
    document.images['vacuum'].src = ivacuum1.src;
    inventory['sock'] = 0;
    slot_name[1] = 'vacuumsock';
    active0 = combo_number['vacuumsock'];
    active1 = '0:0';
    filter0 = 'vacuumcell';
}

function vacuumCordSock(){
    document.getElementById('vacuumcell').style.filter = 'invert(100%)';
    document.getElementById('cordcell').style.filter = 'invert(0%)';
    document.getElementById('cordcell').style.opacity = 0.5;
    document.getElementById('sockcell').style.filter = 'invert(0%)';
    document.getElementById('sockcell').style.opacity = 0.5;
    document.images['vacuum'].src = ivacuum3.src;
    inventory['cord'] = 0;
    inventory['sock'] = 0;
    slot_name[1] = 'vacuumcordsock';
    active0 = combo_number['vacuumcordsock'];
    active1 = '0:0';
    filter0 = 'vacuumcell';
}

function vacuumCordSockUdresser(){
    document.getElementById('vacuumcleaner').play();
    var the_timeout = setTimeout("document.getElementById('magnetclink').play();", 2800)
    document.getElementById('vacuumcell').style.filter = 'invert(0%)';
    document.getElementById('vacuumcell').style.opacity = 0.5;
    inventory['vacuum'] = 0;
    active0 = '0:0';
    active1 = '0:0';
    var a_timeout = setTimeout("giveItem('card', icard0);", 2800)
}

function cameraBatteries(){
    document.getElementById('dropitem').play();
    document.getElementById('batteriescell').style.filter = 'invert(0%)';
    document.getElementById('batteriescell').style.opacity = 0.5;
    inventory['batteries'] = 0;
    slot_name[2] = 'camerabatteries';
    active0 = '0:0';
    active1 = '0:0';
}

function cameraCard(){
    document.getElementById('dropitem').play();
    document.getElementById('cardcell').style.filter = 'invert(0%)';
    document.getElementById('cardcell').style.opacity = 0.5;
    inventory['card'] = 0;
    slot_name[2] = 'cameracard';
    active0 = '0:0';
    active1 = '0:0';
}

function cameraCardBatteries(){
    document.getElementById('dropitem').play();
    document.getElementById('batteriescell').style.filter = 'invert(0%)';
    document.getElementById('batteriescell').style.opacity = 0.5;
    document.getElementById('cardcell').style.filter = 'invert(0%)';
    document.getElementById('cardcell').style.opacity = 0.5;
    inventory['batteries'] = 0;
    inventory['card'] = 0;
    slot_name[2] = 'cameracardbatteries';
    active0 = '0:0';
    active1 = '0:0';
}

function beginning(){
alert('One day, you get into a fight with your sibling and\nend up locked in one of the rooms in your house.\nYour sibling leaves you there, imprisoned and\ndoomed to starve. Now it\'s your job to get out.');}

// a little variable to activate some help descriptions
var helper_option = true;

function displayText(text_string){
    document.getElementById('display').innerHTML = '<font style = "font-size:15px;">' + text_string + '</font>';
}

function resetText(){
    document.getElementById('display').innerHTML = '<img src = "iblank0.gif" border = "0">';
}
