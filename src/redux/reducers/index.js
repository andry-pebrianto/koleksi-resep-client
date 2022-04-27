import { combineReducers } from "redux";
import latestRecipeReducer from "./latestRecipe";
import listRecipeReducer from "./listRecipe";
import detailRecipeReducer from "./detailRecipe";
import detailUserReducer from "./detailUser";

const rootReducers = combineReducers({
  latestRecipe: latestRecipeReducer,
  listRecipe: listRecipeReducer,
  detailRecipe: detailRecipeReducer,
  detailUser: detailUserReducer,
});

export default rootReducers;
