let points = []

function setup(){
    createCanvas(innerHeight, innerHeight)
    background(0)
    fill(255)
    stroke(255)

}

function draw(){
    background(0)
    translate(width / 2, height / 2)
    for(let i = 0; i < 10; i++){
        line(0, 0, 0, height / 2)
        line(- width / 2, 0, width / 2, 0)
        translate(width / 4, height / 4)
        rotate(PI / 2)
        scale(width / (height + width), height / (height + width))
    }
}