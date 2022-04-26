import { Navigate } from "react-router-dom";
import axios from "axios";
import {
  GET_LATEST_RECIPE_PENDING,
  GET_LATEST_RECIPE_SUCCESS,
  GET_LATEST_RECIPE_FAILED,
  GET_LIST_RECIPE_FAILED,
  GET_LIST_RECIPE_PENDING,
  GET_LIST_RECIPE_SUCCESS,
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
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_LATEST_RECIPE_FAILED,
      payload: error.message,
    });
  }
};

export const getList = (url, navigate) => async (dispatch) => {
  const token = localStorage.getItem("token");

  try {
    dispatch({
      type: GET_LIST_RECIPE_PENDING,
      payload: null,
    });

    const res = await axios.get(url, {
      headers: { token },
    });

    dispatch({
      type: GET_LIST_RECIPE_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    if (error.response) {
      if (parseInt(error.response.data.code) === 401) {
        localStorage.clear();
        return navigate('/auth')
      }
    }

    dispatch({
      type: GET_LIST_RECIPE_FAILED,
      payload: error.message,
    });
  }
};
