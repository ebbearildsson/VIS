let inside = 0
let outside = 0
let r

function setup(){
    createCanvas(1000, 1000)
    background(37)
    r = height
    ellipse(width / 2, height / 2, r)
}

function draw(){
    checkDart(random(0, width), random(0, height))
    let pi = (inside / (outside + inside)) * 4
    textAlign(CENTER)
    rectMode(CENTER)
    noStroke()
    fill(255)
    rect((width / 2), (height / 2), 175, 25)
    fill(0)
    text(pi, width / 2, height / 2)
}

function checkDart(x, y){
    stroke(255, 0, 0)
    point(x, y)
    if(dist(x, y, width / 2, height / 2) < r / 2) inside++
    else outside++
}