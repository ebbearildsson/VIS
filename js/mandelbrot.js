let h = w = 0
let s = 1
let iter = 100

function setup(){
    createCanvas(innerWidth, innerHeight)
}

function mouseClicked(){
    background(255)
    s *= 0.5
    h = w = 0
}

function draw(){
    for(let i = 0; i <= width; i++){
        if(w <= width) w++
        else if(h <= height){
            w = 0
            h++
        } else h = 0
    
        c = calcC(w, h)
        stroke(c)
        point(w, h)
    }
}

function calcC(x0, y0){
    let a = map(x0, 0, width, -s * 2.5, s)
    let b = map(y0, 0, height, -s, s)
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