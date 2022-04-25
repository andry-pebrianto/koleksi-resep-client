import "../assets/styles/landing.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLatest } from "../redux/actions/latest";
import Navbar from "../components/organisms/Navbar";
import LandingHero from "../components/organisms/LandingHero";
import LandingSuggestion from "../components/organisms/LandingSuggestion";
import LandingNew from "../components/organisms/LandingNew";
import LandingLatest from "../components/organisms/LandingLatest";
import Footer from "../components/organisms/Footer";

export default function Landing() {
  const isLoggedIn = false;
  const dispatch = useDispatch();
  const { latest } = useSelector((state) => state);

  useEffect(() => {
    document.title = `${process.env.REACT_APP_APP_NAME} - Landing`
  }, [])
  

  useEffect(() => {
    dispatch(getLatest());
  }, [dispatch]);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <div className="container-fluid">
        <LandingHero />
        <LandingSuggestion />
        <LandingNew />
        <LandingLatest recipes={latest.data} />
      </div>
      <Footer />
    </>
  );
}
