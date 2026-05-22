import { useState } from "react";
import { COLUMNS, isColumnAvailable } from "./connect4Logic";

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

  return (
    <div className="connect-board-area">
      <div className="column-buttons">
        {Array.from({ length: COLUMNS }, (_, columnIndex) => {
          const columnIsAvailable = isColumnAvailable(board, columnIndex);
          const isHighlighted = highlightedColumn === columnIndex;

          return (
            <button
              key={columnIndex}
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
              aria-label={`Drop counter in column ${columnIndex + 1}`}
            >
              ↓
            </button>
          );
        })}
      </div>

      <div className="connect-board">
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