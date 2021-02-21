let count = 0;
const size = 100;

function setup(){
	createCanvas(innerWidth, innerHeight);
	background(0, 255, 0);
}

function draw(){
	background(0, 255, 0);
	count += 0.1;
	ellipse(size * 2 + size / 2 * cos(count), size * 2 + size / 2 * sin(count), size / 10, size / 10);
}