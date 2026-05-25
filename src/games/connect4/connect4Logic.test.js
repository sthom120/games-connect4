import { describe, expect, test } from "vitest";
import {
  createEmptyBoard,
  dropCounter,
  findLowestEmptyRow,
  getWinningCells,
  isBoardFull,
  PLAYER,
  PHONE,
} from "./connect4Logic";

/*
  Basic tests for the Connect 4 game logic.

  These tests check the rules of the game without opening the browser.
  That makes it easier to safely improve the app later without accidentally
  breaking Connect 4.
*/

describe("Connect 4 logic", () => {
  test("creates an empty 6 row by 7 column board", () => {
    const board = createEmptyBoard();

    expect(board).toHaveLength(6);
    expect(board[0]).toHaveLength(7);

    const allCellsAreEmpty = board.flat().every((cell) => !cell);

    expect(allCellsAreEmpty).toBe(true);
  });

  test("finds the lowest empty row in an empty column", () => {
    const board = createEmptyBoard();

    expect(findLowestEmptyRow(board, 0)).toBe(5);
  });

  test("drops a player counter into the bottom of a column", () => {
    const board = createEmptyBoard();
    const updatedBoard = dropCounter(board, 0, PLAYER);

    expect(updatedBoard[5][0]).toBe(PLAYER);
  });

  test("stacks counters in the same column", () => {
    let board = createEmptyBoard();

    board = dropCounter(board, 0, PLAYER);
    board = dropCounter(board, 0, PHONE);

    expect(board[5][0]).toBe(PLAYER);
    expect(board[4][0]).toBe(PHONE);
  });

  test("detects a vertical win", () => {
    let board = createEmptyBoard();

    board = dropCounter(board, 0, PLAYER);
    board = dropCounter(board, 0, PLAYER);
    board = dropCounter(board, 0, PLAYER);
    board = dropCounter(board, 0, PLAYER);

    const winningCells = getWinningCells(board, PLAYER);

    expect(winningCells).not.toBe(null);
    expect(winningCells).toHaveLength(4);
  });

  test("detects a horizontal win", () => {
    let board = createEmptyBoard();

    board = dropCounter(board, 0, PLAYER);
    board = dropCounter(board, 1, PLAYER);
    board = dropCounter(board, 2, PLAYER);
    board = dropCounter(board, 3, PLAYER);

    const winningCells = getWinningCells(board, PLAYER);

    expect(winningCells).not.toBe(null);
    expect(winningCells).toHaveLength(4);
  });

  test("detects when the board is not full", () => {
    const board = createEmptyBoard();

    expect(isBoardFull(board)).toBe(false);
  });
});