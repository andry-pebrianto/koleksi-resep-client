import "../../assets/styles/add.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/organisms/Navbar";
import Footer from "../../components/organisms/Footer";

export default function Add({ edit }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    ingredients: "",
  });

  useEffect(() => {
    document.title = edit
      ? "Food Recipe - Edit Recipe"
      : "Food Recipe - Add Recipe";
    window.scrollTo(0, 0);
  }, [edit]);

  const submitHandler = async (e) => {
    e.preventDefault();

    alert("A");
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
        {/* add */}
        <section className="add ff-airbnb">
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label me-2">
                Title
              </label>
              <input
                type="text"
                className="form-control form-control-sm p-3"
                id="title"
                placeholder="Title"
                onChange={inputChangeHandler}
                value={form.title}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ingredients" className="form-label me-2">
                Ingredients
              </label>
              <textarea
                className="form-control"
                id="ingredients"
                rows="10"
                placeholder="Ingredients"
                onChange={inputChangeHandler}
              >
                {form.ingredients}
              </textarea>
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
              />
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn back-primary w-100 text-light mb-2"
              >
                {edit ? "Update" : "Post"}
              </button>
            </div>
          </form>
        </section>
      </div>
      {/* footer */}
      <Footer />
    </>
  );
}
