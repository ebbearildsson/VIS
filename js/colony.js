let ants = []
let pheromones = []
let count = 0
const amount = 20
const variation = 0.3
const gridSize = 10

function setup(){
    createCanvas(innerWidth, innerHeight)
    background(0)
    noStroke()

    for(let i = 0; i < amount; i ++) ants.push(new Ant(width / 2, height / 2))
}

function draw(){
    background(0)
    ants.forEach(ant => {
        ant.move()
        if(count % 50 == 0)ant.secrete()
        ant.draw()
    })
    pheromones.forEach(pheromone => {
        pheromone.weaken()
        pheromone.draw()
    })
    pheromones = pheromones.filter(pheromone => pheromone.strength > 0)
    count ++
}

class Ant{
    constructor(x, y){
        this.x = x
        this.y = y
        this.dir = random(0, TWO_PI)
        this.size = 5
        this.found = false
    }

    move(){
        //TODO: sample in front
        //TODO: pick direction

        this.dir += random(-variation, variation)

        this.x += Math.cos(this.dir)
        this.y += Math.sin(this.dir)

        //TODO: avoid walls
    }

    draw(){
        fill(255, 0, 0)
        ellipse(this.x, this.y, this.size)
    }

    hash(){
        return (width * Math.floor(this.y)) / gridSize + (Math.floor(this.x) / gridSize)
    }

    secrete(){
        pheromones.push(new Pheromone(this.x, this.y, this.found))
    }
}

class Pheromone{
    constructor(x, y, type){
        this.x = x
        this.y = y
        this.size = 3
        this.found = type
        this.strength = 255
    }

    weaken(){
        this.strength -= 1
    }

    draw(){
        let c = this.found ? color(0, 0, this.strength) : color(0, this.strength, 0)
        fill(c)
        ellipse(this.x, this.y, this.size)
    }
}

//TODO: hashgrid class
