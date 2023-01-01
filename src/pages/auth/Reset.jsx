import "../../assets/styles/auth.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { reset } from "../../redux/actions/auth";
import SideAuth from "../../components/molecules/SideAuth";
import Logo from "../../components/atoms/Logo";
import { createToast } from "../../utils/createToast";
import PasswordInput from "../../components/atoms/PasswordInput";

export default function Reset() {
  const navigate = useNavigate();
  const urlParams = useParams();

  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    password: "",
  });

  useEffect(() => {
    document.title = `${process.env.REACT_APP_APP_NAME} - Reset Password`;
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!form.password) {
      setErrors([{ msg: "All field required (*) must be filled" }]);
    } else {
      setErrors([]);
      setIsLoading(true);

      const resetStatus = await reset(urlParams.token, form, setErrors);
      if (resetStatus) {
        createToast("Reset Password Success", "success");
        navigate("/");
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

  return (
    <div className="container-fluid">
      <div className="row">
        <SideAuth />
        <div className="auth login col-sm-7 col-md-6">
          <div className="content ff-inter">
            <div className="d-sm-none text-center mb-4">
              <Link to="/">
                <Logo width="80px" height="105px" color="#524A4E" />
              </Link>
            </div>
            <h1 className="fs-4 fw-bold color-primary text-center mb-3">
              Reset Your Password
            </h1>
            <h2 className="fs-6 text-secondary text-center mb-4">
              Enter your new strongest password
            </h2>
            {/* form */}
            <form onSubmit={submitHandler}>
              <PasswordInput
                password={form.password}
                setPassword={inputChangeHandler}
                id="password"
                placeholder="Password"
              />
              {errors.length > 0 && (
                <div className="alert alert-danger mx-0 py-2">
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
                  Reset
                </button>
              )}
            </form>
            <p className="text-center text-secondary mt-3 ff-airbnb">
              Already remember?{" "}
              <Link className="color-primary text-decoration-none" to="/auth">
                Log In
              </Link>
            </p>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
