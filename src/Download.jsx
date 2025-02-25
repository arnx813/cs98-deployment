import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import { fetchAuthSession } from "@aws-amplify/auth";

const Download = () => {
  const { id } = useParams(); // Get the id from the URL
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState(null);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      console.log("The ID is", id);

      // Fetch authentication session
      const session = await fetchAuthSession();
      const sessionId = session.tokens.idToken.toString();
      console.log("Session ID:", sessionId);

      const headers = {
        Authorization: "Bearer " + sessionId,
      };

      // Fetch the dataset as a Blob
      const response = await fetch(
        `http://localhost:8080/api/secure/datasets/downloadDataset/${id}`,
        {
          method: "GET",
          headers: headers,
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch dataset for ID: ${id}`);
      }

      // Get the blob from response
      const blob = await response.blob();

      // Create a link element
      const url = window.URL.createObjectURL(
        new Blob([blob], { type: "application/zip" })
      );
      const a = document.createElement("a");
      a.href = url;

      // Get the filename from the response headers
      const contentDisposition = response.headers.get("Content-Disposition");
      let filename = "downloaded_file.zip"; // Default filename
      if (
        contentDisposition &&
        contentDisposition.indexOf("attachment") !== -1
      ) {
        const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
        if (filenameMatch && filenameMatch.length === 2) {
          filename = filenameMatch[1];
        }
      }
      a.download = filename.endsWith(".zip") ? filename : `${filename}.zip`;

      // Append to the document and click it to trigger download
      document.body.appendChild(a);
      a.click();

      // Clean up
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error fetching dataset:", error);
      setError(error.message);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
              Error: {error}
            </div>
          )}
          <h1 className="text-3xl font-regular text-gray-900 mb-4">
            Thank You for Your Purchase!
          </h1>
          <p className="text-gray-600 mb-8">
            Your dataset is ready to download. Click the button below to start
            your download.
          </p>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            style={{
              backgroundColor: isDownloading ? "#A0AEC0" : "#642DFF", // Gray for disabled, purple for normal
            }}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white ${
              isDownloading ? "" : "hover:bg-blue-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {isDownloading ? "Downloading..." : "Download Dataset"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Download;
