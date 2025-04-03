document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submit');
    const inputDiv = document.getElementById('input');
    const gameDiv = document.getElementById('game');
    const messageDiv = document.querySelector('.message');
    const cells = document.querySelectorAll('.cell');
    
    let player1Name = '';
    let player2Name = '';
    let currentPlayer = '';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameActive = false;

    submitBtn.addEventListener('click', () => {
        player1Name = document.getElementById('player-1').value.trim() || 'Player 1';
        player2Name = document.getElementById('player-2').value.trim() || 'Player 2';
        
        if (player1Name && player2Name) {
            inputDiv.classList.add('hidden');
            gameDiv.classList.remove('hidden');
            
            currentPlayer = player1Name;
            messageDiv.textContent = `${currentPlayer}, you're up`;
            gameActive = true;
            
            // Reset board
            board = ['', '', '', '', '', '', '', '', ''];
            cells.forEach(cell => {
                cell.textContent = '';
                cell.style.backgroundColor = '#f9f9f9';
            });
        }
    });

    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            if (!gameActive) return;
            
            const cellIndex = parseInt(cell.id) - 1;
            
            if (board[cellIndex] === '') {
                board[cellIndex] = currentPlayer === player1Name ? 'X' : 'O';
                cell.textContent = board[cellIndex];
                
                if (checkWin()) {
                    messageDiv.textContent = `${currentPlayer} congratulations you won!`;
                    gameActive = false;
                    highlightWinningCells();
                } else if (board.every(cell => cell !== '')) {
                    messageDiv.textContent = `It's a draw!`;
                    gameActive = false;
                } else {
                    currentPlayer = currentPlayer === player1Name ? player2Name : player1Name;
                    messageDiv.textContent = `${currentPlayer}, you're up`;
                }
            }
        });
    });

    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return board[a] !== '' && board[a] === board[b] && board[b] === board[c];
        });
    }

    function highlightWinningCells() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];

        const winningPattern = winPatterns.find(pattern => {
            const [a, b, c] = pattern;
            return board[a] !== '' && board[a] === board[b] && board[b] === board[c];
        });

        if (winningPattern) {
            winningPattern.forEach(index => {
                document.getElementById((index + 1).toString()).style.backgroundColor = '#a5d6a7';
            });
        }
    }
});