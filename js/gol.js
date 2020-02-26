let grid = []
let next = []
let size = 40
let cols, rows

function setup(){
    createCanvas(innerHeight, innerHeight)
    cols = f(width) / size
    rows = f(height) / size
    grid = getEmptyGrid()
    next = getEmptyGrid()
    strokeWeight(0.2)
    drawGrid()
}

f = (value) => { return Math.floor(value / size) * size }

function getEmptyGrid(){
    let tempGrid = new Array(rows)
    for(let i = 0; i < tempGrid.length; i++) tempGrid[i] = new Array(cols)
    for(let i = 0; i < tempGrid.length; i++) for(let j = 0; j < tempGrid[0].length; j++) tempGrid[i][j] = floor(random(0, 2))
    return tempGrid
}

function mouseClicked(){
    let x = round(mouseX / size)
    let y = round(mouseY / size)
    if(mouseX < width && mouseX > 0 && mouseY < height && mouseY > 0){
        if(grid[x][y] > 0) grid[x][y] = 0
        else grid[x][y] = 1
    }
    drawGrid()
}

function keyReleased() {
    if (keyCode === ENTER) {
        for(let y = 0; y < rows; y++) for(let x = 0; x < cols; x++) calcPoint(x, y)
        grid = next
        drawGrid()
    } else if(keyCode === ESCAPE) {
        grid = getEmptyGrid()
        drawGrid()
    }
}

function calcPoint(x, y){
    let points = -grid[x][y]
    for(let cy = -1; cy < 2; cy++){
        for(let cx = -1; cx < 2; cx++){
            let nx = (x + cx + cols) % cols
            let ny = (y + cy + rows) % rows
            if(grid[nx][ny] == 1) points++
        }
    }

    if(points > 3 || points < 2) next[x][y] = 0
    else if(points == 3) next[x][y] = 1
    else next[x][y] = 0
}

function drawGrid(){
    background(255)
    for(let y = 0; y < rows; y++){
        for(let x = 0; x < cols; x++){
            if(grid[x][y] == 1) fill(0)
            else fill(255)

            ellipse(size / 2 + x * size, size / 2 + y * size, size * 0.85)
        }
    }
}

function draw(){
}