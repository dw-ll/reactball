const graphReboundsDataReducer = (
  graphAssists = {
    labels: [],
    datasets: [
      {
        label: "Rebounds",
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: []
      }
    ]
  },
  action
) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "ADD_REBOUNDS":
      if (
        action.label_name !== undefined &&
        action.data !== undefined &&
        action.color !== undefined
      ) {
        graphAssists.labels.push(action.label_name);
        graphAssists.datasets[0].data.push(action.data);
        graphAssists.datasets[0].backgroundColor.push(action.color);
        graphAssists.datasets[0].hoverBackgroundColor.push("rgb(43,43,43)");

        return graphAssists;
      } else {
        return graphAssists;
      }
    default:
      return graphAssists;
  }
};
export default graphReboundsDataReducer;
