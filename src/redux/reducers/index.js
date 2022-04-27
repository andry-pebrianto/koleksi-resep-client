import { combineReducers } from 'redux';
import latestRecipeReducer from './latestRecipe';
import listRecipeReducer from './listRecipe';
import detailRecipeReducer from './detailRecipe';
import detailUserReducer from './detailUser';
import recipeCommentsReducer from './recipeComments';
import userRecipesReducer from './userRecipes';

const rootReducers = combineReducers({
  latestRecipe: latestRecipeReducer,
  listRecipe: listRecipeReducer,
  detailRecipe: detailRecipeReducer,
  recipeComments: recipeCommentsReducer,
  detailUser: detailUserReducer,
  userRecipes: userRecipesReducer,
});

export default rootReducers;
