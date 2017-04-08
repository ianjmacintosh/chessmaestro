(function() {
	var chess = new Chess(),
		boardOptions = {
			"draggable": true,
			"position": "start",
			"onDrop": reactToMove
		}
		board = ChessBoard("board", boardOptions);

	function moveRandomPiece() {
		// Make a list of all the moves
		var moves = chess.moves();

		// Get the current board position
		// A few options here for what could be a good board position:
		// ## chessboard.js
		// ## chess.js
		var move = moves[Math.floor(Math.random() * moves.length)];
		chess.move(move);

		// Assign a score to the current board position, reset the board "high score"
		// Try out the first move
		// Compare the move to the "high score" -- if greater, assign move as "best move," otherwise do nothing
		// Cycle through list of moves
		// Once all moves have been cycled through, perform the best move

		board.position(chess.fen());

		if (chess.in_checkmate() === true) {
			alert("Checkmate! You lose!");
		}
	}

	function reactToMove(source, target) {
		var move = chess.move({
			"from": source,
			"to": target,
			"promotion": "q"
		});

		if (move === null) {
			return "snapback";
		}
		if (chess.in_checkmate() === true) {
			alert("Checkmate! You win!");
			return;
		}

		window.setTimeout(moveRandomPiece, 250);
	}
}());