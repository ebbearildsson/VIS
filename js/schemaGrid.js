const earliset_start = 7 * 60; //Timmar till minuter
const latest_end = 17 * 60; //Timmar till minuter
let colorDict;

window.onload = function(){
    let rows = '';
    for(let i = earliset_start; i <= latest_end; i += 5 ) rows += `[Time-${iToTime(i)}] 1fr `;
    document.getElementById('schema').style['grid-template-rows'] = rows;
    document.getElementById('schema').style['grid-template-columns'] = '[Monday] 1fr [Tuesday] 1fr [Wednesday] 1fr [Thursday] 1fr [Friday] 1fr';
   
    let week = new Week([
        new Lesson('0935', '1055', 'Monday', 'Civics', 'UNS'),
        new Lesson('1215', '1330', 'Monday', 'Mathematics', 'NMP'),
        new Lesson('1340', '1455', 'Monday', 'English', 'CLF'),
        new Lesson('0805', '0925', 'Tuesday', 'Mathematics', 'NMP'),
        new Lesson('0940', '1050', 'Tuesday', 'Engineering', 'DCH'),
        new Lesson('1110', '1225', 'Tuesday', 'Religion', 'EDB'),
        new Lesson('1305', '1430', 'Tuesday', 'Swedish', 'KKM'),
        new Lesson('1110', '1220', 'Wednesday', 'Engineering', 'DCH'),
        new Lesson('1335', '1440', 'Wednesday', 'Mathematics', 'NMP'),
        new Lesson('0810', '0925', 'Thursday', 'English', 'CLF'),
        new Lesson('0945', '1110', 'Thursday', 'Civics', 'UNS'),
        new Lesson('1150', '1305', 'Thursday', 'Physics', 'BAI'),
        new Lesson('1315', '1435', 'Thursday', 'Religion', 'EDB'),
        new Lesson('1450', '1625', 'Thursday', 'Computer', 'DCH'),
        new Lesson('0935', '1100', 'Friday', 'Swedish', 'KKM'),
        new Lesson('1140', '1255', 'Friday', 'Physics', 'BAI'),
        new Lesson('1300', '1420', 'Friday', 'Computer', 'DCH'),
        new Lesson('1435', '1550', 'Friday', 'Mathematics', 'NMP')
    ]);

    colorDict = {
        Religion: new ColorScheme('rgb(0, 0, 160)'),
        English: new ColorScheme('rgb(0, 240, 0)'),
        Swedish: new ColorScheme('rgb(0, 128, 128)'),
        Mathematics: new ColorScheme('rgb(0, 255, 255)'),
        Civics: new ColorScheme('rgb(0, 0, 160)'),
        Physics: new ColorScheme('rgb(0, 0, 255)'),
        Engineering: new ColorScheme('rgb(255, 0, 0)'),
        Computer: new ColorScheme('rgb(255, 0, 0)'),
        UNS: 'rgb(250, 233, 0)',
        NMP: 'rgb(0, 29, 250)',
        CLF: 'rgb(0, 246, 250)',
        DCH: 'rgb(163, 16, 0)',
        EDB: 'rgb(0, 106, 163)',
        KKM: 'rgb(33, 163, 0)',
        BAI: 'rgb(222, 53, 11)'
    };

    week.add();
}

function iToTime(i){
    let hour = `${Math.floor(i / 60)}`;
    let min = `${Math.round((i / 60 - Math.floor(i / 60)) * 60)}`;
    if(hour.length < 2) hour = '0' + hour;
    if(min.length < 2) min = '0' + min;
    return hour + min;
}

class Week{
    constructor(lessons){
        this.lessons = lessons;
    }
 
    add(){
        this.lessons.forEach(lesson => {
            var div = document.createElement('div');
            div.innerHTML = lesson.name;
            div.style.padding = '1rem'
            div.style['grid-column'] = lesson.day;
            div.style.color = colorDict[lesson.name].color;
            div.style['grid-row'] = lesson.start + '/' + lesson.end;
            div.style.background = colorDict[lesson.name].background;
            div.style['box-shadow'] = `5px 5px 0px ${colorDict[lesson.name].shadow}`;

            var triangle = document.createElement('div');
            triangle.innerHTML = lesson.teacher;

            div.appendChild(triangle);
            document.getElementById('schema').appendChild(div);
        });
    }
}

class Lesson{
    constructor(lesson_start_time, lesson_end_time, lesson_day, lesson_name, lesson_teacher_name){
        this.start = `Time-${lesson_start_time}`;
        this.end = `Time-${lesson_end_time}`;
        this.teacher = lesson_teacher_name;
        this.name = lesson_name;
        this.day = lesson_day;
    }
}

class ColorScheme{
    constructor(background){
        this.background = background;
        this.shadow = this.getShadowColor();
        this.color = this.getContrastingColor();
    }

    getContrastingColor(){
        let rgb = this.background.replace(/[^\d,]/g, '').split(',');
        if(rgb[0] * 0.213 + rgb[1] * 0.715 + rgb[2] * 0.072 > 0.5 * 255) return 'rgb(0, 0, 0)';
        else return 'rgb(255, 255, 255)';
    }

    getShadowColor(){
        let rgb = this.background.replace(/[^\d,]/g, '').split(',');
        return `rgb(${rgb[0] * 0.5}, ${rgb[1] * 0.5}, ${rgb[2] * 0.5})`;
    }
}