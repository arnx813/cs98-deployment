import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./providercard.scss";

const ProviderCard = () => {
  const navigate = useNavigate();

  return (
    <div className="provider-card">
      <p>Provider Card Here</p>
      <div className="provider-info">
        <p>Managed by Jane Doe</p>
        <p>4.98 Stars</p>
      </div>
    </div>
  );
};

export default ProviderCard;
