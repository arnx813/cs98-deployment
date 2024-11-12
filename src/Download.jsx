import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./checkout.scss";

const Download = () => {
  const { id } = useParams(); // Get the id from the URL
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState(null);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      console.log("The ID is", id);

      // Fetch the dataset as a Blob
      const response = await fetch(
        `http://localhost:8080/datasets/downloadDataset/${id}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch dataset for ID: ${id}`);
      }

      // Get the blob from response
      const blob = await response.blob();

      // Create a link element
      const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/zip' }));
      const a = document.createElement("a");
      a.href = url;

      // Get the filename from the response headers
      const contentDisposition = response.headers.get("Content-Disposition");
      let filename = "downloaded_file.zip"; // Default filename
      if (contentDisposition && contentDisposition.indexOf("attachment") !== -1) {
        const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
        if (filenameMatch && filenameMatch.length === 2) {
          filename = filenameMatch[1];
        }
      }
      a.download = filename.endsWith('.zip') ? filename : `${filename}.zip`;

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
    <div className="checkout">
      <Navbar />
      <div className="main">
        {error && <div className="error">Error: {error}</div>}
        <button onClick={handleDownload} disabled={isDownloading}>
          {isDownloading ? "Downloading..." : "Download ZIP"}
        </button>
      </div>
    </div>
  );
};

export default Download;
