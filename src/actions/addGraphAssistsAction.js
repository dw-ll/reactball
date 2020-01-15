export const addGraphAssistsData = (name, data, color) => {
  return {
    type: "ADD_ASSISTS",
    label_name: name,
    data: data,
    color: color
  };
};
