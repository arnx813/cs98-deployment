import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./profile.scss";
import janeDoe from "src/assets/jane_doe.png";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="profile">
      <Navbar />
      <div className="profile-main">
        <div className="user-info-card">
          <img src={janeDoe} />
          <p>Jane Doe</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
