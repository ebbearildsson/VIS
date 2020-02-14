let h = w = posX = posY = 0
let s = 1
let iter = 100
let sliderI, sliderZ

function setup(){
    createCanvas(innerWidth, innerHeight)
    colorMode(HSB)
    sliderI = createSlider(1,     1000, iter, 10   )
    sliderZ = createSlider(0.001, 2,    0.05, 0.001)
    sliderI.position(10, 20)
    sliderZ.position(10, 60)
}

function mouseClicked(){
    if(!(mouseX < 170 && mouseY < 140)){
        posX = map(mouseX, 0, width,  -s * 2.5 + posX, s + posX)
        posY = map(mouseY, 0, height, -s       + posY, s + posY)
        background(255)
        s *= sliderZ.value()
        h = w = 0
    }
}

function draw(){
    if(sliderI.value() != iter){
        iter = sliderI.value()
        h = w = 0
    }
    for(let i = 0; i <= width; i++){
        if(w <= width) w++
        else if(h <= height){
            w = 0
            h++
        } else h = 0
    
        c = calcC(w, h, posX, posY)
        if(c == 0) stroke(0)
        else stroke(c, 255, 255)//stroke(255 - c, 100 - map(c, 0, 255, 0, 100), 255 - c)
        point(w, h)
    }
    push()
    noStroke()
    fill(255)
    rect(0, 0, 170, 140)
    fill(0)
    text("Iterations: " + iter,            5, 15 )
    text("Zoom: "       + sliderZ.value(), 5, 55 )
    text("x: "          + posX,            5, 95 )
    text("y: "          + posY,            5, 115)
    pop()
}

function calcC(x0, y0, posX, posY){
    let a = map(x0, 0,  width, -s * 2.5 + posX, s + posX)
    let b = map(y0, 0, height, -s       + posY, s + posY)
    let xtemp = c = x = y = 0
    for(let i = 0; i <= iter; i++){
        xtemp = x
        x = sq(x) - sq(y) + a
        y = 2 * xtemp * y + b
        if(sq(x) + sq(y) > 4) {
            c = map(i, 0, iter, 255, 0)
            break
        } 
    }
    return c
}