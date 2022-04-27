import '../../assets/styles/auth.css';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../redux/actions/auth';
import SideAuth from '../../components/molecules/SideAuth';
import Logo from '../../components/atoms/Logo';
import { createToast } from '../../utils/createToast';

export default function Login() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [terms, setTerms] = useState(false);

  useEffect(() => {
    document.title = `${process.env.REACT_APP_APP_NAME} - Login`;
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setErrors([{ msg: 'All field required (*) must be filled' }]);
    } else if (!terms) {
      setErrors([{ msg: 'You must agree terms and conditions to login' }]);
    } else {
      setErrors([]);
      setIsLoading(true);

      const loginStatus = await login(form, setErrors);
      if (loginStatus) {
        createToast('Login Success', 'success');
        navigate('/');
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
              Welcome
            </h1>
            <h2 className="fs-6 text-secondary text-center mb-4">
              Log in into your existing account
            </h2>
            {/* form */}
            <form onSubmit={submitHandler}>
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
              <div className="mb-3">
                <label
                  htmlFor="password"
                  className="form-label"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Required"
                >
                  * Password
                </label>
                <input
                  type="password"
                  className="form-control form-control-sm p-3"
                  id="password"
                  onChange={inputChangeHandler}
                  required
                  placeholder="Password"
                  value={form.password}
                />
              </div>
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
                  />
                  {' '}
                  Loading...
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn back-primary w-100 text-light mb-2"
                >
                  Log in
                </button>
              )}
            </form>
            {/* end form */}
            <div className="d-flex justify-content-end ff-airbnb">
              <Link
                className="link-secondary text-decoration-none"
                to="/auth/forgot"
              >
                Forgot Password?
              </Link>
            </div>
            <p className="text-center text-secondary mt-4 ff-airbnb">
              Don&apos;t have an account?
              {' '}
              <Link
                className="color-primary text-decoration-none"
                to="/auth/register"
              >
                Sign Up
              </Link>
            </p>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
