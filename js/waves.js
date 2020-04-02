let amp = 50;
let spacing = 3 * amp
let waves = []
let count = 0

function setup(){
    createCanvas(innerWidth, innerHeight)
    angleMode(DEGREES)
    background(0)
    waves.push(createVector(1, 0))
    waves.push(createVector(0.4, 2))
    waves.push(createVector(8, 90))
    waves.push(createVector(1, 90))
    noStroke()
}

function draw(){
    background(0)
    push()
    stroke(250, 150, 50)
    line(0, spacing * 2.2, width, spacing * 2.2)
    pop()
    for(let x = 0; x < width; x += 1){
        let y = 0
        for(let i = 0; i < waves.length; i++){
            fill(250, 150, 50)
            ellipse(x, spacing * (i + 3) + sin(waves[i].x * x + waves[i].y + count) * amp, 3)
            y += sin(waves[i].x * x + waves[i].y + count)
        }
        ellipse(x, spacing + map(y * amp, -amp * (waves.length - 1), amp * (waves.length - 1), -amp * 2.5, amp * 2.5), 2)
    }
    count++
}