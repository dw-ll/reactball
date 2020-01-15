export const invalidAction = (val) => {
  return {
    type: "invalidAction",
    isInvalid:val
  };
};
