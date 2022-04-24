import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducers from "./reducers";

const middleware = applyMiddleware(thunk);
const store = createStore(
  rootReducers,
  process.env.REACT_APP_NODE_ENV === "production"
    ? middleware
    : composeWithDevTools(middleware)
);

export default store;
