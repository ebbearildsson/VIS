let input = ""
let output, sliderS, sliderM
let step = 8
let mode = 2

function setup(){
    createCanvas(innerWidth, innerHeight)
    sliderS = createSlider(1, 100, 8, 1)
    sliderM = createSlider(1, 100, 2, 1)
    sliderS.position(10, 10)
    sliderM.position(10, 30)
    stroke(0)
}

function keyTyped(){
    input += key
}

function keyPressed(){
    if(keyCode === BACKSPACE || keyCode === DELETE) input = input.substring(0, input.length - 1)
    if(keyIsDown(CONTROL) && keyCode === '86') console.log('paste!')
}

function draw(){
    background(134, 114, 244)

    if(sliderS.value() !== step) step = sliderS.value()
    if(sliderM.value() !== mode) mode = sliderM.value()
    text('Number of characters for each letter: ' + step, 150, 25)
    text('Power: ' + mode, 150, 45)
    if(keyIsDown(CONTROL) && keyIsDown(86)){
        navigator.clipboard.readText().then(text => input = text)
    }
    output = ""
    //input = document.querySelector("input").value

    for(let i = 0; i < input.length; i+=step){
        let nums = ""
        for(let n = 0; n < step; n++) nums += input[i + n]
        output += char(parseInt(nums, mode))
    }

    push()
    textAlign(CENTER)
    textSize(10)
    text('Input: ' + input, width/2, height/2 - 20)
    text('Output: ' + output, width/2, height/2 + 20)
    pop()
}