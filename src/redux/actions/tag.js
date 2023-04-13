import axios from "axios";
import {
  GET_LIST_TAG_PENDING,
  GET_LIST_TAG_SUCCESS,
  GET_LIST_TAG_FAILED,
} from "./types";

export const getListTag = (navigate) => async (dispatch) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    dispatch({
      type: GET_LIST_TAG_PENDING,
      payload: null,
    });

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/tag`, {
      headers: { token: accessToken },
    });

    dispatch({
      type: GET_LIST_TAG_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    if (error.response) {
      if (parseInt(error.response.data.code, 10) === 401) {
        localStorage.clear();
        return navigate("/auth");
      }

      error.message = error.response.data.error;
    }

    dispatch({
      type: GET_LIST_TAG_FAILED,
      payload: error.message,
    });
  }
};
