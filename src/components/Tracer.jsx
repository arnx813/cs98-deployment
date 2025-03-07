// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "./Navbar";

// const Tracer = () => {
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [uploadStatus, setUploadStatus] = useState("");
//   const navigate = useNavigate();

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleFileUpload = async () => {
//     if (!file) return;

//     setUploading(true);
//     setUploadStatus("Uploading...");

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       // API Gateway URL - Replace this with your actual API Gateway endpoint URL
//       const response = await fetch(
//         "https://uye0aqv978.execute-api.us-east-1.amazonaws.com/first_try_detracing",
//         {
//           method: 'GET',
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         throw new Error("File upload failed");
//       }

//       const data = await response.json();
//       setUploadStatus("Upload successful!");
//       console.log("API Response:", data);

//       // Optionally, navigate to another page or update the state as needed
//     } catch (error) {
//       setUploadStatus("Upload failed!");
//       console.error("Error uploading file:", error);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="tracer-page">
//       <Navbar /> {/* Include the Navbar component here */}
//       <div className="content p-6">
//         <h2 className="text-2xl font-semibold mb-4">Upload a Zip File</h2>
//         <input
//           type="file"
//           accept=".zip"
//           onChange={handleFileChange}
//           className="mb-4"
//         />
//         <button
//           onClick={handleFileUpload}
//           disabled={uploading}
//           className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-all duration-200"
//         >
//           {uploading ? "Uploading..." : "Upload File"}
//         </button>
//         {uploadStatus && <p className="mt-4">{uploadStatus}</p>}
//       </div>
//     </div>
//   );
// };

// export default Tracer;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Tracer = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  //   const handleFileUpload = async () => {
  //     if (!file) return;

  //     setUploading(true);
  //     setUploadStatus("Uploading...");

  //     const formData = new FormData();
  //     formData.append("file", file);

  //     try {
  //       //   API Gateway URL - Replace this with your actual API Gateway endpoint URL
  //       const response = await fetch(
  //         "https://uye0aqv978.execute-api.us-east-1.amazonaws.com/first_try_detracing", // Your actual API Gateway endpoint
  //         {
  //           method: "POST", // Change this from GET to POST
  //           body: formData, // Send the file data as the body
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error("File upload failed");
  //       }

  //       const data = await response.json();
  //       setUploadStatus("Upload successful!");
  //       console.log("API Response:", data);

  //       // Optionally, navigate to another page or update the state as needed
  //     } catch (error) {
  //       setUploadStatus("Upload failed!");
  //       console.error("Error uploading file:", error);
  //     } finally {
  //       setUploading(false);
  //     }
  //   };

  const handleFileUpload = async () => {
    if (!file) return;

    setUploading(true);
    setUploadStatus("Requesting upload URL...");

    try {
      // Step 1: Request a pre-signed URL from API Gateway
      const presignedResponse = await fetch(
        "https://uye0aqv978.execute-api.us-east-1.amazonaws.com/first_try_detracing",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename: file.name }),
        }
      );

      if (!presignedResponse.ok) {
        throw new Error("Failed to get pre-signed URL");
      }

      //   const { url } = await presignedResponse.json();
      const data = await presignedResponse.json();
      console.log("Presigned URL response:", data);
      const { url } = data;

      setUploadStatus("Uploading to S3...");

      // Step 2: Upload the file to S3 using the pre-signed URL
      const uploadResponse = await fetch(url, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload file to S3");
      }

      setUploadStatus("Upload successful!");
      console.log("File uploaded successfully!");
    } catch (error) {
      setUploadStatus("Upload failed!");
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="tracer-page">
      <Navbar /> {/* Include the Navbar component here */}
      <div className="content p-6">
        <h2 className="text-2xl font-semibold mb-4">Upload a Zip File</h2>
        <input
          type="file"
          accept=".zip"
          onChange={handleFileChange}
          className="mb-4"
        />
        <button
          onClick={handleFileUpload}
          disabled={uploading}
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-all duration-200"
        >
          {uploading ? "Uploading..." : "Upload File"}
        </button>
        {uploadStatus && <p className="mt-4">{uploadStatus}</p>}
      </div>
    </div>
  );
};

export default Tracer;

// WORKS Without uploading to temp S3 bucket
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "./Navbar";

// const Tracer = () => {
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [uploadStatus, setUploadStatus] = useState("");
//   const [buyerId, setBuyerId] = useState(""); // New state to store buyer_id
//   const navigate = useNavigate();

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleFileUpload = async () => {
//     if (!file) return;

//     setUploading(true);
//     setUploadStatus("Requesting upload URL...");

//     try {
//       // Step 1: Request a pre-signed URL from API Gateway
//       const presignedResponse = await fetch(
//         "https://uye0aqv978.execute-api.us-east-1.amazonaws.com/first_try_detracing",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ filename: file.name }),
//         }
//       );

//       if (!presignedResponse.ok) {
//         throw new Error("Failed to get pre-signed URL");
//       }

//       const data = await presignedResponse.json();
//       console.log("Presigned URL response:", data);

//       // Store the buyer_id in state
//       if (data.buyer_id) {
//         setBuyerId(data.buyer_id);
//         setUploadStatus(""); // Clear default upload status
//       } else {
//         setUploadStatus("Upload successful, but no buyer ID found.");
//       }
//     } catch (error) {
//       setUploadStatus("Upload failed!");
//       console.error("Error uploading file:", error);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="tracer-page">
//       <Navbar /> {/* Include the Navbar component here */}
//       <div className="content p-6">
//         <h2 className="text-2xl font-semibold mb-4">Upload a Zip File</h2>
//         <input
//           type="file"
//           accept=".zip"
//           onChange={handleFileChange}
//           className="mb-4"
//         />
//         <button
//           onClick={handleFileUpload}
//           disabled={uploading}
//           className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-all duration-200"
//         >
//           {uploading ? "Uploading..." : "Upload File"}
//         </button>

//         {/* Show buyer ID if available, otherwise show upload status */}
//         {buyerId ? (
//           <p className="mt-4 font-bold">Buyer ID: {buyerId}</p>
//         ) : (
//           uploadStatus && <p className="mt-4">{uploadStatus}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Tracer;
