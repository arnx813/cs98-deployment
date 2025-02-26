import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import { getCurrentUser } from "aws-amplify/auth";
import Forum from "./forum";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { fetchAuthSession } from "@aws-amplify/auth";

const DatasetPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); // Get the id from the URL
  const { title, price, image, description, score } = location.state || {}; // Retrieve score
  const [sessionId, setSessionId] = useState("");

  console.log("Received dataset state:", location.state);

  // Placeholder images for the gallery
  const images = [image, image, image];

  // const starredDataset = async () => {
  //   try {
  //     console.log("starred the dataset; do the rest");
  //     const user = await getCurrentUser();
  //     console.log("starring dataset");

  //     await fetch(`http://localhost:8080/user/star/${id}`, {
  //       method: "PUT",
  //     });
  //   } catch (error) {
  //     console.error("Error starring dataset:", error);
  //   }
  // };

  const starDataset = async (data) => {
    try {
      const session = await fetchAuthSession();
      const sessionId2 = session.tokens.idToken.toString();
      setSessionId(sessionId2);

      console.log("session", session);

      const headers = {
        Authorization: "Bearer " + sessionId2,
      };

      // Send the request using fetch or axios
      const response = await fetch(
        `http://localhost:8080/api/secure/user/star/${id}`,
        {
          method: "POST",
          headers: headers,
          // body: formData, // Ensure `FormData` is sent as the body
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      // Parse the response body as JSON
      const responseText = await response.text();
      console.log("Response Text:", responseText);
      console.log("Starred successfully");
    } catch (error) {
      console.error("Error starring dataset:", error);
    }
  };

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
                    alt={title || "Dataset Primary"}
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
                      "This dataset provides comprehensive insights..."}
                  </p>
                </div>
                <hr className="border-gray-300 mb-4" />

                {/* Quality Score */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Quality Score
                  </h2>
                  <p className="text-gray-700">
                    {score !== undefined
                      ? score === -2
                        ? "?/100"
                        : `${score}/100`
                      : "Loading..."}
                  </p>
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

                  <button
                    style={{ backgroundColor: "#642DFF" }}
                    className="w-full text-white py-3 rounded-lg hover:bg-red-700 transition duration-200 mb-4"
                    onClick={() => navigate(`/checkout/${id}`)}
                  >
                    Order
                  </button>

                  {/* <button
                    className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition duration-200 mb-4"
                    onClick={() => alert("Messaging seller...")}
                  >
                    Message Seller
                  </button> */}

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
