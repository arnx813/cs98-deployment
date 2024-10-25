import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./purchasebutton.scss";
import applePay from "../assets/apple_pay.png";

const PurchaseButton = ({ payment_type }) => {
  const navigate = useNavigate();

  return (
    <div className="purchase-button">
      {/* <img src={applePay} /> */}
      <p>{payment_type}</p>
    </div>
  );
};

export default PurchaseButton;
