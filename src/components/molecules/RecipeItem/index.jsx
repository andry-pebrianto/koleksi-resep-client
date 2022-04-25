import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const RecipeItem = ({ recipe }) => {
  const { id, title, photo } = recipe;

  return (
    <div className="col">
      <Link to={`/detail/${id}`}>
        <div className="card align-items-center">
          <p className="title text-dark text-str back-primary px-2 py-1 rounded">
            {title}
          </p>
          <img
            src={`${process.env.REACT_APP_API_URL}/photo/${photo}`}
            className="card-img-top"
            alt={title}
          />
        </div>
      </Link>
    </div>
  );
};

RecipeItem.propTypes = {
  recipe: PropTypes.object,
};

export default RecipeItem;