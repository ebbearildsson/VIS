let ant, move, sliderN, sliderS;
let arr;
let dir = 0;
let step = 2;

function setup(){
    createCanvas(innerWidth, innerHeight);
    ant = createVector(f(width / 2), f(height / 2));
    sliderN = createSlider(1, 1000, 1, 1);
    sliderS = createSlider(1, 50, 5, 1);
    sliderN.position(10, 10);
    sliderS.position(10, 30);
    arr = getField();
    rectMode(CENTER);
    noStroke();
}

getField = () => {
    let array = new Array(f(width / step) * f(height / step));
    array.forEach(p => {
        p = false;
    });
    return array;
}

f = (value) => { return Math.floor(value / step) * step }

function moveR(){
    switch(dir){
        case(0):
            move = createVector(-step, 0);
            dir = 3;
        break;
        case(1):
            move = createVector(0, -step);
            dir = 0;
        break;
        case(2):
            move = createVector(step, 0);
            dir = 1;
        break;
        case(3):
            move = createVector(0, step);
            dir = 2;
        break;
    }
}

function moveL(){
    switch(dir){
        case(0):
            move = createVector(step, 0);
            dir = 1;
        break;
        case(1):
            move = createVector(0, step);
            dir = 2;
        break;
        case(2):
            move = createVector(-step, 0);
            dir = 3;
        break;
        case(3):
            move = createVector(0, -step);
            dir = 0;
        break;
    }
}

function draw(){
    if(sliderS.value() !== step){
        step = sliderS.value();
        arr = getField();
        background(255);
    }
    for(let n = 0; n < sliderN.value(); n++){
        let stoodOnBlack = false;
        if(arr[ant.y * f(width) + ant.x] == true) stoodOnBlack = true;

        if(stoodOnBlack == true){ 
            fill(255);
            arr[ant.y * f(width) + ant.x] = false;
            moveR();
        }
        else {
            fill(0);
            arr[ant.y * f(width) + ant.x] = true;
            moveL();
        }
        rect(ant.x, ant.y, step, step);
        
        ant.add(move);
        if(ant.x > width) ant.x = 0;
        else if(ant.x < 0) ant.x = f(width);
        if(ant.y > height) ant.y = 0;
        else if(ant.y < 0) ant.y = f(height);
        fill(255, 0, 0);
        rect(ant.x, ant.y, step, step);
    }
    fill(90)
    text(`Moves per frame: ${sliderN.value()}\nSize (Pixels): ${sliderS.value()}`, 175, 27);
}