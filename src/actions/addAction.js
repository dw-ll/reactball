import axios from "axios";
export const addPlayer = (name, id) => {
  return dispatch => {
    return axios
      .get(
        `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${id}`
      )
      .then(response => {
        console.log(response);
        if (response.data.data[0] === undefined) {
          dispatch({ type: "invalidAction", isInvalid: true });
        } else {
          dispatch({ type: "ADD", name: name, id: id });
        }
      });
  };
};
