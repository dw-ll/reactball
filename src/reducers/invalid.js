const invalidReducer = (state = false, action) => {
  switch (action.type) {
    case "invalidAction":
      return (state = action.isInvalid);
    default:
      return state;
  }
};
export default invalidReducer;
