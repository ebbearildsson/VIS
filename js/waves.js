let amp = 50;
let spacing = 3 * amp
let waves = []
let count = 0
let inputA, inputB

function setup(){
    createCanvas(innerWidth, innerHeight)
    angleMode(DEGREES)
    waves.push(createVector(1, 90))
    inputA = createInput(1, float())
    inputB = createInput(1, int())
    inputB.position(155, 10)
    inputA.position(10, 10)
    fill(250, 150, 50)
    background(0)
    noStroke()
}

function keyPressed(){
    if(keyCode == ENTER) waves.push(createVector(inputA.value(), 90))//waves.push(createVector(inputA.value(), inputB.value()))
}

function draw(){
    background(0)
    text("Sin(" + inputA.value() + "x + " + inputB.value() + ")", 300, 23)
    text("Press ENTER to add wave", 10, 40)
    push()
    stroke(255)
    line(0, spacing * 2 + amp, width, spacing * 2 + amp)
    pop()
    for(let x = 0; x < width; x += 1){
        let y = 0
        for(let i = 0; i < waves.length; i++){
            ellipse(x, spacing * (i + 3) + sin(waves[i].x * x + waves[i].y + count) * amp, 3)
            y += sin(waves[i].x * x + waves[i].y + count)
        }
        ellipse(x, spacing + map(y * amp, -amp * (waves.length - 1), amp * (waves.length - 1), -amp * 1.5, amp * 1.5), 2)
    }
    count++
}