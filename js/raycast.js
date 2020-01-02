let walls = []
let clickedOnce = false
let tempWall, person
let amount = 200

function setup(){
    createCanvas(innerWidth, innerHeight)

    walls.push(new Wall(0, 0, width, 0))
    walls.push(new Wall(0, 0, 0, height))
    walls.push(new Wall(width, 0, width, height))
    walls.push(new Wall(0, height, width, height))
    //walls.push(new Wall(0, 400, 400, 0))

    person = new Person(width/2, height/2)
    person.addRays(amount)
    person.moveRays(walls)
}

function mouseClicked(){
    if(!clickedOnce){
        tempWall = new Wall(mouseX, mouseY, mouseX, mouseY)
        clickedOnce = !clickedOnce
    } else {
        walls.push(tempWall)
        tempWall = new Wall(0,0,0,0)
        clickedOnce = !clickedOnce
        person.moveRays(walls)
    }
}

function draw(){
    background(0)

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
        this.k = (y1 - y2) / (x1 - x2)
        this.m = y1 - this.k * x1
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

    addRays(amount){
        let a = TWO_PI / amount
        for(let i = 0; i < amount; i++){
            this.rays.push(new Ray(this.x, this.y, a * i))
        }
    }

    moveRays(walls){
        this.rays.forEach(ray => ray.move(walls))
    }

    draw(){
        push()
        stroke(255)
        ellipse(this.x, this.y, 10)
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

    move(walls){
        this.b = createVector(this.a.x, this.a.y)
        this.hit = false
        while(!this.hit){
            this.b.x += cos(this.angle)
            this.b.y += sin(this.angle)
            walls.forEach(w => {           
                if(dist(this.b.x, this.b.y, w.a.x, w.a.y) + dist(this.b.x, this.b.y, w.b.x, w.b.y) <= dist(w.b.x, w.b.y, w.a.x, w.a.y) + 0.1 &&
                   dist(this.b.x, this.b.y, w.a.x, w.a.y) + dist(this.b.x, this.b.y, w.b.x, w.b.y) >= dist(w.b.x, w.b.y, w.a.x, w.a.y) - 0.1){
                    this.hit = true
                }         
               //if(this.b.x * w.k + w.m >= this.y + 10 && this.b.x * w.k + w.m <= this.y - 10) this.hit = true
            })
        }
    }

    draw(){
        push()
        stroke(100)
        line(this.a.x, this.a.y, this.b.x, this.b.y)
        pop()
    }
}