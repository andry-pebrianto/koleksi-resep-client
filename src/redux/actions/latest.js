import axios from "axios";
import {
  GET_LATEST_RECIPE_PENDING,
  GET_LATEST_RECIPE_SUCCESS,
  GET_LATEST_RECIPE_FAILED,
} from "./types";

export const getLatest = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_LATEST_RECIPE_PENDING,
      payload: null,
    });

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/recipe/latest`);

    dispatch({
      type: GET_LATEST_RECIPE_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_LATEST_RECIPE_FAILED,
      payload: error.message,
    });
  }
};
