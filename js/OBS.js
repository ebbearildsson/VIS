let count = 0;
const size = 100;

function setup(){
	createCanvas(innerWidth, innerHeight);
	background(0, 255, 0);
}

function draw(){
	background(0, 255, 0);
	count += 0.1;
	ellipse(size + size * cos(count), size + size * sin(count), size / 10, size / 10);
}