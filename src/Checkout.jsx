import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import satelliteImagery from "./assets/satellite_and_areal.png";
import ProviderCard from "./components/ProviderCard";

const Checkout = () => {
  const navigate = useNavigate();

  const { id } = useParams(); // Get the id from the URL
  const [dataset, setDataset] = useState({});
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [datasetPreviewImage, setDatasetPreviewImage] = useState(null);
  const [error, setError] = useState("");

  const BASE_URL = process.env.REACT_APP_BACKEND_URL;


  const paymentMethods = [
    {
      id: "apple-pay",
      name: "Apple Pay",
      icon: "/path/to/apple-pay-icon.png",
    },
    {
      id: "credit-card",
      name: "Credit Card",
      icon: "/path/to/credit-card-icon.png",
    },
    // Add more payment methods as needed
  ];

  const handlePaymentMethodSelect = (methodId) => {
    setSelectedPaymentMethod(methodId);
  };

  const handleCompletePurchase = () => {
    if (!selectedPaymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    // Proceed with the purchase using the selected payment method
    navigate(`/download/${id}`);
  };

  useEffect(() => {
    const fetchDatasetName = async () => {
      try {
        const response = await fetch(
         `${BASE_URL}/api/public/datasets/getDatasetInformation/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch dataset information");
        }
        const data = await response.json();
        console.log("Fetched dataset information:", data);
        setDataset(data);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchDatasetPreviewImage = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/public/datasets/getDatasetSinglePreviewImage/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch dataset IDs");
        }
        const dataBlob = await response.blob();
        const imageURL = URL.createObjectURL(dataBlob);
        console.log("Fetched dataset preview:", dataBlob);
        setDatasetPreviewImage(imageURL);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchDatasetName();
    fetchDatasetPreviewImage();
  }, [id]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto py-8 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side: Order Summary */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
              Confirm and Pay
            </h1>

            {/* Dataset Details */}
            <div className="bg-white rounded-lg border px-6 mb-6">
              <p className="text-gray-800 font-regular">
                Your Dataset: {dataset.name || "Loading..."}
              </p>
              <div className="w-full">
                <img
                  src={datasetPreviewImage}
                  alt="Dataset"
                  className="w-full h-auto rounded-lg mr-4 my-5 "
                />
                {/* <ProviderCard /> */}
              </div>
            </div>

            {/* Payment Options */}
            <div className="bg-white rounded-lg border p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">
                Choose How to Pay
              </h2>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                      selectedPaymentMethod === method.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                    }`}
                    onClick={() => handlePaymentMethodSelect(method.id)}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={selectedPaymentMethod === method.id}
                      onChange={() => handlePaymentMethodSelect(method.id)}
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <span className="ml-4 text-gray-800">{method.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Button */}
            <button
              onClick={handleCompletePurchase}
              style={{ backgroundColor: "#642dff" }}
              className="w-full #642DFF text-white text-lg font-regular py-3 rounded-lg hover:bg-red-700 transition duration-200"
            >
              Complete Purchase
            </button>
          </div>

          {/* Right Side: Price Breakdown */}
          <div>
            <div className="bg-white rounded-lg  p-6">
              {/* Price Summary */}
              <h2 className="text-lg font-medium text-gray-800 mb-4">
                Price Details
              </h2>
              <div className="border-b border-gray-200 pb-4 mb-4">
                <div className="flex justify-between text-gray-600 mb-2">
                  <span>Dataset Price</span>
                  <span>$99</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Service Fee</span>
                  <span>$5</span>
                </div>
              </div>
              <div className="flex justify-between text-gray-800 font-semibold text-lg">
                <span>Total</span>
                <span>$104</span>
              </div>
            </div>

            {/* Help Section */}
            <div className="mt-6">
              <p className="text-gray-600 text-sm">
                By completing your purchase, you agree to our{" "}
                <Link to="/terms" className="text-blue-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
              <p className="text-gray-600 text-sm mt-4">
                Need help?{" "}
                <Link to="/contact" className="text-blue-600 hover:underline">
                  Contact our support team
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
