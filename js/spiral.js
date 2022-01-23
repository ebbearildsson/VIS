let p, a, m, l;

function setup() {
    createCanvas(windowWidth, windowHeight)
    background(9)
    p = createVector()
    a = (1 + sqrt(5)) / 2
    m = 0 
    l = 100
    stroke(255)
    strokeWeight(2)
    frameRate(60)
}

function draw() {
    translate(width / 2, height / 2)
    scale(1)
    let n = p5.Vector.fromAngle((a + a * m))
    n.setMag(l)
    n.add(p)
    ellipse(n.x, n.y, 5)
    line(p.x, p.y, n.x, n.y)
    p = n
    m++
}

