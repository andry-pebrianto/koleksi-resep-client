import { combineReducers } from "redux";
import latestRecipeReducer from "./latestRecipe";
import listRecipeReducer from "./listRecipe";

const rootReducers = combineReducers({
  latestRecipe: latestRecipeReducer,
  listRecipe: listRecipeReducer,
});

export default rootReducers;
