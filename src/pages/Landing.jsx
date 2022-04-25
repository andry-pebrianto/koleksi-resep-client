import "../assets/styles/landing.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLatest } from "../redux/actions/recipe";
import Navbar from "../components/organisms/Navbar";
import LandingHero from "../components/organisms/LandingHero";
import LandingSuggestion from "../components/organisms/LandingSuggestion";
import LandingNew from "../components/organisms/LandingNew";
import LandingLatest from "../components/organisms/LandingLatest";
import Footer from "../components/organisms/Footer";

export default function Landing() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { latestRecipe } = useSelector((state) => state);

  useEffect(() => {
    document.title = `${process.env.REACT_APP_APP_NAME} - Landing`;
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getLatest());
  }, [dispatch]);

  return (
    <>
      <Navbar isLoggedIn={Boolean(token)} />
      <div className="container-fluid">
        <LandingHero />
        <LandingSuggestion />
        <LandingNew />
        <LandingLatest recipes={latestRecipe.data} loading={latestRecipe.isLoading} />
      </div>
      <Footer />
    </>
  );
}
