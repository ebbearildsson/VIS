let maxSpheres = 10
let layers = 20
let mouseP = 0
let edge = []
let step = 5
let rays = 1
let FOV = 90
let res = 1
let s = []
let c

function setup(){
    createCanvas(innerWidth, innerHeight)
    c = createVector(50, 50)
    angleMode(DEGREES)
    strokeWeight(0.6)
    colorMode(HSB)
    background(0)
    newSpheres()
    noFill()
}

newSpheres = () => { for(let i = 0; i < maxSpheres; i++) s.push(createVector(random(0, width / 2), random(0, height), random(20, 200))) }

function draw(){   
    if(keyIsPressed || mouseX != mouseP.x || mouseY != mouseP.y) {
        if(keyIsDown(68)) c.x += step
        if(keyIsDown(65)) c.x -= step
        if(keyIsDown(83)) c.y += step
        if(keyIsDown(87)) c.y -= step      
        let dx = mouseX - c.x
        let dy = mouseY - c.y 
        let a = atan2(dy, dx)
        background(0)
        edge = []
        fill(5)
        noStroke()
        ellipse(c.x, c.y, 10)
        s.forEach(sphere => ellipse(sphere.x, sphere.y, sphere.z))
        for(let i = a - FOV / 2; i < a + FOV / 2; i+= 1 / res) march(s, layers, c.x, c.y, i)
        stroke(255)
        edge.forEach(edge => ellipse(edge.x, edge.y, 2))
        draw25D()
    }
    mouseP = createVector(mouseX, mouseY)
    console.log(frameRate())
}

function march(spheres, depth, x, y, angle){
    let short = Infinity
    spheres.forEach(s => {
      let i = sqrt(sq(s.x - x) + sq(s.y - y)) - s.z / 2
      if(i < short) short = i  
    })
    if(short > 0.1){
        noFill()
        stroke(255)
        strokeWeight(0.1)
        let nx = x + short * cos(angle)
        let ny = y + short * sin(angle)
            //ellipse(x, y, short * 2)
            line(x, y, nx, ny)
            if(depth > 0) march(spheres, depth - 1, nx, ny, angle)
            else edge.push(createVector(x, y, dist(x, y, c.x, c.y)))   
    } else if(short > 0){
        edge.push(createVector(x, y, dist(x, y, c.x, c.y)))
    }
}

function draw25D(){
    push()
    fill(0)
    rect(width / 2, 0, width, height)
    rectMode(CENTER)
    noStroke()
    translate(width / 2, height / 2)
    for(let i = 0; i < edge.length; i++){
        let h = map(edge[i].z, 0, width / 2, height, 0)
        let col = map(sq(edge[i].z), 0, sq(width / 2), 255, 0)
        fill(col)
        rect(i * (width / 2) / (FOV * res), 0, (width / 2) / FOV + 1, h)
    }
    pop()
}