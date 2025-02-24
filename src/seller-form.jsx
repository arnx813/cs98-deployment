"use client";

import React, { useState } from "react";

import Navbar from "./components/ui/simpleNav";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Progress } from "./components/ui/progress";
import { Button } from "./components/ui/button";
import { Icons } from "./components/icons";
import { Label } from "./components/ui/label";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import { fetchAuthSession } from "aws-amplify/auth";

import "./seller.scss";

const SellerForm = () => {
  const [sessionId, setSessionId] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const fileInputRef = React.useRef(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const [formData, setFormData] = useState({
    background: "",
    datasetName: "",
    description: "",
    price: "",
    file: null,
    fileName: "File not uploaded",
    userType: "",
  });

  const handleInputChange = (e) => {
    const { name, type } = e.target;

    if (type === "file") {
      const file = e.target.files[0];
      if (file) {
        setFormData((prevData) => ({
          ...prevData,
          file: file,
          fileName: file.name,
        }));
      }
    } else {
      const { value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      console.log(formData);
    }
  };

  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.userType && formData.userType.length > 0;
      case 2:
        return formData.background && formData.background.trim().length > 0;
      case 3:
        return formData.datasetName && formData.datasetName.trim().length > 0;
      case 4:
        return formData.file !== null || formData.file === null;
      default:
        return false;
    }
  };

  const handleNext = () => {
    console.log(formData);

    if (currentStep === 4) {
      handleSubmit();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // const handleSubmit = () => {
  //     console.log('Form submitted with data:', formData);
  //     setIsCompleted(true);
  // };

  const handleSubmit = async () => {
    console.log("Submitting form with data:", formData);

    try {
        // Fetch the authentication session
        const session = await fetchAuthSession();
        const sessionId2 = session.tokens.idToken.toString();
        setSessionId(sessionId2);

        console.log("Session Retrieved:", session);

        // Construct FormData
        const submissionData = new FormData();

        // Define the required tags and corresponding values
        const tags = ['sellerType', 'datasetOriginInfo', 'datasetDescription', 'otherInformation'];
        const newValues = [
            formData.userType, // 'individual' or 'organization'
            formData.background, // Dataset origin information
            formData.datasetName, // Dataset description
            formData.description || "N/A", // Other information (optional, default to "N/A")
        ];

        // Append structured data
        submissionData.append("tags", tags);
        submissionData.append("newValues", newValues);

        // Append additional form fields
        submissionData.append("finalized", true); // Mark as finalized

        // Append file(s) if provided
        // if (formData.file) {
        //     submissionData.append("files", formData.file);
        // }

        // Debug: Print FormData contents
        console.log("Final FormData submission:");
        for (let pair of submissionData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        // Set up headers with authorization token
        const headers = {
            Authorization: "Bearer " + sessionId2,
        };

        // Send the request to the API
        const response = await fetch(
            "http://localhost:8080/api/secure/applications/setApplication",
            {
                method: "POST",
                headers: headers,
                body: submissionData, // Ensure FormData is sent as the body
            }
        );

        // Handle response
        // const result = await response.json();
        // console.log("Server Response:", result);
            const result = await response.text();
            console.log("Raw response:", result);

        if (response.ok) {
            setIsCompleted(true); // Mark form as completed on success
            alert("Your seller application has been submitted successfully.");
        } else {
            console.error("Submission failed:", result);
            alert("Submission failed. Please check your input and try again.");
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred while submitting the form.");
    }
};


  const renderFormStep = () => {
    if (isCompleted) {
      return (
        <div className="flex flex-col justify-center items-center ">
          <div className="size-14 flex-none h-[20vh]"></div>
          <div className="flex flex-col items-center gap-6">
            <div className="rounded-full bg-green-100 p-3">
              <svg
                width="55"
                height="48"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-green-600"
              >
                <path
                  d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="text-5xl ">
              Your seller application has been submitted
            </h2>
            <p className="text-base text-gray-500">
              You will typically hear back in 1-2 days
            </p>
            <Button className="mt-4">Return to Explore</Button>
          </div>
        </div>
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <div className="flex flex-col justify-center items-center">
            <div className="size-14 flex-none"></div>
            <div className="size-14 grow-7 main-form">
              <h2 className="mt-4 text-5xl mb-6">
                Are you and individual or an organization?
              </h2>
              <p className=" text-base text-gray-500">
                This information helps us better understand your background
              </p>
              <div className=" py-8 justify-center items-center h-80 ">
                <RadioGroup
                  onValueChange={(value) => {
                    setFormData((prev) => ({
                      ...prev,
                      userType: value,
                    }));
                  }}
                >
                  <div className="flex flex-col gap-4 w-[35vw]">
                    <label className="flex p-4 border-2 rounded-full cursor-pointer hover:bg-gray-50">
                      <RadioGroupItem
                        value="Individual"
                        id="option-one"
                        className="mr-4"
                      />
                      <span className="ml-4">Individual Hobbyist</span>
                    </label>
                    <label className="flex p-4 border-2 rounded-full cursor-pointer hover:bg-gray-50">
                      <RadioGroupItem
                        value="organization"
                        id="option-two"
                        className="mr-4"
                      />
                      <span className="ml-4">Organization</span>
                    </label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col justify-center items-center">
            <div className="size-14 flex-none"></div>
            <div className="size-14 grow-7 main-form">
              <div>
                <h2 className="mt-4 text-5xl mb-6">
                  Where do you get your datasets?
                </h2>
                <p className="mb-6 text-base text-gray-500">
                  This information helps us better understand your background
                </p>
                <div className="flex flex-row justify-center items-center h-80 w-full">
                  <Textarea
                    name="background"
                    value={formData.background}
                    onChange={handleInputChange}
                    placeholder="My company received it datasets through..."
                    className="resize-none h-64 rounded-[1vw] text-base p-6"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col justify-center items-center">
            <div className="size-14 flex-none"></div>
            <div className="size-14 grow-7 main-form">
              <div>
                <h2 className="mt-4 text-5xl mb-6">Describe your Datasets</h2>
                <p className="mb-6 text-base text-gray-500">
                  This information helps us better understand your background
                </p>
                <div className="flex flex-row justify-center items-center h-80 w-full">
                  <Textarea
                    name="datasetName"
                    value={formData.datasetName}
                    onChange={handleInputChange}
                    placeholder="My Dataset contains pictures of various dogs that..."
                    className="resize-none h-64 rounded-[1vw] text-base p-6"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col justify-center items-center">
            <div className="size-14 flex-none"></div>
            <div className="size-14 grow-7 main-form">
              <div>
                <h2 className="mt-4 text-5xl mb-6">
                  Please upload any material that will help us verify you as a
                  seller
                </h2>
                <p className="mb-6 text-base text-gray-500">
                  This information helps us better understand your background
                </p>
                <div className="flex items-center gap-4">
                  <Button
                    className="rounded-full"
                    variant="outline"
                    type="button"
                    onClick={() =>
                      fileInputRef.current && fileInputRef.current.click()
                    }
                  >
                    <Icons.Upload className="mr-2 h-4 w-4" />
                  </Button>
                  <Input
                    ref={fileInputRef}
                    id="file-upload"
                    type="file"
                    className="hidden"
                    name="file"
                    onChange={handleInputChange}
                  />
                  {formData.fileName && (
                    <div className="mt-4 p-4 ">
                      <p className="text-sm ">{formData.fileName}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="spacing-y-8">
        <Navbar />
        {renderFormStep()}
        {!isCompleted && (
          <>
            <div className="flex flex-row mx-8">
              <div className="grow">
                <Progress
                  value={currentStep >= 1 ? 100 : 0}
                  className="w-[99%] h-[10px] rounded-none"
                />
              </div>
              <div className="grow">
                <Progress
                  value={currentStep >= 2 ? 100 : 0}
                  className="w-[99%] h-[10px] rounded-none"
                />
              </div>
              <div className="grow">
                <Progress
                  value={currentStep >= 3 ? 100 : 0}
                  className="w-[99%] h-[10px] rounded-none"
                />
              </div>
              <div className="grow">
                <Progress
                  value={currentStep >= 4 ? 100 : 0}
                  className="w-[99%] h-[10px] rounded-none"
                />
              </div>
            </div>

            <div className="flex flex-row mx-8">
              <div>
                <Button
                  variant="link"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                >
                  Back
                </Button>
              </div>
              <div className="grow"></div>
              <div>
                <Button onClick={handleNext} disabled={!isCurrentStepValid()}>
                  {currentStep === 4 ? "Finish" : "Next"}
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SellerForm;