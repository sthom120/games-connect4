/*
  Marble Solitaire logic

  This file contains the rules for Marble Solitaire.

  It does not display anything on the screen.
  It only works out:
  - what the starting board looks like
  - which spaces are valid
  - which moves are allowed
  - how to apply a move
  - how many marbles are left
  - whether any moves remain
*/

export const ROWS = 7;
export const COLUMNS = 7;

export const MARBLE = "marble";
export const EMPTY = "empty";
export const INVALID = "invalid";

// The classic English-style board is a 7 x 7 grid.
// The corners are not playable, which creates the cross shape.
export function isValidPosition(rowIndex, columnIndex) {
  const isInsideBoard =
    rowIndex >= 0 &&
    rowIndex < ROWS &&
    columnIndex >= 0 &&
    columnIndex < COLUMNS;

  if (!isInsideBoard) {
    return false;
  }

  const rowIsMiddleBand = rowIndex >= 2 && rowIndex <= 4;
  const columnIsMiddleBand = columnIndex >= 2 && columnIndex <= 4;

  return rowIsMiddleBand || columnIsMiddleBand;
}

// Creates the starting board.
// All valid spaces start with a marble except the centre space.
export function createStartingBoard() {
  return Array.from({ length: ROWS }, (_, rowIndex) =>
    Array.from({ length: COLUMNS }, (_, columnIndex) => {
      if (!isValidPosition(rowIndex, columnIndex)) {
        return INVALID;
      }

      const isCentreSpace = rowIndex === 3 && columnIndex === 3;

      return isCentreSpace ? EMPTY : MARBLE;
    })
  );
}

// Makes a copy of the board so we do not directly change the old state.
export function copyBoard(board) {
  return board.map((row) => [...row]);
}

// Counts how many marbles are currently left on the board.
export function countMarbles(board) {
  return board.flat().filter((cell) => cell === MARBLE).length;
}

// A move must jump exactly two spaces in a straight line.
// This helper finds the space in the middle.
export function getJumpedPosition(fromRow, fromColumn, toRow, toColumn) {
  return {
    row: (fromRow + toRow) / 2,
    column: (fromColumn + toColumn) / 2,
  };
}

// Checks whether a move is allowed.
export function isValidMove(board, fromRow, fromColumn, toRow, toColumn) {
  if (!isValidPosition(fromRow, fromColumn)) {
    return false;
  }

  if (!isValidPosition(toRow, toColumn)) {
    return false;
  }

  const movingCell = board[fromRow][fromColumn];
  const destinationCell = board[toRow][toColumn];

  if (movingCell !== MARBLE || destinationCell !== EMPTY) {
    return false;
  }

  const rowDifference = Math.abs(toRow - fromRow);
  const columnDifference = Math.abs(toColumn - fromColumn);

  const isHorizontalJump = rowDifference === 0 && columnDifference === 2;
  const isVerticalJump = rowDifference === 2 && columnDifference === 0;

  if (!isHorizontalJump && !isVerticalJump) {
    return false;
  }

  const jumpedPosition = getJumpedPosition(
    fromRow,
    fromColumn,
    toRow,
    toColumn
  );

  return board[jumpedPosition.row][jumpedPosition.column] === MARBLE;
}

// Finds every valid move for one selected marble.
export function getValidMovesForMarble(board, rowIndex, columnIndex) {
  if (!isValidPosition(rowIndex, columnIndex)) {
    return [];
  }

  if (board[rowIndex][columnIndex] !== MARBLE) {
    return [];
  }

  const possibleDirections = [
    { rowChange: -2, columnChange: 0 },
    { rowChange: 2, columnChange: 0 },
    { rowChange: 0, columnChange: -2 },
    { rowChange: 0, columnChange: 2 },
  ];

  return possibleDirections
    .map((direction) => {
      const toRow = rowIndex + direction.rowChange;
      const toColumn = columnIndex + direction.columnChange;
      const jumpedPosition = getJumpedPosition(
        rowIndex,
        columnIndex,
        toRow,
        toColumn
      );

      return {
        fromRow: rowIndex,
        fromColumn: columnIndex,
        toRow,
        toColumn,
        jumpedRow: jumpedPosition.row,
        jumpedColumn: jumpedPosition.column,
      };
    })
    .filter((move) =>
      isValidMove(
        board,
        move.fromRow,
        move.fromColumn,
        move.toRow,
        move.toColumn
      )
    );
}

// Finds every valid move on the board.
export function getAllValidMoves(board) {
  const validMoves = [];

  board.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      if (cell === MARBLE) {
        validMoves.push(
          ...getValidMovesForMarble(board, rowIndex, columnIndex)
        );
      }
    });
  });

  return validMoves;
}

// Checks whether the game can continue.
export function hasValidMoves(board) {
  return getAllValidMoves(board).length > 0;
}

// Applies a valid move and returns a new board.
// If the move is not valid, the board is returned unchanged.
export function applyMove(board, fromRow, fromColumn, toRow, toColumn) {
  if (!isValidMove(board, fromRow, fromColumn, toRow, toColumn)) {
    return board;
  }

  const jumpedPosition = getJumpedPosition(
    fromRow,
    fromColumn,
    toRow,
    toColumn
  );

  const updatedBoard = copyBoard(board);

  updatedBoard[fromRow][fromColumn] = EMPTY;
  updatedBoard[jumpedPosition.row][jumpedPosition.column] = EMPTY;
  updatedBoard[toRow][toColumn] = MARBLE;

  return updatedBoard;
}