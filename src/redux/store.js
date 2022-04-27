import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducers from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const middleware = applyMiddleware(thunk);
const store = createStore(
  persistedReducer,
  process.env.REACT_APP_NODE_ENV === "production"
    ? middleware
    : composeWithDevTools(middleware)
);
const persistor = persistStore(store);

export { store, persistor };
