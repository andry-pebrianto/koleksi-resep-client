import React from "react";
import { Link } from "react-router-dom";

export default function Right() {
  return (
    <div className="right col-12 col-md-6">
      <div>
        <h1>Healthy Bone Broth Ramen (Quick & Easy)</h1>
        <hr />
        <p>
          Quick + Easy Chicken Bone Broth Ramen- Healthy chicken ramen in a
          hurry? That’s right!
        </p>
        <Link
          to="#"
          className="btn back-primary text-light"
          style={{ width: "150px" }}
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}
