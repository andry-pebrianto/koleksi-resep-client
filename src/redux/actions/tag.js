import axios from "axios";
import {
  GET_LIST_TAG_PENDING,
  GET_LIST_TAG_SUCCESS,
  GET_LIST_TAG_FAILED,
} from "./types";
import { checkAndRefreshAccessToken } from "./auth";

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
      // jika error disebabkan oleh jwt token expired
      if (parseInt(error.response.data.code, 10) === 401) {
        // jika access token berhasil diperbarui
        if (await checkAndRefreshAccessToken(navigate)) {
          dispatch(getListTag(navigate));
        }
      }
    } else {
      // jika error karena hal lain
      dispatch({
        type: GET_LIST_TAG_FAILED,
        payload: error.message,
      });
    }
  }
};
