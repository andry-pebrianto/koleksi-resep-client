import { combineReducers } from "redux";
import latestRecipeReducer from "./latestRecipe";
import listRecipeReducer from "./listRecipe";
import detailRecipeReducer from "./detailRecipe";

const rootReducers = combineReducers({
  latestRecipe: latestRecipeReducer,
  listRecipe: listRecipeReducer,
  detailRecipe: detailRecipeReducer,
});

export default rootReducers;
