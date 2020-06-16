var board = getCleanBoard();
var pieces = getCleanPieces();
var mov = [];
var last;
const color = {
    blkSq: '#507050',
    whtSq: '#f0f0f0',
    whtPosMv: '#ffa0a0',
    whtKilMv: '#ff5050',
    blkPosMv: '#ee8585',
    blkKilMv: '#ee3030'
};

window.onload = function(){
    prepareTable();
    prepareSquares();
    drawBoard();
}

function click(e){
    if(mov.includes(e.target.id)) {
        move(last, e.target.id);
        mov = [];
        drawBoard();
    }
    else {
        drawBoard();
        let piece = pieces[e.target.id]; 
        if(piece === 'pd' || piece === 'pl') mov = pawnMoves(e.target.id, board);
        if(piece === 'rd' || piece === 'rl') mov = rookMoves(e.target.id, board);
        if(piece === 'kd' || piece === 'kl') mov = kingMoves(e.target.id, board);
        if(piece === 'nd' || piece === 'nl') mov = knightMoves(e.target.id, board);
        if(piece === 'bd' || piece === 'bl') mov = bishopMoves(e.target.id, board);
        if(piece === 'qd' || piece === 'ql') mov = [].concat(rookMoves(e.target.id, board), bishopMoves(e.target.id, board));
        colorPossibleMoves(mov);
        last = e.target.id;
    }
}

function colorPossibleMoves(moves){
    moves.forEach(sq => {
        if((sq.charCodeAt(0) + sq.charCodeAt(1) + 1) % 2 === 0){
            if(pieces[sq].length !== 1) document.getElementById(sq).style.backgroundColor = color['whtKilMv'];
            else document.getElementById(sq).style.backgroundColor = color['whtPosMv'];
        } else {
            if(pieces[sq].length !== 1) document.getElementById(sq).style.backgroundColor = color['blkKilMv'];
            else document.getElementById(sq).style.backgroundColor = color['blkPosMv'];
        }
    });
}

function kingMoves(square, board){
    var moves = [];
    if(board[an2i(square) - 11] !== -1 && pieces[board[an2i(square) - 11]][1] !== pieces[square][1]) moves.push(board[an2i(square) - 11]);
    if(board[an2i(square) - 10] !== -1 && pieces[board[an2i(square) - 10]][1] !== pieces[square][1]) moves.push(board[an2i(square) - 10]);
    if(board[an2i(square) - 9] !== -1 && pieces[board[an2i(square) - 9]][1] !== pieces[square][1]) moves.push(board[an2i(square) - 9]);
    if(board[an2i(square) - 1] !== -1 && pieces[board[an2i(square) - 1]][1] !== pieces[square][1]) moves.push(board[an2i(square) - 1]);
    if(board[an2i(square) + 1] !== -1 && pieces[board[an2i(square) + 1]][1] !== pieces[square][1]) moves.push(board[an2i(square) + 1]);
    if(board[an2i(square) + 9] !== -1 && pieces[board[an2i(square) + 9]][1] !== pieces[square][1]) moves.push(board[an2i(square) + 9]);
    if(board[an2i(square) + 10] !== -1 && pieces[board[an2i(square) + 10]][1] !== pieces[square][1]) moves.push(board[an2i(square) + 10]);
    if(board[an2i(square) + 11] !== -1 && pieces[board[an2i(square) + 11]][1] !== pieces[square][1]) moves.push(board[an2i(square) + 11]);
    return moves;
}

function pawnMoves(square, board){
    var moves = [];
    if(pieces[square][1] === 'd' && board[an2i(square) + 10] !== -1){
        if(pieces[board[an2i(square) + 10]].length === 1){
            moves.push(board[an2i(square) + 10]);
            if(square[1] == 7 && pieces[board[an2i(square) + 20]].length === 1){
                moves.push(board[an2i(square) + 20]);
            }
        }
        if(pieces[board[an2i(square) + 9]][1] == 'l'){
            moves.push(board[an2i(square) + 9]);
        }
        if(pieces[board[an2i(square) + 11]][1] == 'l'){
            moves.push(board[an2i(square) + 11]);
        }
    }
    if(pieces[square][1] === 'l' && board[an2i(square) - 10] !== -1){
        if(pieces[board[an2i(square) - 10]].length === 1){
            moves.push(board[an2i(square) - 10]);
            if(square[1] == 2 && pieces[board[an2i(square) - 20]].length === 1){
                moves.push(board[an2i(square) - 20]);
            }
        }
        if(pieces[board[an2i(square) - 9]][1] == 'd'){
            moves.push(board[an2i(square) - 9]);
        }
        if(pieces[board[an2i(square) - 11]][1] == 'd'){
            moves.push(board[an2i(square) - 11]);
        }
    }
    return moves;
}

function rookMoves(square, board) {
    var oSlide = function(direction) {
        return slide(square, direction, board);
    }
    return [].concat(oSlide(1), oSlide(-1), oSlide(10), oSlide(-10)); 
}

function knightMoves(square, board) {
    var i = an2i(square);
    var moves = [];
    [8, 12, 19, 21].forEach(function(offset) {
        [i + offset, i - offset].forEach(function(pos) {
            if (board[pos] != -1) {
                if(pieces[i2an(pos)].length === 1){
                    moves.push(board[pos]);
                } else if(pieces[i2an(pos)][1] !== pieces[square][1]){
                    moves.push(board[pos]);
                }
            } 
        });
    });
    return moves;
}

function bishopMoves(square, board) {
    var oSlide = function(direction) {
        return slide(square, direction, board);
    }
    return [].concat(oSlide(11), oSlide(-11), oSlide(9), oSlide(-9));
}

function slide(square, direction, board) {
    var moves = [];
    for(var pos = direction + an2i(square); board[pos] != -1; pos += direction) {
        if(pieces[i2an(pos)].length === 1){
            moves.push(board[pos]);
        } else if(pieces[i2an(pos)][1] !== pieces[square][1]){
            moves.push(board[pos]);
            break;
        } else if(pieces[i2an(pos)][1] == pieces[square][1]) break
    }
    return moves;
}

function prepareTable(){
    let table = document.getElementById('table');
    for(let row = 8; row > 0; row -- ) table.style['grid-template-rows'] += `[row-${row}] 1fr `;
    for(let col = 0; col < 8; col ++ ) table.style['grid-template-columns'] += `[col-${String.fromCharCode(97 + col)}] 1fr `;
    table.addEventListener('click', click)
}

function prepareSquares(){
    board.forEach(sq => {
        if(sq !== -1){
            var div = document.createElement('div');
            div.id = sq;
            div.style['grid-column'] = `col-${sq[0]}`;
            div.style['grid-row'] = `row-${sq[1]}`;
            div.style.display = 'flex';
            div.style.justifyContent = 'center';
            div.style.alignItems = 'center';
            div.style.backgroundColor = '#fff';
            document.getElementById('table').appendChild(div);
        }
    });
}

function drawBoard(){
    var img;
    var square;
    board.forEach(sq => {
        if(sq !== -1){
            square = document.getElementById(sq);
            if((sq.charCodeAt(0) + sq.charCodeAt(1) + 1) % 2 === 0) square.style.background = color['whtSq'];
            else square.style.background = color['blkSq'];
            square.innerHTML = '';
            if(pieces[sq] !== '0'){
                img = document.createElement("img");
                img.style['pointer-events'] = 'none';
                img.src = `../img/${pieces[sq]}.svg`;
                square.appendChild(img);
            } 
        }
    });
}

function getCleanBoard(){
    var row = [];
    for(var i = 0; i < 120; i++) row.push((i < 20 || i > 100 || !(i % 10) || i % 10 == 9) ? -1 : i2an(i));
    return row;
}

function getCleanPieces(){
    return {
        a8: 'rd', b8: 'nd', c8: 'bd', d8: 'qd', e8: 'kd', f8: 'bd', g8: 'nd', h8: 'rd',
        a7: 'pd', b7: 'pd', c7: 'pd', d7: 'pd', e7: 'pd', f7: 'pd', g7: 'pd', h7: 'pd', 
        a6: '0', b6: '0', c6: '0', d6: '0', e6: '0', f6: '0', g6: '0', h6: '0',
        a5: '0', b5: '0', c5: '0', d5: '0', e5: '0', f5: '0', g5: '0', h5: '0',
        a4: '0', b4: '0', c4: '0', d4: '0', e4: '0', f4: '0', g4: '0', h4: '0',
        a3: '0', b3: '0', c3: '0', d3: '0', e3: '0', f3: '0', g3: '0', h3: '0',
        a2: 'pl', b2: 'pl', c2: 'pl', d2: 'pl', e2: 'pl', f2: 'pl', g2: 'pl', h2: 'pl',
        a1: 'rl', b1: 'nl', c1: 'bl', d1: 'ql', e1: 'kl', f1: 'bl', g1: 'nl', h1: 'rl',
    }
}

function i2an(i) {
    return "abcdefgh"[(i % 10) - 1] + (10 - Math.floor(i / 10));
}

function an2i(square) {
    return "abcdefgh".indexOf(square[0]) + 1 + (10 - square[1]) * 10;
}

function move(from, to){
    pieces[to] = pieces[from];
    pieces[from] = '0';
}