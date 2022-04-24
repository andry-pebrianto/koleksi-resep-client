import {
  GET_LIST_USERS_FAILED,
  GET_LIST_USERS_PENDING,
  GET_LIST_USERS_SUCCESS,
} from "../actions/types";

const initialState = {
  isLoading: false,
  isError: false,
  data: [],
  error: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_USERS_PENDING:
      return { ...state, isLoading: true };
    case GET_LIST_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case GET_LIST_USERS_FAILED:
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

export default usersReducer;
