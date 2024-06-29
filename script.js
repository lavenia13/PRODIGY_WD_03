const board = document.getElementById('board');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (e) => {
    const clickedCell = e.target;
    const cellIndex = parseInt(clickedCell.getAttribute('data-cell'));

    if (gameState[cellIndex] !== '' || !gameActive) return;

    gameState[cellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer === 'X' ? 'x' : 'o');

    if (checkWin()) {
        status.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        highlightWinningCells();
        return;
    }

    if (!gameState.includes('')) {
        status.textContent = 'It\'s a draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
};

const checkWin = () => {
    return winningConditions.some((condition) => {
        return condition.every((index) => {
            return gameState[index] === currentPlayer;
        });
    });
};

const highlightWinningCells = () => {
    winningConditions.forEach((condition) => {
        const [a, b, c] = condition;
        const cells = document.querySelectorAll(`.cell[data-cell="${a}"], .cell[data-cell="${b}"], .cell[data-cell="${c}"]`);
        cells.forEach(cell => {
            cell.style.backgroundColor = '#ffc107';
            cell.style.color = '#fff';
        });
    });
};

const handleReset = () => {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    status.textContent = `Player ${currentPlayer}'s turn`;

    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
        cell.style.backgroundColor = '#ddd';
        cell.style.color = '#000';
    });
};

board.addEventListener('click', handleCellClick);
resetButton.addEventListener('click', handleReset);
