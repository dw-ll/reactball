import counterReducer from "./counter.js";
import dataReducer from "./addData.js";
import { combineReducers } from "redux";
const allReducers = combineReducers({
  counter: counterReducer,
  players: dataReducer
});
export default allReducers;
