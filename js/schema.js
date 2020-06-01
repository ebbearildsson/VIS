let week;
let colorDict;
const earliset_start = 7;
const latest_end = 17;

function setup(){
    createCanvas(innerWidth, innerHeight);
    background(0);
    noStroke();
    week = addWeek();
    colorDict = addDict();
    week.draw();
}

function addWeek(){
    tempWeek = new Week([
        new Day([
            new Lesson(new Time(9, 35), new Time(10, 55), "Civics", "UNS"),
            new Lesson(new Time(12, 15), new Time(13, 30), "Mathematics", "NMP"),
            new Lesson(new Time(13, 40), new Time(14, 55), "English", "CLF"),
        ]),
        new Day([
            new Lesson(new Time(8, 5), new Time(9, 25), "Mathematics", "NMP"),
            new Lesson(new Time(9, 40), new Time(10, 50), "Engineering", "DCH"),
            new Lesson(new Time(11, 10), new Time(12, 25), "Religion", "EDB"),
            new Lesson(new Time(13, 5), new Time(14, 30), "Swedish", "KKM")
        ]),
        new Day([
            new Lesson(new Time(11, 10), new Time(12, 20), "Engineering", "DCH"),
            new Lesson(new Time(13, 35), new Time(14, 40), "Mathematics", "NMP")
        ]),
        new Day([
            new Lesson(new Time(8, 10), new Time(9, 25), "English", "CLF"),
            new Lesson(new Time(9, 45), new Time(11, 10), "Civics", "UNS"),
            new Lesson(new Time(11, 50), new Time(13, 5), "Physics", "BAI"),
            new Lesson(new Time(13, 15), new Time(14, 35), "Religion", "EDB"),
            new Lesson(new Time(14, 50), new Time(16, 25), "Computer", "DCH")
        ]),
        new Day([
            new Lesson(new Time(9, 35), new Time(11, 0), "Swedish", "KKM"),
            new Lesson(new Time(11, 40), new Time(12, 55), "Physics", "BAI"),
            new Lesson(new Time(13, 0), new Time(14, 20), "Computer", "DCH"),
            new Lesson(new Time(14, 35), new Time(15, 50), "Mathematics", "NMP")
        ])
    ]);
    return tempWeek;
}

function addDict(){
    tempDict = {
        Religion: color(0, 0, 160),
        English: color(0, 240, 0),
        Swedish: color(0, 128, 128),
        Mathematics: color(0, 255, 255),
        Civics: color(0, 0, 160),
        Physics: color(0, 0, 255),
        Engineering: color(255, 0, 0),
        Computer: color(255, 0, 0)
    };
    return tempDict;
}

function draw(){
}

class Week{
    constructor(days){
        this.days = days;
    }
 
    draw(){
        background(0);
        let dayWidth = width / this.days.length; 
        this.days.forEach(function(day, i){
            day.lessons.forEach(lesson => {
                fill(colorDict[lesson.name]);
                let start = map(lesson.start.stamp, earliset_start, latest_end, 0, height);
                let end = map(lesson.end.stamp, earliset_start, latest_end, 0, height) - start;
                rect(dayWidth * i, start, dayWidth, end);
                fill(255);
                textSize(width / 50)
                text(lesson.name + "\n" + lesson.teacher, dayWidth * i, start + width / 50)
            });
        });
    }
}

class Day{
    constructor(lessons){
        this.lessons = lessons;
    }
}

class Lesson{
    constructor(lesson_start_time, lesson_end_time, lesson_name, lesson_teacher_name){
        this.start = lesson_start_time;
        this.end = lesson_end_time;
        this.name = lesson_name;
        this.teacher = lesson_teacher_name;
    }
}

class Time{
    constructor(Hour, Minutes){
        this.stamp = Hour + Minutes / 60;
    }
}