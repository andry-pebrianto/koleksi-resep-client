import React from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from 'prop-types'

const LeftMenu = ({isLoggedIn}) => {
  const location = useLocation();

  return (
    <ul className="navbar-nav me-auto">
      <li className="nav-item me-5">
        <Link to="/" className="nav-link">
          <span className={`${location.pathname === "/" && "active"}`}>
            Home
          </span>
        </Link>
      </li>
      {isLoggedIn && (
        <>
          <li className="nav-item me-5">
            <Link to="/list" className="nav-link">
              <span
                className={`${location.pathname.includes("list") && "active"}`}
              >
                List Recipe
              </span>
            </Link>
          </li>
          <li className="nav-item me-5">
            <Link to="/add" className="nav-link">
              <span className={`${location.pathname === "/add" && "active"}`}>
                Add Recipe
              </span>
            </Link>
          </li>
          <li className="nav-item me-5">
            <Link to="/myprofile" className="nav-link">
              <span
                className={`${
                  location.pathname.includes("profile") && "active"
                }`}
              >
                Profile
              </span>
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}

LeftMenu.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
}

export default LeftMenu;