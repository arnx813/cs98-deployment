// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import janeDoe from "src/assets/jane_doe.png";
// import Dataset from "./components/Dataset";
// import { getCurrentUser } from "@aws-amplify/auth";
// import DatasetOperationPage from "./DatasetOperations/page";
// import { fetchAuthSession } from "@aws-amplify/auth";
// import { Authenticator, withAuthenticator } from "@aws-amplify/ui-react";
// import "@aws-amplify/ui-react/styles.css";

// const Profile = () => {
//   const [userEmail, setUserEmail] = useState(null);
//   const [userStarredDatasetIds, setUserStarredDatasetIds] = useState([]);
//   const [starredDatasetIds, setStarredDatasetIDs] = useState([]);
//   const [sessionId, setSessionId] = useState("");
//   const [error, setError] = useState("");
//   const [starredDatasets, setStarredDatasets] = useState([]);
//   const [isSeller, setIsSeller] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserEmail = async () => {
//       try {
//         const user = await getCurrentUser();
//         setUserEmail(user.signInDetails.loginId);
//         console.log(user.signInDetails.loginId);
//       } catch (error) {
//         console.error("Error fetching user ID:", error);
//       }
//     };

//     const fetchUserStarredDatasetIds = async () => {
//       try {
//         setUserStarredDatasetIds([1, 2, 3]); // Example dataset IDs
//       } catch (error) {
//         console.error(
//           "Could not fetch starred dataset IDs for this user:",
//           error
//         );
//       }
//     };

//     const fetchSessionDetails = async () => {
//       try {
//         const session = await fetchAuthSession();
//         const sessionId2 = session.tokens.idToken.toString();
//         setSessionId(sessionId2);
//         console.log("session", session);

//         const headers = {
//           Authorization: "Bearer " + sessionId2,
//         };

//         console.log("LOOK HERE IDIOT: " + headers.Authorization);

//         fetch("http://localhost:8080/api/secure/user-info", {
//           method: "GET",
//           headers: headers,
//         })
//           .then((response) => {
//             if (!response.ok) {
//               throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             return response.text();
//           })
//           .then((data) => {
//             console.log("User Info:", data);
//           })
//           .catch((error) => {
//             console.error("Error fetching user info:", error);
//           });
//       } catch (error) {
//         console.error("Error fetching session ID:", error);
//       }
//     };

//     fetchSessionDetails();
//     fetchUserEmail();
//     fetchUserStarredDatasetIds();
//   }, []);

//   useEffect(() => {
//     const fetchStarredDatasetIDs = async () => {
//       try {
//         const session = await fetchAuthSession();
//         const sessionId = session.tokens.idToken.toString();
//         const headers = {
//           Authorization: "Bearer " + sessionId,
//         };

//         const user = await getCurrentUser();

//         const response = await fetch("http://localhost:8080/api/secure/user/getStarred", {
//           method: "GET",
//           headers: headers,
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch dataset IDs");
//         }
//         const data = await response.json();
//         console.log("Fetched starred datasets", data);
//         setStarredDatasetIDs(data);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchStarredDatasetIDs();
//   }, []);

//   useEffect(() => {
//     const fetchStarredDatasetDetails = async () => {
//       try {
//         const datasetPromises = starredDatasetIds.map(async (id) => {
//           const infoResponse = await fetch(
//             `http://localhost:8080/api/public/datasets/getDatasetInformation/${id}`
//           );
//           if (!infoResponse.ok) {
//             throw new Error(`Failed to fetch dataset info for ID: ${id}`);
//           }
//           const infoData = await infoResponse.json();

//           const imageResponse = await fetch(
//             `http://localhost:8080/api/public/datasets/getDatasetSinglePreviewImage/${id}`
//           );
//           if (!imageResponse.ok) {
//             throw new Error(`Failed to fetch dataset image for ID: ${id}`);
//           }
//           const imageBlob = await imageResponse.blob();
//           const imageURL = URL.createObjectURL(imageBlob);

//           return {
//             id,
//             title: infoData.name,
//             price: infoData.price,
//             image: imageURL,
//             description: infoData.description,
//           };
//         });

//         const starredDatasets = await Promise.all(datasetPromises);
//         setStarredDatasets(starredDatasets);
//         console.log(starredDatasets);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     if (starredDatasetIds && starredDatasetIds.length > 0) {
//       fetchStarredDatasetDetails();
//     }
//   }, [starredDatasetIds]);

//   const checkSellerStatus = async () => {
//     try {
//       const username = await getCurrentUser();
//       const session = await fetchAuthSession();
//         const sessionId2 = session.tokens.idToken.toString();
//         setSessionId(sessionId2);
//         console.log("session", session);

//         const headers = {
//           Authorization: "Bearer " + sessionId2,
//         };

//       console.log('id: ', username)

//       if (!username) return;
//       console.log("Checking seller status...");

//       const response = await fetch(`http://localhost:8080/api/public/user/${username.username}/isSeller`, {
//         method: "GET",
//         // headers: headers,
//       });

//       if (!response.ok) {
//         throw new Error("Failed to check seller status");
//       }

//       const data = await response.json();
//       setIsSeller(data);
//       console.log("Seller status:", data ? "seller: true" : "seller: false");
//     } catch (error) {
//       console.error("Error checking seller status:", error);
//     }
//   };

//   useEffect(() => {
//     checkSellerStatus();
//   }, []);

//   return (
//     <div className="min-h-screen">
//       <Authenticator>
//         <Navbar />
//         <div className="max-w-7xl mx-auto p-6">
//           <div className="bg-white rounded-lg border p-6 flex items-center">
//             <img
//               src={janeDoe}
//               alt="Profile"
//               className="w-24 h-24 rounded-full mr-6"
//             />
//             <div>
//               <h1 className="text-3xl font-bold text-gray-800">Aaron Xie</h1>
//               <p className="text-gray-600">
//                 {userEmail || "jane.doe@example.com"}
//               </p>
//             </div>
//           </div>

//           <p>{isSeller ? "seller: true" : "seller: false"}</p>

//           <div className="mt-10">
//             <h2 className="text-xl font-semibold text-gray-800">
//               Starred Datasets
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//               {starredDatasets.map((dataset) => (
//                 <Link
//                   to={`/dataset/${dataset.id}`}
//                   key={dataset.id}
//                   state={{
//                     id: dataset.id,
//                     title: dataset.title,
//                     price: dataset.price,
//                     image: dataset.image,
//                     description: dataset.description,
//                   }}
//                 >
//                   <Dataset
//                     image={dataset.image}
//                     description={dataset.title}
//                     price={`$${dataset.price} per month`}
//                   />
//                 </Link>
//               ))}
//             </div>
//           </div>

//           <div className="mt-10">
//             <h2 className="text-xl font-semibold text-gray-800">
//               Your Datasets
//             </h2>
//             <DatasetOperationPage />
//           </div>
//         </div>
//       </Authenticator>
//     </div>
//   );
// };

// export default withAuthenticator(Profile);

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, fetchAuthSession } from "@aws-amplify/auth";
import { Authenticator, withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Navbar from "./components/Navbar";
import Dataset from "./components/Dataset";
import DatasetOperationPage from "./DatasetOperations/page";
import janeDoe from "src/assets/jane_doe.png";

const Profile = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [starredDatasets, setStarredDatasets] = useState([]);
  const [sessionId, setSessionId] = useState("");
  const [starredDatasetIds, setStarredDatasetIDs] = useState([]);
  const [error, setError] = useState("");

  // console.log("im on the profile page and u are a ", isS)

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getCurrentUser();
        const username = user.username; // This is the user hash
        setUserEmail(user.signInDetails.loginId);
        setUserId(username);

        console.log("User ID:", username);

        // Check if user exists in DynamoDB, if not, create them
        await createUserIfNew(username);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchStarredDatasetIDs = async () => {
      try {
        const session = await fetchAuthSession();
        const sessionId = session.tokens.idToken.toString();
        const headers = {
          Authorization: "Bearer " + sessionId,
        };


        const user = await getCurrentUser();

        const response = await fetch(
          "http://localhost:8080/api/secure/user/getStarred",
          {
            method: "GET",
            headers: headers,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch dataset IDs");
        }
        const data = await response.json();
        console.log("Fetched starred datasets", data);
        setStarredDatasetIDs(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchStarredDatasetIDs();
  }, []);

  useEffect(() => {
    const fetchStarredDatasetDetails = async () => {
      try {
        console.log("get starred datasets")


        const datasetPromises = starredDatasetIds.map(async (id) => {
          const infoResponse = await fetch(
            `http://localhost:8080/api/public/datasets/getDatasetInformation/${id}`
          );
          if (!infoResponse.ok) {
            throw new Error(`Failed to fetch dataset info for ID: ${id}`);
          }
          const infoData = await infoResponse.json();

          const imageResponse = await fetch(
            `http://localhost:8080/api/public/datasets/getDatasetSinglePreviewImage/${id}`
          );
          if (!imageResponse.ok) {
            throw new Error(`Failed to fetch dataset image for ID: ${id}`);
          }
          const imageBlob = await imageResponse.blob();
          const imageURL = URL.createObjectURL(imageBlob);

          return {
            id,
            title: infoData.name,
            price: infoData.price,
            image: imageURL,
            description: infoData.description,
          };
        });

        const starredDatasets = await Promise.all(datasetPromises);
        setStarredDatasets(starredDatasets);
        console.log(starredDatasets);
      } catch (error) {
        setError(error.message);
      }
    };

    if (starredDatasetIds && starredDatasetIds.length > 0) {
      fetchStarredDatasetDetails();
    }
  }, [starredDatasetIds]);

  const checkSellerStatus = async () => {
    try {
      const username = await getCurrentUser();
      const session = await fetchAuthSession();
      const sessionId2 = session.tokens.idToken.toString();
      setSessionId(sessionId2);
      console.log("session", session);

      const headers = {
        Authorization: "Bearer " + sessionId2,
      };

      console.log("id: ", username);

      if (!username) return;
      console.log("Checking seller status...");

      const response = await fetch(
        `http://localhost:8080/api/public/user/${username.username}/isSeller`,
        {
          method: "GET",
          // headers: headers,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to check seller status");
      }

      const data = await response.json();
      setIsSeller(data);
      console.log("Seller status:", data ? "seller: true" : "seller: false");
    } catch (error) {
      console.error("Error checking seller status:", error);
    }
  };

  useEffect(() => {
    checkSellerStatus();
  }, []);

  // Function to create user in DynamoDB if they don't exist
  const createUserIfNew = async (username) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/public/user/create/${username}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create user in DynamoDB");
      }

      const result = await response.json();
      if (result) {
        console.log("User successfully created in DynamoDB");
      } else {
        console.log("User already exists in DynamoDB");
      }
    } catch (error) {
      console.error("Error creating user in DynamoDB:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <Authenticator>
        <Navbar />
        <div className="max-w-7xl mx-auto p-6">
          <div className="bg-white rounded-lg border p-6 flex items-center">
            <img
              src={janeDoe}
              alt="Profile"
              className="w-24 h-24 rounded-full mr-6"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {" "}
                {userEmail || "jane.doe@example.com"}
              </h1>
              <p>{isSeller ? "seller: true" : "seller: false"}</p>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-semibold text-gray-800">
              Starred Datasets
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {starredDatasets.map((dataset) => (
                <Link
                  to={`/dataset/${dataset.id}`}
                  key={dataset.id}
                  state={{
                    id: dataset.id,
                    title: dataset.title,
                    price: dataset.price,
                    image: dataset.image,
                    description: dataset.description,
                  }}
                >
                  <Dataset
                    image={dataset.image}
                    description={dataset.title}
                    price={`$${dataset.price} per month`}
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-semibold text-gray-800">
              Your Datasets
            </h2>
            <DatasetOperationPage />
          </div>
        </div>
      </Authenticator>
    </div>
  );
};

export default withAuthenticator(Profile);
