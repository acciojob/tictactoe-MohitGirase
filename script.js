//your JS code here. If required.
let player1 = "";
let player2 = "";
let currentPlayer = "";
const messageBox = document.querySelector(".message");

document.getElementById("submit").onclick = function () {
	player1 = document.getElementById("player1").value.trim();
	player2 = document.getElementById("player2").value.trim();

	if (!player1 || !player2) {
		alert("Please enter both player names");
		return;
	}

	document.getElementById("players").style.display = "none";
	document.getElementById("board").style.display = "block";

	currentPlayer = player1;
	messageBox.textContent = `${currentPlayer}, you're up`;
};

const cells = document.querySelectorAll(".cell");
let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;
const winningPatterns = [
	[0,1,2], [3,4,5], [6,7,8], // rows
	[0,3,6], [1,4,7], [2,5,8], // columns
	[0,4,8], [2,4,6]          // diagonals
];

cells.forEach(cell => {
	cell.onclick = function () {
		if (gameOver) return;

		let index = parseInt(cell.id) - 1;

		if (board[index] !== "") return;

		board[index] = currentPlayer === player1 ? "x" : "o";
		cell.textContent = board[index];

		if (checkWinner()) {
			messageBox.textContent = `${currentPlayer} congratulations you won!`;
			gameOver = true;
			return;
		}
		
		if (board.every(v => v !== "")) {
			messageBox.textContent = "It's a draw!";
			gameOver = true;
			return;
		}
		
		currentPlayer = currentPlayer === player1 ? player2 : player1;
		messageBox.textContent = `${currentPlayer}, you're up`;
	};
});

function checkWinner() {
	return winningPatterns.some(pattern => {
		let [a, b, c] = pattern;
		if(board[a] !== "" && board[a] === board[b] && board[b] === board[c]){
			document.getElementById(`${a + 1}`).style.backgroundColor = "purple";
			document.getElementById(`${b + 1}`).style.backgroundColor = "purple";
			document.getElementById(`${c + 1}`).style.backgroundColor = "purple";
			return true;
		}
		return false;
	});
}