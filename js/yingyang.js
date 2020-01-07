let count = 0
let sliderS, ballSize
let speed = 0.01
let amount = 2

function setup(){
    createCanvas(innerWidth, innerHeight)
    sliderS = createSlider(0, 1, speed, 0.001)
    sliderS.position(10, 10)
    background(50, 250, 150)
    if(width > height) ballSize = height / 3
    else ballSize = width / 3
    noStroke()
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
    background(50, 250, 150)
    if(width > height) ballSize = height / 3
    else ballSize = width / 3
}

function draw(){
    if(speed !== sliderS.value()) {
        speed = sliderS.value()
        background(50, 250, 150)
    }
    translate(width/2, height/2)
    rotate(count)
    for(let i = 0; i < amount; i++){
        if(i % 2 == 0) fill(0)
        else fill(255)
        rotate((TWO_PI / amount) * i)
        ellipse(0, ballSize/2, ballSize)
    }
    count += speed
}