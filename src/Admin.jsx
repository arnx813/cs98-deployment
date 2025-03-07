import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import { fetchAuthSession } from "@aws-amplify/auth";
import { getCurrentUser } from "aws-amplify/auth";

const Admin = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [applicants, setApplicants] = useState([]);

    const BASE_URL = process.env.REACT_APP_BACKEND_URL;


    const getApplicants = async () => {
      try {
        console.log("Fetching applicants...");
  
        const session = await fetchAuthSession();
        const sessionId = session.tokens.idToken.toString();
        console.log("Session ID:", sessionId);
  
        const headers = {
          Authorization: "Bearer " + sessionId,
        };
  
        const response = await fetch(
          `${BASE_URL}/api/secure/applications/getAllApplicants`,
          {
            method: "GET",
            headers: headers,
          }
        );
  
        if (!response.ok) {
          throw new Error("Failed to fetch applicants");
        }
  
        const data = await response.json();
        setApplicants(data);
        console.log("Applicants data:", data);
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };

  const checkAdminStatus = async () => {
    try {
      console.log("Checking admin status...");
      const session = await fetchAuthSession();
      const sessionId = session.tokens.idToken.toString();
      const headers = {
        Authorization: "Bearer " + sessionId,
      };
      
      const response = await fetch(`${BASE_URL}/api/secure/user/isAdmin`, {
        method: "GET",
        headers: headers,
      });
      
      if (!response.ok) {
        throw new Error("Failed to check admin status");
      }
      
      const data = await response.json();
      setIsAdmin(data);
      console.log("Admin status:", data ? "admin: true" : "admin: false");
    } catch (error) {
      console.error("Error checking admin status:", error);
    }
  };

  const handleApplicantAction = async (userID, action) => {
    try {
      const session = await fetchAuthSession();
      const sessionId = session.tokens.idToken.toString();
      const headers = {
        Authorization: "Bearer " + sessionId,
      };

      console.log('user id provided', userID)
      
      const endpoint = action === "approve" 
        ? `${BASE_URL}/api/secure/applications/approveApplicant/${userID}`
        : `${BASE_URL}/api/secure/applications/rejectApplicant/${userID}`;
      
      const response = await fetch(endpoint, {
        method: "POST",
        headers: headers,
      });
      
      if (!response.ok) {
        throw new Error(`Failed to ${action} applicant`);
      }
      
      console.log(`${action}d applicant with ID:`, userID);
      setApplicants(applicants.filter(applicant => applicant.userID !== userID));
    } catch (error) {
      console.error(`Error trying to ${action} applicant:`, error);
    }
  };

  useEffect(() => {
    checkAdminStatus();
    getApplicants();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <p>{isAdmin ? "admin: true" : "admin: false"}</p>
      {isAdmin && (
        <div className="container mx-auto mt-4">
          <h2 className="text-xl font-bold">Applicants</h2>
          <table className="table-auto w-full border-collapse border border-gray-300 mt-2">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">User ID</th>
                <th className="border border-gray-300 px-4 py-2">Seller Type</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((applicant, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{applicant.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{applicant.userID}</td>
                  <td className="border border-gray-300 px-4 py-2">{applicant.sellerType}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button 
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2" 
                      onClick={() => handleApplicantAction(applicant.userID, "approve")}>
                      Approve
                    </button>
                    <button 
                      className="bg-red-500 text-white px-2 py-1 rounded" 
                      onClick={() => handleApplicantAction(applicant.userID, "reject")}>
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
