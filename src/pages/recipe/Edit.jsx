import "../../assets/styles/add.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import he from "he";
import { useDispatch, useSelector } from "react-redux";
import { putRecipe } from "../../redux/actions/recipe";
import { createToast } from "../../utils/createToast";
import Navbar from "../../components/organisms/Navbar";
import Footer from "../../components/organisms/Footer";
import RichEditor from "../../components/molecules/RichEditor";
import SelectTag from "../../components/molecules/SelectTag";
import { getListTag } from "../../redux/actions/tag";
import Upload from "../../components/molecules/Upload";

export default function Edit() {
  const navigate = useNavigate();
  const urlParams = useParams();
  const dispatch = useDispatch();
  const { listTag } = useSelector((state) => state);

  const [isApiError, setIsApiError] = useState(null);
  const [isApiLoading, setIsApiLoading] = useState(false);

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
    document.title = `${process.env.REACT_APP_APP_NAME} - Edit Recipe`;
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function replaceEditData() {
      try {
        setIsApiLoading(true);
        setIsApiError(null);

        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/recipe/${urlParams.id}`,
          {
            headers: {
              token: localStorage.getItem("accessToken"),
            },
          }
        );

        // jika recipe yang akan diedit bukan milik user
        if (res.data.data.user_id !== localStorage.getItem("id")) {
          return navigate("/myprofile");
        }

        setForm({
          title: res.data.data.title,
        });
        setIngredients(res.data.data.ingredients);
        setTags(res.data.data.tags);
        setPhoto(res.data.data.photo_url);
        setVideo(res.data.data.video_url);
        setIsApiLoading(false);

        return 0;
      } catch (error) {
        if (error.response) {
          if (parseInt(error.response.data.code, 10) === 401) {
            localStorage.clear();
            return navigate("/auth");
          }

          error.message = error.response.data.error;
        }

        setIsApiError(error.message);
        setIsApiLoading(false);

        return 0;
      }
    }
    replaceEditData();

    dispatch(getListTag(navigate));
  }, [navigate, urlParams.id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!form.title || !ingredients || !tags.length) {
      setErrors([{ msg: "All field required (*) must be filled" }]);
    } else {
      setErrors([]);
      setIsLoading(true);

      const addRecipeStatus = await putRecipe(
        urlParams.id,
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
        createToast("Edit Recipe Success");
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
        {/* add */}
        {isApiLoading ? (
          <div className="mt-12 mb-10 d-flex justify-content-center">
            <div
              className="spinner-border mt-3"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {isApiError ? (
              <h2 className="mt-12 mb-10 mt-3">{isApiError}</h2>
            ) : (
              <>
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
                      <RichEditor
                        data={he.decode(ingredients)}
                        setData={setIngredients}
                      />
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
                      <SelectTag
                        tagsApi={listTag.data}
                        tags={tags}
                        setTags={setTags}
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
                          />{" "}
                          Loading...
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="btn back-primary w-100 text-light mb-2"
                        >
                          Update
                        </button>
                      )}
                    </div>
                  </form>
                </section>
              </>
            )}
          </>
        )}
      </div>
      {/* footer */}
      <Footer />
    </>
  );
}
