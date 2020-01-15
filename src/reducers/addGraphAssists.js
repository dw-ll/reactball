const graphAssistsDataReducer = (
  graphAssists = {
    labels: [],
    datasets: [{ label: "Assists", data: [], backgroundColor: [] }]
  },
  action
) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "ADD_ASSISTS":
      if (
        action.label_name !== undefined &&
        action.data !== undefined &&
        action.color !== undefined
      ) {
        graphAssists.labels.push(action.label_name);
        graphAssists.datasets[0].data.push(action.data);
        graphAssists.datasets[0].backgroundColor.push(action.color);
        return graphAssists;
      } else {
        return graphAssists;
      }
    default:
      return graphAssists;
  }
};
export default graphAssistsDataReducer;
