import dataReducer from "./addData.js";
import playerDataReducer from "./addPlayerData.js";
import graphDataReducer from "./addGraphData.js";
import invalidReducer from "./invalid.js";
import { combineReducers } from "redux";
const allReducers = combineReducers({
  players: dataReducer,
  playerData: playerDataReducer,
  graphData: graphDataReducer,
  invalidAction: invalidReducer
});
export default allReducers;
