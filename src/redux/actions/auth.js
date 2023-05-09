import axios from "axios";
import { createToast } from "../../utils/createToast";

export const login = async (data, setErrors) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      data
    );

    localStorage.setItem("accessToken", res.data.token.accessToken);
    localStorage.setItem("refreshToken", res.data.token.refreshToken);
    localStorage.setItem("id", res.data.token.id);

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

export const loginWithGoogle = async (data, setErrors) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/google`,
      {
        tokenId: data.credential,
      }
    );

    localStorage.setItem("accessToken", res.data.token.accessToken);
    localStorage.setItem("refreshToken", res.data.token.refreshToken);
    localStorage.setItem("id", res.data.token.id);

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

export const register = async (data, setErrors) => {
  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
      fullName: data.name,
      email: data.email,
      password: data.password,
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

export const forgot = async (data, setErrors) => {
  try {
    await axios.put(`${process.env.REACT_APP_API_URL}/auth/forgot`, data);

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

export const reset = async (token, data, setErrors) => {
  try {
    await axios.put(
      `${process.env.REACT_APP_API_URL}/auth/reset/${token}`,
      data
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

export const checkAndRefreshAccessToken = async (navigate) => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    await axios.get(`${process.env.REACT_APP_API_URL}/user/${id}`, {
      headers: { token: accessToken },
    });
  } catch (error) {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/auth/refresh/${localStorage.getItem(
          "refreshToken"
        )}`
      );

      localStorage.setItem("accessToken", res.data.token.accessToken);
      console.log("Access Token Updated!");

      return true;
    } catch (error) {
      createToast("Sesi telah habis, tolong Login ulang", "error");
      localStorage.clear();
      navigate("/");

      return false;
    }
  }
};
