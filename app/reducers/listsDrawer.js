export default function (state = false, action) {
    switch (action.type) {
    case "TOGGLE_LISTS_DRAWER":
      return !state;
    case "@@router/LOCATION_CHANGE":
      return false;
    default:
        return state;
    }
}
