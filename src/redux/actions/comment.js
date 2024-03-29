import axios from "axios";
import {
  GET_RECIPE_COMMENTS_PENDING,
  GET_RECIPE_COMMENTS_SUCCESS,
  GET_RECIPE_COMMENTS_FAILED,
} from "./types";
import { checkAndRefreshAccessToken } from "./auth";

export const getRecipeComments = (id, navigate) => async (dispatch) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    dispatch({
      type: GET_RECIPE_COMMENTS_PENDING,
      payload: null,
    });

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/recipe/${id}/comment`,
      {
        headers: { token: accessToken },
      }
    );

    dispatch({
      type: GET_RECIPE_COMMENTS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    if (error.response) {
      // jika error disebabkan oleh jwt token expired
      if (parseInt(error.response.data.code, 10) === 401) {
        // jika access token berhasil diperbarui
        if (await checkAndRefreshAccessToken(navigate)) {
          dispatch(getRecipeComments(id, navigate));
        }
      }
    } else {
      // jika error karena hal lain
      dispatch({
        type: GET_RECIPE_COMMENTS_FAILED,
        payload: error.message,
      });
    }
  }
};

export const postComment = async (data, setErrors) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    await axios.post(`${process.env.REACT_APP_API_URL}/comment`, data, {
      headers: { token: accessToken },
    });

    return true;
  } catch (error) {
    if (error.response) {
      if (Array.isArray(error.response.data.error)) {
        setErrors(error.response.data.error);
      } else {
        setErrors([{ msg: error.response.data.error }]);
      }
    } else {
      setErrors([{ msg: error.message }]);
    }

    return false;
  }
};
