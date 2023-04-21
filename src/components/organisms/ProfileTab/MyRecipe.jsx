import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { deleteRecipe, getUserRecipes } from "../../../redux/actions/recipe";
import { createToast } from "../../../utils/createToast";
import { checkAndRefreshAccessToken } from "../../../redux/actions/auth";

function MyRecipe({ my, profile, recipes }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const removeRecipe = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This recipe will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (await checkAndRefreshAccessToken(navigate)) {
          const deleteStatus = await deleteRecipe(id, setError);
          if (deleteStatus) {
            createToast("Delete Recipe Success", "success");
            dispatch(getUserRecipes(profile.id));
          } else {
            createToast(error, "error");
          }
        }
      }
    });
  };

  return (
    <>
      {recipes.length ? (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gy-2 gx-4 mt-2">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="col mt-4">
              <div className="card border-0">
                <div className="card-body p-0">
                  <Link to={`/recipe/${recipe.id}`}>
                    <img
                      src={
                        recipe.photo_url ||
                        `${process.env.REACT_APP_API_URL}/photo/food-default.jpg`
                      }
                      alt={recipe.title}
                    />
                    <p className="title text-dark back-primary p-1 rounded">
                      {recipe.title}
                    </p>
                  </Link>
                  {my && (
                    <>
                      <div className="action">
                        <Link to={`/recipe/${recipe.id}/edit`}>
                          <i
                            className="text-dark back-primary p-2 mx-1"
                            title="Edit Recipe"
                          >
                            <FaRegEdit />
                          </i>
                        </Link>
                        <button
                          onClick={() => removeRecipe(recipe.id)}
                          type="button"
                          className="btn btn-none p-0 m-0"
                        >
                          <i
                            className="text-dark back-primary p-2 mx-1"
                            title="Delete Recipe"
                          >
                            <FaRegTrashAlt />
                          </i>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h4 className="my-5">You have not created a recipe yet</h4>
      )}
    </>
  );
}

export default MyRecipe;
