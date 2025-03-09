//your JS code here. If required.
document.querySelector("#submit").addEventListener("click", () => {
  const player1 = document.querySelector("#player-1").value;
  const player2 = document.querySelector("#player-2").value;
  document.querySelector("#input").classList.add("hidden");
  document.querySelector("#game").classList.remove("hidden");

  if (player1 && player2) {
    updateName(`${player1}, you're up`);
    startGame(player1, player2);
  }
});

function updateName(message) {
  document.querySelector(".message").textContent = message;
}

function startGame(player1, player2) {
  let currentPlayer = player1;
  let board = ["", "", "", "", "", "", "", "", ""];

  const cells = document.querySelectorAll(".cell");
  const messageDiv = document.querySelector(".message");

  // Function to handle cell clicks
  const handleCellClick = function () {
    const cellId = this.id - 1;
    if (board[cellId] === "") {
      // Check if the cell is empty
      board[cellId] = currentPlayer === player1 ? "X" : "O";
      this.textContent = board[cellId]; // Update the cell content

      if (checkWin(board)) {
        messageDiv.textContent = `${currentPlayer} congratulations you won!`;
        removeCellListeners(); // Remove all event listeners
      } else if (board.every((cell) => cell !== "")) {
        messageDiv.textContent = `It's a draw!`;
        removeCellListeners(); // Remove all event listeners
      } else {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        messageDiv.textContent = `${currentPlayer}, you're up`;
      }
    }
  };

  // Add event listeners to all cells
  cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
  });

  // Function to remove event listeners from all cells
  function removeCellListeners() {
    cells.forEach((cell) => {
      cell.removeEventListener("click", handleCellClick);
    });
  }
}

function checkWin(board) {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];
  return winPatterns.some(
    (pattern) =>
      board[pattern[0]] !== "" &&
      board[pattern[0]] === board[pattern[1]] &&
      board[pattern[1]] === board[pattern[2]]
  );
}
