let balls = [];
let walls = [];
let wallA;
let animating = false;
const G = 0.01;
const bounce_coefficient = 0.9;
const closeness = 5;
const dt = 100;

function setup(){
    createCanvas(innerWidth, innerHeight);
    wallA = createVector();
    angleMode(DEGREES);
    background(0);
    stroke(255);
}

function mousePressed(){
    wallA = createVector(mouseX, mouseY);
    animating = true;
}

function mouseReleased(){
    walls.push(new Wall(wallA, createVector(mouseX, mouseY)));
    animating = false;
}

function getBall(){
    balls.push(new Ball(
        createVector(width / 2 + random(-10, 10), height / 2), 
        createVector(), 5)
    );
}

function draw(){
    getBall();
    if(animating) line(wallA.x, wallA.y, mouseX, mouseY);
    background(0);
    for(let delta = 0; delta < dt; delta++){
        for(let i = balls.length - 1; i >= 0; i--){
            balls[i].accelerate();
            balls[i].move();
            if(balls[i].outside == true) balls.splice(i, 1);
        }
    }
    walls.forEach(wall => wall.draw());
    balls.forEach(ball => ball.draw());
}

class Ball{
    constructor(position, velocity, size){
        this.pos = position;
        this.vel = velocity;
        this.size = size;
        this.outside = false;
    }

    accelerate(){
        this.vel.y += G / dt;
    }

    move(){
        walls.forEach(wall => {
            let A = dist(this.pos.x, this.pos.y, wall.posA.x, wall.posA.y);
            let B = dist(this.pos.x, this.pos.y, wall.posB.x, wall.posB.y);
            if(wall.length + closeness / dt > A + B){
                if(wall.length - closeness / dt < A + B){
                    this.vel.y = sin(wall.angle) * bounce_coefficient * this.vel.mag();
                    this.vel.x = cos(wall.angle) * bounce_coefficient * this.vel.mag();
                }
            }
        })
        this.pos.add(this.vel);

        if(this.pos.x > width || this.pos.x < 0 || this.pos.y > height) this.outside = true;
    }

    draw(){
        ellipse(this.pos.x, this.pos.y, this.size);
    }
}

class Wall{
    constructor(position_A, position_B){
        this.posA = position_A;
        this.posB = position_B;
        this.length = dist(this.posA.x, this.posA.y, this.posB.x, this.posB.y);
        this.angle = atan2(this.posA.y - this.posB.y, this.posA.x - this.posB.x) + 90;
    }

    draw(){
        line(this.posA.x, this.posA.y, this.posB.x, this.posB.y);
    }
}