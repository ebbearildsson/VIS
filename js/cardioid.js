let circles = []
let target = 0
let r
let speed = 0.01
let amount = 0

let sliderT
let sliderA
let sliderS 
let checkG
let checkD
let checkT

let targetV = true
let dotsV = true
let circleV = true

function setup(){
    createCanvas(innerWidth, innerHeight)
    r = height/8
    sliderT = createSlider(0, TWO_PI, 0, PI/16)
    sliderA = createSlider(0, 100, 1, 1)
    sliderS = createSlider(0, 1, 0.01, 0.005)
    checkG = createCheckbox('Guide circle', true)
    checkD = createCheckbox('Guide dots', true)
    checkT = createCheckbox('Guide target', true)

    sliderT.position(10, 10)
    sliderA.position(10, 30)
    sliderS.position(10, 50)
    checkG.position(10, 70)
    checkD.position(10, 90)
    checkT.position(10, 110)

    checkG.changed(rG)
    checkD.changed(rD)
    checkT.changed(rT)
}

function getCircles(amount){
    circles = []
    let diff = TWO_PI/amount
    for(let i = 0; i < amount; i++){
        circles.push(i * diff)
    }
}

rG = () => circleV = !circleV
rD = () => dotsV = !dotsV
rT = () => targetV = !targetV

function draw(){
    background(50, 150, 200)
    if(sliderT.value() !== target) target = sliderT.value()
    if(sliderS.value() !== speed) speed = sliderS.value()
    if(sliderA.value() !== amount){
        amount = sliderA.value()
        getCircles(amount)
    }
    translate(width/2, height/2)
    for(let i = 0; i < circles.length; i++){
        circles[i] += speed
        let s = sqrt(sq(r*cos(circles[i])-r*cos(target)) + sq(r*sin(circles[i])-r*sin(target)))
        fill(0)
        if(dotsV) ellipse(r*cos(circles[i]), r*sin(circles[i]), 5)
        noFill()
        ellipse(r*cos(circles[i]), r*sin(circles[i]), s*2)
    }
    if(circleV) ellipse(0, 0, 2*r)
    if(targetV) ellipse(r*cos(target), r*sin(target), 10)
}