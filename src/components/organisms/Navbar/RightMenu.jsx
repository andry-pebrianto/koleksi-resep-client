import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { FaRegUser } from "react-icons/fa";

const RightMenu = ({ isLoggedIn, transparent }) => {
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
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        return navigate("/auth");
      }
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
          className={`btn nav-login color-blue btn-none`}
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
};

RightMenu.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  transparent: PropTypes.bool.isRequired,
};

export default RightMenu;
