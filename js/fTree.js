let angle = 180
let depth = 30
let sliderD
let sliderA

function setup() {
    createCanvas(innerWidth, innerHeight)
    background(235)
    angleMode(DEGREES)
    sliderA = createSlider(0, 360, 180, 1)
    sliderA.position(10, 20)
    sliderD = createSlider(10, 300, 30, 10)
    sliderD.position(10, 60)
    translate(width / 2, height)
    getBranches(depth)
}

function getBranches(len) {
    if (len === depth) {
        push()
        stroke(50, 100 - len, 0)
        strokeWeight(30)
        line(0, 0, 0, -len)
        pop()
        translate(0, -len)
    }
    if (len > 10) {
        stroke(50, 100 - len, 0)
        strokeWeight(map(len, 100, 0, 20, 0))

        push()
        rotate(angle)
        line(0, 0, 0, -len)
        translate(0, -len)
        getBranches(len - 10)
        pop()

        push()
        rotate(-angle)
        line(0, 0, 0, -len)
        translate(0, -len)
        getBranches(len - 10)
        pop()
    }
}

function draw() {
    push()
    translate(width / 2, height)
    if (sliderA.value() !== angle || sliderD.value() !== depth) {
        background(235)
        angle = sliderA.value()
        depth = sliderD.value()
        getBranches(depth)
    }
    pop()

    push()
    noStroke()
    fill(0)
    textAlign(CENTER)
    text(angle, 20, 15)
    text(depth / 10, 20, 55)
    pop()
}