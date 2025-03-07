import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import Forum from "./forum";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { getCurrentUser, fetchAuthSession } from "@aws-amplify/auth";

const DatasetPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  const [dataset, setDataset] = useState({
    title: location.state?.title || "Dataset Title",
    price: location.state?.price || "99",
    images: location.state?.images || [],
    description:
      location.state?.description ||
      "This dataset provides comprehensive insights...",
    score: location.state?.score,
  });
  const [sessionId, setSessionId] = useState("");
  const [error, setError] = useState(null);
  const [isLoadingImages, setIsLoadingImages] = useState(true);
  const [starSuccess, setStarSuccess] = useState(false); // New state for success indicator

  useEffect(() => {
    const fetchDatasetDetails = async () => {
      try {
        const infoResponse = await fetch(
          `${BASE_URL}/api/public/datasets/getDatasetInformation/${id}`
        );
        if (!infoResponse.ok) {
          throw new Error(`Failed to fetch dataset info for ID: ${id}`);
        }
        const infoData = await infoResponse.json();

        const imageURLs = [];
        setIsLoadingImages(true);
        for (let i = 0; i < 3; i++) {
          const imageResponse = await fetch(
            `${BASE_URL}/api/public/datasets/getDatasetSinglePreviewImage/${id}?index=${i}`
          );
          if (!imageResponse.ok) {
            imageURLs.push("https://via.placeholder.com/400");
            continue;
          }
          const imageBlob = await imageResponse.blob();
          const imageURL = URL.createObjectURL(imageBlob);
          imageURLs.push(imageURL);
        }

        const scoreResponse = await fetch(
          `${BASE_URL}/api/public/datasets/getScore/${id}`
        );
        let score = null;
        if (scoreResponse.ok) {
          const scoreText = await scoreResponse.text();
          score = parseInt(scoreText, 10);
        }

        setDataset({
          title: infoData.name,
          price: infoData.price,
          images: imageURLs,
          description: infoData.description,
          score: score,
        });
        setIsLoadingImages(false);
      } catch (error) {
        setError(error.message);
        setIsLoadingImages(false);
      }
    };

    if (id) {
      fetchDatasetDetails();
    }
  }, [id]);

  const starDataset = async () => {
    try {
      const session = await fetchAuthSession();
      const sessionId = session.tokens.idToken.toString();
      const headers = {
        Authorization: "Bearer " + sessionId,
      };

      const user = await getCurrentUser();
      console.log(user);

      const response = await fetch(
       `${BASE_URL}/api/secure/user/star/${id}`,
        {
          method: "PUT",
          headers: headers,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to star dataset");
      }

      // If successful, set the success state and hide it after 3 seconds
      setStarSuccess(true);
      setTimeout(() => setStarSuccess(false), 3000); // Hides after 3 seconds
    } catch (error) {
      console.error("Error starring dataset:", error);
      setStarSuccess(false); // Ensure it doesn't show on error
    }
  };

  const images = [
    dataset.images[0] || "https://via.placeholder.com/400",
    dataset.images[1] || "https://via.placeholder.com/400",
    dataset.images[2] || "https://via.placeholder.com/400",
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="details" className="flex-1">
              Dataset Details
            </TabsTrigger>
            <TabsTrigger value="forum" className="flex-1">
              Forum
            </TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="space-y-8">
            <div className="mb-8">
              {isLoadingImages ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
                  <div className="md:col-span-2">
                    <div className="p-4 border rounded animate-pulse">
                      <div className="bg-gray-300 h-24 w-full mb-4"></div>
                      <div className="h-4 bg-gray-300 mb-2"></div>
                      <div className="h-4 bg-gray-300 w-1/2"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-1 md:col-span-1 gap-4">
                    <div className="p-4 border rounded animate-pulse">
                      <div className="bg-gray-300 h-24 w-full mb-4"></div>
                      <div className="h-4 bg-gray-300 mb-2"></div>
                      <div className="h-4 bg-gray-300 w-1/2"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <img
                      src={images[0]}
                      alt={dataset.title}
                      className="w-full h-full object-cover rounded-lg shadow-md"
                    />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-1 md:col-span-1 gap-4">
                    <img
                      src={images[1]}
                      alt="Secondary Image 1"
                      className="w-full h-full object-cover rounded-lg shadow-md"
                    />
                    <img
                      src={images[2]}
                      alt="Secondary Image 2"
                      className="w-full h-full object-cover rounded-lg shadow-md"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  {dataset.title}
                </h1>
                <hr className="border-gray-300 mb-4" />

                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Description
                  </h2>
                  <p className="text-gray-700">{dataset.description}</p>
                </div>
                <hr className="border-gray-300 mb-4" />

                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Quality Score
                  </h2>
                  {dataset.score === null ? (
                    <p className="text-gray-700">Loading...</p>
                  ) : dataset.score === -2 ? (
                    <p className="text-gray-700">?/100</p>
                  ) : (
                    <div>
                      <p className="text-gray-700 mt-1">{dataset.score}/100</p>
                      <div className="relative w-full h-4 bg-gray-300 rounded-full overflow-hidden">
                        <div
                          className="bg-[#642DFF] h-4"
                          style={{ width: `${dataset.score}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="md:col-span-1">
                <div className="bg-white rounded-lg border p-6 shadow-md">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    ${dataset.price}
                    <span className="text-base font-normal text-gray-600">
                      {" "}
                      per month
                    </span>
                  </h2>

                  <button
                    className="w-full bg-[#642DFF] text-white py-3 rounded-lg hover:bg-[#8B6DFF] hover:shadow-md transition duration-200 mb-4"
                    onClick={() => navigate(`/checkout/${id}`)}
                  >
                    Order
                  </button>

                  <button
                    className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition duration-200 mb-4"
                    onClick={starDataset}
                  >
                    Star Me!
                  </button>

                  {/* Success Indicator */}
                  {starSuccess && (
                    <div className="text-center text-green-600 text-sm mb-4 animate-fade-in">
                      Dataset starred successfully!
                    </div>
                  )}
                </div>
              </div>
            </div>
            <hr className="border-gray-300 mb-4" />
          </TabsContent>

          <TabsContent value="forum">
            <Forum datasetID={id} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DatasetPage;