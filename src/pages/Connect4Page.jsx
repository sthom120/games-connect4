import { useEffect, useState } from "react";
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

const DROP_ANIMATION_TIME = 850;
const PHONE_THINKING_TIME = 600;

function Connect4Page({ onBackToGames }) {
  const [board, setBoard] = useState(createEmptyBoard());
  const [turnMessage, setTurnMessage] = useState("Your turn");
  const [isPhoneThinking, setIsPhoneThinking] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [fallingCounter, setFallingCounter] = useState(null);
  const [winningCells, setWinningCells] = useState(null);

  const [soundOn, setSoundOn] = useState(() => {
    const savedSoundSetting = localStorage.getItem("games-sound-on");

    if (savedSoundSetting === null) {
      return true;
    }

    return savedSoundSetting === "true";
  });

  const isBusy = isPhoneThinking || fallingCounter !== null;

  useEffect(() => {
    localStorage.setItem("games-sound-on", soundOn.toString());
  }, [soundOn]);

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

  function handleColumnClick(columnIndex) {
    if (isBusy || gameOver) {
      return;
    }

    const playerRowIndex = findLowestEmptyRow(board, columnIndex);

    if (playerRowIndex === null) {
      setTurnMessage("That column is full. Try another one.");
      return;
    }

    setTurnMessage("Dropping your counter...");
    setFallingCounter({
      rowIndex: playerRowIndex,
      columnIndex,
      player: PLAYER,
    });

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

      setTurnMessage("Phone is thinking...");
      setIsPhoneThinking(true);

      setTimeout(() => {
        const phoneColumn = choosePhoneMove(boardAfterPlayerMove);

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

        setTurnMessage("Phone is playing...");
        setFallingCounter({
          rowIndex: phoneRowIndex,
          columnIndex: phoneColumn,
          player: PHONE,
        });

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

  function handleSoundToggle() {
    setSoundOn((currentSoundSetting) => !currentSoundSetting);
  }

  return (
    <main className="connect-page">
      <header className="connect-header">
        <button className="back-button" onClick={onBackToGames}>
          ← Back to Games
        </button>

        <h1>Connect 4</h1>
        <p>You are red. The phone is yellow.</p>

        <button className="sound-toggle" onClick={handleSoundToggle}>
          {soundOn ? "Sound: On" : "Sound: Off"}
        </button>
      </header>

      <section className="connect-game-card">
        <p className="turn-message">{turnMessage}</p>

        <Connect4Board
          board={board}
          onColumnClick={handleColumnClick}
          disabled={isBusy || gameOver}
          fallingCounter={fallingCounter}
          winningCells={winningCells}
        />

        <p className="game-instruction">
          Tap a column to drop your counter.
        </p>

        <button
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