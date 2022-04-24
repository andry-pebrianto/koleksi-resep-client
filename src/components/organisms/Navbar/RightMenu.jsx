import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types'
import { FaRegUser } from "react-icons/fa";

const RightMenu = ({ isLoggedIn, transparent }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");

    return navigate("/login");
  };

  return (
    <div className="right-menu d-flex align-items-center">
      <div className="icon bg-light p-2 rounded-circle border">
        <FaRegUser />
      </div>
      {isLoggedIn ? (
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to logout")) {
              logout();
            }
          }}
          className={`btn nav-login color-blue btn-none`}
        >
          Logout
        </button>
      ) : (
        <Link
          to="/login"
          className={`nav-login ms-2 ${
            transparent ? "text-white" : "color-blue"
          }`}
        >
          Login
        </Link>
      )}
    </div>
  );
};

RightMenu.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  transparent: PropTypes.bool.isRequired,
}

export default RightMenu;
