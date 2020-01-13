const playerDataReducer = (state = {}, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "SUCCESS":
      var newData = {};
      newData[action.name] = action.obj;
      return Object.assign({}, state, newData);
    // eslint-disable-next-line no-fallthrough
    case "FAIL":
      return state;

    default:
      return state;
  }
};
export default playerDataReducer;
