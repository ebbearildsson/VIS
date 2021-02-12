let maxSpheres = 30
let layers = 20
let edge = []
let step = 5
let rays = 1
let s = []
let a = 0
let c

function setup(){
    createCanvas(innerWidth, innerHeight)
    c = createVector(50, 50)
    strokeWeight(0.6)
    colorMode(HSB)
    background(0)
    newSpheres()
    noFill()
}

newSpheres = () => { for(let i = 0; i < maxSpheres; i++) s.push(createVector(random(0, width), random(0, height), random(20, 200))) }

function draw(){   
    if(keyIsPressed) {
        edge = []
        if(keyIsDown(68)) c.x += step
        if(keyIsDown(65)) c.x -= step
        if(keyIsDown(83)) c.y += step
        if(keyIsDown(87)) c.y -= step
    }

    background(0)
    a += 0.005
    push()
    fill(5)
    noStroke()
    s.forEach(sphere => ellipse(sphere.x, sphere.y, sphere.z))
    pop()
    edge.forEach(edge => ellipse(edge.x, edge.y, 2))
    for(let i = 0; i < rays; i++) march(s, layers, c.x, c.y, a + TWO_PI / rays * i)  
}

function march(spheres, depth, x, y, angle){
    ellipse(x, y, 5)
    let short = 500
    spheres.forEach(s => {
      let i = sqrt(sq(s.x - x) + sq(s.y - y)) - s.z / 2

      if(i < short) short = i  
    })
    if(short > 0.1){
        stroke(map(short, 0, 500, 0, 255), 255, 255)
        ellipse(x, y, short * 2)
        let nx = x + short * cos(angle)
        let ny = y + short * sin(angle)
        line(x, y, nx, ny)
        if(depth > 0) march(spheres, depth - 1, nx, ny, angle)
    } else if(short > 0){
        edge.push(createVector(x, y))
    }
}