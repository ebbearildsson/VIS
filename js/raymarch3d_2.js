let rays = []
let scene = []
let lights = []

function setup(){
    createCanvas(innerWidth, innerHeight)
}

function draw(){
    
}

function getRays() {
    let forward = new Vector(0, 0, 1);
    for(let y = 0; y < height; y ++){
        for(let x = 0; x < width; x ++){
            rays.push(new Vector())
        }
    }
}

class Sphere {
    constructor(position, radius, color) {
        this.pos = position
        this.r = radius
        this.c = color
    }
}

class Ray {
    constructor(dir){
        this.dir = dir
    }
}

class Vector {
    constructor(x, y, z){
        this.x = x
        this.y = y
        this.z = z
    }

    length() {
        return sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
    }

    dist(other) {
        return length(this.sub(other))
    }

    sub(other) {
        return new Vector(this.x - other.x, this.y - other.y, this.z - other.z)
    }

    add(other) {
        return new Vector(this.x + other.x, this.y + other.y, this.z + other.z)
    }

    cross(other) {
        return new Vector(this.y * other.y - this.z * other.y, this.z * other.x - this.x * other.z, this.x * other.y - this.y * other.x)
    }

    dot(other) {
        return this.x * other.x + this.y * other.y + this.z * other.z
    }

    mult(factor){
        return new Vector(this.x * factor, this.y * factor, this.z * factor)
    }

    norm(){
        return this.mult(1 / this.length())
    }

    toColor() {
        return color(constrain(this.x, 0, 255), constrain(this.y, 0, 255), constrain(this.z, 0, 255))
    }
}