import axios from "axios";
import {
  GET_DETAIL_USER_PENDING,
  GET_DETAIL_USER_SUCCESS,
  GET_DETAIL_USER_FAILED,
} from "./types";

export const getDetail = (id, navigate) => async (dispatch) => {
  const token = localStorage.getItem("token");

  try {
    dispatch({
      type: GET_DETAIL_USER_PENDING,
      payload: null,
    });

    const user = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/${id}`,
      {
        headers: { token },
      }
    );

    const listRecipe = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/${id}/recipe`,
      {
        headers: { token },
      }
    );

    dispatch({
      type: GET_DETAIL_USER_SUCCESS,
      payload: {
        user: user.data,
        listRecipe: listRecipe.data,
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
      type: GET_DETAIL_USER_FAILED,
      payload: error.message,
    });
  }
};
