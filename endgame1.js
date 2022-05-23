//chess endgame puzzle

let currentPos = [[], [], [], [], [], [], [], [],
                  [], [], [], [], [], [], [], [],
                  [], [], [], ["b", "k", 0], [], [], [], [],
                  [], [], [], [], [], [], [], [],
                  [], [], [], [], [], [], [], [],
                  [], [], [], [], ["w", "k", 0], [], [], [],
                  [], [], ["w", "p", 1], [], [], [], [], [],
                  [], [], [], [], [], [], [], []];

let simulPos =   [[], [], [], [], [], [], [], [],
                  [], [], [], [], [], [], [], [],
                  [], [], [], ["b", "k", 0], [], [], [], [],
                  [], [], [], [], [], [], [], [],
                  [], [], [], [], [], [], [], [],
                  [], [], [], [], ["w", "k", 0], [], [], [],
                  [], [], ["w", "q", 1], [], [], [], [], [],
                  [], [], [], [], [], [], [], []];

// [[], [[color, piece, threat, move], [...]], [],...];

let moveList =   [[], [], [], [], [], [], [], [],
                  [], [], [], [], [], [], [], [],
                  [], [], [], [], [], [], [], [],
                  [], [], [], [], [], [], [], [],
                  [], [], [], [], [], [], [], [],
                  [], [], [], [], [], [], [], [],
                  [], [], [], [], [], [], [], [],
                  [], [], [], [], [], [], [], []];

//coordinates are for checking borders

const whtPawnMove = [[0, -1], [0, -1], [-1, -1], [1, -1]];
const blkPawnMove = [[0, 1], [0, 1], [1, 1], [-1, 1]];
const queenMove = [[-1, -1], [-1, 0], [0, -1], [0, 1], [1, 1], [-1, 1], [1, -1], [1, 0]];
const kingMove = [[-1, -1], [-1, 0], [0, -1], [0, 1], [1, 1], [-1, 1], [1, -1], [1, 0]];
//let enPassant = false;

function visualizePos() {
  //add other pieces
  checkBoard();
  var stringPos = '';
  for (var i = 0; i < 64; i++) {
    if (i % 8 === 0) {
      stringPos = stringPos + '\n';
    }
    if (simulPos[i] == 0 && moveList[i] == 0) {
      stringPos = stringPos + '[ ] ';
    continue;
    }
    if (simulPos[i][0]) {
      stringPos = stringPos + '[' + simulPos[i][1] + '] ';
    continue;
    }
    if (moveList[i][0]) {
      stringPos = stringPos + '[m] ';
    continue;
    }
  }
        document.getElementById("output").innerText = stringPos;
}

function checkBoard() {
  for (var i = 0; i < 64; i++) {
    if (simulPos[i] == 0) {
      continue;
    }
    else {
      var pos = simulPos[i];
      isBlack = (pos[0] === "w") ? false : true;
      if (pos[1] === "k") {
        var repeat = false;
        (isBlack) ? blkKingPos = i : whtKingPos = i;
        listPieceMoves(i, kingMove, "k", repeat);
      }
      if (pos[1] === "p") {
        var pawnMove = (isBlack) ? blkPawnMove : whtPawnMove;
        listPawnMoves(i, pawnMove);
      }
      if (pos[1] === "q") {
        var repeat = true;
        listPieceMoves(i, queenMove, "q", repeat);
      }
    }
  }
  //finishList();
}

function listPawnMoves(index, moveset) {
  //if (crownSquare) {}
  //if (enPassant) {}
  var color = (isBlack) ? "b" : "w";
  var crownSqr = (isBlack) ? 7 : 0;
  var isStart = (isBlack) ? 1 : 6;
  var move = [color, "p", false, true];
  var threat = [color, "p", true, false];
  var x = index % 8;
  var y = (index - x) / 8;
  /*if (y === crownSqr) {
    //crownPwn()
  }*/
  for (var i = 2; i < 4; i++) {
    var a = x + moveset[i][0];
    var b = y + moveset[i][1];
    var bool = checkBorders(a, b);
    var pos = coordsToIndex(a, b);
    if (bool) {
      moveList[pos].push(threat);
    }
  }
  var isStart = (isBlack) ? 1 : 6;
  var rep = (y === isStart) ? 2 : 1;
  for (var i = 0; i < rep; i++) {
    x = x + moveset[i][0];
    y = y + moveset[i][1];
    var pos = coordsToIndex(x, y);
    if (simulPos[pos] == 0) {
      moveList[pos].push(move);
    }
  }
}

function listPieceMoves(index, moveset, piece, repeat) {
  //first check for check
  //separate function for king moves to check last?
  //castling?
  var color = (isBlack) ? "b" : "w";
  var arr = [color, piece, true, true];
  var x = index % 8;
  var y = (index - x) / 8;
  var x2 = x;
  var y2 = y;
  var length = moveset.length;
    for (var i = 0; i < length; i++) {
      x = x + moveset[i][0];
      y = y + moveset[i][1];
      var bool = checkBorders(x, y);
      var pos = coordsToIndex(x, y);
      if (bool && simulPos[pos] == 0) {
        moveList[pos].push(arr);
        if(repeat) {
          i = i - 1;
        }
        else {
          x = x2;
          y = y2;
        }
      continue;
      }
      if (bool && simulPos[pos][0]) {
        moveList[pos].push(arr);
        x = x2;
        y = y2;
      continue;
      }
      if (!bool) {
        x = x2;
        y = y2;
      continue;
      }
  }
}

/*function finishList() {

  if (moveList[whtKingPos] != 0) {

  }
  //check if check
  //getkingMoves
  //getCastling
}*/

function checkBorders(x, y) {
  var bool;
  if (x > -1 && x < 8 && y > -1 && y < 8) {
    bool = true;
  }
  else {
    bool = false;
  }
  return bool;
}

function coordsToIndex(x, y) {
  var pos = y * 8 + x;
  return pos;
}

/*function evalMoves() {

}*/

/*function getXCoord(index) {
  var x = index % 8;
  return x;
}

function getYCoord(index, x) {
  var y = (index - x) / 8;
}*/
