import { useState } from "react";
import Connect4Board from "../games/connect4/Connect4Board";
import {
  createEmptyBoard,
  dropCounter,
  findLowestEmptyRow,
  getWinningCells,
  isBoardFull,
  PLAYER,
  PHONE,
} from "../games/connect4/connect4Logic";
import { choosePhoneMove } from "../games/connect4/phoneMove";
import {
  playDropSound,
  playWinSound,
  playDrawSound,
} from "../utils/soundEffects";

/*
  Connect4Page

  This page controls the Connect 4 game screen.

  It keeps track of:
  - the board
  - whose turn it is
  - whether the phone is thinking
  - whether the game is over
  - the falling counter animation
  - the winning cells

  The actual board display is handled by Connect4Board.
  The game rules are handled by connect4Logic.js.
  The phone's move choice is handled by phoneMove.js.
*/

// These values control the timing of the small pauses and animations.
// Keeping them here makes them easy to adjust later.
const DROP_ANIMATION_TIME = 850;
const PHONE_THINKING_TIME = 600;

function Connect4Page({
  onBackToGames,
  soundOn,
  onSoundToggle,
  difficulty,
  onDifficultyChange,
}) {
  // The main Connect 4 board.
  // Each cell is either empty, red, or yellow.
  const [board, setBoard] = useState(createEmptyBoard());

  // The message shown above the board.
  // This changes as the game moves through each turn.
  const [turnMessage, setTurnMessage] = useState("Your turn");

  // Stops the player from tapping while the phone is choosing a move.
  const [isPhoneThinking, setIsPhoneThinking] = useState(false);

  // Tracks whether the game has finished.
  // When this is true, the board is disabled until the user starts a new game.
  const [gameOver, setGameOver] = useState(false);

  // Used for the falling counter animation.
  // This is separate from the real board so the board layout does not jump.
  const [fallingCounter, setFallingCounter] = useState(null);

  // Stores the four winning cells so they can be highlighted.
  const [winningCells, setWinningCells] = useState(null);

  // The board is busy while a counter is falling or the phone is thinking.
  // This prevents double-taps and accidental moves during animations.
  const isBusy = isPhoneThinking || fallingCounter !== null;

  // Checks whether a move has ended the game.
  // This is used after both the player's move and the phone's move.
  function finishGameCheck(updatedBoard, player) {
    const winningResult = getWinningCells(updatedBoard, player);

    if (winningResult) {
      setWinningCells(winningResult);

      if (player === PLAYER) {
        setTurnMessage("You won!");
      } else {
        setTurnMessage("The phone won.");
      }

      playWinSound(soundOn);
      setGameOver(true);
      return true;
    }

    if (isBoardFull(updatedBoard)) {
      setTurnMessage("It’s a draw.");
      playDrawSound(soundOn);
      setGameOver(true);
      return true;
    }

    return false;
  }

  // Handles the player's move when they tap a column.
  function handleColumnClick(columnIndex) {
    if (isBusy || gameOver) {
      return;
    }

    const playerRowIndex = findLowestEmptyRow(board, columnIndex);

    if (playerRowIndex === null) {
      setTurnMessage("That column is full. Try another one.");
      return;
    }

    // Show the player's falling counter first.
    setTurnMessage("Dropping your counter...");
    setFallingCounter({
      rowIndex: playerRowIndex,
      columnIndex,
      player: PLAYER,
    });

    // After the animation finishes, update the real board.
    setTimeout(() => {
      const boardAfterPlayerMove = dropCounter(board, columnIndex, PLAYER);

      setBoard(boardAfterPlayerMove);
      setFallingCounter(null);
      playDropSound(soundOn);

      const playerFinishedGame = finishGameCheck(
        boardAfterPlayerMove,
        PLAYER
      );

      if (playerFinishedGame) {
        return;
      }

      // Now let the phone take its turn.
      setTurnMessage("Phone is thinking...");
      setIsPhoneThinking(true);

      setTimeout(() => {
        const phoneColumn = choosePhoneMove(boardAfterPlayerMove, difficulty);

        if (phoneColumn === null) {
          setTurnMessage("It’s a draw.");
          playDrawSound(soundOn);
          setGameOver(true);
          setIsPhoneThinking(false);
          return;
        }

        const phoneRowIndex = findLowestEmptyRow(
          boardAfterPlayerMove,
          phoneColumn
        );

        // Show the phone's falling counter.
        setTurnMessage("Phone is playing...");
        setFallingCounter({
          rowIndex: phoneRowIndex,
          columnIndex: phoneColumn,
          player: PHONE,
        });

        // After the animation finishes, update the real board.
        setTimeout(() => {
          const boardAfterPhoneMove = dropCounter(
            boardAfterPlayerMove,
            phoneColumn,
            PHONE
          );

          setBoard(boardAfterPhoneMove);
          setFallingCounter(null);
          setIsPhoneThinking(false);
          playDropSound(soundOn);

          const phoneFinishedGame = finishGameCheck(
            boardAfterPhoneMove,
            PHONE
          );

          if (!phoneFinishedGame) {
            setTurnMessage("Your turn");
          }
        }, DROP_ANIMATION_TIME);
      }, PHONE_THINKING_TIME);
    }, DROP_ANIMATION_TIME);
  }

  // Resets the game back to a clean board.
  function handleNewGame() {
    if (isBusy) {
      return;
    }

    setBoard(createEmptyBoard());
    setTurnMessage("Your turn");
    setIsPhoneThinking(false);
    setGameOver(false);
    setFallingCounter(null);
    setWinningCells(null);
  }

  return (
    <main className="connect-page">
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

          <button
            type="button"
            className="sound-toggle"
            onClick={onSoundToggle}
            aria-pressed={soundOn}
          >
            <span aria-hidden="true">{soundOn ? "🔊" : "🔇"}</span>
            {soundOn ? "Sound On" : "Sound Off"}
          </button>
        </div>

        <h1>Connect 4</h1>

        <p>You are red. The phone is yellow.</p>

        <section
          className="difficulty-panel"
          aria-label="Choose phone skill level"
        >
          <p className="difficulty-label">Phone skill</p>

          <div className="difficulty-buttons">
            <button
              type="button"
              className={
                difficulty === "easy"
                  ? "difficulty-button difficulty-button-active"
                  : "difficulty-button"
              }
              onClick={() => onDifficultyChange("easy")}
              disabled={isBusy}
              aria-pressed={difficulty === "easy"}
            >
              Easy
            </button>

            <button
              type="button"
              className={
                difficulty === "normal"
                  ? "difficulty-button difficulty-button-active"
                  : "difficulty-button"
              }
              onClick={() => onDifficultyChange("normal")}
              disabled={isBusy}
              aria-pressed={difficulty === "normal"}
            >
              Normal
            </button>
          </div>
        </section>
      </header>

      <section className="connect-game-card">
        <p className="turn-message" role="status" aria-live="polite">
          {turnMessage}
        </p>

        <Connect4Board
          board={board}
          onColumnClick={handleColumnClick}
          disabled={isBusy || gameOver}
          fallingCounter={fallingCounter}
          winningCells={winningCells}
        />

        <div className="how-to-play-box">
          <h2>How to play</h2>
          <ol>
            <li>You are red.</li>
            <li>Tap a column to drop your counter.</li>
            <li>Try to get 4 in a row.</li>
          </ol>
        </div>

        <button
          type="button"
          className="new-game-button"
          onClick={handleNewGame}
          disabled={isBusy}
        >
          {gameOver ? "Play Again" : "New Game"}
        </button>
      </section>
    </main>
  );
}

export default Connect4Page;