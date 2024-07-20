// variables to activates css rule
const X_CLASS = 'x'; 
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const winningMessageElement = document.getElementById("winningMessage");
const winningTextMessageElement = document.querySelector('[winning-message-text]');

const restartBtn = document.getElementById('restartButton');

const cellElements = document.querySelectorAll('[data-cell]'); //targeting all cells in js
let circleTurn;

startGame();

function startGame() {
    circleTurn = false;
    
    //bind all cells to event click and run handleClick
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener
        cell.addEventListener('click', handleClick, { once: true})
    });
    setGameBoardHoverClass();
    winningMessageElement.classList.remove('show');
}

//function to handle everything when click happen
function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    
    placeMark(cell, currentClass);

    if(checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()){
        endGame(true);
    } else {
        switchTurn();
        setGameBoardHoverClass();
    }
}

function isDraw() {
     return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(CIRCLE_CLASS);
     })
}

function endGame(draw) {
    if (draw) {
        winningTextMessageElement.innerText = "Draw!"
    } else {
        winningTextMessageElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show');
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);

}

// after placing a mark on a grid we need to swap turn
function switchTurn() {
    return circleTurn = !circleTurn;
}

// set the hover helps players with turn and available cells
function setGameBoardHoverClass(currentClass) {
    const gameBoard = document.getElementById('gameBoard');

    gameBoard.classList.remove(X_CLASS);
    gameBoard.classList.remove(CIRCLE_CLASS);

    if (circleTurn) {
        gameBoard.classList.add(CIRCLE_CLASS);
    } else {
        gameBoard.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}

restartBtn.addEventListener('click', startGame);