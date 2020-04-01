let size = 5
let sick = 0
let healthy = 0
let people = []
let amount = 750
let infectionRadius = 40
let infectionChance = 1
let percentageInfected = 0.01
let sliderA, sliderIr, sliderIc, sliderPi

function setup(){
    createCanvas(innerWidth, innerHeight)
    people = getPopulation(amount, size, percentageInfected, infectionRadius)
    sliderA = createSlider(1, 10000, 100, 1)
    sliderIr = createSlider(0, 100, 25, 1)
    sliderPi = createSlider(0, 100, 1, 0.01)
    sliderIc = createSlider(0, 100, 1, 0.01)
    sliderA.position(10, 60)
    sliderIr.position(10, 80)
    sliderPi.position(10, 100)
    sliderIc.position(10, 120)
}

function getPopulation(amount, size, percentageInfected, infectionRadius){
    let pop = []
    for(let i = 0; i < amount; i++) {
        if(i / amount < percentageInfected / 100) pop.push(new Person(size, true, infectionRadius))
        else pop.push(new Person(size, false, infectionRadius))
        }
    return pop
}

function draw(){
    if(sliderA.value() !== amount || sliderIr.value() !== infectionRadius || sliderIc.value() !== infectionChance || sliderPi.value() !== percentageInfected){
        amount = sliderA.value()
        infectionChance = sliderIc.value()
        infectionRadius = sliderIr.value()
        percentageInfected = sliderPi.value()

        people = getPopulation(amount, size, percentageInfected, infectionRadius)
    }

    background(0)
    people.forEach(p => {
        p.move()
        p.draw()
        if(p.i == true){
            for(let i = 0; i < people.length; i++){
                if(random(0, 100) < infectionChance){
                    if(dist(p.x, p.y, people[i].x, people[i].y) < p.ir) people[i].i = true
                }
            }
        }
        if(p.i == false) healthy++
        else sick++
    })
    push()
    noStroke()
    fill(255)
    text("Healthy: " + healthy, 10, 20)
    text("Sick: " + sick, 10, 40)
    text("Population size: " + amount, 180, 75)
    text("Infection radius: " + infectionRadius, 180, 95)
    text("Infected: " + percentageInfected + "%", 180, 115)
    text("Infection chance: " + infectionChance + "%", 180, 135)
    pop()
    healthy = 0
    sick = 0
}

class Person{
    constructor(size, infected, infectionRadius){
        this.s = size
        this.i = infected
        this.ir = infectionRadius
        this.y = random(this.s * 2, height - this.s * 2)
        this.x = random(this.s * 2, width - this.s * 2)
        this.v = random(-0.1, 0.1)
        this.vx = random(-5, 5)
        this.vy = random(-5, 5)
    }

    draw(){
        noStroke()
        if(this.i == true) fill(255, 0, 0)
        else fill(50, 100, 200)
        ellipse(this.x, this.y, this.s)

        noFill()
        if(this.i == true) {
            stroke(255, 0, 0)
            ellipse(this.x, this.y, this.ir)
        }
    }

    move(){
        if(this.x >= width - this.s * 2 || this.x <= this.s * 2) this.vx *= -1
        if(this.y >= height - this.s * 2 || this.y <= this.s * 2) this.vy *= -1
        this.x += constrain(this.vx, -5, 5)
        this.y += constrain(this.vy, -5, 5)

        this.vx += random(-this.v, this.v)
        this.vy += random(-this.v, this.v)
    }
}