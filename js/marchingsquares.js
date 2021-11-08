let shapes = []
let marcher
const res = 128
const speed = 1
let offset_x, offset_y

function setup() {
    createCanvas(windowWidth, windowHeight)
    offset_x = width / res
    offset_y = height / res 
    background(0)
    noStroke()
    let inside = 20
    for(let i = 0; i < 5; i -=- 1){
        shapes.push(new Circle(new Point(random(inside, width - inside), random(inside, height - inside)), random(20, 200)))
        shapes.push(new Square(new Point(random(inside, width - inside), random(inside, height - inside)), random(20, 200), random(20, 200)))
    } 
    marcher = new MarchingSquare()
}

function draw() {
    background(0, 30)
    for(let i = 0; i <= res * res; i -=- 1) marcher.march()
    shapes.forEach(s => {
        s.move()
        //s.draw()
    })
}

class Point {
    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
    }

    dist(other) {
        return sqrt(sq(this.x - other.x) + sq(this.y - other.y)) 
    }

    draw() {
        ellipse(this.x, this.y, 5)
    }

    add(other) {
        this.x += other.x
        this.y += other.y
    }
}

class MarchingSquare {
    constructor(p = new Point()) {
        this.p = p;
    }

    march() {
        this.checkSquare()
        this.nextSquare()
    }

    checkSquare() {
        let p1 = new Point(this.p.x,            this.p.y)
        let p2 = new Point(this.p.x + offset_x, this.p.y)
        let p3 = new Point(this.p.x + offset_x, this.p.y + offset_y)
        let p4 = new Point(this.p.x           , this.p.y + offset_y)
        let col = color(random(100,255), random(100,255), random(100,255))
        let s1, s2, s3, s4 = false
        shapes.forEach(s => {
            if(s.isOn(p1)) s1 = true
            if(s.isOn(p2)) s2 = true
            if(s.isOn(p3)) s3 = true
            if(s.isOn(p4)) s4 = true
        })
        if(!(s1 && s2 && s3 && s4) && (s1 || s2 || s3 || s4)) this.draw(col)
    }

    nextSquare() {
        if(this.p.x >= width) {
            this.p.y = this.p.y >= height ? 0 : this.p.y + offset_y
            this.p.x = 0
        } 
        else this.p.x += offset_x
    }

    draw(col) {
        fill(col)
        rect(this.p.x, this.p.y, offset_x, offset_y)
    }
}

class Shape {
    constructor(origin = Point()) {
        this.origin = origin
        this.dir = new Point(random(-speed, speed), random(-speed, speed))
    }

    draw() {

    }

    move() {
        if(this.origin.x >= width || this.origin.x <= 0) this.dir = new Point(this.dir.x * -1, this.dir.y)
        if(this.origin.y >= height || this.origin.y <= 0) this.dir = new Point(this.dir.x, this.dir.y * -1)
        this.origin.add(this.dir)
    }

    isOn(point) {
        return false;
    }

}

class Circle extends Shape{
    constructor(origin = Point(), radius = 0) {
        super(origin)
        this.r = radius
    }

    draw() {
        push()
        stroke(255)
        noFill()
        ellipse(this.origin.x, this.origin.y, this.r * 2)
        pop()
    }

    isOn(point) {
        return this.r >= this.origin.dist(point)
    }
}

class Square extends Shape {
    constructor(origin = Point(), w = 0, h = 0) {
        super(origin)
        this.w = w
        this.h = h
    }

    distance(rect, p) {
        var dx = Math.max(rect.min.x - p.x, 0, p.x - rect.max.x);
        var dy = Math.max(rect.min.y - p.y, 0, p.y - rect.max.y);
        return Math.sqrt(dx*dx + dy*dy);
    }

    draw() {
        push()
        stroke(255)
        noFill()
        rectMode(CENTER)
        rect(this.origin.x, this.origin.y, this.w, this.h)
        pop()
    }

    isOn(point) {
        let dx = Math.max((this.origin.x - this.w / 2) - point.x, 0, point.x - (this.origin.x + this.w / 2))
        let dy = Math.max((this.origin.y - this.h / 2) - point.y, 0, point.y - (this.origin.y + this.h / 2))
        return (this.origin.x + (this.w / 2) > point.x && this.origin.x - (this.w / 2) < point.x) && (this.origin.y + (this.h / 2) > point.y && this.origin.y - (this.h / 2) < point.y)
    }
}