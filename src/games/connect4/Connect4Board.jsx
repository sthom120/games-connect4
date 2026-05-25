import { useState } from "react";
import { COLUMNS, isColumnAvailable } from "./connect4Logic";

/*
  Connect4Board

  This component shows the Connect 4 board and the column buttons.

  The visual board is mostly for sighted users.
  For screen-reader users, this file also creates a plain-English board summary
  so the game state is easier to understand.
*/

function Connect4Board({
  board,
  onColumnClick,
  disabled,
  fallingCounter,
  winningCells,
}) {
  const [highlightedColumn, setHighlightedColumn] = useState(null);

  function handleColumnClick(columnIndex) {
    if (disabled) {
      return;
    }

    onColumnClick(columnIndex);
  }

  function handleColumnEnter(columnIndex) {
    if (!disabled) {
      setHighlightedColumn(columnIndex);
    }
  }

  function handleColumnLeave() {
    setHighlightedColumn(null);
  }

  function isWinningCell(rowIndex, columnIndex) {
    if (!winningCells) {
      return false;
    }

    return winningCells.some(
      (cell) => cell.row === rowIndex && cell.column === columnIndex
    );
  }

  // Turns the board value into a clearer label for screen readers.
  function getCounterLabel(cell) {
    if (cell === "red") {
      return "your red counter";
    }

    if (cell === "yellow") {
      return "the phone's yellow counter";
    }

    return "empty";
  }

  // Counts how many counters are currently on the board.
  function countCounters(counterColour) {
    return board.flat().filter((cell) => cell === counterColour).length;
  }

  // Gives a short overall status that can be announced when the board changes.
  function getBoardStatus() {
    const redCounterCount = countCounters("red");
    const yellowCounterCount = countCounters("yellow");

    const availableColumns = Array.from({ length: COLUMNS }, (_, columnIndex) =>
      isColumnAvailable(board, columnIndex) ? columnIndex + 1 : null
    ).filter(Boolean);

    const availableColumnText =
      availableColumns.length > 0
        ? availableColumns.join(", ")
        : "none";

    return `Board status. You have ${redCounterCount} red counters. The phone has ${yellowCounterCount} yellow counters. Available columns: ${availableColumnText}.`;
  }

  // Gives a fuller description of each column from bottom to top.
  // This is useful because Connect 4 pieces stack upward from the bottom.
  function getColumnSummary(columnIndex) {
    const cellsFromBottomToTop = [...board]
      .reverse()
      .map((row) => getCounterLabel(row[columnIndex]));

    return `Column ${columnIndex + 1}, from bottom to top: ${cellsFromBottomToTop.join(
      ", "
    )}.`;
  }

  return (
    <div className="connect-board-area">
      <div className="column-buttons" aria-label="Choose a column">
        {Array.from({ length: COLUMNS }, (_, columnIndex) => {
          const columnIsAvailable = isColumnAvailable(board, columnIndex);
          const isHighlighted = highlightedColumn === columnIndex;

          return (
            <button
              key={columnIndex}
              type="button"
              className={`column-button ${
                isHighlighted ? "column-button-highlighted" : ""
              }`}
              onClick={() => handleColumnClick(columnIndex)}
              onMouseEnter={() => handleColumnEnter(columnIndex)}
              onMouseLeave={handleColumnLeave}
              onFocus={() => handleColumnEnter(columnIndex)}
              onBlur={handleColumnLeave}
              onTouchStart={() => handleColumnEnter(columnIndex)}
              disabled={disabled || !columnIsAvailable}
              aria-label={
                columnIsAvailable
                  ? `Drop your red counter in column ${columnIndex + 1}`
                  : `Column ${columnIndex + 1} is full`
              }
            >
              <span aria-hidden="true">↓</span>
            </button>
          );
        })}
      </div>

      <div className="visually-hidden" role="status" aria-live="polite">
        {getBoardStatus()}
      </div>

      <div className="visually-hidden">
        <h2>Connect 4 board layout</h2>
        <p>
          The board has 7 columns. Each column is described from bottom to top.
        </p>

        <ul>
          {Array.from({ length: COLUMNS }, (_, columnIndex) => (
            <li key={columnIndex}>{getColumnSummary(columnIndex)}</li>
          ))}
        </ul>
      </div>

      <div className="connect-board" aria-hidden="true">
        {board.map((row, rowIndex) =>
          row.map((cell, columnIndex) => {
            const isHighlighted = highlightedColumn === columnIndex;
            const winningCell = isWinningCell(rowIndex, columnIndex);

            return (
              <div
                key={`${rowIndex}-${columnIndex}`}
                className={`connect-cell 
                  ${cell ? `cell-${cell}` : ""} 
                  ${isHighlighted ? "cell-highlighted-column" : ""}
                  ${winningCell ? "winning-cell" : ""}
                `}
              ></div>
            );
          })
        )}

        {fallingCounter && (
          <div className="falling-layer">
            <div
              className={`falling-counter cell-${fallingCounter.player}`}
              style={{
                gridColumn: fallingCounter.columnIndex + 1,
                gridRow: fallingCounter.rowIndex + 1,
              }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Connect4Board;