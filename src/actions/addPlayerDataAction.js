import axios from "axios";
export const addPlayerData = (name, id) => {
  return dispatch => {
    return axios
      .get(
        `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${id}`
      )
      .then(response => {
        if (response.data.data[0].length === 0) {
          dispatch({ type: "FAIL", name: name });
        } else {
          dispatch({ type: "SUCCESS", name: name, obj: response.data.data });
        }
      })
      .catch(error => {
        dispatch({ type: "FAIL", name: name, error: error });
      });
  };
};
