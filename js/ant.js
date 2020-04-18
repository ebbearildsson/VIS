let ant, move, sliderN
let dir = 0
let step = 5

function setup(){
    createCanvas(innerWidth, innerHeight)
    ant = createVector(f(width / 2), f(height / 2))
    sliderN = createSlider(1, 1000, 1, 1)
    sliderN.position(10, 10)

    frameRate(5)
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
    for(let n = 0; n < sliderN.value(); n++){
        let stoodOnBlack = false
        loadPixels()
        let off = (ant.y * width + ant.x) * pixelDensity() * 4
        if(pixels[off] + pixels[off + 1] + pixels[off + 2] < 100) stoodOnBlack = true
        updatePixels()

        console.log(stoodOnBlack)

        if(stoodOnBlack == true){ 
            fill(255)
            moveR()
        }
        else {
            fill(0)
            moveL()
        }
        ellipse(ant.x, ant.y, step)
        
        ant.add(move)
        if(ant.x > width) ant.x = 0
        else if(ant.x < 0) ant.x = f(width)
        if(ant.y > height) ant.y = 0
        else if(ant.y < 0) ant.y = f(height)
    }
}