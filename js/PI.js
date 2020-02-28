let inside = 0
let outside = 0
let size = 1000

function setup(){
    createCanvas(innerWidth, innerHeight)
    background(37)
    ellipse(width / 2, height / 2, height)
}

function draw(){
    for(let i = 0; i < 1000; i++) checkDart(random(0, size), random(0, size))
    let pi = (inside / (outside)) * 4
    textAlign(CENTER)
    rectMode(CENTER)
    noStroke()
    fill(255)
    rect(width / 2, height / 2, 100, 25)
    fill(0)
    text(pi.toFixed(10), width / 2, height / 2)
}

function checkDart(x, y){
    stroke(255, 0, 0)
    point(map(x, 0, 1000, 0, width), map(y, 0, 1000, 0, height))
    if(dist(x, y, size, size) < size) inside++
    outside++
}