const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X';
let boardState = Array(9).fill(null);

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWin() {
    for (const [a, b, c] of winPatterns) {
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return boardState[a];
        }
    }
    return boardState.every(cell => cell) ? 'Tie' : null;
}

function handleClick(e) {
    const index = Array.from(cells).indexOf(e.target);
    if (boardState[index] || checkWin()) return;

    boardState[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    const winner = checkWin();
    if (winner) {
        messageElement.textContent = winner === 'Tie' ? "It's a Tie!" : `${winner} Wins!`;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function resetGame() {
    boardState = Array(9).fill(null);
    cells.forEach(cell => cell.textContent = '');
    messageElement.textContent = '';
    currentPlayer = 'X';
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
