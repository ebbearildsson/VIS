let amp = 50;
let spacing = 3 * amp
let waves = []

function setup(){
    createCanvas(innerWidth, innerHeight)
    angleMode(DEGREES)
    background(0)
    waves.push(createVector(1, 0))
    waves.push(createVector(0.4, 2))
    waves.push(createVector(8, 90))
    waves.push(createVector(1, 90))
    waves.push(createVector(0.06, 2))
    waves.push(createVector(40, 90))
    noStroke()
}

function draw(){
    background(0)
    for(let x = 0; x < width; x += 0.1){
        let y = 0
        for(let i = 0; i < waves.length; i++){
            fill(250, 150, 50)
            ellipse(x, spacing * (i + 2) + sin(waves[i].x * x + waves[i].y) * amp, 3)
            y += sin(waves[i].x * x + waves[i].y)
        }
        ellipse(x, spacing + map(y * amp, -amp * (waves.length - 1), amp * (waves.length - 1), -amp, amp), 2)
    }
}