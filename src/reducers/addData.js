const dataReducer = (state = {}, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "ADD":
      var newData = {};
      newData[action.name] = action.id;
      return Object.assign({}, state, newData);
    // eslint-disable-next-line no-fallthrough
    case "DELETE":
      delete state[action.name];
      break;

    default:
      return state;
  }
};
export default dataReducer;
