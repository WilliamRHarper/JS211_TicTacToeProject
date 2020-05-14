'use strict';

// brings in the assert module for unit testing
const assert = require('assert');
// brings in the readline module to access the command line
const readline = require('readline');
// use the readline module to print out to the command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// creates and empty "board" for the user to see where marks can be placed.
// using let because the variable is expected to change with more 'X's and 'O's to add
let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

// assigns the first mark as 'X'
// using let because the variable is expected to change from 'X' to 'O' and back
let playerTurn = 'X';

// is a function that print the current status of the board using the variable - board
const printBoard = () => {
  console.log('   0  1  2');
  console.log('0 ' + board[0].join(' | '));
  console.log('  ---------');
  console.log('1 ' + board[1].join(' | '));
  console.log('  ---------');
  console.log('2 ' + board[2].join(' | '));
}

const horizontalWin = () => {
  // Your code here to check for horizontal wins
  const xwins = (currentValue) => currentValue == 'X';
  const owins = (currentValue) => currentValue == 'O';
  if (board[0].every(xwins) || board[0].every(owins)) {
    return true;
  }
  else if (board[1].every(xwins) || board[1].every(owins)) {
    return true;
  }
  else if (board[2].every(xwins) || board[2].every(owins)) {
    return true;
  }
}

const verticalWin = () => {
  // Your code here to check for vertical wins
  if ((board[0][0] == 'X' && board[1][0] == 'X' && board[2][0] == 'X') || (board[0][0] == 'O' && board[1][0] == 'O' && board[2][0] == 'O')) {
    return true;
  }
  else if ((board[0][1] == 'X' && board[1][1] == 'X' && board[2][1] == 'X') || (board[0][1] == 'O' && board[1][1] == 'O' && board[2][1] == 'O')) {
    return true;
  }
  else if ((board[0][2] == 'X' && board[1][2] == 'X' && board[2][2] == 'X') || (board[0][2] == 'O' && board[1][2] == 'O' && board[2][2] == 'O')) {
    return true;
  }  
}

const diagonalWin = () => {
  // Your code here to check for diagonal wins
  if ((board[0][0] == 'X' && board[1][1] == 'X' && board[2][2] == 'X') || (board[0][0] == 'O' && board[1][1] == 'O' && board[2][2] == 'O')) {
    return true;
}
  else if ((board[0][2] == 'X' && board[1][1] == 'X' && board[2][0] == 'X') || (board[0][2] == 'O' && board[1][1] == 'O' && board[2][0] == 'O')) {
    return true;
  }
}

const checkForWin = () => {
  // Your code here call each of the check for types of wins
  if (diagonalWin() === true) {
    board = [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' ']
    ];
    console.log(playerTurn + " wins!!");
    return true;
  }
  else if (horizontalWin() === true) {
    board = [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' ']
    ];
    console.log(playerTurn + " wins!!");
    return true;
  }
  else if (verticalWin() === true) {
    board = [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' ']
    ];
    console.log(playerTurn + " wins!!");
    return true;
  }
}

const ticTacToe = (row, column) => {
  // Your code here to place a marker on the board
  if (row == '0' && column == '0') {
    board[0].splice(0,1, playerTurn);
  }
  else if (row == '0' && column == '1'){
    board[0].splice(1,1, playerTurn);
  }
  else if (row == '0' && column == '2'){
    board[0].splice(2,1, playerTurn);
  }
  else if (row == '1' && column == '0'){
    board[1].splice(0,1, playerTurn);
  }
  else if (row == '1' && column == '1'){
    board[1].splice(1,1, playerTurn);
  }
  else if (row == '1' && column == '2'){
    board[1].splice(2,1, playerTurn);
  }
  else if (row == '2' && column == '0'){
    board[2].splice(0,1, playerTurn);
  }
  else if (row == '2' && column == '1'){
    board[2].splice(1,1, playerTurn);
  }
  else if (row == '2' && column == '2'){
    board[2].splice(2,1, playerTurn);
  }
   checkForWin();
   changePlayerTurn();
  // then check for a win
}

const changePlayerTurn = () => {
  if (playerTurn === 'X') {
    playerTurn = 'O';
  }else {
    playerTurn = 'X';
  }
}




const getPrompt = () => {
  printBoard();
  console.log("It's Player " + playerTurn + "'s turn.");
  rl.question('row: ', (row) => {
    rl.question('column: ', (column) => {
      ticTacToe(row, column);
      getPrompt();
    });
  });
}


// Unit Tests
// You use them run the command: npm test main.js
// to close them ctrl + C
if (typeof describe === 'function') {

  describe('#ticTacToe()', () => {
    it('should place mark on the board', () => {
      ticTacToe(1, 1);
      assert.deepEqual(board, [ [' ', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should alternate between players', () => {
      ticTacToe(0, 0);
      assert.deepEqual(board, [ ['O', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should check for vertical wins', () => {
      board = [ [' ', 'X', ' '], [' ', 'X', ' '], [' ', 'X', ' '] ];
      assert.equal(verticalWin(), true);
    });
    it('should check for horizontal wins', () => {
      board = [ ['X', 'X', 'X'], [' ', ' ', ' '], [' ', ' ', ' '] ];
      assert.equal(horizontalWin(), true);
    });
    it('should check for diagonal wins', () => {
      board = [ ['X', ' ', ' '], [' ', 'X', ' '], [' ', ' ', 'X'] ];
      assert.equal(diagonalWin(), true);
    });
    it('should detect a win', () => {
      assert.equal(checkForWin(), true);
    });
  });
} else {

  getPrompt();

}
