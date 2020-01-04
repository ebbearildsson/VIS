let fireworks = [] 
let shards = []
let max = 1
let shardlife = 40
let checkP
let pause = true
let g

function setup(){
    createCanvas(innerWidth, innerHeight)
    background(7,11,52)
    checkP = createCheckbox('Pause', pause)
    checkP.position(10, 10)
    checkP.changed(checkPchange)
    g = createVector(0, 2)
    getFireworks()
}
checkPchange = () => pause = !pause

function draw(){
    if(!pause){
        background(7,11,52)
        for(let i = fireworks.length - 1; i >= 0; i--){
            if(fireworks[i].vel.y > 2){
                let shardAmount = random(5, 20)
                let a = TWO_PI / shardAmount
                let pos = fireworks[i].pos
                let m = fireworks[i].m
                let c = createVector(random(100, 255), random(100, 255), random(100, 255))
    
                push()
                fill(150)
                ellipse(pos.x, pos.y, m*8)
                pop()
    
                for(let i = 0; i < shardAmount; i++){
                    shards.push(new Shard(pos, m/10, shardlife, c, createVector(cos(a*i)*20, sin(a*i)*20)))
                    //shards[shards.length-1].applyForce()
                }
    
                fireworks.splice(i, 1)
            }
            else{
                fireworks[i].applyForce(g)
                fireworks[i].move()
                fireworks[i].draw()
            }
        }

        for(let i = shards.length - 1; i >= 0; i--){
            if(shards[i].curL > shards[i].totalL) shards.splice(i, 1)
            else{
                shards[i].applyForce(createVector(0, 0.01))
                shards[i].move()
                shards[i].draw()
            }
        }
        getFireworks()
    }
}

function getFireworks(){
    for(let i = 0; i < random(0, max); i++){
        fireworks.push(new Firework(random(30, width - 30), height, createVector(random(-2, 2), random(-12, -16)), 10))
    }
}

class Firework{
    constructor(x, y, v, m){
        this.pos = createVector(x, y)
        this.vel = v
        this.acc = createVector()
        this.m = m
    }

    applyForce(force){
        this.acc.x += force.x / this.m
        this.acc.y += force.y / this.m
    }

    move(){
        this.vel.add(this.acc)
        this.acc = createVector()
        this.pos.add(this.vel)
    }

    draw(){
        stroke(37)
        ellipse(this.pos.x, this.pos.y, this.m/3)
    }
}

class Shard{
    constructor(pos, m, life, c, v){
        this.pos = pos
        this.vel = v
        this.acc = createVector(0, 0)
        this.m = m
        this.totalL = life
        this.curL = 0
        this.color = c
    }

    applyForce(force){
        this.acc.x += force.x / this.m
        this.acc.y += force.y / this.m
    }

    move(){
        this.vel.add(this.acc)
        this.acc = createVector()
        this.pos.add(this.vel)
        this.curL++
    }

    draw(){
        noStroke()
        fill(this.color.x, this.color.y, this.color.z)
        ellipse(this.pos.x, this.pos.y, this.m*5)
    }
}