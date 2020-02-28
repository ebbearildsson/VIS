let pipes = []
let speed = 200
let cameraZ = 0
let length = 50

function setup(){
    createCanvas(innerWidth, innerHeight, WEBGL)
    strokeWeight(10)
    background(0)
    noFill()
}

function getPipe(){
    pipes.push(new Pipe(createVector(random(100, 255), random(100, 255), random(100, 255))))
    pipes[pipes.length-1].pos.push(createVector(0, 0, cameraZ - speed * 10))
}

function draw(){
    background(0)
    if(pipes.length < 100) getPipe()

    let closest = 0
    let spliced = []
    for(let i = 0; i < pipes.length; i++) {
        if(pipes[i].pos.length > length - 1) {
            if(pipes[i].pos[length - 1].z > closest) closest = pipes[i].pos[length - 1].z
            if(cameraZ - pipes[i].pos[length - 1].z > speed * 30) spliced.push(i)
            if(pipes[i].pos.length > length) pipes[i].pos.splice(0, 1)
        }
        pipes[i].move()
        pipes[i].draw()
    }

    for(let i = 0; i < spliced.length; i++){
        pipes.splice(spliced[i], 1)
    }

    camera(0,0, cameraZ,0,0,0,0,1,0)
    cameraZ += speed / 5
}

class Pipe{
    constructor(color){
        this.pos = []
        this.color = color
    }

    move(){
        let i = this.pos.length - 1
        let rnd = floor(random(0, 3))
        if(rnd == 0)      this.pos.push(createVector(this.pos[i].x + random(-speed, speed), this.pos[i].y, this.pos[i].z))
        else if(rnd == 1) this.pos.push(createVector(this.pos[i].x, this.pos[i].y + random(-speed, speed), this.pos[i].z))
        else if(rnd == 2) this.pos.push(createVector(this.pos[i].x, this.pos[i].y, this.pos[i].z + random(0, speed)))
    }

    draw(){
        beginShape()
        stroke(this.color.x, this.color.y, this.color.z)
        this.pos.forEach(p => vertex(p.x, p.y, p.z))
        endShape()
    }
}