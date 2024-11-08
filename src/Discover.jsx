import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import DatasetItem from "./components/DatasetItem";
import "./discover.scss";
import medicalImaging from "./assets/medical_imaging.png";
import satelliteImagery from "./assets/satellite_and_areal.png";
import autonomousDriving from "./assets/autonomous_driving.png";
import abstractArt from "./assets/abstract_art.png";
import africanWildlife from "./assets/african_wildlife.png";
import asianPeople from "./assets/asian_people.png";

const Discover = () => {
  const [email, setEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  return (
    <div className="discover">
      <Navbar />
      <div className="main">
        <p className="header">Explore our starter kit</p>
        <div className="pictures">
          <div className="row-of-pictures">
            <DatasetItem
              image={medicalImaging}
              description="Medical Imaging - Cancer"
              price="$2,300 per month"
            />
            <DatasetItem
              image={satelliteImagery}
              description="Satellite & Aerial Imagery"
              price="$2,367 per month"
            />
            <DatasetItem
              image={autonomousDriving}
              description="Autonomous Driving"
              price="$5,500 per month"
            />
          </div>
          <div className="row-of-pictures">
            <DatasetItem
              image={abstractArt}
              description="Abstract Art"
              price="$2,300 per month"
            />
            <DatasetItem
              image={africanWildlife}
              description="African Wildlife"
              price="$2,300 per month"
            />
            <DatasetItem
              image={asianPeople}
              description="Asian People"
              price="$2,300 per month"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
