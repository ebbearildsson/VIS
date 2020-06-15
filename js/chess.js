window.onload = function(){
    let rows = '';
    let cols = '';
    for(let row = 8; row > 0; row -- ) rows += `[row-${row}] 1fr `;
    document.getElementById('table').style['grid-template-rows'] = rows;
    for(let col = 0; col < 8; col ++ ) cols += `[col-${String.fromCharCode(97 + col)}] 1fr `;
    document.getElementById('table').style['grid-template-columns'] = cols;

    for(let row = 8; row > 0; row -- ){
        for(let col = 0; col < 8; col ++ ){
            var div = document.createElement('div');
            div.id = `${String.fromCharCode(97 + col)}${row}`;
            div.style['grid-column'] = `col-${String.fromCharCode(97 + col)}`;
            div.style['grid-row'] = `row-${row}`;
            div.style.display = 'flex';
            div.style.justifyContent = 'center';
            div.style.alignItems = 'center';
            if((col + row) % 2 === 0) div.style.background = '#f0f0f0';
            else div.style.background = '#505050';
            document.getElementById('table').appendChild(div);
        }
    }

    getPieces();
}

function getPieces(){
    var img = document.createElement("img");
    img.src = "../img/45px-Chess_rdt45.svg.png";
    document.getElementById('a8').appendChild(img);

    img = document.createElement("img");
    img.src = "../img/45px-Chess_ndt45.svg.png";
    document.getElementById('b8').appendChild(img);

    img = document.createElement("img");
    img.src = "../img/45px-Chess_bdt45.svg.png";
    document.getElementById('c8').appendChild(img);

    img = document.createElement("img");
    img.src = "../img/45px-Chess_qdt45.svg.png";
    document.getElementById('d8').appendChild(img);

    img = document.createElement("img");
    img.src = "../img/45px-Chess_kdt45.svg.png";
    document.getElementById('e8').appendChild(img);

    img = document.createElement("img");
    img.src = "../img/45px-Chess_bdt45.svg.png";
    document.getElementById('f8').appendChild(img);

    img = document.createElement("img");
    img.src = "../img/45px-Chess_ndt45.svg.png";
    document.getElementById('g8').appendChild(img);

    img = document.createElement("img");
    img.src = "../img/45px-Chess_rdt45.svg.png";
    document.getElementById('h8').appendChild(img);

    img = document.createElement("img");
    img.src = "../img/45px-Chess_rlt45.svg.png";
    document.getElementById('a1').appendChild(img);

    img = document.createElement("img");
    img.src = "../img/45px-Chess_nlt45.svg.png";
    document.getElementById('b1').appendChild(img);

    img = document.createElement("img");
    img.src = "../img/45px-Chess_blt45.svg.png";
    document.getElementById('c1').appendChild(img);

    img = document.createElement("img");
    img.src = "../img/45px-Chess_qlt45.svg.png";
    document.getElementById('d1').appendChild(img);

    img = document.createElement("img");
    img.src = "../img/45px-Chess_klt45.svg.png";
    document.getElementById('e1').appendChild(img);

    img = document.createElement("img");
    img.src = "../img/45px-Chess_blt45.svg.png";
    document.getElementById('f1').appendChild(img);

    img = document.createElement("img");
    img.src = "../img/45px-Chess_nlt45.svg.png";
    document.getElementById('g1').appendChild(img);

    img = document.createElement("img");
    img.src = "../img/45px-Chess_rlt45.svg.png";
    document.getElementById('h1').appendChild(img);

    for(let col = 0; col < 8; col ++ ){
         img = document.createElement("img");
        img.src = "../img/45px-Chess_pdt45.svg.png";
        document.getElementById(`${String.fromCharCode(97 + col)}7`).appendChild(img);

         img = document.createElement("img");
        img.src = "../img/45px-Chess_plt45.svg.png";
        document.getElementById(`${String.fromCharCode(97 + col)}2`).appendChild(img);
    }
}