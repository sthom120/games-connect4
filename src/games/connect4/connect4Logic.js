// Basic Connect 4 settings.
// Keeping these here makes the game easier to change later.

export const ROWS = 6;
export const COLUMNS = 7;

export const EMPTY = null;
export const PLAYER = "red";
export const PHONE = "yellow";

// Creates a fresh empty board.
export function createEmptyBoard() {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLUMNS }, () => EMPTY)
  );
}

// Finds the lowest empty space in a selected column.
// This is like gravity in the real Connect 4 game.
export function findLowestEmptyRow(board, columnIndex) {
  for (let row = ROWS - 1; row >= 0; row--) {
    if (board[row][columnIndex] === EMPTY) {
      return row;
    }
  }

  return null;
}

// Checks if a column still has space.
export function isColumnAvailable(board, columnIndex) {
  return findLowestEmptyRow(board, columnIndex) !== null;
}

// Finds all columns that still have space.
export function getAvailableColumns(board) {
  const availableColumns = [];

  for (let column = 0; column < COLUMNS; column++) {
    if (isColumnAvailable(board, column)) {
      availableColumns.push(column);
    }
  }

  return availableColumns;
}

// Adds a counter to the board if the column is not full.
export function dropCounter(board, columnIndex, player) {
  const rowIndex = findLowestEmptyRow(board, columnIndex);

  if (rowIndex === null) {
    return board;
  }

  const newBoard = board.map((row) => [...row]);
  newBoard[rowIndex][columnIndex] = player;

  return newBoard;
}

// Checks whether every column is full.
export function isBoardFull(board) {
  return getAvailableColumns(board).length === 0;
}

// Finds the exact four cells that made someone win.
// This lets us highlight the winning counters on the board.
export function getWinningCells(board, player) {
  const directions = [
    [0, 1], // across
    [1, 0], // down
    [1, 1], // diagonal down-right
    [1, -1], // diagonal down-left
  ];

  for (let row = 0; row < ROWS; row++) {
    for (let column = 0; column < COLUMNS; column++) {
      if (board[row][column] !== player) {
        continue;
      }

      for (const [rowStep, columnStep] of directions) {
        const possibleWinningCells = [{ row, column }];

        for (let step = 1; step < 4; step++) {
          const nextRow = row + rowStep * step;
          const nextColumn = column + columnStep * step;

          const isInsideBoard =
            nextRow >= 0 &&
            nextRow < ROWS &&
            nextColumn >= 0 &&
            nextColumn < COLUMNS;

          if (!isInsideBoard) {
            break;
          }

          if (board[nextRow][nextColumn] === player) {
            possibleWinningCells.push({
              row: nextRow,
              column: nextColumn,
            });
          } else {
            break;
          }
        }

        if (possibleWinningCells.length === 4) {
          return possibleWinningCells;
        }
      }
    }
  }

  return null;
}

// Keeps our older winner check simple.
// Other files can still ask, "Did this player win?"
export function checkForWinner(board, player) {
  return getWinningCells(board, player) !== null;
}