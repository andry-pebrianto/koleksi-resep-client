import "../../assets/styles/add.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createToast } from "../../utils/createToast";
import { postRecipe } from "../../redux/actions/recipe";
import { getListTag } from "./../../redux/actions/tag";
import Navbar from "../../components/organisms/Navbar";
import Footer from "../../components/organisms/Footer";
import Upload from "../../components/molecules/Upload";
import RichEditor from "../../components/molecules/RichEditor";
import SelectTag from "../../components/molecules/SelectTag";
import { checkAndRefreshAccessToken } from "../../redux/actions/auth";

export default function Add() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { listTag } = useSelector((state) => state);

  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
  });
  const [ingredients, setIngredients] = useState("");
  const [tags, setTags] = useState([]);
  const [photo, setPhoto] = useState("");
  const [video, setVideo] = useState("");

  useEffect(() => {
    document.title = `${process.env.REACT_APP_APP_NAME} - Add Recipe`;
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getListTag(navigate));
  }, [dispatch, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!form.title || !ingredients || !tags.length) {
      setErrors([{ msg: "All field required (*) must be filled" }]);
    } else {
      if (await checkAndRefreshAccessToken(navigate)) {
        setErrors([]);
        setIsLoading(true);

        const addRecipeStatus = await postRecipe(
          {
            ...form,
            ingredients,
            photoUrl: photo,
            videoUrl: video,
            tags,
          },
          setErrors
        );
        if (addRecipeStatus) {
          createToast("Add Recipe Success");
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
              <RichEditor data={ingredients} setData={setIngredients} />
            </div>
            <div className="mb-3">
              <label
                htmlFor="tags"
                className="form-label me-2"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Required"
              >
                * Tags
              </label>
              <SelectTag tagsApi={listTag.data} tags={tags} setTags={setTags} />
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
            <div className="mb-3">
              <label htmlFor="video" className="form-label me-2">
                Video
              </label>
              <Upload
                setIsLoading={setIsLoading}
                fileUpload={video}
                setFileUpload={setVideo}
                type="video"
                maxSize={30000000}
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
