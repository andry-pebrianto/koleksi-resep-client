import "../../assets/styles/detail.css";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions/recipe";
import Navbar from "../../components/organisms/Navbar";
import DetailRecipe from "../../components/organisms/DetailRecipe";
import DetailComment from "../../components/organisms/DetailComment";
import Footer from "../../components/organisms/Footer";

export default function Detail() {
  const dispatch = useDispatch();
  const { detailRecipe } = useSelector((state) => state);

  const navigate = useNavigate();
  const urlParams = useParams();

  useEffect(() => {
    document.title = `${process.env.REACT_APP_APP_NAME} - Detail Recipe`;
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getDetail(urlParams.id, navigate));
  }, [dispatch, navigate, urlParams.id]);

  return (
    <>
      {/* navbar */}
      <Navbar />
      <div className="container">
        {detailRecipe.isLoading ? (
          <div className="mt-10 mb-10 d-flex justify-content-center">
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
            {detailRecipe.isError ? (
              <h2 className="mt-12 mb-10">{detailRecipe.error}</h2>
            ) : (
              <>
                <DetailRecipe recipe={detailRecipe.data} />
                <DetailComment comments={detailRecipe.comments} />
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
