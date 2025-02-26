import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import Forum from "./forum";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

const DatasetPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  
  // Initialize state with possible values from location.state or defaults.
  const [dataset, setDataset] = useState({
    title: location.state?.title || "Dataset Title",
    price: location.state?.price || "99",
    image: location.state?.image || "",
    description: location.state?.description || "This dataset provides comprehensive insights...",
    score: location.state?.score, // You can provide a default if needed
  });
  const [sessionId, setSessionId] = useState("");
  const [error, setError] = useState(null);

  // This useEffect fetches detailed information from your API and then updates the state.
  useEffect(() => {
    const fetchDatasetDetails = async () => {
      try {
        // Fetch dataset information
        const infoResponse = await fetch(
          `http://localhost:8080/api/public/datasets/getDatasetInformation/${id}`
        );
        if (!infoResponse.ok) {
          throw new Error(`Failed to fetch dataset info for ID: ${id}`);
        }
        const infoData = await infoResponse.json();

        // Fetch dataset preview image
        const imageResponse = await fetch(
          `http://localhost:8080/api/public/datasets/getDatasetSinglePreviewImage/${id}`
        );
        if (!imageResponse.ok) {
          throw new Error(`Failed to fetch dataset image for ID: ${id}`);
        }
        const imageBlob = await imageResponse.blob();
        const imageURL = URL.createObjectURL(imageBlob);

        // Fetch dataset score
        const scoreResponse = await fetch(
          `http://localhost:8080/api/public/datasets/getScore/${id}`
        );
        let score = null;
        if (scoreResponse.ok) {
          const scoreText = await scoreResponse.text();
          score = parseInt(scoreText, 10);
        }

        // Update state with fetched data
        setDataset({
          title: infoData.name,
          price: infoData.price,
          image: imageURL,
          description: infoData.description,
          score: score,
        });
      } catch (error) {
        setError(error.message);
      }
    };

    // Call the function if the id is available
    if (id) {
      fetchDatasetDetails();
    }
  }, [id]);

  // Function for starring the dataset remains unchanged
  const starDataset = async () => {
    try {
      // Your code for fetching auth session and starring the dataset...
    } catch (error) {
      console.error("Error starring dataset:", error);
    }
  };

  // Placeholder images for the gallery, you might want to use the updated dataset.image
  const images = [dataset.image, dataset.image, dataset.image];

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
            {/* Image Gallery */}
            <div className="mb-8">
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
            </div>

            {/* Content Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  {dataset.title}
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
                    {dataset.description}
                  </p>
                </div>
                <hr className="border-gray-300 mb-4" />

                {/* Quality Score */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Quality Score
                  </h2>
                  <p className="text-gray-700">
                    {dataset.score !== null
                      ? dataset.score === -2
                        ? "?/100"
                        : `${dataset.score}/100`
                      : "Loading..."}
                  </p>
                </div>
              </div>

              {/* Right Content */}
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
                    style={{ backgroundColor: "#642DFF" }}
                    className="w-full text-white py-3 rounded-lg hover:bg-red-700 transition duration-200 mb-4"
                    onClick={() => navigate(`/checkout/${id}`)}
                  >
                    Order
                  </button>

                  <button
                    className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition duration-200"
                    onClick={starDataset}
                  >
                    Star Me!
                  </button>
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
