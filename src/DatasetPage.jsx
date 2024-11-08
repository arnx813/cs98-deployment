import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./datasetpage.scss";

const DatasetPage = () => {
  const location = useLocation();
  const { title, price, image } = location.state || {}; // fallback in case state is undefined

  return (
    <div className="discover">
      <Navbar />
      <div className="dataset-page">
        <div className="banner">
          <img src={image} alt={title} className="banner-image" />
        </div>

        <div className="content">
          <div className="left-content">
            <h1 className="dataset-title">{title}</h1>
            <p className="manager">Managed by Joe Smith</p> {/* Placeholder */}
            <div className="description">
              <h2>Description</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
          </div>

          <div className="right-content">
            <div className="pricing-card">
              <h2>
                ${price} <span>per month</span>
              </h2>
              <div className="pricing-details">
                <p>Seller fee: $300</p>
                <p>Nexus verification fee: $20</p>
                <p>Taxes: $3</p>
              </div>
              <button className="order-button">Order</button>
              <button className="message-button">Message Seller</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatasetPage;
