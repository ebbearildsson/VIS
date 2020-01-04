let count = 0
let angle = 90
let c = 5
let sliderA, sliderC, checkP
let paused = true

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
    background(0)
}

change = () => paused = !paused

function draw(){
    if(!paused){
        fill(255)
        translate(width/2, height/2)
        rotate(count * 0.1)
        if(angle !== sliderA.value() || c !== sliderC.value()){
            angle = sliderA.value()
            c = sliderC.value()
            count = 0
            background(0)
        }
        for(let i = 0; i < count; i++){
            let a = angle * i
            let r = c * sqrt(i)
            let x = r * cos(a)
            let y = r * sin(a)
            ellipse(x, y, 4)
        }
        count += 5
    }
}