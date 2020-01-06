let started = false
let clicked = false
let restart = false
let once = false
let count = 0
let timer, timeStart, timeEnd

function setup(){
    createCanvas(innerWidth, innerHeight)
    textAlign(CENTER)
    textSize(50)
    fill(255)
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}

function mouseClicked(){
    if(restart){
        clicked = false
        started = false
        restart = false
        once = false
        count = 0
    } else {
        if(!started){
            started = true
            timer = random(50, 500)
        } else if(count >= timer){
            clicked = true
            timeEnd = millis()
        }
    }
}

function draw(){
    if(!started){
        background(255, 100, 100)
        text('Click to start', width/2, height/2)   
    } else if(started && !clicked){
        count++
        background(255, 100, 100)
        text('Waiting', width/2, height/2) 
        if(count >= timer){
            background(100, 255, 100)
            text('Click!', width/2, height/2)
            if(!once){
                timeStart = millis()
                once = true
            }
        }
    } else if(started && clicked){
        background(255, 100, 100)
        text((count - timer).toFixed(0) + ' Frames', width/2, height/2)
        text((timeEnd - timeStart).toFixed(0) + ' ms', width/2, height/2 + 50)
        restart = true      
    }
}