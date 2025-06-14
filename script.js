const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");

let cells = [];
let currentPlayer = "X";
let gameMode = null;
let gameActive = true;

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function setMode(mode) {
  gameMode = mode;
  startScreen.style.display = "none";
  gameScreen.style.display = "block";
  resetGame();
}

function createBoard() {
  boardElement.innerHTML = "";
  cells = Array(9).fill(null);
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => handleMove(i));
    boardElement.appendChild(cell);
  }
}

function handleMove(index) {
  if (!gameActive || cells[index]) return;

  cells[index] = currentPlayer;
  boardElement.children[index].textContent = currentPlayer;

  const win = checkWin();
  if (win) {
    statusElement.textContent = `${currentPlayer} Wins!`;
    highlightWinner(win);
    gameActive = false;
    return;
  }

  if (cells.every(cell => cell)) {
    statusElement.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusElement.textContent = `${currentPlayer}'s Turn`;

  if (gameMode === "computer" && currentPlayer === "O") {
    setTimeout(computerMove, 500);
  }
}

function computerMove() {
  const emptyIndices = cells
    .map((cell, i) => (cell === null ? i : null))
    .filter(i => i !== null);

  const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  handleMove(randomIndex);
}

function checkWin() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return pattern;
    }
  }
  return null;
}

function highlightWinner(pattern) {
  for (let index of pattern) {
    boardElement.children[index].classList.add("winner");
  }
}

function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  statusElement.textContent = `${currentPlayer}'s Turn`;
  createBoard();
}

function goHome() {
  gameScreen.style.display = "none";
  startScreen.style.display = "block";
}
