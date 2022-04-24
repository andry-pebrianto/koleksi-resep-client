import { combineReducers } from "redux";
import usersReducer from "./users";

const rootReducers = combineReducers({
  users: usersReducer,
});

export default rootReducers;
