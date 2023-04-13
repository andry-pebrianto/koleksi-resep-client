import "../../assets/styles/list.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { getListRecipe } from "../../redux/actions/recipe";
import Navbar from "../../components/organisms/Navbar";
import RecipeItem from "../../components/molecules/RecipeItem";
import Footer from "../../components/organisms/Footer";
import Pagination from "../../components/molecules/Pagination";

export default function List() {
  const dispatch = useDispatch();
  const { listRecipe } = useSelector((state) => state);

  const navigate = useNavigate();
  const [queryParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [limitQuery, setLimitQuery] = useState("");
  const [sortQuery, setSortQuery] = useState("");

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

    setLimitQuery("");
    if (queryParams.get("limit")) {
      setLimitQuery(queryParams.get("limit"));
      url += `&limit=${queryParams.get("limit")}`;
    }

    setSortQuery("");
    if (queryParams.get("sort")) {
      setSortQuery(queryParams.get("sort"));
      url += `&sort=${queryParams.get("sort")}`;
    }

    if (queryParams.get("page")) {
      url += `&page=${queryParams.get("page")}`;
    }

    dispatch(getListRecipe(url, navigate));
  }, [dispatch, navigate, queryParams]);

  const applyFilter = (page = "") => {
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
    if (page) {
      url += `&page=${page}`;
    }

    return navigate(url);
  };

  const search = (e) => {
    e.preventDefault();

    applyFilter();
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
          <div className="row mx-auto" style={{ maxWidth: "600px" }}>
            <div className="col-12 col-sm-6">
              <form className="d-flex my-2" onSubmit={search}>
                <select
                  className="form-select form-select-md"
                  onChange={(e) => setSortQuery(e.target.value)}
                  value={sortQuery}
                >
                  <option value="">Sort By</option>
                  <option value="title">Title</option>
                  <option value="date">Date</option>
                </select>
                <button className="ms-2 btn btn-primary" type="submit">
                  Apply
                </button>
              </form>
            </div>
            <div className="col-12 col-sm-6">
              <form className="d-flex my-2" onSubmit={search}>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Limit"
                  onChange={(e) => setLimitQuery(e.target.value)}
                  value={limitQuery}
                />
                <button className="ms-2 btn btn-primary" type="submit">
                  Apply
                </button>
              </form>
            </div>
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
                    <>
                      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-3">
                        {listRecipe.data.map((recipe) => (
                          <RecipeItem key={recipe.id} recipe={recipe} />
                        ))}
                      </div>
                      <Pagination
                        pagination={listRecipe.pagination}
                        applyFilter={applyFilter}
                      />
                    </>
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
