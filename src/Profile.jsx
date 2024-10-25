import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./profile.scss";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="profile">
      <Navbar />
    </div>
  );
};

export default Profile;
