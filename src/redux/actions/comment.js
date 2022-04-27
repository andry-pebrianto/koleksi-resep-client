import axios from "axios";
import {
  GET_RECIPE_COMMENTS_PENDING,
  GET_RECIPE_COMMENTS_SUCCESS,
  GET_RECIPE_COMMENTS_FAILED,
} from "./types";

export const getRecipeComments = (id, navigate) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");

    dispatch({
      type: GET_RECIPE_COMMENTS_PENDING,
      payload: null,
    });

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/recipe/${id}/comment`,
      {
        headers: { token },
      }
    );

    dispatch({
      type: GET_RECIPE_COMMENTS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    if (error.response) {
      if (parseInt(error.response.data.code) === 401) {
        localStorage.clear();
        return navigate("/auth");
      }

      error.message = error.response.data.error;
    }

    dispatch({
      type: GET_RECIPE_COMMENTS_FAILED,
      payload: error.message,
    });
  }
};
