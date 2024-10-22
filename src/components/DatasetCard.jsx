// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./datasetcard.scss";

// const DatasetCard = ({ image }) => {
//   const navigate = useNavigate();

//   return (
//     <div className="dataset-card">
//       <img src={image} />
//       <div className="pricing">
//         <p>$323 per month</p>
//       </div>
//     </div>
//   );
// };

// export default DatasetCard;

import "./datasetcard.scss";

const DatasetCard = ({ image }) => {
  return (
    <div className="dataset-card">
      <div className="image-container">
        <img src={image} alt="Dataset Preview" />
        <div className="pricing-overlay">
          <p>$323 per month</p>
          <div className="fee-details">
            <div className="fee-ele">
              <p>Seller fee:</p>
              <p>$300</p>
            </div>
            <div className="fee-ele">
              <p>Nexus verification fee:</p>
              <p>$20</p>
            </div>
            <div className="fee-ele">
              <p>Taxes:</p>
              <p>$3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatasetCard;
