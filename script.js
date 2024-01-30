let board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
let currentPlayer = 'X';
let gameActive = false;
let gameMode = '';

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function startGame(mode) {
  gameMode = mode;
  gameActive = true;
  document.getElementById('board').style.display = 'inline-block';
  resetBoard();
}

function resetBoard() {
  board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
  currentPlayer = 'X';
  updateBoardDisplay();
  document.getElementById('result').textContent = '';
}

function makeMove(cellIndex) {
  if (gameActive && board[cellIndex] === ' ') {
    board[cellIndex] = currentPlayer;
    document.getElementById(`cell-${cellIndex}`).textContent = currentPlayer;
    checkWinner();
    togglePlayer();
    if (gameMode === 'single' && currentPlayer === 'O' && gameActive) {
      makeComputerMove();
    }
  }
}

function togglePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function makeComputerMove() {
  const emptyCells = board.reduce((acc, cell, index) => {
    if (cell === ' ') {
      acc.push(index);
    }
    return acc;
  }, []);

  if (emptyCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    makeMove(emptyCells[randomIndex]);
  }
}

function checkWinner() {
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] !== ' ' && board[a] === board[b] && board[b] === board[c]) {
      gameActive = false;
      highlightWinningCells(a, b, c);
      displayResult(`Player ${board[a]} wins!`);
      return;
    }
  }

  if (!board.includes(' ')) {
    gameActive = false;
    displayResult("It's a draw!");
  }
}

function highlightWinningCells(a, b, c) {
  document.getElementById(`cell-${a}`).classList.add('winning-cell');
  document.getElementById(`cell-${b}`).classList.add('winning-cell');
  document.getElementById(`cell-${c}`).classList.add('winning-cell');
}

function displayResult(result) {
  document.getElementById('result').textContent = result;
}

function resetGame() {
  board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
  currentPlayer = 'X';
  gameActive = false;

  const cells = document.getElementsByTagName('td');
  for (let cell of cells) {
    cell.textContent = '';
    cell.classList.remove('winning-cell');
  }

  document.getElementById('result').textContent = '';
  document.getElementById('board').style.display = 'none';
}
