import React from "react";
import PropTypes from "prop-types";
import RecipeItem from "../../molecules/RecipeItem";

const LandingLatest = ({ recipes, loading }) => {
  return (
    <section className="popular ff-airbnb mb-10">
      <div className="title-section mb-4 mb-md-5">
        <h1>Latest Recipe</h1>
      </div>
      <div className="container">
        {loading ? (
          <div className="d-flex justify-content-center">
            <div
              className="spinner-border"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {recipes.length ? (
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                {recipes.map((recipe) => (
                  <RecipeItem key={recipe.id} recipe={recipe} />
                ))}
              </div>
            ) : (
              <h2>Data tidak ditemukan</h2>
            )}
          </>
        )}
      </div>
    </section>
  );
};

LandingLatest.propTypes = {
  recipes: PropTypes.array,
};

export default LandingLatest;
