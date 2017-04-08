(function() {
	var chess = new Chess(),
		boardOptions = {
			"draggable": true,
			"position": "start",
			"onDrop": reactToMove
		}
		board = ChessBoard("board", boardOptions);

	function getPositionScore(position) {
		var positionScore = -3, // This is silly, but it's to offset the "b" that indicates the second file
			enemyPieces = [
			{
				"indicator": "P",
				"value": -1
			},
			{
				"indicator": "N",
				"value": -3
			},
			{
				"indicator": "B",
				"value": -3
			},
			{
				"indicator": "R",
				"value": -5
			},
			{
				"indicator": "Q",
				"value": -9
			},
			{
				"indicator": "K",
				"value": -100
			},
			{
				"indicator": "p",
				"value": 1
			},
			{
				"indicator": "n",
				"value": 3
			},
			{
				"indicator": "b",
				"value": 3
			},
			{
				"indicator": "r",
				"value": 5
			},
			{
				"indicator": "q",
				"value": 9
			},
			{
				"indicator": "k",
				"value": 100
			}
		];

		enemyPieces.forEach(function (piece) {
			var re = new RegExp(piece.indicator, "g"),
				numberOfPieces = position.match(re).length,
				valueOfPiece = piece.value;
			positionScore += numberOfPieces * valueOfPiece;
			console.log("I see %s %ss, they're each worth %s, score is %s", numberOfPieces, piece.indicator, valueOfPiece, positionScore);
		});

		return positionScore;
	}

	function moveRandomPiece() {
		// Make a list of all the moves
		var moves = chess.moves(),

		// Get the current board position
			boardPositionAscii = chess.ascii(),
			boardPositionFen = chess.fen();

		console.log(chess.ascii());

		// Assign a score to the current board position, reset the board "high score"
			bestPosition = getPositionScore(boardPositionAscii);
			console.log("Current board scores a " + bestPosition);
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