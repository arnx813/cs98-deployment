import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
// import { Navbar } from "./components/Navbar";
import janeDoe from "src/assets/jane_doe.png";
import Dataset from "./components/Dataset";
import { getCurrentUser } from "@aws-amplify/auth";
import DatasetOperationPage from "./DatasetOperations/page";

export default function Profile() {
  const [userEmail, setUserEmail] = useState(null);
  const [userStarredDatasetIds, setUserStarredDatasetIds] = useState([]);
  const [starredDatasetIds, setStarredDatasetIDs] = useState([]);
  const [error, setError] = useState("");
  const [starredDatasets, setStarredDatasets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const user = await getCurrentUser();
        setUserEmail(user.signInDetails.loginId);
        console.log(user.signInDetails.loginId);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    const fetchUserStarredDatasetIds = async () => {
      try {
        // Placeholder for fetching starred dataset IDs
        setUserStarredDatasetIds([1, 2, 3]); // Example dataset IDs
      } catch (error) {
        console.error(
          "Could not fetch starred dataset IDs for this user:",
          error
        );
      }
    };

    fetchUserEmail();
    fetchUserStarredDatasetIds();
  }, []);

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const user = await getCurrentUser();
        setUserEmail(user.signInDetails.loginId);
        console.log(user.signInDetails.loginId);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserEmail();
  }, []);

  useEffect(() => {
    const fetchStarredDatasetIDs = async () => {
      try {
        const user = await getCurrentUser();
        const response = await fetch(
          `http://localhost:8080/user/${user.userId}/getStarred`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch dataset IDs");
        }
        const data = await response.json();
        console.log("Fetched starred dataset IDs:", data);
        setStarredDatasetIDs(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchStarredDatasetIDs();
  }, []); // Empty dependency array to run only once on mount

  useEffect(() => {
    const fetchStarredDatasetDetails = async () => {
      try {
        const datasetPromises = starredDatasetIds.map(async (id) => {
          const infoResponse = await fetch(
            `http://localhost:8080/datasets/getDatasetInformation/${id}`
          );
          if (!infoResponse.ok) {
            throw new Error(`Failed to fetch dataset info for ID: ${id}`);
          }
          const infoData = await infoResponse.json();

          const imageResponse = await fetch(
            `http://localhost:8080/datasets/getDatasetSinglePreviewImage/${id}`
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

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        {/* Profile Header */}
        <div className="bg-white rounded-lg border p-6 flex items-center">
          <img
            src={janeDoe}
            alt="Profile"
            className="w-24 h-24 rounded-full mr-6"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Aaron Xie</h1>
            <p className="text-gray-600">
              {userEmail || "jane.doe@example.com"}
            </p>
            {/* <button
              onClick={() => navigate("/edit-profile")}
              className="mt-4 px-4 py-2  text-gray border rounded hover:bg-gray-200"
            >
              Edit Profile
            </button> */}
          </div>
        </div>

        {/* Starred Datasets */}
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

        {/* User's Uploaded Datasets */}
        <div className="mt-10">
          <h2 className="text-  xl font-semibold text-gray-800">
            Your Datasets
          </h2>

          <DatasetOperationPage />
        </div>
        <div className="mt-10"></div>
      </div>
    </div>
  );
}
