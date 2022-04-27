import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLatestRecipe } from '../../../redux/actions/recipe';
import RecipeItem from '../../molecules/RecipeItem';

function LandingLatest() {
  const dispatch = useDispatch();
  const { latestRecipe } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getLatestRecipe());
  }, [dispatch]);

  return (
    <section className="popular ff-airbnb mb-10">
      <div className="title-section mb-4 mb-md-5">
        <h1>Latest Recipe</h1>
      </div>
      <div className="container">
        {latestRecipe.isLoading ? (
          <div className="d-flex justify-content-center">
            <div
              className="spinner-border"
              style={{ width: '3rem', height: '3rem' }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {latestRecipe.isError ? (
              <h2 className="mt-3">{latestRecipe.error}</h2>
            ) : (
              <>
                {latestRecipe.data.length ? (
                  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                    {latestRecipe.data.map((recipe) => (
                      <RecipeItem key={recipe.id} recipe={recipe} />
                    ))}
                  </div>
                ) : (
                  <h2>Data tidak ditemukan</h2>
                )}
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default LandingLatest;
