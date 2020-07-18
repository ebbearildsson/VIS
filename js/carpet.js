let max_depth = 1;
let start_length;
let slider_depth;


function setup(){
    createCanvas(innerWidth, innerHeight);
    slider_depth = createSlider(0, 6, 0, 1);
    slider_depth.position(10, 10);
    rectMode(CENTER);
    background(0);
    noStroke();

    if(width > height) start_length = 0.9 * height;
    else start_length = 0.9 * width; 
}

function draw(){
    if(slider_depth.value() !== max_depth){
        max_depth = slider_depth.value();
        fill(255)
        background(0);
        text(max_depth, 15, 40);
        translate(width / 2, height / 2);
        rect(0, 0, start_length, start_length);
        fill(0);
        if(max_depth > 0) getSquares(start_length / 3, 1)
    }
}

function getSquares(length, depth){
    rect(0, 0, length, length);
    depth++;
    if(depth <= max_depth){
        for(let j = -1; j <= 1; j++){
            for(let i = -1; i <= 1; i++) {
                if(!(i == 0 && j == 0)){
                    push();
                    translate(length * j , length * i);
                    getSquares(length / 3, depth);
                    pop();
                } 
            }
        }
    }
}

