let s = []
let c
let a = 0
let maxSpheres = 30
let layers = 20
let step = 5

function setup(){
    createCanvas(innerWidth, innerHeight)
    c = createVector(50, 50)
    strokeWeight(0.2)
    colorMode(HSB)
    background(0)
    newSpheres()
}

newSpheres = () => { for(let i = 0; i < maxSpheres; i++) s.push(createVector(random(0, width), random(0, height), random(20, 200))) }

function draw(){
    background(0)
    stroke(255)
    a += 0.001
    noFill()

    if(keyIsDown(68)) c.x += step
    if(keyIsDown(65)) c.x -= step
    if(keyIsDown(83)) c.y += step
    if(keyIsDown(87)) c.y -= step

    s.forEach(sphere => ellipse(sphere.x, sphere.y, sphere.z))
    let rays = 1
    for(let i = 0; i < rays; i++){
        march(s, layers, c.x, c.y, a + TWO_PI / rays * i)   
    }
    ellipse(c.x, c.y, 20)
}

function march(spheres, depth, x, y, angle){
    ellipse(x, y, 5)
    let short = 500
    spheres.forEach(s => {
      let i = sqrt(sq(s.x - x) + sq(s.y - y)) - s.z / 2
      if(i < short) short = i  
    })
    if(short > 0.01){
        stroke(map(short, 0, 500, 0, 255), 255, 255)
        ellipse(x, y, short * 2)
        if(depth > 0) march(spheres, depth - 1, x + short * cos(angle), y + short * sin(angle), angle)
    }
}