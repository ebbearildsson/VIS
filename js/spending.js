let months = [];
let staple_width = 25;
let maxMonth = 10000;
let maxTotal = maxMonth * 8;

function setup(){
    createCanvas(innerWidth, innerHeight)
    months = getMonths()
    staple_width = (width / 3) / (months.length + 5)
    textAlign(CENTER)
    background(0)
    textSize(width / 110)
}

function getMonths(){
    let tempMonths = []
        //Name
        //Incomes
        //Expenses
    tempMonths.push(new Month(
        'January',   
        [135, 950, 10, 1250],                
        [79, 9.95, 711.4, 1259.3, 17.95, 9.95, 9.9, 9.95, 94, 20, 20, 29, 29.85, 19.9, 450, 19.9, 25.95]
    ))
    tempMonths.push(new Month(
        'February',  
        [500, 83, 83, 200, 1250],            
        [36.95, 95, 19.9, 22, 22, 30, 23, 23, 9.95, 19.9, 166, 205, 19.9, 10, 17.95, 282.4, 282.4, 282.4, 1716, 74.85, 30, 20.95, 10, 65.95, 37.9]
    ))
    tempMonths.push(new Month(
        'March',     
        [400, 400, 26, 300, 265, 420, 1250], 
        [1120.4, 28.9, 56.11, 19.9, 14.5, 0.17, 304, 23, 299, 28.9, 45.85, 23, 78, 24.95, 18.95, 287.57, 87.35, 265, 117.19, 234.75, 355]
    ))
    tempMonths.push(new Month(
        'April',     
        [52, 1250],                          
        [47.4, 66, 64.75, 27.45, 29, 155.17, 5.36, 59, 195, 7, 42.18, 7, 57.04, 1198.4, 21, 51.9]
    ))
    tempMonths.push(new Month(
        'May',       
        [300, 300, 1250],                    
        [48, 32.4, 15.95, 429, 429, 429, 429, 200, 100, 57, 74.5, 30.6, 102, 230.75]))
    tempMonths.push(new Month(
        'June',      
        [500, 1000, 450, 1250],              
        [100, 26, 100, 519, 120, 90, 863, 25, 61.2, 55.45, 30.6, 699, 187]
    ))
    tempMonths.push(new Month(
        'July',      
        [200, 82, 26, 131, 140, 1250],       
        [185, 69, 20, 100, 53.1, 79, 427, 19.95, 34, 26, 290.76, 300, 39.95, 261.85, 104, 200, 12]
    ))
    tempMonths.push(new Month(
        'August',    
        [55, 50, 600, 473, 407, 4115],       
        [49.85, 80, 37.5, 111.4, 254, 14.5, 249, 50, 25, 21.95, 128.9, 210, 240, 100, 79.2, 98, 400, 473.16, 510, 500, 90, 350, 10, 10, 10, 40, 45, 220, 10, 10, 10, 10, 66, 112, 50, 20, 10, 40, 65, 45, 40, 10, 10, 10, 18,5, 10]
    ))
    tempMonths.push(new Month(
        'September', 
        [500, 200, 134, 3292],        
        [39.6, 24, 80, 10, 10, 30, 10, 10, 18.5, 10, 10, 10, 10, 10, 20, 63, 24, 115, 487, 39, 176.35, 45, 80, 65, 10, 40, 650, 425, 46.7, 10, 10, 10, 9, 25, 60, 90, 35, 45, 45, 45, 297, 150, 45, 40, 114]
    ))
    return tempMonths;
}

function draw(){
    stroke(255)
    line(0, height / 2, width, height / 2)
    let inc = 0
    let out = 0
    let net = 0
    for(let i = 0; i < months.length; i++){
        noStroke()
        staples(months[i].incomes_reduced, months[i].expenses_reduced, months[i].net, months[i].name, (width / (months.length + 2)) * (i + 1), maxMonth)
        inc += months[i].incomes_reduced
        out += months[i].expenses_reduced
        if(inc - out > 0) stroke(0, 255, 0)
        else stroke(255, 0, 0)
        line((width / (months.length + 2)) * i,  -map(net, 0, maxMonth, 0, height / 2) + height / 2, (width / (months.length + 2)) * (i + 1),-map(inc - out, 0, maxMonth, 0, height / 2) + height / 2)
        net = inc - out
    }
    noStroke()
    staples(inc, out, inc - out, 'Total', (width / (months.length + 2)) * (months.length + 1), maxTotal)
}

function staples(inc, out, net, name, x, max){
    fill(0, 255, 0)
    rect(staple_width / 2 + x, height / 2, staple_width, -map(inc, 0, max, 0, height / 2))
    fill(255, 0, 0)
    rect(-(staple_width + staple_width / 2) + x, height / 2, staple_width, map(out, 0, max, 0, height / 2))
    fill(255, 100, 0)
    rect(-staple_width / 2 + x, height / 2, staple_width, -map(net, 0, max, 0, height / 2))
    fill(255)
    text(`${name}\nNet: ${net.toFixed(2)}\nIncome: ${inc.toFixed(2)}\nExpenses: ${out.toFixed(2)}`, x, height - 80)
}

class Month{
    constructor(name, incomes, expenses){
        this.name = name
        this.incomes = incomes
        this.incomes_reduced = incomes.reduce((a, b) => a + b, 0)
        this.expenses = expenses
        this.expenses_reduced = expenses.reduce((a, b) => a + b, 0)
        this.net = this.incomes_reduced - this.expenses_reduced
    }
}