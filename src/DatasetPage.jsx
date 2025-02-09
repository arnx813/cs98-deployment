// import React, { useEffect } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import Navbar from "./components/Navbar";
// // Replace with actual image paths or import from your assets
// // import placeholderImage1 from "./assets/placeholder1.jpg";
// // import placeholderImage2 from "./assets/placeholder2.jpg";
// // import placeholderImage3 from "./assets/placeholder3.jpg";
// import { Amplify } from "aws-amplify";
// import { getCurrentUser } from "aws-amplify/auth";

// const DatasetPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { id } = useParams(); // Get the id from the URL
//   const { title, price, image, description } = location.state || {}; // Fallback if state is undefined

//   // Placeholder images for the gallery
//   const images = [image, image, image];

//   const starredDataset = async () => {
//     try {
//       console.log("starred the dataset; do the rest");
//       const user = await getCurrentUser();
//       console.log(user);

//       const usersStarredDatasets = fetch(
//         `http://localhost:8080/user/${user.userId}/star/${id}`,
//         { method: "PUT" }
//       );
//     } catch (error) {
//       console.error("Error starring dataset:", error);
//     }
//   };

//   useEffect(() => {
//     const fetchThreeImagesForSlideshow = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:8080/datasets/getAllDatasetIDs"
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch all dataset IDs");
//         }
//         const data = await response.json();
//         console.log("Fetched all dataset IDs:", data);
//         setAllDatasetIDs(data);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchThreeImagesForSlideshow();
//   }, []);

//   return (
//     <div className="min-h-scree">
//       <Navbar />
//       <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
//         {/* Image Gallery */}
//         <div className="mb-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {/* Primary Image */}
//             <div className="md:col-span-2">
//               <img
//                 src={images[0]}
//                 alt={title || "Dataset Primary"}
//                 className="w-full h-full object-cover rounded-lg shadow-md"
//               />
//             </div>
//             {/* Secondary Images */}
//             <div className="grid grid-cols-2 md:grid-cols-1 md:col-span-1 gap-4">
//               <img
//                 src={images[1]}
//                 alt="Secondary Image 1"
//                 className="w-full h-full object-cover rounded-lg shadow-md"
//               />
//               <img
//                 src={images[2]}
//                 alt="Secondary Image 2"
//                 className="w-full h-full object-cover rounded-lg shadow-md"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Content Section */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* Left Content */}
//           <div className="md:col-span-2">
//             <h1 className="text-3xl font-bold text-gray-800 mb-4">
//               {title || "Dataset Title"}
//             </h1>
//             <p className="text-gray-600 mb-6">
//               Managed by <span className="font-medium">Joe Smith</span>
//             </p>
//             <hr className="border-gray-300 mb-4" />

//             <div className="mb-6">
//               <h2 className="text-xl font-semibold text-gray-800 mb-2">
//                 Description
//               </h2>
//               <p className="text-gray-700">
//                 {description ||
//                   "This dataset provides comprehensive insights into ... [provide a detailed description here]."}
//               </p>
//             </div>
//             <hr className="border-gray-300 mb-4" />

//             {/* Additional Details */}
//             <div className="mb-6">
//               <h2 className="text-xl font-semibold text-gray-800 mb-2">
//                 Details
//               </h2>
//               <ul className="list-disc list-inside text-gray-700 space-y-1">
//                 <li>Data Format: CSV, JSON</li>
//                 <li>Last Updated: August 2023</li>
//                 <li>Size: 1.2 GB</li>
//                 <li>Records: 100,000</li>
//                 {/* Add more details as needed */}
//               </ul>
//             </div>
//           </div>

//           {/* Right Content */}
//           <div className="md:col-span-1">
//             <div className="bg-white rounded-lg border p-6 shadow-md">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//                 ${price || "99"}
//                 <span className="text-base font-normal text-gray-600">
//                   {" "}
//                   per month
//                 </span>
//               </h2>
//               <div className="text-gray-700 mb-6 space-y-2">
//                 <p className="flex justify-between">
//                   <span>Seller fee:</span> <span>$300</span>
//                 </p>
//                 <p className="flex justify-between">
//                   <span>Nexus verification fee:</span> <span>$20</span>
//                 </p>
//                 <p className="flex justify-between">
//                   <span>Taxes:</span> <span>$3</span>
//                 </p>
//               </div>
//               {/* <button
//                 onClick={starredDataset}
//                 style={{ border: "1px solid gray", borderRadius: "8px" }}
//               >
//                 Star Me!
//               </button> */}
//               <button
//                 style={{ backgroundColor: "#642DFF" }}
//                 className="w-full text-white py-3 rounded-lg hover:bg-red-700 transition duration-200 mb-4"
//                 onClick={() => navigate(`/checkout/${id}`)}
//               >
//                 Order
//               </button>
//               <button
//                 className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition duration-200 mb-4"
//                 onClick={() => alert("Messaging seller...")}
//               >
//                 Message Seller
//               </button>

//               <button
//                 className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition duration-200"
//                 onClick={starredDataset}

//               >
//                                 Star Me!

//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DatasetPage;

// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import Navbar from "./components/Navbar";

// import { getCurrentUser } from "aws-amplify/auth";

// const DatasetPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { id } = useParams();
//   const { title, price, description } = location.state || {};

//   const [images, setImages] = useState([]);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isFading, setIsFading] = useState(false);

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const imagePromises = [0, 1, 2].map((index) =>
//           fetch(
//             `http://localhost:8080/datasets/getDatasetSinglePreviewImage/${id}/${index}`
//           ).then((res) =>
//             res.ok ? res.blob() : Promise.reject("Failed to fetch image")
//           )
//         );
//         const blobs = await Promise.all(imagePromises);
//         const imageUrls = blobs.map((blob) => URL.createObjectURL(blob));
//         setImages(imageUrls);
//       } catch (error) {
//         console.error("Error fetching images:", error);
//       }
//     };

//     fetchImages();
//   }, [id]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIsFading(true); // Start fading out
//       setTimeout(() => {
//         setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Change image
//         setIsFading(false); // Start fading in
//       }, 500); // Match transition duration in CSS
//     }, 5000);

//     return () => clearInterval(interval); // Cleanup the interval
//   }, [images]);

//   const starredDataset = async () => {
//     try {
//       console.log("starred the dataset; do the rest");
//       const user = await getCurrentUser();
//       console.log(user);

//       await fetch(`http://localhost:8080/user/${user.userId}/star/${id}`, {
//         method: "PUT",
//       });
//     } catch (error) {
//       console.error("Error starring dataset:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen">
//       <Navbar />
//       <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
//         {/* Image Gallery */}
//         <div className="mb-8">
//           {/* className="grid grid-cols-1 md:grid-cols-3 gap-4" */}
//           <div
//             style={{
//               minHeight: "10vh",
//               alignSelf: "center",
//               justifySelf: "center",
//             }}
//           >
//             {/* Primary Image */}
//             <div className="flex justify-center items-center h-[85vh]">
//               {images.length > 0 ? (
//                 <img
//                   src={images[currentImageIndex]}
//                   alt={title || "Dataset Primary"}
//                   className={`rounded-lg shadow-md transition-opacity duration-500 ${
//                     isFading ? "opacity-0" : "opacity-100"
//                   }`}
//                   style={{
//                     width: "900px", // Adjust width as needed
//                     height: "auto", // Maintain aspect ratio
//                     objectFit: "contain",
//                   }}
//                 />
//               ) : (
//                 <p>Loading images...</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Content Section */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* Left Content */}
//           <div className="md:col-span-2">
//             <h1 className="text-3xl font-bold text-gray-800 mb-4">
//               {title || "Dataset Title"}
//             </h1>
//             <p className="text-gray-600 mb-6">
//               Managed by <span className="font-medium">Joe Smith</span>
//             </p>
//             <hr className="border-gray-300 mb-4" />

//             <div className="mb-6">
//               <h2 className="text-xl font-semibold text-gray-800 mb-2">
//                 Description
//               </h2>
//               <p className="text-gray-700">
//                 {description ||
//                   "This dataset provides comprehensive insights into ... [provide a detailed description here]."}
//               </p>
//             </div>
//             <hr className="border-gray-300 mb-4" />

//             {/* Additional Details */}
//             <div className="mb-6">
//               <h2 className="text-xl font-semibold text-gray-800 mb-2">
//                 Details
//               </h2>
//               <ul className="list-disc list-inside text-gray-700 space-y-1">
//                 <li>Data Format: CSV, JSON</li>
//                 <li>Last Updated: August 2023</li>
//                 <li>Size: 1.2 GB</li>
//                 <li>Records: 100,000</li>
//                 {/* Add more details as needed */}
//               </ul>
//             </div>
//           </div>

//           {/* Right Content */}
//           <div className="md:col-span-1">
//             <div className="bg-white rounded-lg border p-6 shadow-md">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//                 ${price || "99"}
//                 <span className="text-base font-normal text-gray-600">
//                   {" "}
//                   per month
//                 </span>
//               </h2>
//               <div className="text-gray-700 mb-6 space-y-2">
//                 <p className="flex justify-between">
//                   <span>Seller fee:</span> <span>$300</span>
//                 </p>
//                 <p className="flex justify-between">
//                   <span>Nexus verification fee:</span> <span>$20</span>
//                 </p>
//                 <p className="flex justify-between">
//                   <span>Taxes:</span> <span>$3</span>
//                 </p>
//               </div>
//               <button
//                 style={{ backgroundColor: "#642DFF" }}
//                 className="w-full text-white py-3 rounded-lg hover:bg-red-700 transition duration-200 mb-4"
//                 onClick={() => navigate(`/checkout/${id}`)}
//               >
//                 Order
//               </button>
//               <button
//                 className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition duration-200 mb-4"
//                 onClick={() => alert("Messaging seller...")}
//               >
//                 Message Seller
//               </button>

//               <button
//                 className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition duration-200"
//                 onClick={starredDataset}
//               >
//                 Star Me!
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DatasetPage;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import { getCurrentUser } from "aws-amplify/auth";
import Forum from "./forum";
import { Separator } from "@radix-ui/react-dropdown-menu";

const DatasetPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); // Get the id from the URL
  const { title, price, description } = location.state || {}; // Fallback if state is undefined

  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(false); // State to handle fading

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagePromises = [0, 1, 2].map((index) =>
          fetch(
            `http://localhost:8080/datasets/getDatasetSinglePreviewImage/${id}/${index}`
          ).then((res) =>
            res.ok ? res.blob() : Promise.reject("Failed to fetch image")
          )
        );
        const blobs = await Promise.all(imagePromises);
        const imageUrls = blobs.map((blob) => URL.createObjectURL(blob));
        setImages(imageUrls);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Trigger fade-out effect
      setFade(true);
      setTimeout(() => {
        // Change the image after fade-out
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        // Trigger fade-in effect
        setFade(false);
      }, 500); // Duration matches the fade-out time
    }, 5000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [images]);

  const starredDataset = async () => {
    try {
      console.log("starred the dataset; do the rest");
      const user = await getCurrentUser();
      console.log(user);

      await fetch(`http://localhost:8080/user/${user.userId}/star/${id}`, {
        method: "PUT",
      });
    } catch (error) {
      console.error("Error starring dataset:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Image Gallery */}

        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Primary Image */}
            <div className="md:col-span-2">
              {images.length > 0 ? (
                <img
                  src={images[currentImageIndex]}
                  alt={title || "Dataset Primary"}
                  className={`w-full h-full object-cover rounded-lg shadow-md transition-opacity duration-500 ${
                    fade ? "opacity-0" : "opacity-100"
                  }`}
                />
              ) : (
                <p>Loading images...</p>
              )}
            </div>
            {/* Secondary Images */}
            <div className="grid grid-cols-2 md:grid-cols-1 md:col-span-1 gap-4">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Secondary Image ${idx + 1}`}
                  className="w-full h-full object-cover rounded-lg shadow-md"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {title || "Dataset Title"}
            </h1>
            <p className="text-gray-600 mb-6">
              Managed by <span className="font-medium">Joe Smith</span>
            </p>
            <hr className="border-gray-300 mb-4" />

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Description
              </h2>
              <p className="text-gray-700">
                {description ||
                  "This dataset provides comprehensive insights into ... [provide a detailed description here]."}
              </p>
            </div>
            <hr className="border-gray-300 mb-4" />

            {/* Additional Details */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Details
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Data Format: CSV, JSON</li>
                <li>Last Updated: August 2023</li>
                <li>Size: 1.2 GB</li>
                <li>Records: 100,000</li>
                {/* Add more details as needed */}
              </ul>
            </div>
          </div>

          {/* Right Content */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg border p-6 shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                ${price || "99"}
                <span className="text-base font-normal text-gray-600">
                  {" "}
                  per month
                </span>
              </h2>
              <div className="text-gray-700 mb-6 space-y-2">
                <p className="flex justify-between">
                  <span>Seller fee:</span> <span>$300</span>
                </p>
                <p className="flex justify-between">
                  <span>Nexus verification fee:</span> <span>$20</span>
                </p>
                <p className="flex justify-between">
                  <span>Taxes:</span> <span>$3</span>
                </p>
              </div>
              <button
                style={{ backgroundColor: "#642DFF" }}
                className="w-full text-white py-3 rounded-lg hover:bg-red-700 transition duration-200 mb-4"
                onClick={() => navigate(`/checkout/${id}`)}
              >
                Order
              </button>
              <button
                className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition duration-200 mb-4"
                onClick={() => alert("Messaging seller...")}
              >
                Message Seller
              </button>

              <button
                className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition duration-200"
                onClick={starredDataset}
              >
                Star Me!
              </button>
            </div>
          </div>
        </div>
        <hr className="border-gray-300 mb-4" />
        <Forum/>
      </div>
    </div>
  );
};

export default DatasetPage;
