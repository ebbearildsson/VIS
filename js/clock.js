let h, m, s, y, d, size

function setup(){
    createCanvas(innerWidth, innerHeight)
    noStroke()
    size = height*0.9
    place = width*0.85
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
    size = height*0.9
    place = width*0.85
  }

function draw(){
    background(38,84,124)

    //Yearly

    y = year()
    m = month()
    d = day()

    mapm = map(m, 0, 12, 0, size)
    mapmd = map(d, 1, 31, 0, mapm)

    fill(239,71,111)
    rect(place, height*0.05, place*0.1, size)
    fill(255,209,102)
    rect(place, height*0.05, place*0.1, mapm)
    fill(252,252,252)
    rect(place, height*0.05, place*0.1, mapmd)

    //Daily

    h = hour()
    m = minute()
    s = second()

    maph = map(h, 0, 23, 0, size)
    maphm = map(m, 0, 59, 0, maph)
    maphms = map(s, 0, 59, 0, maphm)

    fill(239,71,111)
    ellipse(width/2, height/2, size)
    fill(255,209,102)
    ellipse(width/2, height/2, maph)
    fill(252,252,252)
    ellipse(width/2, height/2, maphm)
    fill(1,167,194)
    ellipse(width/2, height/2, maphms)

    //Text

    push()
    textAlign(CENTER)
    textSize(height*0.4)
    translate(width*0.2, height/2)
    rotate(PI*2-HALF_PI)
    fill(252)
    text(y, 0, 0)
    pop()
}