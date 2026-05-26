import { useState } from "react";
import MarbleSolitaireBoard from "../games/marbleSolitaire/MarbleSolitaireBoard";
import {
  applyMove,
  countMarbles,
  createStartingBoard,
  EMPTY,
  getValidMovesForMarble,
  hasValidMoves,
  MARBLE,
} from "../games/marbleSolitaire/marbleSolitaireLogic";

/*
  MarbleSolitairePage

  This page controls the Marble Solitaire game screen.

  It keeps track of:
  - the board
  - the selected marble
  - the current message shown to the player
  - whether the game has ended
  - whether the player solved the puzzle or simply ran out of moves

  The board display is handled by MarbleSolitaireBoard.
  The game rules are handled by marbleSolitaireLogic.js.
*/

function MarbleSolitairePage({ onBackToGames }) {
  const [board, setBoard] = useState(createStartingBoard());
  const [selectedMarble, setSelectedMarble] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameResult, setGameResult] = useState(null);
  const [statusMessage, setStatusMessage] = useState(
    "Choose a marble to move."
  );

  const marblesRemaining = countMarbles(board);

  const validMoves = selectedMarble
    ? getValidMovesForMarble(
        board,
        selectedMarble.row,
        selectedMarble.column
      )
    : [];

  function handleNewGame() {
    setBoard(createStartingBoard());
    setSelectedMarble(null);
    setGameOver(false);
    setGameResult(null);
    setStatusMessage("Choose a marble to move.");
  }

  function handleHoleClick(rowIndex, columnIndex) {
    if (gameOver) {
      return;
    }

    const selectedCell = board[rowIndex][columnIndex];

    // If the user taps a marble, select it.
    if (selectedCell === MARBLE) {
      const movesForThisMarble = getValidMovesForMarble(
        board,
        rowIndex,
        columnIndex
      );

      if (movesForThisMarble.length === 0) {
        setSelectedMarble(null);
        setStatusMessage("That marble has no available moves. Choose another.");
        return;
      }

      setSelectedMarble({
        row: rowIndex,
        column: columnIndex,
      });

      setStatusMessage("Now choose where to jump.");
      return;
    }

    // If the user taps an empty hole, check whether the selected marble can jump there.
    if (selectedCell === EMPTY) {
      if (!selectedMarble) {
        setStatusMessage("Choose a marble first.");
        return;
      }

      const matchingMove = validMoves.find(
        (move) => move.toRow === rowIndex && move.toColumn === columnIndex
      );

      if (!matchingMove) {
        setStatusMessage(
          "That move is not available. Choose a highlighted hole or pick another marble."
        );
        return;
      }

      const updatedBoard = applyMove(
        board,
        matchingMove.fromRow,
        matchingMove.fromColumn,
        matchingMove.toRow,
        matchingMove.toColumn
      );

      const updatedMarbleCount = countMarbles(updatedBoard);

      setBoard(updatedBoard);
      setSelectedMarble(null);

      if (!hasValidMoves(updatedBoard)) {
        setGameOver(true);

        if (updatedMarbleCount === 1) {
          setGameResult("solved");
          setStatusMessage("Amazing! You solved it with one marble left.");
        } else {
          setGameResult("finished");
          setStatusMessage(
            `No moves left. You finished with ${updatedMarbleCount} marbles.`
          );
        }

        return;
      }

      setStatusMessage("Good move. Choose another marble.");
    }
  }

  return (
    <main className="marble-page">
      <header className="connect-header">
        <div className="connect-header-actions">
          <button
            type="button"
            className="back-button"
            onClick={onBackToGames}
          >
            <span aria-hidden="true">←</span>
            Back to Games
          </button>
        </div>

        <h1>Marble Solitaire</h1>

        <p>
          Jump marbles over each other and try to leave as few as possible.
        </p>
      </header>

      <section className="connect-game-card">
        <p className="turn-message" role="status" aria-live="polite">
          {statusMessage}
        </p>

        <p className="marble-count">
          Marbles remaining: <strong>{marblesRemaining}</strong>
        </p>

        <MarbleSolitaireBoard
  board={board}
  selectedMarble={selectedMarble}
  validMoves={validMoves}
  onHoleClick={handleHoleClick}
  gameOver={gameOver}
/>

{!gameOver && (
  <button
    type="button"
    className="new-game-button marble-new-game-button"
    onClick={handleNewGame}
  >
    New Game
  </button>
)}

{gameOver && (
          <div
            className={`marble-game-over-panel marble-game-over-${gameResult}`}
            role="status"
            aria-live="polite"
          >
            <div className="marble-game-over-sparkles" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>

            <h2>
              {gameResult === "solved" ? "You solved it!" : "Round complete"}
            </h2>

            <p>
              {gameResult === "solved"
                ? "Beautiful work. You finished with one marble left."
                : `No moves left. You finished with ${marblesRemaining} marbles.`}
            </p>

            <button
              type="button"
              className="new-game-button"
              onClick={handleNewGame}
            >
              Play Again
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default MarbleSolitairePage;