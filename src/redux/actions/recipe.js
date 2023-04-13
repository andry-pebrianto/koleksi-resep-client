import axios from "axios";
import {
  GET_LATEST_RECIPE_PENDING,
  GET_LATEST_RECIPE_SUCCESS,
  GET_LATEST_RECIPE_FAILED,
  GET_LIST_RECIPE_PENDING,
  GET_LIST_RECIPE_SUCCESS,
  GET_LIST_RECIPE_FAILED,
  GET_USER_RECIPES_PENDING,
  GET_USER_RECIPES_SUCCESS,
  GET_USER_RECIPES_FAILED,
  GET_DETAIL_RECIPE_PENDING,
  GET_DETAIL_RECIPE_SUCCESS,
  GET_DETAIL_RECIPE_FAILED,
} from "./types";

export const getLatestRecipe = () => async (dispatch) => {
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

export const getListRecipe = (url, navigate) => async (dispatch) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    dispatch({
      type: GET_LIST_RECIPE_PENDING,
      payload: null,
    });

    const res = await axios.get(url, {
      headers: { token: accessToken },
    });

    dispatch({
      type: GET_LIST_RECIPE_SUCCESS,
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
      type: GET_LIST_RECIPE_FAILED,
      payload: error.message,
    });
  }
};

export const getDetailRecipe = (id, navigate) => async (dispatch) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    dispatch({
      type: GET_DETAIL_RECIPE_PENDING,
      payload: null,
    });

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/recipe/${id}`,
      {
        headers: { token: accessToken },
      }
    );

    dispatch({
      type: GET_DETAIL_RECIPE_SUCCESS,
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
      type: GET_DETAIL_RECIPE_FAILED,
      payload: error.message,
    });
  }
};

export const getUserRecipes = (id, navigate) => async (dispatch) => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    dispatch({
      type: GET_USER_RECIPES_PENDING,
      payload: null,
    });

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/${id}/recipe`,
      {
        headers: { token: accessToken },
      }
    );

    dispatch({
      type: GET_USER_RECIPES_SUCCESS,
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
      type: GET_USER_RECIPES_FAILED,
      payload: error.message,
    });
  }
};

export const deleteRecipe = async (id, setError) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    await axios.delete(`${process.env.REACT_APP_API_URL}/recipe/${id}`, {
      headers: { token: accessToken },
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

export const postRecipe = async (data, setErrors) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    await axios.post(`${process.env.REACT_APP_API_URL}/recipe`, data, {
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

export const putRecipe = async (id, data, setErrors) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    await axios.put(`${process.env.REACT_APP_API_URL}/recipe/${id}`, data, {
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
