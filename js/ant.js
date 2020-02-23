let colored = []
let ant, move, sliderN
let dir = 0
let step = 5
let change = false

function setup(){
    createCanvas(innerWidth, innerHeight)
    ant = createVector(f(width / 2), f(height / 2))
    colored.push(createVector(f(width / 2), f(height / 2)))
    sliderN = createSlider(1, 1000, 1, 1)
    sliderN.position(10, 10)
}
f = (value) => { return Math.floor(value / step) * step }

function moveR(){
    switch(dir){
        case(0):
            move = createVector(-step, 0)
            dir = 3
        break
        case(1):
            move = createVector(0, -step)
            dir = 0
        break
        case(2):
            move = createVector(step, 0)
            dir = 1
        break
        case(3):
            move = createVector(0, step)
            dir = 2
        break
    }
}

function moveL(){
    switch(dir){
        case(0):
            move = createVector(step, 0)
            dir = 1
        break
        case(1):
            move = createVector(0, step)
            dir = 2
        break
        case(2):
            move = createVector(-step, 0)
            dir = 3
        break
        case(3):
            move = createVector(0, -step)
            dir = 0
        break
    }
}

function draw(){
    background(255)
    for(let n = 0; n < sliderN.value(); n++){
        change = true
        for(let i = colored.length - 1; i >= 0; i--){
            if(ant.x == colored[i].x && ant.y == colored[i].y) {
                moveR()
                change = false
                colored.splice(i, 1)
            } 
        }
        if(change) {
            moveL()
            colored.push(createVector(ant.x, ant.y))
            change = false
        }
        ant.add(move)
        if(ant.x > width) ant.x = 0
        else if(ant.x < 0) ant.x = f(width)
        if(ant.y > height) ant.y = 0
        else if(ant.y < 0) ant.y = f(height)
    }
    fill(0)
    colored.forEach(p => ellipse(p.x, p.y, step * 0.9))
    fill(255, 0, 0)
    ellipse(ant.x, ant.y, step * 0.9)
}