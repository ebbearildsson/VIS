let grid = []
let next = []
let size = 5
let cols, rows
let animate = false

function setup(){
    createCanvas(innerWidth, innerHeight)
    cols = f(width) / size
    rows = f(height) / size
    grid = getEmptyGrid()
    next = getEmptyGrid()
    rectMode(CENTER)
    noStroke()
    fill(0)
    drawGrid()
}

f = (value) => { return Math.floor(value / size) * size }

randomize = () => { for(let i = 0; i < cols; i++) for(let j = 0; j < rows; j++) grid[i][j] = floor(random(0, 2)) }

function getEmptyGrid(){
    let tempGrid = new Array(cols)
    for(let i = 0; i < cols; i++) tempGrid[i] = new Array(rows)
    for(let i = 0; i < cols; i++) for(let j = 0; j < rows; j++) tempGrid[i][j] = 0
    return tempGrid
}

function mouseClicked(){
    let x = round((mouseX - size / 2) / size)
    let y = round((mouseY - size / 2) / size)
    if(mouseX < width && mouseX > 0 && mouseY < height && mouseY > 0){
        if(grid[x][y] > 0) grid[x][y] = 0
        else grid[x][y] = 1
    }
    drawGrid()
}

function keyReleased() {
    if (keyCode === ENTER) {
        animate = !animate
    } else if(keyCode === ESCAPE) {
        randomize()
        drawGrid()
    }
}

function calcPoint(x, y){
    let points = 0
    for(let cy = -1; cy <= 1; cy++){
        for(let cx = -1; cx <= 1; cx++){
            if(!(cx == 0 && cy == 0)){
                let nx = (x + cx + cols) % cols
                let ny = (y + cy + rows) % rows
                if(grid[nx][ny] == 1) points++
            }
        }
    }

    if((points == 3 || points == 2 ) && grid[x][y] == 1) next[x][y] = 1
    else if(points == 3 && grid[x][y] == 0) next[x][y] = 1
    else next[x][y] = 0
}

function drawGrid(){
    background(237)
    for(let y = 0; y < rows; y++){
        for(let x = 0; x < cols; x++){
            if(grid[x][y] == 1) ellipse(size / 2 + x * size, size / 2 + y * size, size, size)
        }
    }
}

function draw(){
    if(animate){
        next = getEmptyGrid()
        for(let y = 0; y < rows; y++) for(let x = 0; x < cols; x++) calcPoint(x, y)
        grid = next
        drawGrid()
    }
}