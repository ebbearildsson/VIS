let lines = []
let count = 0

function setup(){
    createCanvas(innerWidth, innerHeight)
    background(0)
}

function draw(){
    background(0)
    if(count % 60 == 0) addLine()
    lines.forEach(l => l.draw())
    count++
}

function addLine(){
    lines.push(new Line(random(0, width), random(0, TWO_PI)))
}

class Line{
    constructor(x, a){
        this.a = a
        this.x = x
        this.r = 10000
        this.l = 60
        this.s = 0
    }

    draw(){
        stroke(255)
        line(this.x, height/2, cos(this.a)  * this.r, sin(this.a)  * this.r)
        line(this.x, height/2, cos(-this.a) * this.r, sin(-this.a) * this.r)
    }

    split(){
        if(this.s < 20) this.s += 0.8
        line(this.a.x - this.s, this.a.y - this.s, this.b.x - this.s, this.b.y - this.s)
        line(this.a.x + this.s, this.a.y + this.s, this.b.x + this.s, this.b.y + this.s)
    }
}