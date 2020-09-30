let size
let months = [];
let staple_width;
let maxMonth = 10000;
let maxTransfer = maxMonth / 2

function setup(){
    createCanvas(innerWidth, innerHeight)
    background(0)
    textAlign(CENTER)
    size = height / 4
    months = getMonths()
    textSize(width / 130)
    staple_width = (width / 3) / (months.length + 5)
}

function getMonths(){
    let tempMonths = []
    tempMonths.push(new Month('January',   [135, -79, -9.95, -711.4, -1259.3, -17.95, -9.95, -9.9, -9.95, -94, -20, -29, 10, -29.85, -19.9, -9.95, -19.9, 950, -450, -19.9, -25.95, 10, 1250]))
    tempMonths.push(new Month('February',  [-36.95, -95, -19.9, -22, -22, -30, -23, 500, -23, -9.95, -19.9, -166, -205, -19.9, -10, -17.95, 83, 83, 200, -282.4, -282.4, -282.4, -1716, -74.85, -30, -20.95, -10, 1250, -65.95, -37.9]))
    tempMonths.push(new Month('March',     [400, -1120.4, -28.9, 400, -56.11, -19.9, -14.5, -0.17, -304, -23, -299, -28.9, -45.85, -23, -78, 26, -24.95, -18.95, -287.57, 300, -87.35, -265, 265, -117.19, -234.75, -355, 420, 1250]))
    tempMonths.push(new Month('April',     [-47.4, -66, -64.75, -27.45, -29, -155.17, -5.36, -59, -195, -7, -42.18, -7, -57.04, -1198.4, -21, 52, -51.9, 1250]))
    tempMonths.push(new Month('May',       [-48, -32.4, -15.95, 300, 300, -429, -429, -429, 1716, -200, -100, -57, -74.5, -30.6, -102, 1250, -230.75]))
    tempMonths.push(new Month('June',      [-100, 500, 1000, -26, -100, -519, -120, -90, 450, -863, -25, -61.2, -55.45, -30.6, -699, -187, 1250]))
    tempMonths.push(new Month('July',      [200, -185, -69, -20, -100, -53.1, -79, 82, 26, -427, -19.95, -34, 131, -26, -290.76, 140, -300, -39.95, -261.85, -104, -200, -12]))
    tempMonths.push(new Month('August',    [-49.85, -80, -37.5, -111.4, 55, -254, -14.5, -249, -50, 50, 600, -25, -21.95, -128.9, -210, -240, -100, -79.2, -98, 473, -400, 407, -473.16, -510, -500, -90, -350, -10, -10, -10, -40, -45, -220, 4115, -10, -10, -10, -10, -66, -112, -50, -20, -10, -40, -65, -45, -40, -10, -10, -10, -18.5, -10]))
    tempMonths.push(new Month('September', [-39.6, -24, 500, -80, -10, -10, 200, -30, -10, -10, -18.5, -10, -10, -10, -10, -10, -20, -63, -10, -24, -115, -24, -176.35, -45, -80, 134, -65, -10, -40, -650, -425, -46.7, -10, -10, -9, -25, -60, -90, -35, -45, -45, -45, -297, -150, -45, -40, -114, -45, -510, -61.2, -105.28, -100, 3292, -50, -10, -10, -10, -10, -45, -45, -45, -149, -40, 19.69, -33, 300]))
    //tempMonths.push(new Month('Oktober',   []))
    //tempMonths.push(new Month('November',  []))
    //tempMonths.push(new Month('December',  []))
    return tempMonths;
}

function draw(){
    translate(0, height / 2)
    stroke(255)
    line(0, size, width, size)
    line(0, -size, width, -size)
    let lastY = 0
    let lastX = width - staple_width * 2
    for(let i = 0; i < months.length; i++){
        let w = width / (months.length + 1)
        noStroke()
        staples(months[i].incomes, months[i].expenses, months[i].net, months[i].name, w * (i + 1), maxMonth)
        var l = ((width - staple_width * 2) / months.length + 1) / months[i].flow.length
        for(let j = 0; j < months[i].flow.length; j++){
            graph(lastX - (width - staple_width * 3), lastY, months[i].flow[j], l)
            lastY += months[i].flow[j]
            lastX += l
        }
    }
    fill(getColor(lastY))
    text(lastY.toFixed(2), lastX - staple_width * 4, lastY - size)
    noStroke()
    noLoop()
}

function getColor(n){
    if(n == 0) return color(0, 0, 255)
    else if(n > 0) return color(0, 255, 0)
    else return color(255, 0, 0)
}

function graph(x, y, net, l){
    push()
    translate(0, -size)
    stroke(getColor(net))
    line(x, map(y, -maxTransfer, maxTransfer, size, -size), x + l, map(y + net, -maxTransfer, maxTransfer,size, -size))
    pop()
}

function staples(inc, out, net, name, x, max){
    push()
    translate(0, size)
    fill(0, 255, 150)
    rect(staple_width / 2 + x, 0, staple_width, -map(inc, 0, max, 0, size))
    fill(255, 0, 50)
    rect(-(staple_width + staple_width / 2) + x, 0, staple_width, -map(out, 0, max, 0, size))
    fill(255, 200, 100)
    rect(-staple_width / 2 + x, 0, staple_width, -map(net, 0, max, 0, size))
    fill(255)
    text(`${name}\nNet: ${net.toFixed(2)}\nIncome: ${inc.toFixed(2)}\nExpenses: ${out.toFixed(2)}`, x, size - 120)
    pop()
}

class Month{
    constructor(name, flow){
        this.name = name
        this.flow = flow
        this.incomes = this.getPositive(flow).reduce((a, b) => a + b, 0)
        this.expenses = this.getNegative(flow).reduce((a, b) => a + b, 0)
        this.net = flow.reduce((a, b) => a + b, 0)
    }

    getPositive(arr){
        let tempArr = []
        arr.forEach(e => {
            if(e > 0) tempArr.push(e)
        })
        return tempArr
    }

    getNegative(arr){
        let tempArr = []
        arr.forEach(e => {
            if(e <= 0) tempArr.push(e)
        })
        return tempArr
    }
}