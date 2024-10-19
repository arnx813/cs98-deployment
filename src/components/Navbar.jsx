import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.scss";
import profileImage from "/Users/davidmatusz/Desktop/CS98.01/project-dataset-nexus/src/assets/profile.jpeg";
import nexusLogo from "/Users/davidmatusz/Desktop/CS98.01/project-dataset-nexus/src/assets/nexus_temp_logo.jpeg";
import settingsImage from "/Users/davidmatusz/Desktop/CS98.01/project-dataset-nexus/src/assets/settings.png";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="logo">
        <img src={nexusLogo} />
        <p>Nexus</p>
      </div>
      <div className="search-bar">
        <input placeholder="Search for datasets" />
        <button className="search-button">Search</button>
      </div>
      <div className="profile">
        <img src={settingsImage} />
        <img src={profileImage} />
      </div>
    </div>
  );
};

export default Navbar;
