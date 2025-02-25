// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Dataset = ({ image, description, price }) => {
//   const navigate = useNavigate();

//   const handleClick = (e) => {
//     console.log(description);
//   };

//   return (
//     <div className="w-full h-full overflow-hidden group relative">
//       {/* Image with hover effect */}
//       <img
//         src={image}
//         alt="dataset"
//         onClick={handleClick}
//         className="w-full h-80 object-cover rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-105"
//       />
//       {/* User count box */}
//       {/* <div className="absolute top-2 left-2 bg-white text-black text-sm font-regular px-3 py-1 rounded-full">
//         101 users
//       </div> */}
//       {/* Description with hover effect */}
//       <div className="mt-2">
//         <p className="text-lg font-semibold mb-1 group-hover:text-blue-600 transition-colors duration-300">
//           {description}
//         </p>
//         <p className="text-sm text-gray-700 mt-0 group-hover:text-gray-500 transition-colors duration-300">
//           {price}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Dataset;

import { useNavigate } from "react-router-dom";

const Dataset = ({ id, image, description, price, score }) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-full h-full overflow-hidden group relative cursor-pointer"
      onClick={() =>
        navigate(`/dataset/${id}`, {
          state: { id, image, description, price, score },
        })
      }
    >
      {/* Image with hover effect */}
      <img
        src={image}
        alt="dataset"
        className="w-full h-80 object-cover rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-105"
      />

      {/* Description and price */}
      <div className="mt-2">
        <p className="text-lg font-semibold mb-1 group-hover:text-blue-600 transition-colors duration-300">
          {description}
        </p>
        <p className="text-sm text-gray-700 mt-0 group-hover:text-gray-500 transition-colors duration-300">
          {price}
        </p>
      </div>

      {/* Dataset Score */}
      {score !== undefined ? (
        <p className="mt-2 text-sm font-medium text-gray-800">
          Quality Score: {score === -2 ? "?/100" : `${score}/100`}
        </p>
      ) : (
        <p className="mt-2 text-sm text-gray-600">Loading score...</p>
      )}
    </div>
  );
};

export default Dataset;
