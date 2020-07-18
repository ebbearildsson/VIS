let length, sliderL;
let levels = 3;

function setup(){
    createCanvas(innerWidth, innerHeight);
    sliderL = createSlider(0, 10, 2, 1);
    sliderL.position(10, 10);
    angleMode(DEGREES);
    background(0);
    noStroke();

    if(width > height) length = height * 0.9;
    else length = width * 0.9;
}

function getTriangle(depth, len){
    triangle(-len / 2, -len / 2, 0, len / 2, len / 2, -len / 2)
    if(depth <= levels){
        for(let i = -1; i <= 1; i += 2){
            push();
            translate(len / 2 * i, len / 4)
            getTriangle(depth + 1, len / 2)
            pop();
        }
        push();
        translate(0, -len * 3 / 4)
        getTriangle(depth + 1, len / 2)
        pop();
    }
}

function draw(){
    if(sliderL.value() !== levels) {
        fill(255);
        background(0);
        levels = sliderL.value();
        text(levels, 15, 40);
        translate(width / 2, height / 2);
        triangle(-length / 2, length / 2, 0, -length / 2, length / 2, length / 2);
        fill(0);
        translate(0, length / 4)
        if(levels > 0) getTriangle(2, length / 2);
    }
}