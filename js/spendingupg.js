let transactions
let graph = true
let yearToDisplay = 2021
let highestWorth = 0
let factor = 15

function setup(){
    createCanvas(innerWidth, innerHeight)
    background(0)
    transactions = [
        new Transaction(-248,    new Date('2021-01-06'), 'Elgiganten'),
        new Transaction(-306.21, new Date('2021-01-08'), 'Amazon'),
        new Transaction(-204.88, new Date('2021-01-13'), 'Steam'),
        new Transaction(-32.5,   new Date('2021-01-16'), 'ICA Maxi'),
        new Transaction(-131,    new Date('2021-01-16'), 'Resturang Burger King'),
        new Transaction(-50,     new Date('2021-01-16'), 'Swish 0733257535'),
        new Transaction(-35,     new Date('2021-01-16'), 'Swish 0735821882'),
        new Transaction( 4968,   new Date('2021-01-20'), 'CSN'),
        new Transaction(-59,     new Date('2021-01-21'), 'Apple'),
        new Transaction(-49,     new Date('2021-01-30'), 'Resturang VED'),
        new Transaction(-385,    new Date('2021-01-30'), 'Resturang VED'),
        new Transaction(-32.4,   new Date('2021-01-30'), 'Skånetrafiken'),
        new Transaction(-49,     new Date('2021-01-30'), 'Resturang VED'),
        new Transaction(-19.95,  new Date('2021-01-30'), 'Hemköp'),
        new Transaction(-109,    new Date('2021-01-30'), 'Resturang VED'),

        new Transaction(-120,    new Date('2021-02-01'), 'Resturang MAX'),
        new Transaction(-100,    new Date('2021-02-05'), 'Swish 0730677290'),
        new Transaction(-101,    new Date('2021-02-07'), 'Swish 0733257535'),
        new Transaction(-30,     new Date('2021-02-08'), 'Dollarstore'),
        new Transaction(-240,    new Date('2021-02-10'), 'Swish TRF'),
        new Transaction(-124,    new Date('2021-02-13'), 'Normal'),
        new Transaction(-85,     new Date('2021-02-15'), 'Resturang Foodora'),
        new Transaction( 4027,   new Date('2021-02-19'), 'Resa Etraveli'),
        new Transaction(-805,    new Date('2021-02-20'), 'Swish 0733257535'),
        new Transaction(-805,    new Date('2021-02-20'), 'Swish 0723809746'),
        new Transaction(-805,    new Date('2021-02-20'), 'Swish 0703236712'),
        new Transaction(-805,    new Date('2021-02-20'), 'Swish 0760580282'),
        new Transaction( 100,    new Date('2021-02-21'), 'Swish 0730782974'),
        new Transaction(-394,    new Date('2021-02-22'), 'Kläder Spreadshirt'),
        new Transaction(-100,    new Date('2021-02-22'), 'Resturang Palaza Grill'),
        new Transaction( 3312,   new Date('2021-02-25'), 'CSN'),
    ]
}

function mouseWheel(event){
    factor += event.delta / 50;
    if(factor <= 0) factor = 0.0001
}

function mousePressed() {
    if (value === 0) {
      value = 255;
    } else {
      value = 0;
    }
}

function draw(){
    background(0)
    textAlign(CENTER)
    textSize(width * 0.012)
    stroke(255)
    translate(0, height / 2)
    line(0, 0, width, 0)
    noStroke()
    let drawString = ""
    if(graph){
        let currentWorth = 0
        const monthOffset = width / 12
        for(let month = 0; month < 12; month ++){
            stroke(255)
            line(monthOffset * month, 10, monthOffset * month, -10)
            noStroke()
            const dayOffset = monthOffset / daysInMonth(month, yearToDisplay)
            const transactionsThisMonth = transactions.filter(t => t.date.getMonth() == month)
            fill(255)
            text("Net: " + transactionsThisMonth.map(t => t.amount).reduce((a, b) => a + b, 0), monthOffset * month + monthOffset / 2, height * 0.2)
            for(let day = 0; day < daysInMonth(month, yearToDisplay) + 1; day ++){ 
                const transactionsThisDay = transactionsThisMonth.filter(t => t.date.getDate() == day)
                if(transactionsThisDay.length == 0){
                    fill(0, 0, 255)
                    rect(monthOffset * month + dayOffset * day, -currentWorth - 2, dayOffset, 4)
                } 
                else {
                    transactionsThisDay.forEach(t => {
                        fill(t.amount > 0 ? color(0,255, 0) : color(255, 0, 0))
                        rect(monthOffset * month + dayOffset * day, -currentWorth, dayOffset, -t.amount / factor)
                        currentWorth += t.amount / factor
                    })
                }
                if(mouseIsPressed && mouseX > monthOffset * month + dayOffset * day && mouseX < monthOffset * month + dayOffset * day + dayOffset){
                    drawString = `${yearToDisplay}-${month + 1}-${day}\n` + transactionsThisDay.map(t => `${t.desc}: ${t.amount} kr`).join("\n") 
                }
            }
        } 
        stroke(0)
        fill(255)
        if(mouseX < 0.05 * width) textAlign(LEFT)
        else if(mouseX > 0.95 * width) textAlign(RIGHT)
        text(drawString, mouseX, mouseY - height / 2)
    }
}

class Transaction{
    constructor(amount, date, desc, loan){
        this.amount = amount
        this.date = date
        this.desc = typeof desc === 'string' ? desc : ''
        this.loan = typeof loan === 'boolean' ? loan : false
    }
}

function daysInMonth(month, year){
    return new Date(year, month, 0).getDate();
}