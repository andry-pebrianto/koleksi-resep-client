import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import LikedRecipe from "./LikedRecipe";
import MyRecipe from "./MyRecipe";
import SavedRecipe from "./SavedRecipe";

export default function ProfileTab({ my, profile, myRecipe }) {
  const [queryParams] = useSearchParams();
  const [tab, setTab] = useState("");

  useEffect(() => {
    setTab(queryParams.get("tab"));
  }, [queryParams]);

  return (
    <section className="recipe ff-airbnb">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link
            className={`text-secondary nav-link ${
              tab !== "liked" && tab !== "saved" ? "active" : ""
            }`}
            to={my ? "/myprofile" : `/profile/${profile.id}`}
          >
            My Recipe
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`text-secondary nav-link ${
              tab === "saved" ? "active" : ""
            }`}
            to={
              my ? "/myprofile?tab=saved" : `/profile/${profile.id}?tab=saved`
            }
          >
            Saved Recipe
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`text-secondary nav-link ${
              tab === "liked" ? "active" : ""
            }`}
            to={
              my ? "/myprofile?tab=liked" : `/profile/${profile.id}?tab=liked`
            }
          >
            Liked Recipe
          </Link>
        </li>
      </ul>
      {tab === "liked" && <LikedRecipe />}
      {tab === "saved" && <SavedRecipe />}
      {tab !== "liked" && tab !== "saved" ? (
        <MyRecipe my={my} profile={profile} recipes={myRecipe} />
      ) : (
        ""
      )}
    </section>
  );
}
