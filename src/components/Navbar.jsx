import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.scss";
import profileImage from "../assets/profile.jpeg";
import nexusLogo from "../assets/nexus_temp_logo.jpeg";
import settingsImage from "../assets/settings.png";
import { signOut } from "@aws-amplify/auth";

import { Authenticator, withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigateToUser = () => {
    navigate("/profile");
  };

  const navigateToUpload = () => {
    navigate("/upload"); // Adjust this path based on your upload route
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="navbar flex items-center justify-between p-4 text-black">
      <Authenticator />
      <div className="logo">
        <Link to="/" className="flex items-center">
          <img src={nexusLogo} alt="Nexus Logo" className="h-8 mr-2" />
          <p className="text-lg font-semibold">Nexus</p>
        </Link>
      </div>
      <div className="search-bar flex items-center">
        <input
          placeholder="Search for datasets"
          className="search-input p-2 rounded-l-lg"
        />
        <button className="search-button w-10 h-10 bg-blue-500 rounded-r-lg flex items-center justify-center text-white focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <path d="M10 2a8 8 0 105.293 14.293l5.386 5.387a1 1 0 001.415-1.415l-5.386-5.387A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z" />
          </svg>
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={navigateToUpload}
          className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-100 focus:outline-none border border-gray-300"
        >
          Upload Dataset
        </button>

        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center justify-between w-20 h-10 px-2 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-200 hover:border-gray-400 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>

            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-4 h-4 text-white"
              >
                <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
              </svg>
            </div>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
              <button
                onClick={navigateToUser}
                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
              >
                Go to Profile
              </button>
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withAuthenticator(Navbar);
