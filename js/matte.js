let halfW, halfH, cam;
const grid_spacing = 1;
const cam_speed = 50;
const graph_steps = 0.12;
const graph_scale = 100;
const x_scaling = 100;
const graph_length = 2000;
let integral_steps = 1;

function setup(){
    createCanvas(innerWidth, innerHeight, WEBGL);
    cam = createCamera();
    halfH = height / 2;
    halfW = width / 2;
    background(0);
}

function draw(){
    if(keyIsDown(87)) cam.move(0, 0, -cam_speed);
    else if(keyIsDown(83)) cam.move(0, 0, cam_speed);
    if(keyIsDown(68)) cam.move(cam_speed, 0, 0);
    else if(keyIsDown(65)) cam.move(-cam_speed, 0, 0);
    if(keyIsDown(16)) cam.move(0, cam_speed, 0);
    else if(keyIsDown(32)) cam.move(0, -cam_speed, 0);
    cam.lookAt(0, 0, 0);
    background(0);
    drawGrid();
    integral();
    graph();
    integral_steps+=0.1
}

function drawGrid(){
    /*
    strokeWeight(1);
    stroke(40);
    for(let i = -halfW; i < halfW; i += width / grid_spacing){
        twoDLine(-halfW, i, halfW, i);
    }
    for(let i = -halfH; i < halfH; i += height / grid_spacing){
        twoDLine(i, -halfH, i, halfH);
    }
    */
    strokeWeight(5);
    stroke(255);
    twoDLine(-width, 0, width, 0);
    twoDLine(0, -height, 0, height);
    threeDLine(0, 0, -width, 0, 0, width);
}

function twoDLine(x1, y1, x2, y2){
    beginShape();
    vertex(x1, y1, 0);
    vertex(x2, y2, 0);  
    endShape();
}

function threeDLine(x1, y1, z1, x2, y2, z2){
    beginShape();
    vertex(x1, y1, z1);
    vertex(x2, y2, z2);  
    endShape();
}

function graph(){
    strokeWeight(5);
    stroke(255, 0, 0);
    beginShape();
    for(let x = 0; x * x_scaling < graph_length; x += graph_steps){
        vertex(x * x_scaling, (1 / x) * -graph_scale, 0);
    }
    endShape();
    stroke(0, 255, 0);
    twoDLine(1 * graph_scale, -graph_length, 1 * graph_scale, graph_length);
}

function integral(){
    for(let x = graph_scale; x < graph_length; x += graph_length / integral_steps){
        push();
        translate(x + (graph_length / integral_steps) / 2, (1 / x) * -graph_scale * 50, 0);
        plane(graph_length / integral_steps, (1 / x) * -graph_scale * 100);
        pop();
    }
}

function integral3D(){
    for(let x = graph_scale; x < graph_length; x += graph_length / integral_steps){
        push();
        translate(x + (graph_length / integral_steps) / 2, 0, 0);
        rotateZ(HALF_PI);
        cylinder((1 / x) * -graph_scale * 90, graph_length / integral_steps);
        pop();
    }
}