import React from "react";
import PropTypes from "prop-types";
import RecipeItem from "../../molecules/RecipeItem";

const LandingLatest = ({ recipes }) => {
  return (
    <section className="popular ff-airbnb mb-10">
      <div className="title-section mb-4 mb-md-5">
        <h1>Latest Recipe</h1>
      </div>
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {recipes.map((recipe) => (
            <RecipeItem key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </section>
  );
};

LandingLatest.propTypes = {
  recipes: PropTypes.array,
};

export default LandingLatest;
