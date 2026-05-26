import { EMPTY, INVALID, MARBLE } from "./marbleSolitaireLogic";

/*
  MarbleSolitaireBoard

  This component displays the Marble Solitaire board.

  It receives the board state from MarbleSolitairePage and tells the page
  which hole the user tapped.
*/

function MarbleSolitaireBoard({
  board,
  selectedMarble,
  validMoves,
  onHoleClick,
}) {
  function isSelectedMarble(rowIndex, columnIndex) {
    return (
      selectedMarble &&
      selectedMarble.row === rowIndex &&
      selectedMarble.column === columnIndex
    );
  }

  function isValidDestination(rowIndex, columnIndex) {
    return validMoves.some(
      (move) => move.toRow === rowIndex && move.toColumn === columnIndex
    );
  }

  function getCellLabel(cell, rowIndex, columnIndex) {
    const rowNumber = rowIndex + 1;
    const columnNumber = columnIndex + 1;

    if (isSelectedMarble(rowIndex, columnIndex)) {
      return `Selected marble in row ${rowNumber}, column ${columnNumber}`;
    }

    if (isValidDestination(rowIndex, columnIndex)) {
      return `Valid move. Jump to row ${rowNumber}, column ${columnNumber}`;
    }

    if (cell === MARBLE) {
      return `Marble in row ${rowNumber}, column ${columnNumber}`;
    }

    if (cell === EMPTY) {
      return `Empty hole in row ${rowNumber}, column ${columnNumber}`;
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
            const isSelected = isSelectedMarble(rowIndex, columnIndex);
            const isValidMove = isValidDestination(rowIndex, columnIndex);

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
                className={[
                  "marble-hole",
                  isSelected ? "marble-hole-selected" : "",
                  isValidMove ? "marble-hole-valid-move" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-label={getCellLabel(cell, rowIndex, columnIndex)}
                aria-pressed={isSelected}
                onClick={() => onHoleClick(rowIndex, columnIndex)}
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