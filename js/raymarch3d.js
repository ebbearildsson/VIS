let scene = [];
let rays = [];
let cam;

const res = 31;
const speed = 50;
const mag = -2000;
const max_steps = 25;
const sphere_size = 10;

function setup(){
    createCanvas(innerWidth, innerHeight, WEBGL);
    noStroke();

    cam = createCamera();
    cam.move(0, 0, 3000);

    scene.push(new Sphere(createVector(0, 0, -1000), 400, createVector(255, 0, 0)));
    scene.push(new Sphere(createVector(300, 100, -1000), 200, createVector(0, 0, 255)));
    scene.push(new Sphere(createVector(-500, -200, -2000), 500, createVector(0, 255, 0)));
}

function moveRays(){
    rays = getRays(res, res);
    rays.forEach(r => {
        r.march();
        push();
        fill(r.c.x, r.c.y, r.c.z);
        translate(r.screen.x, r.screen.y, r.screen.z);
        plane(width / res, height / res);
        pop();
        /*
        push();
        stroke(255);
        strokeWeight(0.1);
        drawLine(r.pos.x, r.pos.y, r.pos.z, cameraPos.x, cameraPos.y, cameraPos.z);
        pop();
        */
    });
}

function drawScene(){
    scene.forEach(obj => {
        push();
        translate(obj.pos.x, obj.pos.y, obj.pos.z);
        fill(obj.c.x, obj.c.y, obj.c.z);
        sphere(obj.r);
        pop();
    });
}

function draw(){
    if(keyIsDown(87)) cam.move(0, 0, -speed);
    else if(keyIsDown(83)) cam.move(0, 0, speed);
    if(keyIsDown(68)) cam.move(speed, 0, 0);
    else if(keyIsDown(65)) cam.move(-speed, 0, 0);
    if(keyIsDown(16)) cam.move(0, speed, 0);
    else if(keyIsDown(32)) cam.move(0, -speed, 0);
    cameraPos = createVector(cam.eyeX, cam.eyeY, cam.eyeZ);
    cam.lookAt(0,0,0);
    background(20); 
    drawScene();
    moveRays();
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
                atan((y - cam.eyeY) / (z - cam.eyeZ)))
            );
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
        while(steps < max_steps){
            steps++;
            d = -minDist(this);
            if(d < 10 && d > -10) {
                this.getColor();
                break;
            }
            this.pos.x += sin(this.angle_x) * d;
            this.pos.y += sin(this.angle_y) * d;
            this.pos.z += ((cos(this.angle_x) + cos(this.angle_y)) / 2) * d;
        }
    }

    getColor(){
        let closest = Infinity;
        scene.forEach(obj => {
            let d = sphereDist(obj, this);
            if(d < closest) {
                closest = d;
                this.c = obj.c;
            }
        });
    }
}

function minDist(ray){
    let sceneDist = scene.map(obj => sphereDist(obj, ray));
    return min(sceneDist);
}

function sphereDist(sphere, ray){
    return dist(sphere.pos.x, sphere.pos.y, sphere.pos.z, ray.pos.x, ray.pos.y, ray.pos.z) - sphere.r;
}

class Sphere{
    constructor(position, radius, color){
        this.pos = position;
        this.r = radius;
        this.c = color;
    }
}

function drawLine(x1, y1, z1, x2, y2, z2){
    beginShape(LINES);
    vertex(x1,y1,z1);
    vertex(x2,y2,z2);  
    endShape();
}