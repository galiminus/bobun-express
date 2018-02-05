export function loadBoard(board) {
  return { type: "LOAD_BOARD", board };
}

export function setBoard(board) {
  return { type: "SET_BOARD", board };
}
