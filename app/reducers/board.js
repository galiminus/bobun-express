export default function (state = null, action) {
    switch (action.type) {
    case "SET_BOARD":
      return action.board;
    default:
      return state;
    }
}
