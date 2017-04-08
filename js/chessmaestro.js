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
				matchedPieces = position.match(re),
				numberOfPieces = matchedPieces !== null ? matchedPieces.length : 0,
				valueOfPiece = piece.value;

			positionScore += numberOfPieces * valueOfPiece;
		});

		return positionScore;
	}

	function getBestMove(position) {
		var chess = new Chess(),
			moves = [],
			bestMoveScore,
			bestMove;

		chess.load(position);

		moves = chess.moves();

		moves.forEach(function(move) {
			chess.move(move);

			var thisMoveScore = getPositionScore(chess.ascii());
			console.log("Score: " + thisMoveScore);

			if (thisMoveScore > bestMoveScore || typeof bestMoveScore === "undefined") {
				bestMoveScore = thisMoveScore;
				bestMove = move;

				console.log(bestMove);
			};

			chess.undo();
		});

		return bestMove;
	}

	function moveRandomPiece() {
		// Get the current board position
		var boardPositionFen = chess.fen();

		// Perform best move
		chess.move(getBestMove(boardPositionFen));

		// Update the board
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