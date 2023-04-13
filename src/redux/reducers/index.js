import { combineReducers } from 'redux';
import latestRecipeReducer from './latestRecipe';
import listRecipeReducer from './listRecipe';
import detailRecipeReducer from './detailRecipe';
import detailUserReducer from './detailUser';
import recipeCommentsReducer from './recipeComments';
import userRecipesReducer from './userRecipes';
import listTagReducer from './listTag';

const rootReducers = combineReducers({
  latestRecipe: latestRecipeReducer,
  listRecipe: listRecipeReducer,
  detailRecipe: detailRecipeReducer,
  recipeComments: recipeCommentsReducer,
  detailUser: detailUserReducer,
  userRecipes: userRecipesReducer,
  listTag: listTagReducer,
});

export default rootReducers;
