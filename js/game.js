var canvas;
let count = 0;
const increment = Math.PI / 2;
let radius = 300;
const speed = 100;
const noiseWeight = 10;

function setup(){
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
    noStroke();
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight)
}

function draw(){
    clear();
    fill(0);
    beginShape();
    for(let angle = 0; angle < TWO_PI; angle += increment){
        vertex(width / 2 + radius * cos(angle) * noise(count / speed, cos(angle)) * noiseWeight, height / 2 + radius * sin(angle) * noise(count / speed, sin(angle)) * noiseWeight);
    }
    endShape();
    //ellipse(width / 2, height / 2, sin(millis() / 2000) * height);
    count++;
    if(mouseIsPressed) radius += speed / 100;
    else if(radius > 50) radius -= speed / 100;
}
