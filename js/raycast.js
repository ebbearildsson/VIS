let walls = []
let clickedOnce = false
let tempWall, person, sliderA, sliderS, sliderR, sliderL
let amount = 20
let angle = 0
let sight = 400
let start = 0

function setup(){
    createCanvas(innerWidth, innerHeight)
    sliderA = createSlider(0, TWO_PI, TWO_PI, 0.01)
    sliderA.position(10, 10)
    sliderS = createSlider(0, TWO_PI, 0, 0.01)
    sliderS.position(10, 30)
    sliderL = createSlider(0, 1000, 400, 10)
    sliderL.position(10, 50)
    sliderR = createSlider(0, 500, 20, 1)
    sliderR.position(10, 70)
    walls.push(new Wall(0, 0, 0, 0))
    person = new Person(width/2, height/2)
}

function mouseClicked(){
    if(keyIsDown(SHIFT)){
        person.x = mouseX
        person.y = mouseY
        person.addRays()
    }
    else if(!(mouseX < 250 && mouseY < 100)){
        if(!clickedOnce){
            tempWall = new Wall(mouseX, mouseY, mouseX, mouseY)
            clickedOnce = !clickedOnce
        } else {
            walls.push(tempWall)
            tempWall = new Wall(0,0,0,0)
            clickedOnce = !clickedOnce
            person.addRays()
        }
    }
}

function draw(){
    background(0)
    if(keyIsDown(87)){
        person.y -= 10
        person.addRays()
    } 
    if(keyIsDown(83)){
        person.y += 10
        person.addRays()
    }
    if(keyIsDown(65)){
        person.x -= 10
        person.addRays()
    } 
    if(keyIsDown(68)){
        person.x += 10
        person.addRays()
    }
    if(sliderS.value() !== start || sliderA.value() !== angle || sliderL.value() !== sight || sliderR.value() !== amount){
        angle = sliderA.value()
        start = sliderS.value()
        amount = sliderR.value()
        sight = sliderL.value() 
        person.addRays(amount, angle)
    }
    if(clickedOnce){
        tempWall.b = createVector(mouseX, mouseY)
        tempWall.draw()
    }
    walls.forEach(wall => wall.draw())
    person.draw()
}

class Wall{
    constructor(x1, y1, x2, y2){
        this.a = createVector(x1, y1)
        this.b = createVector(x2, y2)
    }

    draw(){
        push()
        stroke(255)
        line(this.a.x, this.a.y, this.b.x, this.b.y)
        pop()
    }
}

class Person{
    constructor(x, y){
        this.x = x
        this.y = y
        this.rays = []
    }

    addRays(){
        this.rays = []
        let a = angle / amount
        for(let i = 0; i < amount; i++){
            this.rays.push(new Ray(this.x, this.y, a * i + start))
        }
        this.rays.forEach(ray => ray.move())
    }

    draw(){
        push()
        fill(100)
        ellipse(this.x, this.y, 10)
        beginShape()
        this.rays.forEach(ray => vertex(ray.b.x, ray.b.y))
        endShape()
        this.rays.forEach(ray => ray.draw())
        pop()
    }
}

class Ray{
    constructor(x, y, a){
        this.a = createVector(x, y)
        this.b = createVector(x, y)
        this.angle = a
        this.hit = false
    }

    move(){
        this.b = createVector(this.a.x, this.a.y)
        this.hit = false

        while(!this.hit){
            this.b.x += cos(this.angle) 
            this.b.y += sin(this.angle) 
            walls.forEach(w => {  
                let close = dist(w.b.x, w.b.y, w.a.x, w.a.y) - (dist(this.b.x, this.b.y, w.a.x, w.a.y) + dist(this.b.x, this.b.y, w.b.x, w.b.y))
                if((close < 0.15 && close > -0.15 || dist(this.b.x, this.b.y, this.a.x, this.a.y) >= sight)){
                    this.hit = true
                }   
            })
        }
    }

    draw(){
        push()
        stroke(255)
        line(this.a.x, this.a.y, this.b.x, this.b.y)
        pop()
    }
}