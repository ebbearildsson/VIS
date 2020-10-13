let months = []
let starting_cash = 8247.92

window.onload = function(){
    years = [getMonths2020(), getMonths2021(), getMonths2022()]
    addYears()
}

function change(){
    var test = ""
    var inputs = document.getElementsByClassName('tracked')
    for(let i = 0; i < inputs.length; i++){
        if(inputs[i].checked){
            inputs[i].parentElement.style['background-color'] = 'rgba(255, 255, 255, 0)'
            years.forEach(year => {
                year.forEach(month => {
                    if(month.name == inputs[i].id.substring(4, inputs[i].id.length) && month.year == inputs[i].id.substring(0, 4)) test += month.net
                })
            })
        } else {
            inputs[i].parentElement.style['background-color'] = 'rgb(18, 18, 18)'
        }
    }
    document.getElementById('graph').innerHTML = test
}

function getMonths2020(){
    let tempMonths = []
    tempMonths.push(new Month(2020, 'January',   [135, -79, -9.95, -711.4, -1259.3, -17.95, -9.95, -9.9, -9.95, -94, -20, -29, 10, -29.85, -19.9, -9.95, -19.9, 950, -450, -19.9, -25.95, 10, 1250]))
    tempMonths.push(new Month(2020, 'February',  [-36.95, -95, -19.9, -22, -22, -30, -23, 500, -23, -9.95, -19.9, -166, -205, -19.9, -10, -17.95, 83, 83, 200, -282.4, -282.4, -282.4, -1716, -74.85, -30, -20.95, -10, 1250, -65.95, -37.9]))
    tempMonths.push(new Month(2020, 'March',     [400, -1120.4, -28.9, 400, -56.11, -19.9, -14.5, -0.17, -304, -23, -299, -28.9, -45.85, -23, -78, 26, -24.95, -18.95, -287.57, 300, -87.35, -265, 265, -117.19, -234.75, -355, 420, 1250]))
    tempMonths.push(new Month(2020, 'April',     [-47.4, -66, -64.75, -27.45, -29, -155.17, -5.36, -59, -195, -7, -42.18, -7, -57.04, -1198.4, -21, 52, -51.9, 1250]))
    tempMonths.push(new Month(2020, 'May',       [-48, -32.4, -15.95, 300, 300, -429, -429, -429, 1716, -200, -100, -57, -74.5, -30.6, -102, 1250, -230.75]))
    tempMonths.push(new Month(2020, 'June',      [-100, 500, 1000, -26, -100, -519, -120, -90, 450, -863, -25, -61.2, -55.45, -30.6, -699, -187, 1250]))
    tempMonths.push(new Month(2020, 'July',      [200, -185, -69, -20, -100, -53.1, -79, 82, 26, -427, -19.95, -34, 131, -26, -290.76, 140, -300, -39.95, -261.85, -104, -200, -12]))
    tempMonths.push(new Month(2020, 'August',    [-49.85, -80, -37.5, -111.4, 55, -254, -14.5, -249, -50, 50, 600, -25, -21.95, -128.9, -210, -240, -100, -79.2, -98, 473, -400, 407, -473.16, -510, -500, -90, -350, -10, -10, -10, -40, -45, -220, 4115, -10, -10, -10, -10, -66, -112, -50, -20, -10, -40, -65, -45, -40, -10, -10, -10, -18.5, -10]))
    tempMonths.push(new Month(2020, 'September', [-39.6, -24, 500, -80, -10, -10, 200, -30, -10, -10, -18.5, -10, -10, -10, -10, -10, -20, -63, -10, -24, -115, -24, -176.35, -45, -80, 134, -65, -10, -40, -650, -425, -46.7, -10, -10, -9, -25, -60, -90, -35, -45, -45, -45, -297, -150, -45, -40, -114, -45, -510, -61.2, -105.28, -100, 3292, -50, -10, -10, -10, -10, -45, -45, -45, -149, -40, 19.69, -33, 300]))
    tempMonths.push(new Month(2020, 'Oktober',   [-77.9, -60, -123, -382, -20, -10, -52]))
    tempMonths.push(new Month(2020, 'November',  [0]))
    tempMonths.push(new Month(2020, 'December',  [0]))
    return tempMonths
}

function getMonths2021(){
    let tempMonths = []
    tempMonths.push(new Month(2021, 'January',   [0]))
    tempMonths.push(new Month(2021, 'February',  [0]))
    tempMonths.push(new Month(2021, 'March',     [0]))
    tempMonths.push(new Month(2021, 'April',     [0]))
    tempMonths.push(new Month(2021, 'May',       [0]))
    tempMonths.push(new Month(2021, 'June',      [0]))
    tempMonths.push(new Month(2021, 'July',      [0]))
    tempMonths.push(new Month(2021, 'August',    [0]))
    tempMonths.push(new Month(2021, 'September', [0]))
    tempMonths.push(new Month(2021, 'Oktober',   [0]))
    tempMonths.push(new Month(2021, 'November',  [0]))
    tempMonths.push(new Month(2021, 'December',  [0]))
    return tempMonths
}

function getMonths2022(){
    let tempMonths = []
    tempMonths.push(new Month(2021, 'January',   [0]))
    tempMonths.push(new Month(2021, 'February',  [0]))
    tempMonths.push(new Month(2021, 'March',     [0]))
    tempMonths.push(new Month(2021, 'April',     [0]))
    tempMonths.push(new Month(2021, 'May',       [0]))
    tempMonths.push(new Month(2021, 'June',      [0]))
    tempMonths.push(new Month(2021, 'July',      [0]))
    tempMonths.push(new Month(2021, 'August',    [0]))
    tempMonths.push(new Month(2021, 'September', [0]))
    tempMonths.push(new Month(2021, 'Oktober',   [0]))
    tempMonths.push(new Month(2021, 'November',  [0]))
    tempMonths.push(new Month(2021, 'December',  [0]))
    return tempMonths
}

function addYears(){
    for(let i = 0; i < years.length; i++) {
        let year = addButton(`${2020 + i}`, `${2020 + i}`, false)
        years[i].forEach(month => year.firstChild.lastChild.appendChild(addButton(month.name, `${2020 + i}` + month.name, true)))
        year.firstChild.lastChild.appendChild(addButton('All months', `${2020 + i}All months`, true))
        document.getElementById('header').appendChild(year)
    }
}

function addButton(name, id, tracked){
    var border = document.createElement('div')
        border.classList.add('border')
    var button = document.createElement('div')
        button.classList.add('button')
    var input = document.createElement('input')
        input.type = 'checkbox'
        input.id = id
        input.onclick = function(){change()}
        if(tracked) input.classList.add('tracked')
    var label = document.createElement('label')
        label.setAttribute('for', id)
        label.innerHTML = name
    var content = document.createElement('div')
        content.classList.add('hidden')
        content.classList.add('content')
    button.appendChild(input)
    button.appendChild(label)
    button.appendChild(content)
    border.appendChild(button)
    return border
}

class Month{
    constructor(year, name, flow){
        this.name = name
        this.flow = flow
        this.incomes = this.getPositive(flow).reduce((a, b) => a + b, 0)
        this.expenses = this.getNegative(flow).reduce((a, b) => a + b, 0)
        this.net = flow.reduce((a, b) => a + b, 0)
        this.year = year
    }

    getPositive(arr){
        let tempArr = []
        arr.forEach(e => {
            if(e > 0) tempArr.push(e)
        })
        return tempArr
    }

    getNegative(arr){
        let tempArr = []
        arr.forEach(e => {
            if(e <= 0) tempArr.push(e)
        })
        return tempArr
    }
}