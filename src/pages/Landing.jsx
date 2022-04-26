import "../assets/styles/landing.css";
import React, { useEffect } from "react";
import Navbar from "../components/organisms/Navbar";
import LandingHero from "../components/organisms/LandingHero";
import LandingSuggestion from "../components/organisms/LandingSuggestion";
import LandingNew from "../components/organisms/LandingNew";
import LandingLatest from "../components/organisms/LandingLatest";
import Footer from "../components/organisms/Footer";

export default function Landing() {
  useEffect(() => {
    document.title = `${process.env.REACT_APP_APP_NAME} - Landing`;
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar/>
      <div className="container-fluid">
        <LandingHero />
        <LandingSuggestion />
        <LandingNew />
        <LandingLatest />
      </div>
      <Footer />
    </>
  );
}
