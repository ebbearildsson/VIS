let circles = []
let speed = 1
let amount = 200
let size = 150
let sliderA
let sliderS

function setup(){
    createCanvas(innerWidth, innerHeight)
    background(0)
    strokeWeight(0.01)
    sliderS = createSlider(10, 1000, 150, 10)
    sliderA = createSlider(10, 1000, 200, 10)
    sliderS.position(10, 10)
    sliderA.position(10, 30)
    getCircles()
}

function getCircles(){
    circles = []
    for(let i = 0; i < amount; i++){
        circles.push(new Circle(random(0, width), random(0, height), random(-speed, speed), random(-speed, speed), size))
    }
}

function draw(){
    if(sliderS.value() !== size || sliderA.value() !== amount){
        size = sliderS.value()
        amount = sliderA.value()
        background(0)
        getCircles()
    }

    circles.forEach(c => {
        c.close(circles)
        c.move()
        c.draw()
    })
}
class Circle{
    constructor(x, y, xs, ys, s){
        this.x = x
        this.y = y
        this.xs = xs
        this.ys = ys
        this.s = s
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
        /*
        if(this.c.length > 1) this.c.forEach(c => { 
            let len = map(sqrt(sq(c.x-this.x) + sq(c.y-this.y)), 0, 150, 255, 0)
            stroke(len)
            line(this.x, this.y, c.x, c.y)
        })
        */
        if(this.c.length > 1) this.c.forEach(c => { 
            let len = map(sqrt(sq(c.x-this.x) + sq(c.y-this.y)), 0, 150, 255, 0)
            stroke(len, 100 + map(len, 0, 255, 0, 50), 255 -len)
            line(this.x, this.y, c.x, c.y)
        })
        pop()
    }
}