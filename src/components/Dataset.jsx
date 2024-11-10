import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./dataset.scss";


const Dataset = ({ image, description, price }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    console.log(description);
  };

  return (
    <div className="dataset">
      <img
        src={image}
        alt="dataset"
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      />
      <p className="dataset-description">{description}</p>
      <p className="dataset-price">{price}</p>
    </div>
  );
};

export default Dataset;
