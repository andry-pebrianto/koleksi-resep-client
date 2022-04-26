import {
  GET_DETAIL_RECIPE_PENDING,
  GET_DETAIL_RECIPE_SUCCESS,
  GET_DETAIL_RECIPE_FAILED,
} from "../actions/types";

const initialState = {
  isLoading: false,
  isError: false,
  data: {},
  comments: [],
  error: null,
};

const detailRecipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DETAIL_RECIPE_PENDING:
      return { ...state, isLoading: true };
    case GET_DETAIL_RECIPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.recipe.data,
        comments: action.payload.comments.data,
      };
    case GET_DETAIL_RECIPE_FAILED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default detailRecipeReducer;