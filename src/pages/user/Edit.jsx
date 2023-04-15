import "../../assets/styles/edit.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import Navbar from "../../components/organisms/Navbar";
import Footer from "../../components/organisms/Footer";
import Upload from "../../components/molecules/Upload";
import { getDetailUser, putUserProfile } from "../../redux/actions/user";
import { createToast } from "../../utils/createToast";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { checkAndRefreshAccessToken } from "../../redux/actions/auth";

export default function Edit() {
  const dispatch = useDispatch();
  const { detailUser } = useSelector((state) => state);
  const navigate = useNavigate();

  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
  });
  const [birthDate, setBirthDate] = useState(null);
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("id");
    dispatch(getDetailUser(id));
  }, []);

  useEffect(() => {
    setForm({
      name: detailUser?.data?.full_name,
      phone: detailUser?.data?.phone,
    });
    setBirthDate(detailUser?.data?.birth_date);
    setPhoto(detailUser?.data?.photo_url);
  }, [detailUser]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!form.name) {
      setErrors([{ msg: "All field required (*) must be filled" }]);
    } else {
      if (await checkAndRefreshAccessToken(navigate)) {
        setErrors([]);
        setIsLoading(true);

        const payload = {
          fullName: form.name,
          photo,
        };
        birthDate
          ? (payload.birthDate = moment(birthDate).format("YYYY-MM-DD"))
          : "";
        form.phone ? (payload.phone = form.phone) : "";

        const editUserStatus = await putUserProfile(
          {
            ...payload,
          },
          setErrors
        );
        if (editUserStatus) {
          createToast("Edit Profile Success");
          navigate("/myprofile");
        }

        setIsLoading(false);
      }
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
            <div className="mb-3">
              <label
                htmlFor="name"
                className="form-label me-2"
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
                htmlFor="phone"
                className="form-label me-2"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                Phone
              </label>
              <input
                type="number"
                className="form-control form-control-sm p-3"
                id="phone"
                placeholder="Phone"
                onChange={inputChangeHandler}
                value={form.phone}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="birthDate"
                className="form-label me-2"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                Birth Date
              </label>
              <DatePicker
                onChange={(date) => setBirthDate(date)}
                selected={birthDate ? new Date(birthDate) : undefined}
                dateFormat="yyyy-MM-dd"
                placeholderText="Birth Date"
                className="datepicker w-100 p-3"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="photo" className="form-label me-2">
                Photo
              </label>
              <Upload
                setIsLoading={setIsLoading}
                fileUpload={photo}
                setFileUpload={setPhoto}
                type="photo"
                maxSize={2000000}
                disabled={isLoading}
              />
            </div>
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
