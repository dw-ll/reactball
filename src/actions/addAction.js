export const addPlayer = (name, id) => {
  return {
    type: "ADD",
    name: name,
    id: id
  };
};