let sun, checkO, checkP
let orbits = true
let paused = false

function setup(){
    createCanvas(innerWidth, innerHeight)
    checkO = createCheckbox(' Orbits', orbits)
    checkP = createCheckbox(' Paused', paused)
    checkO.position(10, 10)
    checkP.position(10, 30)
    checkO.changed(changeO = () => orbits = !orbits)
    checkP.changed(changeP = () => paused = !paused)
    getSystem()
}

function getSystem(){
    let max
    if(height < width) max = height / 2
    else max = width / 2 
    // Moons
    let moon     = new Mass('The Moon',  max * 0.005, max * 0.032, createVector(240, 240, 240), [])
    let ganymede = new Mass('Ganymedes', max * 0.005, max * 0.075, createVector(240, 240, 240), [])
    let callisto = new Mass('Callisto',  max * 0.005, max * 0.063, createVector(240, 240, 240), [])
    let io       = new Mass('IO',        max * 0.002, max * 0.056, createVector(240, 240, 240), [])
    let europa   = new Mass('Europa',    max * 0.002, max * 0.043, createVector(240, 240, 240), [])
    let titan    = new Mass('Titan',     max * 0.005, max * 0.026, createVector(240, 240, 240), [])
    let triton   = new Mass('Triton',    max * 0.005, max * 0.022, createVector(240, 240, 240), [])
    // Planets
    let mercury  = new Mass('Mercury',   max * 0.005, max * 0.10,  createVector(250, 50, 50),   [])
    let venus    = new Mass('Venus',     max * 0.010, max * 0.15,  createVector(100, 50, 50),   [])
    let earth    = new Mass('Earth',     max * 0.020, max * 0.25,  createVector(50, 150, 50),   [moon])
    let mars     = new Mass('Mars',      max * 0.015, max * 0.35,  createVector(250, 150, 50),  [])
    let jupiter  = new Mass('Jupiter',   max * 0.035, max * 0.60,  createVector(200, 200, 120), [ganymede, callisto, io, europa])
    let saturn   = new Mass('Saturn',    max * 0.025, max * 0.73,  createVector(255, 200, 120), [titan])
    let uranus   = new Mass('Uranus',    max * 0.025, max * 0.87,  createVector(150, 200, 200), [])
    let neptune  = new Mass('Neptune',   max * 0.025, max * 0.95,  createVector(100, 100, 200), [triton])
    // The sun
    sun          = new Mass('The Sun',   max * 0.050,          0,  createVector(255, 255, 0),   [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune])
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
    getSystem()
}

function draw(){
    if(!paused){
        background(10, 10, 30)
        sun.draw(width / 2, height / 2)
    }
}

class Mass{
    constructor(name, size, radius, color, moons){
        this.r = radius
        this.c = color
        this.m = moons
        this.n = name
        this.s = size
        this.a = 0
        this.x = 0
        this.y = 0
        this.w = 0
    }

    draw(x, y){
        this.move(x, y)

        if(this.OnIt()){
            textAlign(CENTER)
            textSize(20)
            fill(255)
            text(this.n, mouseX, mouseY)
        }

        if(orbits){
            noFill()
            stroke(255)
            strokeWeight(0.2)
            ellipse(x, y, this.r * 2) 
        }

        noStroke()
        fill(this.c.x, this.c.y, this.c.z)
        ellipse(this.x, this.y, this.s)
        this.m.forEach(moon => moon.draw(this.x, this.y))
    }

    getW(){
        if(this.r > 0){
            let T = sqrt(this.r * this.r * this.r)
            this.w = TWO_PI / T
        } else this.w = 0
    }

    OnIt(){
        if(dist(this.x, this.y, mouseX, mouseY) < this.s) return true
        else return false
    }

    move(x, y){
        if(this.w == 0) this.getW()
        this.a += this.w
        this.x = this.r * cos(this.a) + x
        this.y = this.r * sin(this.a) + y
    }
}