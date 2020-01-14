const graphDataReducer = (
  state = {
    labels: [],
    datasets: [{ label: "Points", data: [], backgroundColor: [] }]
  },
  action
) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "ADD_DATA":
      if (
        action.label_name !== undefined &&
        action.data !== undefined &&
        action.color !== undefined
      ) {
        state.labels.push(action.label_name);
        state.datasets[0].data.push(action.data);
        state.datasets[0].backgroundColor.push(action.color);
        return state;
      } else {
        return state;
      }

    // eslint-disable-next-line no-fallthrough
    case "DELETE":
      delete state[action.name];
      break;

    default:
      return state;
  }
};
export default graphDataReducer;
