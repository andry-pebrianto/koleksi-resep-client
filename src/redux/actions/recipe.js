import axios from "axios";
import {
  GET_LATEST_RECIPE_PENDING,
  GET_LATEST_RECIPE_SUCCESS,
  GET_LATEST_RECIPE_FAILED,
  GET_LIST_RECIPE_PENDING,
  GET_LIST_RECIPE_SUCCESS,
  GET_LIST_RECIPE_FAILED,
  GET_DETAIL_RECIPE_PENDING,
  GET_DETAIL_RECIPE_SUCCESS,
  GET_DETAIL_RECIPE_FAILED,
} from "./types";

export const getLatest = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_LATEST_RECIPE_PENDING,
      payload: null,
    });

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/recipe/latest`
    );

    dispatch({
      type: GET_LATEST_RECIPE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    if (error.response) {
      error.message = error.response.data.error;
    }

    dispatch({
      type: GET_LATEST_RECIPE_FAILED,
      payload: error.message,
    });
  }
};

export const getList = (url, navigate) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");

    dispatch({
      type: GET_LIST_RECIPE_PENDING,
      payload: null,
    });

    const res = await axios.get(url, {
      headers: { token },
    });

    dispatch({
      type: GET_LIST_RECIPE_SUCCESS,
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
      type: GET_LIST_RECIPE_FAILED,
      payload: error.message,
    });
  }
};

export const getDetail = (id, navigate) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");

    dispatch({
      type: GET_DETAIL_RECIPE_PENDING,
      payload: null,
    });

    const recipe = await axios.get(
      `${process.env.REACT_APP_API_URL}/recipe/${id}`,
      {
        headers: { token },
      }
    );

    const comments = await axios.get(
      `${process.env.REACT_APP_API_URL}/recipe/${id}/comment`,
      {
        headers: { token },
      }
    );

    dispatch({
      type: GET_DETAIL_RECIPE_SUCCESS,
      payload: {
        recipe: recipe.data,
        comments: comments.data,
      },
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
      type: GET_DETAIL_RECIPE_FAILED,
      payload: error.message,
    });
  }
};

export const deleteRecipe = async (id, setError) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(`${process.env.REACT_APP_API_URL}/recipe/${id}`, {
      headers: { token },
    });

    return true;
  } catch (error) {
    if (error.response) {
      setError(error.response.data.error);
    } else {
      setError(error.message);
    }

    return false;
  }
};
