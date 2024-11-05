import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dataset from "./components/Dataset";
import arrowForCheckout from "./assets/arrow_checkout.png";
import satelliteImagery from "./assets/satellite_and_areal.png";
import "./checkout.scss";
import DatasetCard from "./components/DatasetCard";
import ProviderCard from "./components/ProviderCard";
import PurchaseButton from "./components/PurchaseButton";

const Checkout = () => {
  const navigate = useNavigate();

  return (
    <div className="checkout">
      <Navbar />
      <div className="main">
        <div className="information-leftside">
          <div className="confirm-and-pay">
            <p>Confirm and pay</p>
          </div>
          <div className="your-dataset">
            <p>Your dataset</p>
            <p>Satellite & Aerial Imagery</p>
            <ProviderCard />
          </div>
          <div className="choose-how-to-pay">
            <p>Choose How to Pay</p>
            <PurchaseButton payment_type={"Apple Pay"} />
            <PurchaseButton payment_type={"Credit Card"} />
          </div>
        </div>
        <div className="dataset-rightside">
          <DatasetCard image={satelliteImagery} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
