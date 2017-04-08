(function() {
	var chess = new Chess(),
		boardOptions = {
			"draggable": true,
			"position": "start",
			"onDrop": reactToMove
		}
		board = ChessBoard("board", boardOptions);

	function getPositionScore(position) {
		var positionScore = 0,
			enemyPieces = [
			{
				"indicator": "P",
				"value": 1
			},
			{
				"indicator": "N",
				"value": 3
			},
			{
				"indicator": "B"
				"value": 3
			},
			{
				"indicator": "R",
				"value": 5
			},
			{
				"indicator": "Q",
				"value": 9
			},
			{
				"indicator": "K",
				"value": 100
			}
		];

		enemyPieces.forEach(function (piece) {
			var re = new RegExp(piece.indicator, "g");
			positionScore += position.match(re).length * piece.value;
		});

		return positionScore;
	}

	function moveRandomPiece() {
		// Make a list of all the moves
		var moves = chess.moves(),

		// Get the current board position
			boardPosition = chess.ascii();

		// Assign a score to the current board position, reset the board "high score"

			// The score is based on how many enemy (human) pieces are on the board

		// Try out the first move
		// Compare the move to the "high score" -- if greater, assign move as "best move," otherwise do nothing
		// Cycle through list of moves
		var move = moves[Math.floor(Math.random() * moves.length)];

		// Once all moves have been cycled through, perform the best move
		chess.move(move);

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