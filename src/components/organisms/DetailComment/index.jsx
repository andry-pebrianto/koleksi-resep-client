import React, { useState } from "react";
import { Link } from "react-router-dom";
const _ = require("lodash");
import PropTypes from "prop-types";
import { getRecipeComments, postComment } from "../../../redux/actions/comment";
import { useDispatch } from "react-redux";
import { createToast } from "../../../utils/createToast";

function DetailComment({ comments, recipeId }) {
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!comment) {
      setErrors([{ msg: "All field required (*) must be filled" }]);
    } else {
      setErrors([]);
      setIsLoading(true);

      const addComment = await postComment(
        {
          commentText: comment,
          recipeId,
        },
        setErrors
      );

      if (addComment) {
        createToast("Add Comment Success");
        dispatch(getRecipeComments(recipeId, setErrors));
      }

      setIsLoading(false);
    }
  };

  return (
    <section className="comment ff-airbnb mb-10">
      <div className="form-comment mb-4">
        {errors.length > 0 && (
          <div className="alert alert-danger mx-0">
            <ul className="m-0">
              {errors.map((error, index) => (
                <li key={index}>{error.msg}</li>
              ))}
            </ul>
          </div>
        )}
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <textarea
              className="form-control px-3 py-4"
              placeholder="Comment"
              id="comment"
              rows="10"
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          {isLoading ? (
            <div className="d-flex justify-content-center">
              <button
                className="btn back-primary w-100 text-light mb-2"
                type="submit"
                disabled
              >
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />{" "}
                Loading...
              </button>
            </div>
          ) : (
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn back-primary w-100 text-light mb-2"
              >
                Send
              </button>
            </div>
          )}
        </form>
      </div>
      <div className="list-comment">
        <h1 className="fs-2 mb-3">Comment</h1>
        {comments.length ? (
          <>
            {_.reverse([...comments]).map((comment) => (
              <div key={comment.id} className="row mb-3">
                <div className="col-3 col-sm-2 col-lg-1 d-flex justify-content-center">
                  <Link to={`/profile/${comment.user_id}`}>
                    <img
                      src={
                        comment.photo_url ||
                        `${process.env.REACT_APP_API_URL}/photo/profile-default.jpg`
                      }
                      className="rounded-circle"
                      alt="Profile"
                    />
                  </Link>
                </div>
                <div className="col-9 col-sm-10 col-lg-11 d-flex flex-column justify-content-center">
                  <Link
                    to={`/profile/${comment.user_id}`}
                    className="m-0 text-decoration-none text-dark"
                  >
                    <strong>{comment.full_name}</strong>
                  </Link>
                  <p className="m-0 text-break">{comment.body}</p>
                </div>
              </div>
            ))}
          </>
        ) : (
          <h5>No comments yet</h5>
        )}
      </div>
    </section>
  );
}

DetailComment.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default DetailComment;
