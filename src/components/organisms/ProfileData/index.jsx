import React from "react";

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
        </div>
      </div>
      <p className="fs-5 mt-3">{profile.full_name}</p>
      <a href="/" className="btn btn-outline-primary btn-sm mx-2">
        Edit Profile
      </a>
      {!profile.google_id && (
        <a href="/" className="btn btn-outline-primary btn-sm mx-2">
          Edit Password
        </a>
      )}
    </section>
  );
}

export default ProfileData;
