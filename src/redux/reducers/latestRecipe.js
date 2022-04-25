import {
  GET_LATEST_RECIPE_FAILED,
  GET_LATEST_RECIPE_PENDING,
  GET_LATEST_RECIPE_SUCCESS,
} from "../actions/types";

const initialState = {
  isLoading: false,
  isError: false,
  data: [],
  error: null,
};

const latestRecipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LATEST_RECIPE_PENDING:
      return { ...state, isLoading: true };
    case GET_LATEST_RECIPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case GET_LATEST_RECIPE_FAILED:
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

export default latestRecipeReducer;
