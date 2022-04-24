import axios from "axios";
import {
  GET_LIST_USERS_FAILED,
  GET_LIST_USERS_PENDING,
  GET_LIST_USERS_SUCCESS,
} from "./types";

export const getList = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_LIST_USERS_PENDING,
      payload: null,
    });

    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");

    dispatch({
      type: GET_LIST_USERS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_LIST_USERS_FAILED,
      payload: error.message,
    });
  }
};
