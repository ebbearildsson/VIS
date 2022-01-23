const w = 10
const h = 10
const g = 0.001;
var points = []
var connections = []

function setup(){
    createCanvas(windowWidth, windowHeight)
    background(0)
    getPoints()
    getConnections(points)
    console.log(points)
}

function draw(){
    background(0)
    let oldpoints = points;
    connections.forEach(con => {
        con.spring()
        con.update()
        con.draw()
    })
}

function getPoints(){
    let offsetX = width / 5
    let offsetY = height / 5
    let spacingX = (width - (offsetX * 2)) / w
    let spacingY = (height - (offsetY * 2)) / h
    for(let y = 0; y < h; y ++) {
        for(let x = 0; x < w; x ++) {
            points.push(new Point((x * spacingX) + offsetX, (y * spacingY) + offsetY, (x == 0 || x == w - 1) && y == 0))
        }
    }
}

function getConnections(p){
    for(let y = 0; y < h; y ++) {
        for(let x = 0; x < w; x ++) {
            if(x < w - 1) connections.push(new Connection(p[(y * w) + x], p[(y * w) + (x + 1)]))  
            if(y < h - 1) connections.push(new Connection(p[(y * w) + x], p[((y + 1) * w) + x])) 
        }
    }
}

class Connection{
    constructor(a, b){
        this.a = a
        this.b = b
        this.lx = this.distx()
        this.ly = this.disty()
        this.k = 0.00001
    }

    distx(){
        return (this.a.x - this.b.x)
    }

    disty(){
        return (this.a.y - this.b.y)
    }

    draw(){
        stroke(0, 255, 0)
        line(this.a.x, this.a.y, this.b.x, this.b.y)
        this.a.draw()
        this.b.draw()
    }

    spring(){
        let fx = (this.distx() - this.lx) * this.k
        let fy = (this.disty() - this.ly) * this.k
        this.a.force(fx, fy)
        this.b.force(fx, fy)
    }

    update(){
        this.a.force(0, g)
        this.b.force(0, g)
        this.a.update()
        this.b.update()
    }
}

class Point{
    constructor(x, y, s){
        this.stationary = s
        this.m = 10
        this.x = x
        this.y = y
        this.vx = 0
        this.vy = 0
        this.ax = 0
        this.ay = 0
    }

    draw(){
        noStroke()
        ellipse(this.x, this.y, 4)
    }

    update(){
        if(!this.stationary){
            this.vx += this.ax
            this.vy += this.ay

            this.x += this.vx
            this.y += this.vy
            
            this.ax = 0
            this.ay = 0
        }
    }

    force(fx, fy){
        this.ax += fx / this.m
        this.ay += fy / this.m
    }
}

