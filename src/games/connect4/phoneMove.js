import {
  getAvailableColumns,
  dropCounter,
  checkForWinner,
  PLAYER,
  PHONE,
} from "./connect4Logic";

// Checks whether a player could win by dropping a counter
// into one of the available columns.
function findWinningColumn(board, player) {
  const availableColumns = getAvailableColumns(board);

  for (const column of availableColumns) {
    const testBoard = dropCounter(board, column, player);

    if (checkForWinner(testBoard, player)) {
      return column;
    }
  }

  return null;
}

// The phone chooses its move in a simple but sensible order.
export function choosePhoneMove(board) {
  const availableColumns = getAvailableColumns(board);

  if (availableColumns.length === 0) {
    return null;
  }

  // 1. If the phone can win, it should take that move.
  const phoneWinningColumn = findWinningColumn(board, PHONE);

  if (phoneWinningColumn !== null) {
    return phoneWinningColumn;
  }

  // 2. If the player is about to win, the phone should block.
  const playerWinningColumn = findWinningColumn(board, PLAYER);

  if (playerWinningColumn !== null) {
    return playerWinningColumn;
  }

  // 3. Otherwise, choose from the middle columns first.
  // In Connect 4, the centre is usually a stronger place to play.
  const preferredColumns = [3, 2, 4, 1, 5, 0, 6];

  const sensibleColumns = preferredColumns.filter((column) =>
    availableColumns.includes(column)
  );

  const randomIndex = Math.floor(Math.random() * sensibleColumns.length);

  return sensibleColumns[randomIndex];
}