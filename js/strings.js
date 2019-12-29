let circles = []

let speed = 0.8
let amount = 200
let size = 150

let sliderA
let sliderS
let checkW
let checkM
let checkP

let web = true
let mono = false
let paused = true

function setup(){
    createCanvas(innerWidth, innerHeight)
    background(0)

    sliderS = createSlider(10, 1000, 150, 10)
    sliderA = createSlider(10, 1000, 200, 10)
    checkW = createCheckbox('Web', true)
    checkM = createCheckbox('Monochromatic', false)
    checkP = createCheckbox('Pause', true)

    checkW.changed(checkWEvent)
    checkM.changed(checkMEvent)
    checkP.changed(checkPEvent)

    sliderS.position(10, 10)
    sliderA.position(10, 30)
    checkW.position(10, 50)
    checkM.position(10, 70)
    checkP.position(10, 90)

    getCircles()
}

function checkWEvent(){
    web = !web
    background(0)
}

function checkMEvent(){
    mono = !mono
    background(0)
}

checkPEvent = () => paused = !paused

function getCircles(){
    circles = []
    for(let i = 0; i < amount; i++){
        circles.push(new Circle(random(0, width), random(0, height), random(-speed, speed), random(-speed, speed), size))
    }
}

function draw(){
    if(!paused){
        if(!web) {
            background(0)
            strokeWeight(0.5)
        } else {
            strokeWeight(0.01)
        }
    
        if(sliderS.value() !== size || sliderA.value() !== amount){
            size = sliderS.value()
            amount = sliderA.value()
            background(0)
            getCircles()
        }
    
        circles.forEach(c => {
            c.close(circles)
            c.move()
            c.draw(mono)
        })
    }
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

    draw(color){
        push()
        noFill()
        stroke(255, 255, 255)
        //ellipse(this.x, this.y, this.s)
        if(mono){
            if(this.c.length > 1) this.c.forEach(c => { 
                let len = map(sqrt(sq(c.x-this.x) + sq(c.y-this.y)), 0, 150, 255, 0)
                stroke(len)
                line(this.x, this.y, c.x, c.y)
            })    
        } else {
            if(this.c.length > 1) this.c.forEach(c => { 
                let len = map(sqrt(sq(c.x-this.x) + sq(c.y-this.y)), 0, 150, 255, 0)
                stroke(len, 100 + map(len, 0, 255, 0, 50), 255 -len)
                line(this.x, this.y, c.x, c.y)
            })
        }
        pop()
    }
}