import { describe, expect, test } from "vitest";
import { createEmptyBoard, dropCounter, PLAYER, PHONE } from "./connect4Logic";
import { choosePhoneMove } from "./phoneMove";

/*
  Basic tests for the phone player.

  These tests check two important behaviours:
  - the phone should take a winning move when it has one
  - the phone should block the player if the player is about to win

  This helps protect the Connect 4 game before adding more games later.
*/

describe("Connect 4 phone move logic", () => {
  test("phone takes a winning move when possible", () => {
    let board = createEmptyBoard();

    board = dropCounter(board, 0, PHONE);
    board = dropCounter(board, 1, PHONE);
    board = dropCounter(board, 2, PHONE);

    const chosenColumn = choosePhoneMove(board, "normal");

    expect(chosenColumn).toBe(3);
  });

  test("phone blocks the player when the player is about to win", () => {
    let board = createEmptyBoard();

    board = dropCounter(board, 0, PLAYER);
    board = dropCounter(board, 1, PLAYER);
    board = dropCounter(board, 2, PLAYER);

    const chosenColumn = choosePhoneMove(board, "normal");

    expect(chosenColumn).toBe(3);
  });
});