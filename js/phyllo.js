let count = 0
let angle = 90
let c = 5
let sliderA, sliderC, checkP
let paused = true
let points = []

function setup(){
    createCanvas(innerWidth, innerHeight)
    sliderA = createSlider(0, 360, 137.5, 0.5)
    sliderA.position(10, 10)
    sliderC = createSlider(0, 100, 4, 0.5)
    sliderC.position(10, 30)
    checkP = createCheckbox('Pause', paused)
    checkP.position(10, 50)
    checkP.changed(change)
    angleMode(DEGREES)
    background(253, 89, 118)
    noStroke()
    fill(255)
}

change = () => paused = !paused

function draw(){
    if(!paused){
        background(253, 89, 118)
        translate(width/2, height/2)
        rotate(count * 0.1)
        if(angle !== sliderA.value() || c !== sliderC.value()){
            angle = sliderA.value()
            c = sliderC.value()
            points = []
            count = 0
        }
        let a = angle * count
        let r = c * sqrt(count)
        let x = r * cos(a)
        let y = r * sin(a)
        points.push(createVector(x, y))
        points.forEach(p => ellipse(p.x, p.y, 4))
        count++
    }
}