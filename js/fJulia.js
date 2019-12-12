let R = 2
let cx = 0.285
let cy = 0.01
let sliderI
let sliderC
let iterations = 20

function setup() {
    createCanvas(innerWidth, innerHeight)
    background(220)
    sliderI = createSlider(1, 100, 20, 20)
    sliderI.position(10, 10)
    sliderC = createSlider(0, 5, 0, 1)
    sliderC.position(10, 30)
}

function getValue(x, y) {
    zx = map(x, 0, width, -R, R)
    zy = map(y, 0, height, -R, R)
    let i = 0
    while (sq(zx) + sq(zy) < sq(R) && i < iterations) {
        xtemp = sq(zx) - sq(zy)
        zy = 2 * zx * zy + cy
        zx = xtemp + cx
        i++
    }
    return map(i, 0, iterations, 0, 255)
}

function getMap() {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let color = getValue(x, y)
            if (color < 10) stroke(100, 0, 100)
            else stroke(100 + color, color, 100)
            point(x, y)
        }
    }
}

function draw() {
    if (sliderI.value() !== iterations) {
        iterations = sliderI.value()
        getMap()
    }
}