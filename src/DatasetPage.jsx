import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./datasetpage.scss";
import Dataset from "./components/Dataset";
import medicalImaging from "./assets/medical_imaging.png";
import satelliteImagery from "./assets/satellite_and_areal.png";
import autonomousDriving from "./assets/autonomous_driving.png";
import abstractArt from "./assets/abstract_art.png";
import africanWildlife from "./assets/african_wildlife.png";
import asianPeople from "./assets/asian_people.png";

const DatasetPage = () => {
  const [email, setEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  return (
    <div className="discover">
      <Navbar />
      <div className="dataset-page">
        <div className="banner">
          <img src={satelliteImagery} alt="Satellite Imagery" className="banner-image" />
        </div>

        <div className="content">
          <div className="left-content">
            <h1 className="dataset-title">Satellite & Aerial Imagery</h1>
            <p className="manager">Managed by Joe Smith</p>
            <div className="details-table">
              <div className="table-row">
                <div className="table-cell">text</div>
                <div className="table-cell">string</div>
                <div className="table-cell">abstract: The Liénard equation...</div>
              </div>
              <div className="table-row">
                <div className="table-cell">meta</div>
                <div className="table-cell">dict</div>
                <div className="table-cell">{`{ "dup_signals": {}, "filename": "out/1608.01636_extract_LEC_7.tex.md" }`}</div>
              </div>
              <div className="table-row">
                <div className="table-cell">subset</div>
                <div className="table-cell">string</div>
                <div className="table-cell">arxiv</div>
              </div>
            </div>

            <div className="description">
              <h2>Description</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s 
                standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to 
                make a type specimen book.
              </p>
            </div>
          </div>

          <div className="right-content">
            <div className="pricing-card">
              <h2>$323 <span>per month</span></h2>
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
