import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import HeroImage from "../../../assets/images/landing-hero.webp";
import { useNavigate } from "react-router-dom";

const LandingHero = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const search = (e, query) => {
    e.preventDefault();

    return navigate("/list?search=" + query);
  };

  return (
    <section className="hero row">
      <div className="content col-10 col-sm-9 d-flex flex-column justify-content-center ff-airbnb">
        <h1 className="display-5 mb-3">Discover Recipe & Delicious Food</h1>
        <form className="search mb-3" onSubmit={(e) => search(e, searchQuery)}>
          <label className="py-2 px-4" htmlFor="search">
            <FaSearch />
          </label>
          <input
            type="search"
            className="form-control p-3"
            id="search"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Restaurant, Food"
          />
        </form>
      </div>
      <div className="decoration col-2 col-sm-3 d-flex align-items-center back-primary">
        <img className="d-none d-md-block" src={HeroImage} alt="Hero" />
      </div>
    </section>
  );
};

export default LandingHero;
