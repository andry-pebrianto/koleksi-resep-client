import {
  GET_LIST_RECIPE_FAILED,
  GET_LIST_RECIPE_PENDING,
  GET_LIST_RECIPE_SUCCESS,
} from "../actions/types";

const initialState = {
  isLoading: false,
  isError: false,
  data: [],
  error: null,
};

const listRecipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_RECIPE_PENDING:
      return { ...state, isLoading: true };
    case GET_LIST_RECIPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case GET_LIST_RECIPE_FAILED:
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

export default listRecipeReducer;
