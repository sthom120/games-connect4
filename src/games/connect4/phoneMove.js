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

// Checks if playing in a column would accidentally give
// the opponent a winning move straight after.
function wouldAllowOpponentToWin(board, column, currentPlayer, opponent) {
  const testBoard = dropCounter(board, column, currentPlayer);
  const opponentWinningColumn = findWinningColumn(testBoard, opponent);

  return opponentWinningColumn !== null;
}

// Checks whether a move creates a future winning chance.
// Example: the phone plays a move, and after that it has
// a possible winning column on its next turn.
function findThreatMakingColumn(board, player, possibleColumns) {
  for (const column of possibleColumns) {
    const testBoard = dropCounter(board, column, player);
    const futureWinningColumn = findWinningColumn(testBoard, player);

    if (futureWinningColumn !== null) {
      return column;
    }
  }

  return null;
}

// Chooses a sensible fallback column.
// The centre is usually strongest in Connect 4.
function choosePreferredColumn(availableColumns) {
  const preferredColumns = [3, 2, 4, 1, 5, 0, 6];

  for (const column of preferredColumns) {
    if (availableColumns.includes(column)) {
      return column;
    }
  }

  return availableColumns[0] ?? null;
}

// The phone chooses its move in a smarter order.
export function choosePhoneMove(board) {
  const availableColumns = getAvailableColumns(board);

  if (availableColumns.length === 0) {
    return null;
  }

  // 1. If the phone can win now, it should take that move.
  const phoneWinningColumn = findWinningColumn(board, PHONE);

  if (phoneWinningColumn !== null) {
    return phoneWinningColumn;
  }

  // 2. If the player can win next, the phone should block.
  const playerWinningColumn = findWinningColumn(board, PLAYER);

  if (playerWinningColumn !== null) {
    return playerWinningColumn;
  }

  // 3. Avoid moves that let the player win immediately after.
  const safeColumns = availableColumns.filter(
    (column) => !wouldAllowOpponentToWin(board, column, PHONE, PLAYER)
  );

  // If every move is dangerous, still choose from the available columns.
  const columnsToUse = safeColumns.length > 0 ? safeColumns : availableColumns;

  // 4. Try to create a future winning chance for the phone.
  const phoneThreatColumn = findThreatMakingColumn(
    board,
    PHONE,
    columnsToUse
  );

  if (phoneThreatColumn !== null) {
    return phoneThreatColumn;
  }

  // 5. Stop the player from setting up a future winning chance.
  const playerThreatColumn = findThreatMakingColumn(
    board,
    PLAYER,
    columnsToUse
  );

  if (playerThreatColumn !== null) {
    return playerThreatColumn;
  }

  // 6. Otherwise, choose the strongest available position.
  return choosePreferredColumn(columnsToUse);
}