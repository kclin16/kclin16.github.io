// JS code for Suoku Solver
// Hell,  this is gonna be one fun ride (-.-)
// Actually,  it wasn't as bad as I thought.

// Alright,  need to store values in arrays

var cell_values_box0 = new Array('0', '0', '0', '0', '0', '0', '0', '0', '0');
var cell_values_box1 = new Array('0', '0', '0', '0', '0', '0', '0', '0', '0');
var cell_values_box2 = new Array('0', '0', '0', '0', '0', '0', '0', '0', '0');
var cell_values_box3 = new Array('0', '0', '0', '0', '0', '0', '0', '0', '0');
var cell_values_box4 = new Array('0', '0', '0', '0', '0', '0', '0', '0', '0');
var cell_values_box5 = new Array('0', '0', '0', '0', '0', '0', '0', '0', '0');
var cell_values_box6 = new Array('0', '0', '0', '0', '0', '0', '0', '0', '0');
var cell_values_box7 = new Array('0', '0', '0', '0', '0', '0', '0', '0', '0');
var cell_values_box8 = new Array('0', '0', '0', '0', '0', '0', '0', '0', '0');

var cell_values_col0 = new Array('0', '0', '0', '0', '0', '0', '0', '0', '0');
var cell_values_col1 = new Array('0', '0', '0', '0', '0', '0', '0', '0', '0');
var cell_values_col2 = new Array('0', '0', '0', '0', '0', '0', '0', '0', '0');
var cell_values_col3 = new Array('0', '0', '0', '0', '0', '0', '0', '0', '0');
var cell_values_col4 = new Array('0', '0', '0', '0', '0', '0', '0', '0', '0');
var cell_values_col5 = new Array('0', '0', '0', '0', '0', '0', '0', '0', '0');
var cell_values_col6 = new Array('0', '0', '0', '0', '0', '0', '0', '0', '0');
var cell_values_col7 = new Array('0', '0', '0', '0', '0', '0', '0', '0', '0');
var cell_values_col8 = new Array('0', '0', '0', '0', '0', '0', '0', '0', '0');

var cell_values_row0 = new Array('0', '0', '0', '0', '0', '0', '0', '0', '0');
var cell_values_row1 = new Array('0', '0', '0', '0', '0', '0', '0', '0', '0');
var cell_values_row2 = new Array('0', '0', '0', '0', '0', '0', '0', '0', '0');
var cell_values_row3 = new Array('0', '0', '0', '0', '0', '0', '0', '0', '0');
var cell_values_row4 = new Array('0', '0', '0', '0', '0', '0', '0', '0', '0');
var cell_values_row5 = new Array('0', '0', '0', '0', '0', '0', '0', '0', '0');
var cell_values_row6 = new Array('0', '0', '0', '0', '0', '0', '0', '0', '0');
var cell_values_row7 = new Array('0', '0', '0', '0', '0', '0', '0', '0', '0');
var cell_values_row8 = new Array('0', '0', '0', '0', '0', '0', '0', '0', '0');

var set_values_box0 = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
var set_values_box1 = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
var set_values_box2 = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
var set_values_box3 = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
var set_values_box4 = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
var set_values_box5 = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
var set_values_box6 = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
var set_values_box7 = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
var set_values_box8 = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);

var set_values_col0 = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
var set_values_col1 = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
var set_values_col2 = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
var set_values_col3 = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
var set_values_col4 = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
var set_values_col5 = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
var set_values_col6 = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
var set_values_col7 = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
var set_values_col8 = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);

var set_values_row0 = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
var set_values_row1 = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
var set_values_row2 = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
var set_values_row3 = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
var set_values_row4 = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
var set_values_row5 = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
var set_values_row6 = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
var set_values_row7 = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
var set_values_row8 = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);

var cell_ids_box0 = new Array('cell0000', 'cell0101', 'cell0202', 'cell0013', 'cell0114', 'cell0215', 'cell0026', 'cell0127', 'cell0228');
var cell_ids_box1 = new Array('cell1300', 'cell1401', 'cell1502', 'cell1313', 'cell1414', 'cell1515', 'cell1326', 'cell1427', 'cell1528');
var cell_ids_box2 = new Array('cell2600', 'cell2701', 'cell2802', 'cell2613', 'cell2714', 'cell2815', 'cell2626', 'cell2727', 'cell2828');
var cell_ids_box3 = new Array('cell3030', 'cell3131', 'cell3232', 'cell3043', 'cell3144', 'cell3245', 'cell3056', 'cell3157', 'cell3258');
var cell_ids_box4 = new Array('cell4330', 'cell4431', 'cell4532', 'cell4343', 'cell4444', 'cell4545', 'cell4356', 'cell4457', 'cell4558');
var cell_ids_box5 = new Array('cell5630', 'cell5731', 'cell5832', 'cell5643', 'cell5744', 'cell5845', 'cell5656', 'cell5757', 'cell5858');
var cell_ids_box6 = new Array('cell6060', 'cell6161', 'cell6262', 'cell6073', 'cell6174', 'cell6275', 'cell6086', 'cell6187', 'cell6288');
var cell_ids_box7 = new Array('cell7360', 'cell7461', 'cell7562', 'cell7373', 'cell7474', 'cell7575', 'cell7386', 'cell7487', 'cell7588');
var cell_ids_box8 = new Array('cell8660', 'cell8761', 'cell8862', 'cell8673', 'cell8774', 'cell8875', 'cell8686', 'cell8787', 'cell8888');

var cell_ids_col0 = new Array('cell0000', 'cell0013', 'cell0026', 'cell3030', 'cell3043', 'cell3056', 'cell6060', 'cell6073', 'cell6086');
var cell_ids_col1 = new Array('cell0101', 'cell0114', 'cell0127', 'cell3131', 'cell3144', 'cell3157', 'cell6161', 'cell6174', 'cell6187');
var cell_ids_col2 = new Array('cell0202', 'cell0215', 'cell0228', 'cell3232', 'cell3245', 'cell3258', 'cell6262', 'cell6275', 'cell6288');
var cell_ids_col3 = new Array('cell1300', 'cell1313', 'cell1326', 'cell4330', 'cell4343', 'cell4356', 'cell7360', 'cell7373', 'cell7386');
var cell_ids_col4 = new Array('cell1401', 'cell1414', 'cell1427', 'cell4431', 'cell4444', 'cell4457', 'cell7461', 'cell7474', 'cell7487');
var cell_ids_col5 = new Array('cell1502', 'cell1515', 'cell1528', 'cell4532', 'cell4545', 'cell4558', 'cell7562', 'cell7575', 'cell7588');
var cell_ids_col6 = new Array('cell2600', 'cell2613', 'cell2626', 'cell5630', 'cell5643', 'cell5656', 'cell8660', 'cell8673', 'cell8686');
var cell_ids_col7 = new Array('cell2701', 'cell2714', 'cell2727', 'cell5731', 'cell5744', 'cell5757', 'cell8761', 'cell8774', 'cell8787');
var cell_ids_col8 = new Array('cell2802', 'cell2815', 'cell2828', 'cell5832', 'cell5845', 'cell5858', 'cell8862', 'cell8875', 'cell8888');

var cell_ids_row0 = new Array('cell0000', 'cell0101', 'cell0202', 'cell1300', 'cell1401', 'cell1502', 'cell2600', 'cell2701', 'cell2802');
var cell_ids_row1 = new Array('cell0013', 'cell0114', 'cell0215', 'cell1313', 'cell1414', 'cell1515', 'cell2613', 'cell2714', 'cell2815');
var cell_ids_row2 = new Array('cell0026', 'cell0127', 'cell0228', 'cell1326', 'cell1427', 'cell1528', 'cell2626', 'cell2727', 'cell2828');
var cell_ids_row3 = new Array('cell3030', 'cell3131', 'cell3232', 'cell4330', 'cell4431', 'cell4532', 'cell5630', 'cell5731', 'cell5832');
var cell_ids_row4 = new Array('cell3043', 'cell3144', 'cell3245', 'cell4343', 'cell4444', 'cell4545', 'cell5643', 'cell5744', 'cell5845');
var cell_ids_row5 = new Array('cell3056', 'cell3157', 'cell3258', 'cell4356', 'cell4457', 'cell4558', 'cell5656', 'cell5757', 'cell5858');
var cell_ids_row6 = new Array('cell6060', 'cell6161', 'cell6262', 'cell7360', 'cell7461', 'cell7562', 'cell8660', 'cell8761', 'cell8862');
var cell_ids_row7 = new Array('cell6073', 'cell6174', 'cell6275', 'cell7373', 'cell7474', 'cell7575', 'cell8673', 'cell8774', 'cell8875');
var cell_ids_row8 = new Array('cell6086', 'cell6187', 'cell6288', 'cell7386', 'cell7487', 'cell7588', 'cell8686', 'cell8787', 'cell8888');

    function reset_text_values(){
    // This resets all of the cells,  so it's easy to start a new game. It also fixes a problem with the set function.
    window.document.getElementById('text0000').value = '';
    window.document.getElementById('text0101').value = '';
    window.document.getElementById('text0202').value = '';
    window.document.getElementById('text0013').value = '';
    window.document.getElementById('text0114').value = '';
    window.document.getElementById('text0215').value = '';
    window.document.getElementById('text0026').value = '';
    window.document.getElementById('text0127').value = '';
    window.document.getElementById('text0228').value = '';

    window.document.getElementById('text1300').value = '';
    window.document.getElementById('text1401').value = '';
    window.document.getElementById('text1502').value = '';
    window.document.getElementById('text1313').value = '';
    window.document.getElementById('text1414').value = '';
    window.document.getElementById('text1515').value = '';
    window.document.getElementById('text1326').value = '';
    window.document.getElementById('text1427').value = '';
    window.document.getElementById('text1528').value = '';

    window.document.getElementById('text2600').value = '';
    window.document.getElementById('text2701').value = '';
    window.document.getElementById('text2802').value = '';
    window.document.getElementById('text2613').value = '';
    window.document.getElementById('text2714').value = '';
    window.document.getElementById('text2815').value = '';
    window.document.getElementById('text2626').value = '';
    window.document.getElementById('text2727').value = '';
    window.document.getElementById('text2828').value = '';

    window.document.getElementById('text3030').value = '';
    window.document.getElementById('text3131').value = '';
    window.document.getElementById('text3232').value = '';
    window.document.getElementById('text3043').value = '';
    window.document.getElementById('text3144').value = '';
    window.document.getElementById('text3245').value = '';
    window.document.getElementById('text3056').value = '';
    window.document.getElementById('text3157').value = '';
    window.document.getElementById('text3258').value = '';

    window.document.getElementById('text4330').value = '';
    window.document.getElementById('text4431').value = '';
    window.document.getElementById('text4532').value = '';
    window.document.getElementById('text4343').value = '';
    window.document.getElementById('text4444').value = '';
    window.document.getElementById('text4545').value = '';
    window.document.getElementById('text4356').value = '';
    window.document.getElementById('text4457').value = '';
    window.document.getElementById('text4558').value = '';

    window.document.getElementById('text5630').value = '';
    window.document.getElementById('text5731').value = '';
    window.document.getElementById('text5832').value = '';
    window.document.getElementById('text5643').value = '';
    window.document.getElementById('text5744').value = '';
    window.document.getElementById('text5845').value = '';
    window.document.getElementById('text5656').value = '';
    window.document.getElementById('text5757').value = '';
    window.document.getElementById('text5858').value = '';

    window.document.getElementById('text6060').value = '';
    window.document.getElementById('text6161').value = '';
    window.document.getElementById('text6262').value = '';
    window.document.getElementById('text6073').value = '';
    window.document.getElementById('text6174').value = '';
    window.document.getElementById('text6275').value = '';
    window.document.getElementById('text6086').value = '';
    window.document.getElementById('text6187').value = '';
    window.document.getElementById('text6288').value = '';

    window.document.getElementById('text7360').value = '';
    window.document.getElementById('text7461').value = '';
    window.document.getElementById('text7562').value = '';
    window.document.getElementById('text7373').value = '';
    window.document.getElementById('text7474').value = '';
    window.document.getElementById('text7575').value = '';
    window.document.getElementById('text7386').value = '';
    window.document.getElementById('text7487').value = '';
    window.document.getElementById('text7588').value = '';

    window.document.getElementById('text8660').value = '';
    window.document.getElementById('text8761').value = '';
    window.document.getElementById('text8862').value = '';
    window.document.getElementById('text8673').value = '';
    window.document.getElementById('text8774').value = '';
    window.document.getElementById('text8875').value = '';
    window.document.getElementById('text8686').value = '';
    window.document.getElementById('text8787').value = '';
    window.document.getElementById('text8888').value = '';
}

// Ready for the onChange
function NonSetToSetCheck(textid){
    var number_store = textid.substring(4, 8);
    var cellid = 'cell' + number_store;
    window.document.getElementById(cellid).bgColor = 'white';

    var text_value = window.document.getElementById(textid).value;

    // Store value in box
    var array_number_box = textid.charAt(4);
    var cell_values_box = eval('cell_values_box' + array_number_box);
    var value_position_box = textid.charAt(7);
    cell_values_box[value_position_box] = text_value;

    // Store value in col
    var array_number_col = textid.charAt(5);
    var cell_values_col = eval('cell_values_col' + array_number_col);
    var value_position_col = textid.charAt(6);
    cell_values_col[value_position_col] = text_value;

    // Store value in row
    var array_number_row = textid.charAt(6);
    var cell_values_row = eval('cell_values_row' + array_number_row);
    var value_position_row = textid.charAt(5);
    cell_values_row[value_position_row] = text_value;

    if(text_value.length == 0){
        return;
    }
    var values_array = new Array();
    for(var x = 0; x < text_value.length; x++ ){
        values_array[x] = text_value.charAt(x);
    }
    for(var x = 0; x < values_array.length; x++ ){
        if((values_array[x] != 1) 
           && (values_array[x] != 2) 
           && (values_array[x] != 3) 
           && (values_array[x] != 4) 
           && (values_array[x] != 5) 
           && (values_array[x] != 6) 
           && (values_array[x] != 7) 
           && (values_array[x] != 8) 
           && (values_array[x] != 9)){
            window.document.getElementById(cellid).bgColor = 'red';
            return;
        }
    }

    var set_values_box = eval('set_values_box' + array_number_box);
    var set_values_col = eval('set_values_col' + array_number_col);
    var set_values_row = eval('set_values_row' + array_number_row);

    for(var x = 0; x < set_values_box.length; x++ ){
        if(set_values_box[x] == 1){
            for(var y = 0; y < values_array.length; y++ ){
                if(values_array[y] == cell_values_box[x]){
                    window.document.getElementById(cellid).bgColor = 'red';
                    return;
                }
            }
        }
    }

    for(var x = 0;x < set_values_col.length;x++ ){
        if(set_values_col[x] == 1){
            for(var y = 0;y < values_array.length;y++ ){
                if(values_array[y] == cell_values_col[x]){
                    window.document.getElementById(cellid).bgColor = 'red';
                    return;
                }
            }
        }
    }

    for(var x = 0;x < set_values_row.length;x++ ){
        if(set_values_row[x] == 1){
            for(var y = 0;y < values_array.length;y++ ){
                if(values_array[y] == cell_values_row[x]){
                    window.document.getElementById(cellid).bgColor = 'red';
                    return;
                }
            }
        }
    }
    return;
}


// Set to All Check,  caused by "Set #"
function setToAllCheck(textid){
    var number_store = textid.substring(4, 8);
    var cellid = 'cell' + number_store;

    var text_value = window.document.getElementById(textid).value;

    if(text_value.length != 1){return;}
    window.document.getElementById(cellid).bgColor = 'white';
    window.document.getElementById(cellid).bgColor = 'white';
    if((text_value != 1) && (text_value != 2) && (text_value != 3) && (text_value != 4) && (text_value != 5) && (text_value != 6) && (text_value != 7) && (text_value != 8) && (text_value != 9)){window.document.getElementById(cellid).bgColor = 'red';return;}

    // Store value in box
    var array_number_box = textid.charAt(4);
    var cell_values_box = eval('cell_values_box' + array_number_box);
    var value_position_box = textid.charAt(7);
    cell_values_box[value_position_box] = text_value;

    // Store value in col
    var array_number_col = textid.charAt(5);
    var cell_values_col = eval('cell_values_col' + array_number_col);
    var value_position_col = textid.charAt(6);
    cell_values_col[value_position_col] = text_value;

    // Store value in row
    var array_number_row = textid.charAt(6);
    var cell_values_row = eval('cell_values_row' + array_number_row);
    var value_position_row = textid.charAt(5);
    cell_values_row[value_position_row] = text_value;

    // Make cell set
    var set_values_box = eval('set_values_box' + array_number_box);
    set_values_box[value_position_box] = 1;

    var set_values_col = eval('set_values_col' + array_number_col);
    set_values_col[value_position_col] = 1;

    var set_values_row = eval('set_values_row' + array_number_row);
    set_values_row[value_position_row] = 1;

    var buttid = 'butt' + number_store;
    window.document.getElementById(buttid).value = 'Unset #';

    var cell_ids_box = eval('cell_ids_box' + array_number_box);
    var cell_ids_col = eval('cell_ids_col' + array_number_col);
    var cell_ids_row = eval('cell_ids_row' + array_number_row);

    for(var x = 0; x < cell_ids_box.length; x++ ){
        if(cellid != cell_ids_box[x]){
            var other_cellid = cell_ids_box[x];
            var other_number_store = other_cellid.substring(4, 8);
            var other_textid = 'text' + other_number_store;
            var other_text_value = window.document.getElementById(other_textid).value;
            if(other_text_value.length != 0){
                var other_text_values = new Array;
                for(var z = 0; z < other_text_value.length; z++ ){
                    other_text_values[z] = other_text_value.charAt(z);
                }
                for(var n = 0; n < other_text_values.length; n++ ){
                    if((other_text_values[n] == 1) 
                       || (other_text_values[n] == 2) 
                       || (other_text_values[n] == 3) 
                       || (other_text_values[n] == 4) 
                       || (other_text_values[n] == 5) 
                       || (other_text_values[n] == 6) 
                       || (other_text_values[n] == 7) 
                       || (other_text_values[n] == 8) 
                       || (other_text_values[n] == 9)){
                        if(text_value == other_text_values[n]){
                            window.document.getElementById(other_cellid).bgColor = 'red';
                        }
                    }
                }
            }
        }
    }

    for(var x = 0; x < cell_ids_col.length; x++ ){
        if(cellid != cell_ids_col[x]){
            var other_cellid = cell_ids_col[x];
            var other_number_store = other_cellid.substring(4, 8);
            var other_textid = 'text' + other_number_store;
            var other_text_value = window.document.getElementById(other_textid).value;
            if(other_text_value.length != 0){
                var other_text_values = new Array;
                for(var z = 0; z < other_text_value.length; z++ ){
                    other_text_values[z] = other_text_value.charAt(z);
                }
                for(var n = 0; n < other_text_values.length; n++ ){
                    if((other_text_values[n] == 1) 
                       || (other_text_values[n] == 2) 
                       || (other_text_values[n] == 3) 
                       || (other_text_values[n] == 4) 
                       || (other_text_values[n] == 5) 
                       || (other_text_values[n] == 6) 
                       || (other_text_values[n] == 7) 
                       || (other_text_values[n] == 8) 
                       || (other_text_values[n] == 9)){
                        if(text_value == other_text_values[n]){
                            window.document.getElementById(other_cellid).bgColor = 'red';
                        }
                    }
                }
            }
        }
    }

    for(var x = 0; x < cell_ids_row.length; x++ ){
        if(cellid != cell_ids_row[x]){
            var other_cellid = cell_ids_row[x];
            var other_number_store = other_cellid.substring(4, 8);
            var other_textid = 'text' + other_number_store;
            var other_text_value = window.document.getElementById(other_textid).value;
            if(other_text_value.length != 0){
                var other_text_values = new Array;
                for(var z = 0; z < other_text_value.length; z++ ){
                    other_text_values[z] = other_text_value.charAt(z);
                }
                for(var n = 0; n < other_text_values.length; n++ ){
                    if((other_text_values[n] == 1) 
                       || (other_text_values[n] == 2) 
                       || (other_text_values[n] == 3) 
                       || (other_text_values[n] == 4) 
                       || (other_text_values[n] == 5) 
                       || (other_text_values[n] == 6) 
                       || (other_text_values[n] == 7) 
                       || (other_text_values[n] == 8) 
                       || (other_text_values[n] == 9)){
                            if(text_value == other_text_values[n]){
                                window.document.getElementById(other_cellid).bgColor = 'red';
                            }
                        }
                    }
                }
            }
        }
        return;
}


// This makes a number unset
function unsetNumberAndRecheck(textid){
    var number_store_box = textid.charAt(4);
    var number_store_col = textid.charAt(5);
    var number_store_row = textid.charAt(6);
    var set_values_box = eval('set_values_box' + number_store_box);
    var set_values_col = eval('set_values_col' + number_store_col);
    var set_values_row = eval('set_values_row' + number_store_row);

    var spot_store_box = textid.charAt(7);
    var spot_store_col = textid.charAt(6);
    var spot_store_row = textid.charAt(5);
    set_values_box[spot_store_box] = 0;
    set_values_col[spot_store_col] = 0;
    set_values_row[spot_store_row] = 0;

    var code_store = textid.substring(4, 8);
    var buttid = 'butt' + code_store;
    window.document.getElementById(buttid).value = 'Set #';

    var text_value = window.document.getElementById(textid).value;

    var cell_values_box = eval('cell_values_box' + number_store_box);
    var cell_values_col = eval('cell_values_col' + number_store_col);
    var cell_values_row = eval('cell_values_row' + number_store_row);

    var cell_ids_box = eval('cell_ids_box' + number_store_box);
    var cell_ids_col = eval('cell_ids_col' + number_store_col);
    var cell_ids_row = eval('cell_ids_row' + number_store_row);

    for(var x = 0;x < cell_values_box.length;x++ ){
        if(cell_values_box[x].indexOf(text_value) != -1){
            var other_number_store_box = cell_ids_box[x].substring(4, 8);
            var other_textid_box = 'text' + other_number_store_box;
            if(set_values_box[x] == 1){
                setToAllCheck(other_textid_box);
            }else{
                NonSetToSetCheck(other_textid_box);
            }
        }
    }

    for(var x = 0;x < cell_values_col.length;x++ ){
        if(cell_values_col[x].indexOf(text_value) != -1){
            var other_number_store_col = cell_ids_col[x].substring(4, 8);
            var other_textid_col = 'text' + other_number_store_col;
            if(set_values_col[x] == 1){
                setToAllCheck(other_textid_col);
            }else{
                NonSetToSetCheck(other_textid_col);
            }
        }
    }

    for(var x = 0;x < cell_values_row.length;x++ ){
        if(cell_values_row[x].indexOf(text_value) != -1){
            var other_number_store_row = cell_ids_row[x].substring(4, 8);
            var other_textid_row = 'text' + other_number_store_row;
            if(set_values_row[x] == 1){
                setToAllCheck(other_textid_row);
            }else{
                NonSetToSetCheck(other_textid_row);
            }
        }
    }
}
