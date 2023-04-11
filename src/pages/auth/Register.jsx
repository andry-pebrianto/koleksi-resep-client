import "../../assets/styles/auth.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { register } from "../../redux/actions/auth";
import SideAuth from "../../components/molecules/SideAuth";
import Logo from "../../components/atoms/Logo";
import { createToast } from "../../utils/createToast";
import PasswordInput from "../../components/atoms/PasswordInput";

export default function Register() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [terms, setTerms] = useState(false);

  useEffect(() => {
    document.title = `${process.env.REACT_APP_APP_NAME} - Register`;
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setErrors([{ msg: "All field required (*) must be filled" }]);
    } else if (form.password !== form.passwordConfirm) {
      setErrors([{ msg: "Password and Password Confirm must be same" }]);
    } else if (!terms) {
      setErrors([{ msg: "You must agree terms and conditions to register" }]);
    } else {
      setErrors([]);
      setIsLoading(true);

      const registerStatus = await register(form, setErrors);
      if (registerStatus) {
        createToast(
          "Register Success, Please Activate Your Account Through Link From Email",
          "success"
        );
        navigate("/auth");
      }

      setIsLoading(false);
    }
  };

  const inputChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const loginGoogleSuccess = (response) => {
    console.log(response);
  };
  const loginGoogleFailure = (error) => {
    console.log(error);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <SideAuth />
        <div className="auth register col-sm-7 col-md-6">
          <div className="content ff-inter">
            <div className="d-sm-none text-center mb-4">
              <Link to="/">
                <Logo width="80px" height="105px" color="#524A4E" />
              </Link>
            </div>
            <h1 className="fs-4 fw-bold color-primary text-center mb-3">
              Let&apos;s Get Started
            </h1>
            <h2 className="fs-6 text-secondary text-center mb-4">
              Create new account to access all features
            </h2>
            {/* form */}
            <form onSubmit={submitHandler}>
              <div className="mb-3">
                <label
                  htmlFor="name"
                  className="form-label"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Required"
                >
                  * Name
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm p-3"
                  id="name"
                  placeholder="Name"
                  onChange={inputChangeHandler}
                  required
                  value={form.name}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="form-label"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Required"
                >
                  * E-mail
                </label>
                <input
                  type="email"
                  className="form-control form-control-sm p-3"
                  id="email"
                  onChange={inputChangeHandler}
                  required
                  placeholder="E-mail"
                  value={form.email}
                />
              </div>
              <PasswordInput
                password={form.password}
                setPassword={inputChangeHandler}
                id="password"
                placeholder="Create New Password"
              />
              <PasswordInput
                password={form.passwordConfirm}
                setPassword={inputChangeHandler}
                id="passwordConfirm"
                placeholder="Password Confirmation"
              />
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="terms"
                  onChange={() => setTerms(!terms)}
                />
                <label className="form-check-label" htmlFor="terms">
                  I agree to terms and conditions
                </label>
              </div>
              {errors.length > 0 && (
                <div className="alert alert-danger mx-0">
                  <ul className="m-0">
                    {errors.map((error, index) => (
                      <li key={index}>{error.msg}</li>
                    ))}
                  </ul>
                </div>
              )}
              {isLoading ? (
                <button
                  className="btn back-primary w-100 text-light mb-2"
                  type="submit"
                  disabled
                >
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  />{" "}
                  Loading...
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn back-primary w-100 text-light mb-2"
                >
                  Register Account
                </button>
              )}
            </form>
            {/* end form */}
            <p className="text-center text-secondary mt-4 ff-airbnb">
              Already have account?{" "}
              <Link className="color-primary text-decoration-none" to="/auth">
                Log in Here
              </Link>
            </p>
            <div className="mb-3 d-flex justify-content-center">
              <GoogleLogin
                onSuccess={loginGoogleSuccess}
                onError={loginGoogleFailure}
              />
            </div>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
