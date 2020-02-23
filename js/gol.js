let grid = []
let size = 50

function setup(){
    createCanvas(innerWidth, innerHeight)
    grid = getEmptyGrid()
    strokeWeight(0.2)
    drawGrid()
}

f = (value) => { return Math.floor(value / size) * size }

function getEmptyGrid(){
    let tempGrid = []
    for(let y = 0; y < f(height / size); y++){
        let tempInnerGrid = []
        for(let x = 0; x < f(width / size); x++){
            tempInnerGrid.push(0)
        }
        tempGrid.push(tempInnerGrid)
    }
    return tempGrid
}

function mouseClicked(){
    let x = round(mouseX / size)
    let y = round(mouseY / size)

    if(mouseX < width && mouseX > 0 && mouseY < height && mouseY > 0){
        if(grid[x][y] > 0) grid[x][y] = 0
        else grid[x][y] = 10
    }
    drawGrid()
}

function keyReleased() {
    if (keyCode === ENTER) {
        for(let y = 0; y < f(height / size); y++) for(let x = 0; x < f(width / size); x++) calcPoint(x, y)
        for(let y = 0; y < f(height / size); y++) for(let x = 0; x < f(width / size); x++) cyclePoint(x, y)
        drawGrid()
    } else if(keyCode === ESCAPE) {
        grid = getEmptyGrid()
        drawGrid()
    }
}

function cyclePoint(x, y){
    if(grid[x][y] == 2) grid[x][y] += 10
    if(grid[x][y] > 13 || grid[x][y] < 12) grid[x][y] = 0

    if(grid[x][y] >= 10) grid[x][y] = 10
    else grid[x][y] = 0
}

function calcPoint(x, y){
    let points = 0
    for(let cy = 0; cy <= 2; cy++){
        for(let cx = 0; cx <= 2; cx++){
            let nx = (x - 1) + cx
            let ny = (y - 1) + cy
            if(nx < width / size && nx > 0 && ny < height / size && ny > 0 && grid[nx][ny] >= 10) points++
        }
    }
    grid[x][y] += points
}

function drawGrid(){
    background(255)
    for(let y = 0; y < f(height / size); y++){
        for(let x = 0; x < f(width / size); x++){
            if(grid[x][y] == 10) fill(0)
            else if(grid[x][y] == 11) fill(255, 0, 0)
            else if(grid[x][y] == 12) fill(0, 255, 0)
            else if(grid[x][y] >= 13) fill(0, 0, 255)
            else fill(255)

            ellipse(x * size, y * size, size * 0.85)
        }
    }
}

function draw(){
    let x = round(mouseX / size)
    let y = round(mouseY / size)
    drawGrid()
    if(mouseX < width - 1 && mouseX > 0 && mouseY < height - 1 && mouseY > 0){
        fill(0)
        text(grid[x][y], x * size, y * size)
    }
}