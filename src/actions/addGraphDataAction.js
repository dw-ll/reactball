export const addGraphData = (name, data, color) => {
  return {
    type: "ADD_DATA",
    label_name: name,
    data: data,
    color: color
  };
};
