let length;
let curve;
let levels = 2

function setup(){
    createCanvas(innerWidth, innerHeight);
    angleMode(DEGREES);
    background(0);
    stroke(255);

    if(width > height) length = height * 0.6;
    else length = width * 0.6;

    curve = new Curve(createVector(-length, 0), createVector(length, 0))
    
}

function draw(){
    background(0);
    text(levels, 15, 40);
    translate(width / 2, height / 2);
    curve.draw();
}

class Curve{
    constructor(a, b){
        this.start = a;
        this.end = b;
        this.points = [a, b];
    }

    draw(){
        beginShape();
        this.points.forEach(p => vertex(p.x, p.y));
        endShape();
    }
}

