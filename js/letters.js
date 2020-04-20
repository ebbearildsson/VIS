let dots = [];
let targets = [];
let animating = false;
const G = 1000;
const bounce_coefficient = 1;
const min_size = 5;
const max_size = 25;
const max_velocity = 5;

function setup(){
    createCanvas(innerWidth, innerHeight);
    background(0);
    noStroke();
    fill(255);
}

function draw(){
    background(0);
    if(animating === true) {
        dots.forEach(dot => {
            dot.update();
            dot.draw();
        });
    } else if(mouseIsPressed) targets.push(createVector(mouseX, mouseY));
    targets.forEach(target => ellipse(target.x, target.y, 2));
    text("Draw by holding down left click\nPress ENTER to start/clear animation", 10, 10);
}

function keyPressed() {
    if (keyCode === ENTER) {
        if(animating === false){
            getDots();
        }
        if(animating === true){
            dots = [];
            targets = [];
        }
        animating = !animating;
    } 
}

function getDots(){
    targets.forEach(target => {
        dots.push(new Dot(createVector(random(0, width), random(0, height)), target, random(min_size, max_size)));
        dots.push(new Dot(createVector(random(0, width), random(0, height)), target, random(min_size, max_size)));
        dots.push(new Dot(createVector(random(0, width), random(0, height)), target, random(min_size, max_size)));
        dots.push(new Dot(createVector(random(0, width), random(0, height)), target, random(min_size, max_size)));
    });
}

class Dot{
    constructor(position, target, size){
        this.pos = position;
        this.vel = createVector(0, 0);
        this.size = size;
        this.target = target;
    }

    update(){
        if(dist(this.pos.x, this.pos.y, this.target.x, this.target.y) > 5){
            let acc = createVector(0, 0);
            let f = (G * this.size) / sq(dist(this.pos.x, this.pos.y, this.target.x, this.target.y));
            let angle = atan2((this.pos.y - this.target.y), (this.pos.x - this.target.x));
            let a = f / this.size;

            acc.add(createVector(-a * cos(angle), -a * sin(angle)));
            this.vel.add(acc);

            if(this.pos.x >= width ) {
                this.pos.x = width;
                this.vel.x *= -bounce_coefficient;
            }
            else if(this.pos.x <= 0) {
                this.pos.x = 0;
                this.vel.x *= -bounce_coefficient;
            }
            if(this.pos.y >= height) {
                this.pos.y = height;
                this.vel.y *= -bounce_coefficient;
            }
            else if(this.pos.y <= 0) {
                this.pos.y = 0;
                this.vel.y *= -bounce_coefficient;
            }

            this.vel = createVector(constrain(this.vel.x, -max_velocity, max_velocity), constrain(this.vel.y, -max_velocity, max_velocity));
            this.pos.add(this.vel);
        }
    }

    draw(){
        ellipse(this.pos.x, this.pos.y, this.size);
    }
}