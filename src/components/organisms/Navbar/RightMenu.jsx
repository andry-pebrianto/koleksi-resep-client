import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";

function RightMenu({ isLoggedIn, transparent }) {
  const navigate = useNavigate();

  const logout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be Logout!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(
          `${process.env.REACT_APP_API_URL}/auth/logout/${localStorage.getItem(
            "refreshToken"
          )}`
        );
        localStorage.clear();
        return navigate("/auth");
      }

      return 0;
    });
  };

  return (
    <div className="right-menu d-flex align-items-center">
      <div className="icon bg-light p-2 rounded-circle border">
        <FaRegUser />
      </div>
      {isLoggedIn ? (
        <button
          onClick={logout}
          type="button"
          className="btn nav-login color-blue btn-none"
        >
          Logout
        </button>
      ) : (
        <Link
          to="/auth"
          className={`nav-login ms-2 ${
            transparent ? "text-white" : "color-blue"
          }`}
        >
          Login
        </Link>
      )}
    </div>
  );
}

RightMenu.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  transparent: PropTypes.bool.isRequired,
};

export default RightMenu;
