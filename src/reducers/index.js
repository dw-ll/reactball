import counterReducer from "./counter.js";
import dataReducer from "./addData.js";
import playerDataReducer from "./addPlayerData.js";
import { combineReducers } from "redux";
const allReducers = combineReducers({
  counter: counterReducer,
  players: dataReducer,
  playerData: playerDataReducer
});
export default allReducers;
