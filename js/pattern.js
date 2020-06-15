let t = 0.002;
let colors = [];
const actions_per_frame = 1;
const speed_per_tick = 0.00001;
const points_per_tick = 1000;
const spacing = 1000;

function setup(){
    createCanvas(innerWidth, innerHeight);
    background(17);
    getColors();
    fill(17);
}

function getColors(){
    for(let i = 0; i < points_per_tick; i++){
        colors.push(color(random(100, 255), random(100, 255), random(100, 255)));
    }
}

function getPoints(){
    for(let i = 0; i < points_per_tick; i++){
        let x = t
        let y = t
        let n = 0;

        while(n <= i){
            let xtemp = x;
            x = -sq(x) + x * t + y;
            y = sq(xtemp) - sq(y) - sq(t) - xtemp * y + y * t - xtemp + y;
            n++
        }

        stroke(colors[i]);
        point(x * spacing, y * spacing);
    }
}

function draw(){
    background(17, 50)
    noStroke();
    fill(255);
    text(`T = ${t.toFixed(7)} \nSpeed = ${actions_per_frame} \nT's increase = ${speed_per_tick} \nAmount of points = ${points_per_tick} \nScaling factor = ${spacing} \nFPS = ${frameRate().toFixed(7)}`, 10, 15);
    translate(width / 2, height / 2);
    for(let i = 0; i < actions_per_frame; i++){
        getPoints();
        t += speed_per_tick;
    }
}