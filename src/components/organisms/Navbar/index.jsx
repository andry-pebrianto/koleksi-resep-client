import "../../../assets/styles/navbar.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RightMenu from "./RightMenu";
import LeftMenu from "./LeftMenu";
import Logo from "../../atoms/Logo";

function Navbar() {
  const isLoggedIn = Boolean(localStorage.getItem("accessToken"));
  const [transparent, setTransparent] = useState(true);

  // mengubah bg navbar ketika discroll
  const changeNavBg = () => {
    const navbarTogglerStatus = document
      ?.querySelector(".navbar-toggler")
      ?.classList.contains("collapsed");

    if (navbarTogglerStatus) {
      if (document.documentElement.scrollTop > 100) {
        setTransparent(false);
      } else {
        setTransparent(true);
      }
    }
  };

  // mengubah bg navbar ketika button hamburger diklik
  const changeNavBgClick = () => {
    const navbarTogglerStatus = document
      ?.querySelector(".navbar-toggler")
      ?.classList?.contains("collapsed");

    if (navbarTogglerStatus) {
      if (document.documentElement.scrollTop > 100) {
        console.log("");
      } else {
        setTransparent(true);
      }
    } else {
      setTransparent(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavBg);

    return () => {
      window.removeEventListener("scroll", changeNavBg);
    };
  }, []);

  return (
    <nav
      className={`navbar fixed-top navbar-expand-md navbar-light py-2 py-md-4 ff-airbnb ${
        transparent ? "bg-transparent" : "bg-white nav-shadow"
      }`}
      id="navbar"
    >
      <div className="container mt-1">
        <Link to="/" className="navbar-brand d-md-none">
          <Logo width="40px" height="40px" color="#111" />
          <span>{process.env.REACT_APP_APP_NAME}</span>
        </Link>
        <button
          className="navbar-toggler collapsed bg-light"
          type="button"
          onClick={changeNavBgClick}
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <LeftMenu isLoggedIn={isLoggedIn} />
          <RightMenu isLoggedIn={isLoggedIn} transparent={transparent} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
