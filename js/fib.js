let length = 1000
let circles = []
let size = 10
let scale = 0.01

function setup() {
    createCanvas(innerWidth, innerHeight)
    getCircles(length, circles)
}

function getCircles(amount, list) {
    let a = TWO_PI / 8
    for (let i = 0; i < amount; i++) {
        if (i > 1) {
            list.push(new Circle(list[i - 1].x + list[i - 2].x, list[i - 1].y + list[i - 2].y, size, i * a))
        } else if (i === 1) {
            list.push(new Circle(1, 1, size, i * a))
        } else if (i === 0) {
            list.push(new Circle(0, 0, size, i * a))
        }
    }
}

function draw() {
    noStroke()
    background(37)
    circles.forEach(circ => circ.draw())
    push()
    stroke(255)
    translate(width / 2, height / 2)
    beginShape()
    circles.forEach(c => curveVertex(c.x * scale * cos(c.a), c.y * scale * sin(c.a)))
    endShape()
    pop()
    scale *= 0.99
}

class Circle {
    constructor(x, y, size, a) {
        this.x = x
        this.y = y
        this.size = size
        this.a = a
    }

    draw() {
        push()
        translate(width / 2, height / 2)
        ellipse(this.x * cos(this.a) * scale, this.y * sin(this.a) * scale, this.size)
        pop()
    }
}