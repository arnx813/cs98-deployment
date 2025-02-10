import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dataset = ({ image, description, price }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    console.log(description);
  };

  return (
    <div className="w-full h-full overflow-hidden group relative">
      {/* Image with hover effect */}
      <img
        src={image}
        alt="dataset"
        onClick={handleClick}
        className="w-full h-80 object-cover rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-105"
      />
      {/* User count box */}
      {/* <div className="absolute top-2 left-2 bg-white text-black text-sm font-regular px-3 py-1 rounded-full">
        101 users
      </div> */}
      {/* Description with hover effect */}
      <div className="mt-2">
        <p className="text-lg font-semibold mb-1 group-hover:text-blue-600 transition-colors duration-300">
          {description}
        </p>
        <p className="text-sm text-gray-700 mt-0 group-hover:text-gray-500 transition-colors duration-300">
          {price}
        </p>
      </div>
    </div>
  );
};

export default Dataset;
