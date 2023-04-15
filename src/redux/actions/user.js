import axios from "axios";
import {
  GET_DETAIL_USER_PENDING,
  GET_DETAIL_USER_SUCCESS,
  GET_DETAIL_USER_FAILED,
} from "./types";
import { checkAndRefreshAccessToken } from "./auth";

export const getDetailUser = (id, navigate) => async (dispatch) => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    dispatch({
      type: GET_DETAIL_USER_PENDING,
      payload: null,
    });

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/${id}`, {
      headers: { token: accessToken },
    });

    dispatch({
      type: GET_DETAIL_USER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    if (error.response) {
      // jika error disebabkan oleh jwt token expired
      if (parseInt(error.response.data.code, 10) === 401) {
        // jika access token berhasil diperbarui
        if (await checkAndRefreshAccessToken(navigate)) {
          dispatch(getDetailUser(id, navigate));
        }
      }
    } else {
      // jika error karena hal lain
      dispatch({
        type: GET_DETAIL_USER_FAILED,
        payload: error.message,
      });
    }
  }
};

export const putUserProfile = async (data, setErrors) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const id = localStorage.getItem("id");

    await axios.put(`${process.env.REACT_APP_API_URL}/user/${id}`, data, {
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

export const putUserPassword = async (data, setErrors) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const id = localStorage.getItem("id");

    await axios.put(
      `${process.env.REACT_APP_API_URL}/user/${id}/password`,
      data,
      {
        headers: { token: accessToken },
      }
    );

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
