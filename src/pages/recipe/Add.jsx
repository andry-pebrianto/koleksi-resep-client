import "../../assets/styles/add.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createToast } from "../../utils/createToast";
import { postRecipe } from "../../redux/actions/recipe";
import Navbar from "../../components/organisms/Navbar";
import Footer from "../../components/organisms/Footer";

export default function Add() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    ingredients: "",
  });
  const [photo, setPhoto] = useState(null);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    document.title = `${process.env.REACT_APP_APP_NAME} - Add Recipe`;
    window.scrollTo(0, 0);
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("ingredients", form.ingredients);

    if (photo) {
      formData.append("photo", photo);
    }
    if (video) {
      formData.append("video", video);
    }

    if (!form.title || !form.ingredients) {
      setErrors([{ msg: "All field required (*) must be filled" }]);
    } else {
      setErrors([]);
      setIsLoading(true);

      const addRecipeStatus = await postRecipe(formData, setErrors);
      if (addRecipeStatus) {
        createToast(`Add Recipe Success`);
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

  const photoChangeHandler = (e) => {
    setPhoto(e.target.files[0]);
  };

  const videoChangeHandler = (e) => {
    setVideo(e.target.files[0]);
  };

  return (
    <>
      {/* navbar */}
      <Navbar />
      {/* content */}
      <div className="container mb-5">
        {/* add */}
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
                htmlFor="title"
                className="form-label me-2"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Required"
              >
                * Title
              </label>
              <input
                type="text"
                className="form-control form-control-sm p-3"
                id="title"
                placeholder="Title"
                onChange={inputChangeHandler}
                required
                value={form.title}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="ingredients"
                className="form-label me-2"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Required"
              >
                * Ingredients
              </label>
              <textarea
                className="form-control"
                id="ingredients"
                rows="10"
                placeholder="Ingredients"
                onChange={inputChangeHandler}
                required
                defaultValue={form.ingredients}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="photo" className="form-label me-2">
                Photo
              </label>
              <input
                type="file"
                className="form-control form-control-sm p-3"
                id="photo"
                placeholder="Photo"
                onChange={photoChangeHandler}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="video" className="form-label me-2">
                Video
              </label>
              <input
                type="file"
                className="form-control form-control-sm p-3"
                id="video"
                placeholder="Video"
                onChange={videoChangeHandler}
              />
            </div>
            <div className="d-flex justify-content-center">
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
                  ></span>{" "}
                  Loading...
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn back-primary w-100 text-light mb-2"
                >
                  Post
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
