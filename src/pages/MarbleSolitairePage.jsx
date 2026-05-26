import { useState } from "react";
import MarbleSolitaireBoard from "../games/marbleSolitaire/MarbleSolitaireBoard";
import {
  countMarbles,
  createStartingBoard,
} from "../games/marbleSolitaire/marbleSolitaireLogic";

/*
  MarbleSolitairePage

  This page controls the Marble Solitaire game screen.

  At this stage, it shows the starting board only.
  The actual move behaviour will be added in the next sprint item.
*/

function MarbleSolitairePage({ onBackToGames }) {
  const [board] = useState(createStartingBoard());

  const marblesRemaining = countMarbles(board);

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
        <p className="turn-message">Choose a marble to move.</p>

        <p className="marble-count">
          Marbles remaining: <strong>{marblesRemaining}</strong>
        </p>

        <MarbleSolitaireBoard board={board} />
      </section>
    </main>
  );
}

export default MarbleSolitairePage;