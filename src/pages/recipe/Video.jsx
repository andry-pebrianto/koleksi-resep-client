import "../../assets/styles/video.css";
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from "react-player";
import { BiArrowBack } from "react-icons/bi";
import moment from "moment";
import { getDetailRecipe, getListRecipe } from "../../redux/actions/recipe";

export default function Video() {
  const dispatch = useDispatch();
  const { detailRecipe } = useSelector((state) => state);
  const { listRecipe } = useSelector((state) => state);

  const navigate = useNavigate();
  const urlParams = useParams();

  useEffect(() => {
    document.title = `${process.env.REACT_APP_APP_NAME} - Video`;
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getDetailRecipe(urlParams.id, navigate));
    dispatch(getListRecipe(`${process.env.REACT_APP_API_URL}/recipe?limit=25`, navigate));
  }, [dispatch, navigate, urlParams.id]);

  return (
    <div className="container-fluid">
      <div className="row ff-airbnb">
        {/* video */}
        <section className="col-12 col-lg-9 vh-100">
          <div className="row change">
            <div className="col-1 back-primary" />
            <div className="col-11 d-flex justify-content-center">
              <div className="video mx-1 mx-sm-3 mx-md-5 w-100">
                <Link
                  to={`/recipe/${detailRecipe.data.id}`}
                  className="btn btn-primary mb-3"
                >
                  <BiArrowBack /> Back
                </Link>
                {detailRecipe.isLoading ? (
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
                    {detailRecipe.isError ? (
                      <h2 className="mt-4 mb-10">{detailRecipe.error}</h2>
                    ) : (
                      <>
                        {detailRecipe.data.video_url ? (
                          <ReactPlayer
                            url={detailRecipe.data.video_url}
                            className="react-player"
                            controls
                            width="100%"
                          />
                        ) : (
                          <h2 className="text-center">
                            This recipe have no video step
                          </h2>
                        )}
                        <p className="fs-4 mt-3 mb-1">
                          {detailRecipe.data.title}
                        </p>
                        <p className="text-secondary">
                          {moment(detailRecipe.data.created_at).fromNow()}
                        </p>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
        {/* other recipe */}
        <aside className="col-lg-3 d-none d-lg-block vh-100" style={{ overflow: "auto" }}>
          <div className="other">
            <p className="fs-4">Other Recipe</p>
            {listRecipe.isLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                {listRecipe.data
                  .sort(() => Math.random() - 0.5)
                  .slice(0, 3)
                  .map((recipe) => (
                    <div className="card my-2 mx-2 border-0">
                      <Link
                        className="text-decoration-none text-dark"
                        to={`/recipe/${recipe.id}`}
                      >
                        <img
                          src={
                            recipe.photo_url ||
                            `${process.env.REACT_APP_API_URL}/photo/food-default.jpg`
                          }
                          className="card-img-top"
                          alt={recipe.title}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{recipe.title}</h5>
                        </div>
                      </Link>
                    </div>
                  ))}
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
