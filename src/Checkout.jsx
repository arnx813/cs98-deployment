import Navbar from "./components/Navbar";
import satelliteImagery from "../src/assets/satellite_and_areal.png";
import "./checkout.scss";
import DatasetCard from "./components/DatasetCard";

const Checkout = () => {

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
