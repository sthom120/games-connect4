import { describe, expect, test } from "vitest";
import {
  applyMove,
  countMarbles,
  createStartingBoard,
  EMPTY,
  getAllValidMoves,
  getJumpedPosition,
  getValidMovesForMarble,
  hasValidMoves,
  INVALID,
  isValidMove,
  isValidPosition,
  MARBLE,
} from "./marbleSolitaireLogic";

/*
  Basic tests for Marble Solitaire logic.

  These tests check the rules of the game without opening the browser.
  This helps protect the game as the app grows.
*/

describe("Marble Solitaire logic", () => {
  test("creates a 7 by 7 board", () => {
    const board = createStartingBoard();

    expect(board).toHaveLength(7);
    expect(board[0]).toHaveLength(7);
  });

  test("marks the corner spaces as invalid", () => {
    const board = createStartingBoard();

    expect(board[0][0]).toBe(INVALID);
    expect(board[0][1]).toBe(INVALID);
    expect(board[1][0]).toBe(INVALID);
    expect(board[6][6]).toBe(INVALID);
  });

  test("marks the centre space as empty at the start", () => {
    const board = createStartingBoard();

    expect(board[3][3]).toBe(EMPTY);
  });

  test("starts with 32 marbles", () => {
    const board = createStartingBoard();

    expect(countMarbles(board)).toBe(32);
  });

  test("recognises valid and invalid board positions", () => {
    expect(isValidPosition(3, 3)).toBe(true);
    expect(isValidPosition(0, 3)).toBe(true);
    expect(isValidPosition(3, 0)).toBe(true);

    expect(isValidPosition(0, 0)).toBe(false);
    expect(isValidPosition(1, 1)).toBe(false);
    expect(isValidPosition(-1, 3)).toBe(false);
    expect(isValidPosition(7, 3)).toBe(false);
  });

  test("finds the jumped position between two spaces", () => {
    expect(getJumpedPosition(3, 1, 3, 3)).toEqual({
      row: 3,
      column: 2,
    });

    expect(getJumpedPosition(1, 3, 3, 3)).toEqual({
      row: 2,
      column: 3,
    });
  });

  test("finds the four opening moves", () => {
    const board = createStartingBoard();
    const validMoves = getAllValidMoves(board);

    expect(validMoves).toHaveLength(4);
  });

  test("finds valid moves for a specific marble", () => {
    const board = createStartingBoard();
    const validMoves = getValidMovesForMarble(board, 3, 1);

    expect(validMoves).toContainEqual({
      fromRow: 3,
      fromColumn: 1,
      toRow: 3,
      toColumn: 3,
      jumpedRow: 3,
      jumpedColumn: 2,
    });
  });

  test("allows a valid opening move", () => {
    const board = createStartingBoard();

    expect(isValidMove(board, 3, 1, 3, 3)).toBe(true);
  });

  test("rejects a diagonal move", () => {
    const board = createStartingBoard();

    expect(isValidMove(board, 2, 2, 4, 4)).toBe(false);
  });

  test("applies a valid move and removes the jumped marble", () => {
    const board = createStartingBoard();
    const updatedBoard = applyMove(board, 3, 1, 3, 3);

    expect(updatedBoard[3][1]).toBe(EMPTY);
    expect(updatedBoard[3][2]).toBe(EMPTY);
    expect(updatedBoard[3][3]).toBe(MARBLE);
    expect(countMarbles(updatedBoard)).toBe(31);
  });

  test("returns the same board if the move is invalid", () => {
    const board = createStartingBoard();
    const updatedBoard = applyMove(board, 0, 0, 0, 2);

    expect(updatedBoard).toBe(board);
  });

  test("detects when valid moves are available", () => {
    const board = createStartingBoard();

    expect(hasValidMoves(board)).toBe(true);
  });

  test("detects when no valid moves remain", () => {
    const board = createStartingBoard().map((row) =>
      row.map((cell) => (cell === INVALID ? INVALID : EMPTY))
    );

    expect(hasValidMoves(board)).toBe(false);
  });
});