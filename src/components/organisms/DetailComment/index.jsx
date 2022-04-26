import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const DetailComment = ({ comments }) => {
  return (
    <section className="comment ff-airbnb mb-10">
      <div className="form-comment mb-4">
        <form>
          <div className="mb-3">
            <textarea
              className="form-control px-3 py-4"
              placeholder="Comment"
              id="comment"
              rows="10"
            ></textarea>
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn back-primary w-100 text-light mb-2"
            >
              Send
            </button>
          </div>
        </form>
      </div>
      <div className="list-comment">
        <h1 className="fs-2 mb-3">Comment</h1>
        {comments.map((comment) => (
          <div key={comment.id} className="row mb-3">
            <div className="col-3 col-sm-2 col-lg-1 d-flex justify-content-center">
              <Link to={`/profile/${comment.id}`}>
                <img
                  src={`${process.env.REACT_APP_API_URL}/photo/${comment.photo}`}
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
                <strong>{comment.name}</strong>
              </Link>
              <p className="m-0 text-break">{comment.comment_text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

DetailComment.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default DetailComment;
