let circles = []
let speed = 0.1
let amount = 200

function setup(){
    createCanvas(innerWidth, innerHeight)
    background(0)
    strokeWeight(0.01)
    for(let i = 0; i < amount; i++){
        circles.push(new Circle(random(0, width), random(0, height), random(-speed, speed), random(-speed, speed)))
    }
}

function draw(){
    circles.forEach(c => {
        c.close(circles)
        c.move()
        c.draw()
    })
}

class Circle{
    constructor(x, y, xs, ys){
        this.x = x
        this.y = y
        this.xs = xs
        this.ys = ys
        this.s = 150
        this.c = []
    }

    move(){
        if(this.x > width || this.x < 0) this.xs *= -1
        if(this.y > height || this.y < 0) this.ys *= -1
        this.x += this.xs
        this.y += this.ys
    }

    close(circs){
        this.c = []
        circs.forEach(circ => {
            if(sq(circ.x-this.x) + sq(circ.y-this.y) < sq(this.s)) this.c.push(createVector(circ.x, circ.y))
        })
    }

    draw(){
        push()
        noFill()
        stroke(255, 255, 255)
        //ellipse(this.x, this.y, this.s)
        if(this.c.length > 1) this.c.forEach(c => { 
            let len = map(sqrt(sq(c.x-this.x) + sq(c.y-this.y)), 0, 150, 255, 0)
            stroke(len, 100 + map(len, 0, 255, 0, 50), 255 -len)
            line(this.x, this.y, c.x, c.y)
        })
        pop()
    }
}