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

// Chooses a sensible fallback column.
// The centre is usually strongest in Connect 4.
function choosePreferredColumn(availableColumns) {
  const preferredColumns = [3, 2, 4, 1, 5, 0, 6];

  const sensibleColumns = preferredColumns.filter((column) =>
    availableColumns.includes(column)
  );

  const randomIndex = Math.floor(Math.random() * sensibleColumns.length);

  return sensibleColumns[randomIndex] ?? null;
}

// EASY MODE
// This is the original friendly version.
// The phone can win and block, but it does not think too far ahead.
function chooseEasyPhoneMove(board) {
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
  return choosePreferredColumn(availableColumns);
}

// Checks whether a move would accidentally give
// the opponent a winning move straight after.
function wouldAllowOpponentToWin(board, column, currentPlayer, opponent) {
  const testBoard = dropCounter(board, column, currentPlayer);
  const opponentWinningColumn = findWinningColumn(testBoard, opponent);

  return opponentWinningColumn !== null;
}

// Checks whether a move creates a future winning chance.
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

// NORMAL MODE
// This version is more strategic.
// It tries not to make moves that give the player an easy win.
function chooseNormalPhoneMove(board) {
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

  // If every move is risky, still choose from the available columns.
  const columnsToUse = safeColumns.length > 0 ? safeColumns : availableColumns;

  // 4. Try to create a future winning chance for the phone.
  const phoneThreatColumn = findThreatMakingColumn(board, PHONE, columnsToUse);

  if (phoneThreatColumn !== null) {
    return phoneThreatColumn;
  }

  // 5. Stop the player from setting up a future winning chance.
  const playerThreatColumn = findThreatMakingColumn(board, PLAYER, columnsToUse);

  if (playerThreatColumn !== null) {
    return playerThreatColumn;
  }

  // 6. Otherwise, choose the strongest available position.
  return choosePreferredColumn(columnsToUse);
}

// Main function used by the game.
// Default is normal, so the app will still work even before
// we add a difficulty button to the screen.
export function choosePhoneMove(board, difficulty = "normal") {
  if (difficulty === "easy") {
    return chooseEasyPhoneMove(board);
  }

  return chooseNormalPhoneMove(board);
}