let lights = [];
let scene = [];
let rays = [];
let count = 0;
let cam;

const res = 511;
const speed = 50;
const mag = -2000;
const edge_radiance = 0;
const max_steps = 25;
const sphere_size = 10;
const operations_per_frame = res;

function setup(){
    createCanvas(innerWidth, innerHeight, WEBGL);
    background(20);
    noStroke();

    cam = createCamera();
    cam.move(0, 0, 3000);

    scene.push(new Sphere(createVector(0, 0, -1000), 400, createVector(255, 0, 0)));
    scene.push(new Sphere(createVector(300, 100, -1000), 200, createVector(0, 0, 255)));
    scene.push(new Box(createVector(0, 0, -500), createVector(800, 400, 500), createVector(0, 255, 0)));

    lights.push(createVector(0, -1000, -1000));

    rays = getRays(res, res);
    drawScene();
}

function moveRays(rayN){
    rays[rayN].march();
    push();
    fill(rays[rayN].c.x, rays[rayN].c.y, rays[rayN].c.z);
    translate(rays[rayN].screen.x, rays[rayN].screen.y, rays[rayN].screen.z);
    plane(width / res, height / res);
    pop();
}

function drawScene(){
    scene.forEach(obj => {
            push();
            translate(obj.pos.x, obj.pos.y, obj.pos.z);
            fill(obj.c.x, obj.c.y, obj.c.z);
            if(obj instanceof Sphere) sphere(obj.r);
            else if(obj instanceof Box) box(obj.size.x, obj.size.y, obj.size.z);
            pop();
    });
    lights.forEach(light => {
        push();
        translate(light.x, light.y, light.z);
        fill(255);
        sphere(100);
        pop();
    })
}

function keyReleased(){
    rays = getRays(res, res);
}

function draw(){
    if(keyIsPressed){
        if(keyIsDown(87)) cam.move(0, 0, -speed);
        else if(keyIsDown(83)) cam.move(0, 0, speed);
        if(keyIsDown(68)) cam.move(speed, 0, 0);
        else if(keyIsDown(65)) cam.move(-speed, 0, 0);
        if(keyIsDown(16)) cam.move(0, speed, 0);
        else if(keyIsDown(32)) cam.move(0, -speed, 0);
        cam.lookAt(0, 0, 0);
        background(20);
        moving = true;
        drawScene();
        count = 0;
    } else if(rays !== []){
        for(let i = 0; i < operations_per_frame; i++){
            if(count > rays.length - 1) count = 0;
            moveRays(count);
            count++;
        }
    }
}

function getRays(widthRES, heightRES){
    let tempRays = [];
    let z = 0;
    for(let y = -height / 2; y <= height / 2; y += height / heightRES){
        for(let x = -width / 2; x <= width / 2; x += width / widthRES){
            tempRays.push(new Ray(
                createVector(x, y, z),
                createVector(x, y, z), 
                atan((x - cam.eyeX) / (z - cam.eyeZ)), 
                atan((y - cam.eyeY) / (z - cam.eyeZ))
            ));
        }
    }
    return tempRays;
}

class Ray{
    constructor(position, screen_position, angle_x, angle_y){
        this.angle_x = angle_x;
        this.angle_y = angle_y;
        this.pos = position;
        this.screen = screen_position;
        this.c = createVector(0, 0, 0);
    }

    march(){
        let d = 0; 
        let steps = 0;
        let broken = false;
        let d_smallest = Infinity;

        while(steps < max_steps){
            steps++;
            d = -minDist(this.pos);
            if(d < d_smallest) d_smallest = d;
            if(d < 10 && d > -10) {
                this.getColor();
                broken = true;
                break;
            }
            this.pos.x += sin(this.angle_x) * d;
            this.pos.y += sin(this.angle_y) * d;
            this.pos.z += ((cos(this.angle_x) + cos(this.angle_y)) / 2) * d;
        }
        if((d_smallest < edge_radiance && d_smallest > -edge_radiance) && !broken) this.c = createVector(255, 255, 255);
        //this.getShadow();
    }

    getShadow(){
        let d = -1;
        lights.forEach(light => {
            let xA = atan((this.pos.x - light.x) / (this.pos.z - light.z));
            let yA = atan((this.pos.y - light.y) / (this.pos.z - light.z));
            let tempVec = createVector(
                this.pos.x + sin(xA) * d,
                this.pos.y + sin(yA) * d,
                this.pos.z + ((cos(xA) + cos(yA)) / 2) * d
            );
            if(minDist(tempVec) < 0){
                this.c.x = 20; 
                this.c.y = 20;
                this.c.z = 20;
            }
        });
    }

    getColor(){
        let closest = Infinity;
        scene.forEach(obj => {
            let d = sphereDist(obj, this.pos);
            if(d < closest) {
                closest = d;
                this.c = obj.c;
            }
        });
    }
}

function minDist(pos){
    let sceneDist = scene.map(obj => minDistForThis(obj, pos));
    return min(sceneDist);
}

function minDistForThis(obj, pos){
    if(obj instanceof Sphere) return sphereDist(obj, pos);
    else if(obj instanceof Box) return boxDist(obj, pos);
    else return Infinity;
}

function sphereDist(sphere, pos){
    return dist(sphere.pos.x, sphere.pos.y, sphere.pos.z, pos.x, pos.y, pos.z) - sphere.r;
}

function boxDist(box, pos){
    let xdiff = abs(box.pos.x - pos.x) - box.size.x;
    let ydiff = abs(box.pos.y - pos.y) - box.size.y;
    let zdiff = abs(box.pos.z - pos.z) - box.size.z;
    let d = createVector(xdiff, ydiff, zdiff);
    return d.mag();
}

function Sphere(position, radius, color){
    this.pos = position;
    this.r = radius;
    this.c = color;
}

function Box(position, sizes, color){
    this.pos = position;
    this.size = sizes;
    this.c = color;
}

function drawLine(x1, y1, z1, x2, y2, z2){
    beginShape();
    vertex(x1,y1,z1);
    vertex(x2,y2,z2);  
    endShape();
}