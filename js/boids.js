const size = 10;
const vision = 400;
const amount = 30;
const speed = 1;
let boids = [];

function setup(){
    createCanvas(innerWidth, innerHeight);
    for(let i = 0; i < amount; i++) boids.push(new Boid());
}

function draw(){
    background(0);
    boids.forEach(boid => {
        boid.calc();
        boid.draw();
    });
}

function calcRuleOne(boid){ //Seperation
    let v = createVector();
    boids.forEach(other => {
        let d = dist(boid.pos.x, boid.pos.y, other.pos.x, other.pos.y)
        if(other != boid && d < vision){
            let f = -sq(size) / d; 
            let a = atan2(boid.pos.y - other.pos.y, other.pos.x - boid.pos.x);
            v.add(createVector(f * cos(a), -f * sin(a)).limit(50));
        }
    });
    v.div(amount - 1);
    return v;
}

function calcRuleTwo(boid){ //Alignment
    let v = createVector();
    boids.forEach(other => {
        let d = dist(boid.pos.x, boid.pos.y, other.pos.x, other.pos.y)
        if(other != boid && d < vision){
            let f = -sq(size) / d; 
            let a = atan2(boid.pos.y - other.pos.y, other.pos.x - boid.pos.x);
            v.add(createVector(f * cos(a), -f * sin(a)).limit(50));
        }
    });
    v.div(amount - 1);
    return v;
}

function calcRuleThree(boid){ //Cohesion
    let v = createVector();
    boids.forEach(other => {
        let d = dist(boid.pos.x, boid.pos.y, other.pos.x, other.pos.y)
        if(other != boid && d < vision){
            let f = -sq(size) / d; 
            let a = atan2(boid.pos.y - other.pos.y, other.pos.x - boid.pos.x);
            v.add(createVector(f * cos(a), -f * sin(a)).limit(50));
        }
    });
    v.div(amount - 1);
    return v;
}

class Boid{
    constructor(){
        this.pos = createVector(random(0, width), random(0, height));
        this.vel = p5.Vector.random2D();
        this.acc = createVector();
    }

    calc(){
        let ruleOne = calcRuleOne(this);
        let ruleTwo = calcRuleTwo(this);
        let ruleThree = calcRuleThree(this);

        this.move(ruleOne, ruleTwo, ruleThree);
    }

    move(one, two, three){
        this.vel.add(one);
        this.vel.add(two);
        this.vel.add(three);
        this.vel.setMag(speed);
    }

    draw(){
        push();
        translate(this.pos.x, this.pos.y);
        ellipse(0, 0, size);
        stroke(255, 0, 0);
        line(0, 0, this.vel.x * 100, this.vel.y * 100);
        pop();
    }
}