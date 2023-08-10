const X_CLASS = "x";
const O_CLASS = "o";

// These are the winning combinations, each number corresponds to a space on the grid.
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const cellElements = document.querySelectorAll("[data-cell]");
const gameBoard = document.getElementById("gameBoard");
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
let OTurn;

startGame();

// Clicking the restart button will run the startGame function.
restartButton.addEventListener("click", startGame);

// When the startGame function is called, o turn is set to false,
// as the game always starts with x's turn first. Then, any cells which
// include an x or O from the previous game are removed. The event
// listeners for these cells are also removed. Next, the hover states are reapplied.
// Finally, the winning message element will be removed(A winning message would show if
// a previous game was played).

function startGame() {
  OTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setgameBoardHoverClass();
  winningMessageElement.classList.remove("show");
}

// The current class is determined depending on whether OTurn is true
// If OTurn is true, currentClass will =  O_CLASS, else it will =
// X_CLASS. Then the mark will be placed in the specified cell and it will
// resemble the current class. Finally, if the game is a draw, endGame will
// be true, else it will be false. If the game is not over yet, the turn will swap
// over to the other player and the hover states are reapplied.
function handleClick(e) {
  const cell = e.target;
  const currentClass = OTurn ? O_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setgameBoardHoverClass();
  }
}

// When the game ends, the winning message will be displayed along with
// which team won. Draw! will be displayed if the game was a draw.
function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "Draw!";
  } else {
    winningMessageTextElement.innerText = `${OTurn ? "O" : "X"} Wins!`;
  }
  winningMessageElement.classList.add("show");
}

// If every cell is filled with X or O, isDraw will be true. cellElements is
// destructured so .every() can be used.
function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}

// When this function is called the X or Cirlce will be placed on the selected cell
// , depending on the current turn.
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

// When this function is called, the turn will swap from O to X, or X to O.
function swapTurns() {
  OTurn = !OTurn;
}

// This function determines whether X or O will show when hovering over an empty cell.
function setgameBoardHoverClass() {
  gameBoard.classList.remove(X_CLASS);
  gameBoard.classList.remove(O_CLASS);
  if (OTurn) {
    gameBoard.classList.add(O_CLASS);
  } else {
    gameBoard.classList.add(X_CLASS);
  }
}

// This function checks if a player has won the game. This is checked using the winning
// combinations. If every cell inside of a combination for at least one winning combination,
// then checkWin will be true.
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
