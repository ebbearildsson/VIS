let drawing = false
let dt = 0
let time = 0
let paintingX = []
let paintingY = []
let painting = []
let path = []

function setup(){
    createCanvas(innerWidth, innerHeight)
    background(0)
    stroke(255)
    noFill()
}

function draw(){
    background(255, 175, 100)
    if(mouseIsPressed){
        if(!drawing){
            paintingX = []
            paintingY = []
            path = []
            painting = []
            drawing = true
        }
        path.push(createVector(mouseX, mouseY))
        paintingX.push(mouseX)
        paintingY.push(mouseY)
        ellipse(mouseX, mouseY, 20)
        beginShape()
        stroke(255)
        path.forEach(p => (vertex(p.x, p.y)))
        endShape()
    } else {
        if(drawing){
            dt = TWO_PI / paintingX.length
            paintingX = paintingX.map(n => map(n, 0, width, 0, 400))
            paintingY = paintingY.map(n => map(n, 0, height, 0, 400))
            paintingX = fTransform(paintingX)
            paintingY = fTransform(paintingY)
        }

        let vx = epiCycles(width / 2, 200, 0, paintingX)
        let vy = epiCycles(200, height / 2, HALF_PI, paintingY)
        let v = createVector(vx.x, vy.y) 
        line(vx.x, vx.y, v.x, v.y)
        line(vy.x, vy.y, v.x, v.y)
        painting.unshift(v)

        beginShape()
        painting.forEach(v => vertex(v.x, v.y))
        endShape()

        if(time > TWO_PI) {
            time = 0
            painting = []
        }
        time += dt
        drawing = false
    }
}

function epiCycles(x, y, rotation, fourier) {
    for (let i = 0; i < fourier.length; i++) {
        let prevx = x;
        let prevy = y;
        x += fourier[i].amp * cos(fourier[i].freq * time + fourier[i].phase + rotation);
        y += fourier[i].amp * sin(fourier[i].freq * time + fourier[i].phase + rotation);
        ellipse(prevx, prevy, fourier[i].amp * 2);
        line(prevx, prevy, x, y);
    }
    return createVector(x, y);
}

function fTransform(x){
    const X = [];
    const N = x.length;
    for (let k = 0; k < N; k++) {
        let re = 0;
        let im = 0;
        for (let n = 0; n < N; n++) {
        const phi = (TWO_PI * k * n) / N;
        re += x[n] * cos(phi);
        im -= x[n] * sin(phi);
        }
        re = re / N;
        im = im / N;

        let freq = k;
        let amp = sqrt(re * re + im * im);
        let phase = atan2(im, re);
        X[k] = { re, im, freq, amp, phase };
    }
    return X;
}