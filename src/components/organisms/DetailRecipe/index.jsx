import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import PropTypes from "prop-types";
import ReactHtmlParser from "html-react-parser";
import { FaPlay, FaRegBookmark, FaRegThumbsUp } from "react-icons/fa";

function DetailRecipe({ recipe }) {
  return (
    <section className="detail ff-airbnb mb-5">
      <h1 className="display-5 text-center color-blue mb-3">{recipe.title}</h1>
      <div className="tag-container">
        {recipe.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
      <div className="text-center mb-3 position-relative">
        {recipe.id && (
          <img
            className="mt-4"
            src={
              recipe.photo_url ||
              `${process.env.REACT_APP_API_URL}/photo/food-default.jpg`
            }
            alt={recipe.title}
          />
        )}
        <div className="icon">
          <i className="icon-item back-primary text-light p-3 fs-5 rounded-3 me-1">
            <FaRegBookmark />
          </i>
          <i className="icon-item bg-light color-primary p-3 fs-5 rounded-3 ms-1">
            <FaRegThumbsUp />
          </i>
        </div>
      </div>
      <div className="author mb-5">
        <div className="d-flex justify-content-center">
          <p className="m-0">
            Posted by{" "}
            <Link
              to={`/profile/${recipe.user_id}`}
              className="m-0 text-decoration-none text-dark"
            >
              <strong>{recipe.full_name}</strong>
            </Link>{" "}
            <span title={recipe.created_at}>
              - ({moment(recipe.created_at).fromNow()})
            </span>
          </p>
        </div>
      </div>
      <div className="ingredients mb-4">
        <h1 className="fs-2 mb-3">Ingredients</h1>
        <p className="ff-airbnb" style={{ fontSize: "16px" }}>
          {ReactHtmlParser(ReactHtmlParser(recipe.ingredients))}
        </p>
      </div>
      {recipe.video_url && (
        <div className="video-step">
          <h1 className="mb-3" style={{ fontSize: "30px" }}>
            Video Step
          </h1>
          <Link
            to={`/recipe/${recipe.id}/video`}
            className="btn back-primary text-light"
          >
            <i className="fas fa-play">
              <FaPlay />
            </i>
          </Link>
        </div>
      )}
    </section>
  );
}

DetailRecipe.propTypes = {
  recipe: PropTypes.object.isRequired,
};

export default DetailRecipe;
