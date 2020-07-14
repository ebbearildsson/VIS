const size = 10;
const vision = 200;
const amount = 50;
const speed = 5;
const ruleC = 0.05;
const ruleS = 10;
const ruleA = 0.05;
let drawV = false;
let boids = [];

function setup(){
    createCanvas(innerWidth, innerHeight);
    for(let i = 0; i < amount; i++) boids.push(new Boid());
    noStroke();
}

function draw(){
    background(0);
    boids.forEach(boid => {
        boid.edge();
        boid.move();
        boid.draw();
    });
}

function calcRuleS(boid){ //Seperation
    let v = createVector();
    let n = 0;
    boids.forEach(other => {
        let d = dist(boid.pos.x, boid.pos.y, other.pos.x, other.pos.y)
        if(other != boid && d < vision){
            let f = -sq(ruleS) / sq(d); 
            let a = atan2(boid.pos.y - other.pos.y, other.pos.x - boid.pos.x);
            v.add(createVector(f * cos(a), -f * sin(a)));
            n++;
        }
    });
    if(n > 0){
        v.div(n);
    }
    if(drawV){
        push();
        translate(boid.pos.x, boid.pos.y);
        stroke(255, 0, 255);
        line(0, 0, v.x * 1000, v.y * 1000);
        pop();
    }
    return v;
}

function calcRuleA(boid){ //Alignment
    let v = createVector();
    let n = 0;
    boids.forEach(other => {
        let d = dist(boid.pos.x, boid.pos.y, other.pos.x, other.pos.y)
        if(other != boid && d < vision){
            v.add(other.vel);
            n++;
        }
    });
    if(n > 0){
        v.div(n);
        v = createVector(ruleA * cos(v.heading()), -ruleA * sin(v.heading()))
    }
    if(drawV){
        push();
        translate(boid.pos.x, boid.pos.y);
        stroke(0, 255, 255);
        line(0, 0, v.x * 1000, v.y * 1000);
        pop();
    }
    return v;
}

function calcRuleC(boid){ //Cohesion
    let v = createVector();
    let n = 0;
    boids.forEach(other => {
        let d = dist(boid.pos.x, boid.pos.y, other.pos.x, other.pos.y)
        if(other != boid && d < vision){
            v.add(other.pos);
            n++;
        }
    });
    if(n > 0){
        v.div(n);
        let a = atan2(boid.pos.y - v.y, v.x - boid.pos.x)
        v = createVector(ruleC * cos(a), -ruleC * sin(a));
    }
    if(drawV){
        push();
        translate(boid.pos.x, boid.pos.y);
        stroke(255, 255, 0);
        line(0, 0, v.x * 1000, v.y * 1000);
        pop();
    }
    return v;
}

class Boid{
    constructor(){
        this.pos = createVector(random(0, width), random(0, height));
        this.vel = p5.Vector.random2D();
        this.acc = createVector();
    }

    move(){
        this.vel.add(calcRuleS(this));
        this.vel.add(calcRuleA(this));
        this.vel.add(calcRuleC(this));
        this.vel.setMag(speed);
        this.pos.add(this.vel);
    }

    edge(){
        if(this.pos.x >= width) this.pos.x = 0;
        else if(this.pos.x <= 0) this.pos.x = width;
        if(this.pos.y >= height) this.pos.y = 0;
        else if(this.pos.y <= 0) this.pos.y = height;

    }

    draw(){
        push();
        translate(this.pos.x, this.pos.y);
        fill(255);
        ellipse(0, 0, size);
        fill(255, 5)
        ellipse(0, 0, vision * 2);
        if(drawV){
            stroke(255, 0, 0);
            line(0, 0, this.vel.x * 10, this.vel.y * 10);
        }
        pop();
    }
}