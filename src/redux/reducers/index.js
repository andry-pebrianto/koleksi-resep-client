import { combineReducers } from "redux";
import latestReducer from "./latest";

const rootReducers = combineReducers({
  latest: latestReducer,
});

export default rootReducers;
