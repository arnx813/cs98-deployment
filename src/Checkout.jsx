import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dataset from "./components/Dataset";
import arrowForCheckout from "/Users/davidmatusz/Desktop/CS98.01/project-dataset-nexus/src/assets/arrow_checkout.png";
import satelliteImagery from "/Users/davidmatusz/Desktop/CS98.01/project-dataset-nexus/src/assets/satellite_and_areal.png";
import "./checkout.scss";
import DatasetCard from "./components/DatasetCard";

const Checkout = () => {
  const navigate = useNavigate();

  return (
    <div className="checkout">
      <Navbar />
      <div className="main">
        <div className="information-leftside">
          <div className="confirm-and-pay">
            {/* <img src={arrowForCheckout} /> */}
            <p>Confirm and pay</p>
          </div>
          <div className="your-dataset">
            <p>Your dataset</p>
            <p>Satellite & Aerial Imagery</p>
            {/* PROVIDER COMPONENT HERE */}
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
