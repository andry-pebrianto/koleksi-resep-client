import React from "react";
import EditIcon from "../../../assets/icons/edit.svg";

function ProfileData({ profile }) {
  return (
    <section className="profile ff-airbnb text-center mb-5">
      <div className="d-flex justify-content-center">
        <div className="position-relative">
          {profile.id && (
            <img
              className="picture rounded-circle"
              src={
                profile.photo_url ||
                `${process.env.REACT_APP_API_URL}/photo/profile-default.jpg`
              }
              alt="Profile"
            />
          )}
          <img className="icon" src={EditIcon} alt="Edit Icon" />
        </div>
      </div>
      <p className="fs-5 mt-3">{profile.full_name}</p>
    </section>
  );
}

export default ProfileData;
