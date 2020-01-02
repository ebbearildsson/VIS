let pipes = []
let count = 0.1
let checkP
let pause = true

function setup(){
    createCanvas(innerWidth, innerHeight, WEBGL)
    background(0)
    checkP = createCheckbox('Pause', pause)
    checkP.position(10, 10)
    checkP.changed(checkPchange)
    strokeWeight(10)
    noFill()
    stroke(255)
}

checkPchange = () => pause = !pause

function getPipe(){
    pipes.push(new Pipe(createVector(random(100, 255), random(100, 255), random(100, 255))))
    pipes[pipes.length-1].pos.push(createVector(0, 0, 2*count - 50))
}

function draw(){
    if(!pause){
        background(0)
        if(mouseIsPressed && mouseX > 50 && mouseY > 50){
            getPipe()
        }
        camera(0,0, 2*count,0,0,0,0,1,0)
        pipes.forEach(p => {
            p.move(count/10)
            p.draw()
        })
        count++
    }
}

class Pipe{
    constructor(color){
        this.pos = []
        this.s = 100
        this.color = color
    }

    move(c){
        let i = this.pos.length - 1
        this.pos.push(createVector(this.pos[i].x + random(-this.s, this.s) * c, this.pos[i].y + random(-this.s, this.s) * c, this.pos[i].z+ random(-this.s, this.s) * c))
    }

    draw(){
        beginShape()
        stroke(this.color.x, this.color.y, this.color.z)
        this.pos.forEach(p => vertex(p.x, p.y, p.z))
        endShape()
    }
}