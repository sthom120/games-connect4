import { EMPTY, INVALID, MARBLE } from "./marbleSolitaireLogic";

/*
  MarbleSolitaireBoard

  This component displays the Marble Solitaire board.

  At this stage, it only shows:
  - the cross-shaped board
  - the marble spaces
  - the empty centre hole
  - the starting marbles

  The move/click behaviour will be added in the next sprint item.
*/

function MarbleSolitaireBoard({ board }) {
  function getCellLabel(cell, rowIndex, columnIndex) {
    if (cell === MARBLE) {
      return `Marble in row ${rowIndex + 1}, column ${columnIndex + 1}`;
    }

    if (cell === EMPTY) {
      return `Empty hole in row ${rowIndex + 1}, column ${columnIndex + 1}`;
    }

    return "";
  }

  return (
    <div className="marble-board-area">
      <div className="marble-board" aria-label="Marble Solitaire board">
        {board.map((row, rowIndex) =>
          row.map((cell, columnIndex) => {
            const isInvalidSpace = cell === INVALID;
            const isMarble = cell === MARBLE;
            const isEmpty = cell === EMPTY;

            if (isInvalidSpace) {
              return (
                <div
                  key={`${rowIndex}-${columnIndex}`}
                  className="marble-board-space marble-board-space-invalid"
                  aria-hidden="true"
                />
              );
            }

            return (
              <button
                key={`${rowIndex}-${columnIndex}`}
                type="button"
                className="marble-hole"
                aria-label={getCellLabel(cell, rowIndex, columnIndex)}
                disabled
              >
                {isMarble && <span className="marble-piece" />}
                {isEmpty && <span className="marble-empty-space" />}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

export default MarbleSolitaireBoard;