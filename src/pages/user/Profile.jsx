import "../../assets/styles/profile.css";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions/user";
import Navbar from "../../components/organisms/Navbar";
import ProfileTab from "../../components/organisms/ProfileTab";
import Footer from "../../components/organisms/Footer";
import ProfileData from "../../components/organisms/ProfileData";

export default function Profile({ my = false }) {
  const dispatch = useDispatch();
  const { detailUser } = useSelector((state) => state);

  const navigate = useNavigate();
  const urlParams = useParams();

  useEffect(() => {
    document.title = `${process.env.REACT_APP_APP_NAME} - ${
      my ? "My Profile" : "Profile"
    }`;
    window.scrollTo(0, 0);
  }, [my]);

  useEffect(() => {
    if (localStorage.getItem("id") === urlParams.id) {
      return navigate("/myprofile");
    }

    const id = my ? localStorage.getItem("id") : urlParams.id;
    dispatch(getDetail(id));
  }, [dispatch, my, navigate, urlParams.id]);

  return (
    <>
      {/* navbar */}
      <Navbar />
      {/* content */}
      <div className="container mb-5">
        {detailUser.isLoading ? (
          <div className="mt-12 mb-10 d-flex justify-content-center">
            <div
              className="spinner-border mt-3"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {detailUser.isError ? (
              <h2 className="mt-12 mb-10">{detailUser.error}</h2>
            ) : (
              <>
                <ProfileData profile={detailUser.data} />
                <ProfileTab
                  my={my}
                  profile={detailUser.data}
                  myRecipe={detailUser.listRecipe}
                />
              </>
            )}
          </>
        )}
      </div>
      {/* footer */}
      <Footer />
    </>
  );
}
