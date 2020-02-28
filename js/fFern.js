let y = 0
let x = 0

function setup() {
    createCanvas(innerWidth, innerHeight)
    strokeWeight(1.5)
    stroke(255)
    background(0)
}

function draw() {
    translate(height * 3 / 5, -height / 5)
    rotate(PI / 8)
    for(let i = 0; i < 10; i++){
        let rnd = random()
        if (rnd < 0.01) {
            x = 0
            y = 0.16 * y
        } else if (rnd < 0.86) {
            x = x * 0.85 + y * 0.04
            y = x * -0.04 + y * 0.85 + 1.6
        } else if (rnd < 0.93) {
            x = x * 0.2 + y * -0.26
            y = x * 0.23 + y * 0.22 + 1.6
        } else {
            x = x * -0.15 + y * 0.28
            y = x * 0.26 + y * 0.24 + 0.44
        }
        px = map(x, -6, 6, 0, height)
        py = map(y, 0, 10, height, 0)
        stroke(px, py, 255 - py)
        point(px, py)
    }
}