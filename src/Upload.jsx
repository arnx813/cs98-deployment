import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dataset from "./components/Dataset";
import { Authenticator, withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { UploadForm } from "./DatasetOperations/Upload-Form";

const Upload = () => {

  return (
    <div>
        <Navbar />
      <UploadForm />
    </div>
  );
};

export default Upload;
