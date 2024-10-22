import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./providercard.scss";
import janeDoe from "/Users/davidmatusz/Desktop/CS98.01/project-dataset-nexus/src/assets/jane_doe.png";

const ProviderCard = () => {
  const navigate = useNavigate();

  return (
    <div className="provider-card">
      <img src={janeDoe} />
      <div className="provider-info">
        <p>Managed by Jane Doe</p>
        <p>4.98 Stars</p>
      </div>
    </div>
  );
};

export default ProviderCard;
