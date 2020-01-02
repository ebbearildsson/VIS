let r
let edge = 2
let count = 0
let sliderSpeed
let circles = []
let sliderVertex
let speed = 0.01
let delay = (2 * Math.PI) / edge

function setup() {
    createCanvas(innerWidth, innerHeight)
    r = floor((height * 0.9) / 2)
    getCircles(edge, circles)
    sliderSpeed = createSlider(0, 0.3, 0.01, 0.002)
    sliderSpeed.position(10, 10)
    sliderVertex = createSlider(2, 40, 3, 1)
    sliderVertex.position(10, 30)
}

function getCircles(amount, list) {
    let div = TWO_PI / amount
    for (let i = 0; i < amount; i++) list.push(new Circle(cos(div * i) * r, sin(div * i) * r, div * i, i * delay))
}

function draw() {
    background(0)
    stroke(255)
    noFill()
    ellipse(width / 2, height / 2, 2 * r)
    speed = sliderSpeed.value()
    if (sliderVertex.value() != edge) {
        edge = sliderVertex.value()
        delay = (2 * Math.PI) / edge
        circles = []
        getCircles(edge, circles)
    }
    if (circles.length > 1) {
        push()
        translate(width / 2, height / 2)
        beginShape()
        vertex(circles[0].x, circles[0].y)
        circles.forEach(v => vertex(v.x, v.y))
        vertex(circles[circles.length - 1].x, circles[circles.length - 1].y)
        vertex(circles[0].x, circles[0].y)
        vertex(circles[1].x, circles[1].y)
        endShape()
        pop()
        push()
        translate(width / 2, height / 2)
        strokeWeight(0.4)
        textAlign(CENTER)
        //circles.forEach(v => text('(' + v.x.toFixed(0) + ',' + v.y.toFixed(0) + ')', v.x, v.y - 10))
        pop()
    }
    circles.forEach(ball => {
        push()
        strokeWeight(0.1)
        translate(width / 2, height / 2)
        stroke(255)
        line(cos(ball.a) * r, sin(ball.a) * r, cos(ball.a) * -r, sin(ball.a) * -r)
        colorMode(HSB)
        let color = map(abs(sin(count * speed - ball.wait)), 0, 1, 0, 255)
        stroke(color, 255, 255)
        strokeWeight(1)
        let offset = 0
        //line(cos(ball.a) * offset * sin(count * speed - ball.wait), sin(ball.a) * offset * sin(count * speed - ball.wait), cos(ball.a) * r * sin(count * speed - ball.wait), sin(ball.a) * r * sin(count * speed - ball.wait))
        //line(offset, offset, cos(ball.a) * r * sin(count * speed - ball.wait), sin(ball.a) * r * sin(count * speed - ball.wait))
        pop()
    })
    circles.forEach(ball => {
        if (count > ball.wait) {
            ball.x = cos(ball.a) * r * sin(count * speed - ball.wait)
            ball.y = sin(ball.a) * r * sin(count * speed - ball.wait)
            push()
            colorMode(HSB)
            let color = map(abs(sin(count * speed - ball.wait)), 0, 1, 0, 255)
            fill(color, 255, 255)
            noStroke()
            translate(width / 2, height / 2)
            ellipse(ball.x, ball.y, 16)
            pop()
        }
    })
    count++
}

class Circle {
    constructor(x, y, a, wait) {
        this.x = x
        this.y = y
        this.a = a
        this.wait = wait
    }
}