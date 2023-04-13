import {
  GET_LIST_TAG_FAILED,
  GET_LIST_TAG_PENDING,
  GET_LIST_TAG_SUCCESS,
} from "../actions/types";

const initialState = {
  isLoading: false,
  isError: false,
  data: [],
  error: null,
};

const listTagReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_TAG_PENDING:
      return { ...state, isLoading: true };
    case GET_LIST_TAG_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data,
      };
    case GET_LIST_TAG_FAILED:
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

export default listTagReducer;
