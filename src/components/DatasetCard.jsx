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
            <p>Seller fee: $300</p>
            <p>Nexus verification fee: $20</p>
            <p>Taxes: $3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatasetCard;
