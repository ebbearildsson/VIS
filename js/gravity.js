let bodies = [];
const max_velocity = 5;
const G = 0.1;
const min_size = 5;
const max_size = 50;
const bounce_coefficient = 0.8;

function setup(){
    createCanvas(innerWidth, innerHeight);
    bodies = getBodies(100)
    background(0);
    noStroke();
}

function getBodies(amount){
    let temp_bodies = []
    for(let i = 0; i < amount; i++){
        temp_bodies.push(new Body(
            createVector(
                random(-max_velocity, max_velocity), 
                random(-max_velocity, max_velocity)
            ), 
            createVector(
                random(0, width), 
                random(0, height)
            ), 
            random(min_size, max_size)
        ));
    }
    return temp_bodies;
}

function draw(){
    background(0)
    bodies.forEach(b => b.gravity());
    bodies.forEach(b => {
        b.update();
        b.draw();
    });
}

class Body{
    constructor(initial_velocity, body_position, body_size){
        this.c = createVector(random(100, 255), random(100, 255), random(100, 255));
        this.v = initial_velocity;
        this.pos = body_position;
        this.s = sq(body_size);
    }

    gravity(){
        let acc = createVector(0, 0);
        bodies.forEach(b => {
            if(b !== this){
                let f = (G * this.s * b.s) / sq(dist(this.pos.x, this.pos.y, b.pos.x, b.pos.y));
                let angle = atan2((this.pos.y - b.pos.y), (this.pos.x - b.pos.x));
                let a = f / this.s;

                acc.add(createVector(-a * cos(angle), -a * sin(angle)));
            }
        });
        this.v.add(acc);
    }

    update(){
        if(this.pos.x >= width ) {
            this.pos.x = width;
            this.v.x *= -bounce_coefficient;
        }
        else if(this.pos.x <= 0) {
            this.pos.x = 0;
            this.v.x *= -bounce_coefficient;
        }
        if(this.pos.y >= height) {
            this.pos.y = height;
            this.v.y *= -bounce_coefficient;
        }
        else if(this.pos.y <= 0) {
            this.pos.y = 0;
            this.v.y *= -bounce_coefficient;
        }

        this.v = createVector(constrain(this.v.x, -max_velocity, max_velocity), constrain(this.v.y, -max_velocity, max_velocity));
        this.pos.add(this.v);
    }

    draw(){
        fill(this.c.x, this.c.y, this.c.z);
        ellipse(this.pos.x, this.pos.y, sqrt(this.s));
    }
}