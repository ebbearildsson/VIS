let count = 0;
const size = 100;

function setup(){
	createCanvas(innerWidth, innerHeight);
	background(0, 255, 0);
}

function draw(){
	count += 0.1;
	ellipse(size * cos(count), size * sin(count), size / 10, size / 10);
}