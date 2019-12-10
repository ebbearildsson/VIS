let levels = 3
let sliderL

function setup(){
    createCanvas(innerWidth, innerHeight)
    sliderL = createSlider(0, 10, 1, 1)
    sliderL.position(10, 30)
    background(37)
    noStroke()
}

function getTriangle(depth, len){
    if(depth < levels){
        len = len / 2
        colorMode(HSB)
        fill(map(depth, 0, levels, 0, 255), 100, 100)
        
        push()
        translate(len*cos(TWO_PI/6), -len*sin(TWO_PI/6))
        createTriangle(len)
        getTriangle(depth+1, len)
        pop()

        push()
        translate(-len*cos(TWO_PI/6), len*sin(TWO_PI/6))
        createTriangle(len)
        getTriangle(depth+1, len)
        pop() 

        push()
        translate(len*cos(TWO_PI/6) + len, len*sin(TWO_PI/6))
        createTriangle(len)
        getTriangle(depth+1, len)
        pop()
    }
}

function createTriangle(r){
    triangle(0, 0, r * cos(TWO_PI/6), r * sin(TWO_PI/6), r, 0)
}

function draw(){
    if(sliderL.value() !== levels) {
        background(37)
        levels = sliderL.value()
        push()
        translate(width*0.35, height*0.5)
        createTriangle(height/2)
        getTriangle(0, height/2)
        pop()
    }
}