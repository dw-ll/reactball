export const addGraphReboundsData = (name, data, color) => {
  return {
    type: "ADD_REBOUNDS",
    label_name: name,
    data: data,
    color: color
  };
};
