import "../../assets/styles/list.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { getList } from "../../redux/actions/recipe";
import Navbar from "../../components/organisms/Navbar";
import RecipeItem from "../../components/molecules/RecipeItem";
import Footer from "../../components/organisms/Footer";

export default function List() {
  const dispatch = useDispatch();
  const { listRecipe } = useSelector((state) => state);

  const navigate = useNavigate();
  const [queryParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [limitQuery, setLimitQuery] = useState("");
  const [sortQuery, setSortQuery] = useState("");
  const [pageQuery, setPageQuery] = useState("");

  useEffect(() => {
    document.title = `${process.env.REACT_APP_APP_NAME} - List Recipe`;
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let url = `${process.env.REACT_APP_API_URL}/recipe?`;

    setSearchQuery("");
    if (queryParams.get("search")) {
      setSearchQuery(queryParams.get("search"));
      url += `&search=${queryParams.get("search")}`;
    }

    // setLimitQuery("");
    if (queryParams.get("limit")) {
      setLimitQuery(queryParams.get("limit"));
      url += `&limit=${queryParams.get("limit")}`;
    }

    // setSortQuery("");
    if (queryParams.get("sort")) {
      setSortQuery(queryParams.get("sort"));
      url += `&sort=${queryParams.get("sort")}`;
    }

    // setPageQuery("");
    if (queryParams.get("page")) {
      setPageQuery(queryParams.get("page"));
      url += `&page=${queryParams.get("page")}`;
    }

    dispatch(getList(url, navigate));
  }, [dispatch, navigate, queryParams]);

  const search = (e) => {
    e.preventDefault();

    let url = "/recipe?";
    if (searchQuery) {
      url += `&search=${searchQuery}`;
    }
    if (limitQuery) {
      url += `&limit=${limitQuery}`;
    }
    if (sortQuery) {
      url += `&sort=${sortQuery}`;
    }
    if (pageQuery) {
      url += `&page=${pageQuery}`;
    }

    return navigate(url);
  };

  return (
    <>
      {/* navbar */}
      <Navbar />
      {/* content */}
      <div className="container">
        <section className="list mb-10">
          <div className="d-flex justify-content-center mb-2">
            <form className="search mb-3" onSubmit={search}>
              <label className="py-2 px-4" htmlFor="search">
                <FaSearch />
              </label>
              <input
                type="search"
                className="form-control p-3"
                id="search"
                placeholder="Search Restaurant, Food"
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
              />
            </form>
          </div>
          {listRecipe.isLoading ? (
            <div className="d-flex justify-content-center">
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
              {listRecipe.isError ? (
                <h2 className="mt-3">{listRecipe.error}</h2>
              ) : (
                <>
                  {listRecipe.data.length ? (
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-3">
                      {listRecipe.data.map((recipe) => (
                        <RecipeItem key={recipe.id} recipe={recipe} />
                      ))}
                    </div>
                  ) : (
                    <h2 className="mt-3">Data tidak ditemukan</h2>
                  )}
                </>
              )}
            </>
          )}
        </section>
      </div>
      {/* footer */}
      <Footer />
    </>
  );
}
