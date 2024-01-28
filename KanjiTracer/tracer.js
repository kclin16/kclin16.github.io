const width = 3;
var canvas;
var paper;
var lastX = 0;
var lastY = 0;

function init(){
    canvas = document.getElementById('paper');
    if(canvas.getContext){
        paper = canvas.getContext('2d');
    }

    canvas.addEventListener('pointerdown', function(event){
        lastX = event.layerX;
        lastY = event.layerY;
        canvas.addEventListener('pointermove', drag);
    });

    canvas.addEventListener('pointerup', function(event){
        canvas.removeEventListener('pointermove', drag);
    });

    document.getElementById('clear_button').addEventListener('click', clear);
}

function drag(event){
    paper.beginPath();
    paper.lineWidth = event.pointerType === "pen" ? 10 * event.pressure: width;
    paper.moveTo(lastX, lastY);
    paper.lineTo(event.layerX, event.layerY);
    paper.stroke();
    lastX = event.layerX;
    lastY = event.layerY;
}

function clear(){
    paper.clearRect(0, 0, canvas.width, canvas.height);
}
