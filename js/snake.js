var apple;
var snake = [];
const blockSize = 10;

function setup(){
	createCanvas(innerWidth, innerHeight);
	apple = new Apple(100, 100);
	snake.push(new Snake(200, 200));
	background(0);
	noStroke();
}

function draw(){
	apple.draw();
	snake.forEach(snake => snake.draw())
}

class Block {
	constructor(x, y, c){
		this.x = x;
		this.y = y;
		this.c = c;
	}

	draw(){
		push();
		fill(this.c);
		rect(this.x, this.y, blockSize, blockSize);
		pop();
	}
}

class Apple extends Block{
	constructor(x, y){
		this.c = color(255, 0, 0);
		super(x, y, this.c);
	}
}

class Snake extends Block{
	constructor(x, y){
		this.c = color(0, 255, 0);
		super(x, y, this.c);
	}
}