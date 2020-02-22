let precision = 0.001
let iterations = 1000
let r = 0
let x = 0.001

function setup(){
    createCanvas(innerWidth, innerHeight)
    background(0)
    noStroke()
}

function calcX(){
    let xTemp = x
    let temp = []
    for(let i = 0; i < iterations; i++) {
        xTemp = r * xTemp * (1 - xTemp)
        if(i > iterations * 3 / 4) temp.push(xTemp)
    }
    return temp
}

function calcR(){
    r += precision
    let xTemp = calcX()
    let temp = []
    xTemp.forEach(xt => temp.push(createVector(r * 300, map(xt, 0, 1, height - 50, 50))))

    push()
    fill(0)
    rect(0, 0, width * 0.2, 30 * 8)
    fill(255)
    text("r: " + r.toFixed(4), 10, 15)
    for(let i = 0; i < 8; i++) text("x" + (i + 1) + ": " + xTemp[i].toFixed(3), 10, 15 * (i + 2))
    pop()

    return temp
}

draw = () => { drawPoints(calcR()) }
drawPoints = (arr) => { 
    if(arr.length > 0) {
        arr.forEach(p => {
            fill(map(p.x, 0,width, 0, 255), 0, map(p.y, 0, height, 200, 0))
            ellipse(p.x, p.y, 1)
        }) 
    }
}
windowResized = () => { resizeCanvas(windowWidth, windowHeight) }