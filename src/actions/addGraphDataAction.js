export const addGraphData = (name, data, color) => {
  return {
    type: "ADD",
    label_name: name,
    data: data,
    color: color
  };
};
