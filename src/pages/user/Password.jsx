import "react-datepicker/dist/react-datepicker.css";
import "../../assets/styles/edit.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/organisms/Navbar";
import Footer from "../../components/organisms/Footer";
import { getDetailUser, putUserPassword } from "../../redux/actions/user";
import PasswordInput from "../../components/atoms/PasswordInput";
import { createToast } from "../../utils/createToast";

export default function Edit() {
  const dispatch = useDispatch();
  const { detailUser } = useSelector((state) => state);
  const navigate = useNavigate();

  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    password: "",
    oldPassword: "",
  });

  useEffect(() => {
    const id = localStorage.getItem("id");
    dispatch(getDetailUser(id));
  }, []);

  useEffect(() => {
    if (detailUser?.data?.google_id) {
      navigate("/myprofile");
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!form.password || !form.oldPassword) {
      setErrors([{ msg: "All field required (*) must be filled" }]);
    } else {
      setErrors([]);
      setIsLoading(true);

      const editUserStatus = await putUserPassword(form, setErrors);
      if (editUserStatus) {
        createToast("Edit Password Success");
        navigate("/myprofile");
      }

      setIsLoading(false);
    }
    window.scrollTo(0, 0);
  };

  const inputChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <>
      {/* navbar */}
      <Navbar />
      {/* content */}
      <div className="container mb-5">
        {/* edit */}
        <section className="add ff-airbnb">
          {errors.length > 0 && (
            <div className="alert alert-danger mx-0">
              <ul className="m-0">
                {errors.map((error, index) => (
                  <li key={index}>{error.msg}</li>
                ))}
              </ul>
            </div>
          )}
          <form onSubmit={submitHandler}>
            <PasswordInput
              password={form.oldPassword}
              setPassword={inputChangeHandler}
              id="oldPassword"
              placeholder="Old Password"
            />
            <PasswordInput
              password={form.password}
              setPassword={inputChangeHandler}
              id="password"
              placeholder="New Password"
            />
            <div className="d-flex justify-content-center mt-4">
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
                  Edit
                </button>
              )}
            </div>
          </form>
        </section>
      </div>
      {/* footer */}
      <Footer />
    </>
  );
}
