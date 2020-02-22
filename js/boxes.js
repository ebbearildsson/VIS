let a = 0
let amount = 20
let size =  30
let spacing = 5
let maxD

function setup(){
    createCanvas(innerWidth, innerHeight, WEBGL)
    maxD = dist(size * (amount / 2), size * (amount / 2), size * amount, size * amount)
    background(0)
}

function draw(){
    background(0)
    ortho()
    rotateX(-atan(1/sqrt(2)))
    rotateY(-PI / 4)
    translate(-amount * size / 2, 0, -amount * size / 2)
    for(let z = 0; z < amount; z++){
        for(let x = 0; x < amount; x++){
            push()
            translate(size * x, 0, size * z)
            box(size - spacing, map(sin(a + map(dist(x * size, z * size, size * (amount / 2), size * (amount / 2)), 0, maxD, -PI, PI)), -1, 1, size * 4, size * amount), size - spacing)
            pop()
        }
    }
    a -= 0.03
}