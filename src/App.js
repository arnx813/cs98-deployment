import React from "react";
import { useState } from "react";
import Login from "./Login";
import Discover from "./Discover";
import DatasetPage from "./DatasetPage"
import Download from "./Download";
import Upload from "./Upload"
import Footer from "./components/Footer";
import { useNavigate } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Profile from "./Profile";
import { SignupForm } from "./Authentication/signup-auth";
import { LoginAuth } from "./Authentication/login-auth";
import { UploadForm } from "./DatasetOperations/Upload-Form";
import { Toaster } from "./components/ui/toaster";
import DatasetOperationPage from "./DatasetOperations/page";

// Amplify stuff
import { Amplify } from "aws-amplify";
// import config from "./amplifyconfiguration.json";
import config from "./aws-exports";
Amplify.configure(config);

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route path="/" element={<SignupForm />} /> */}
          <Route path="/" element={<Discover />} />
          {/* <Route path="/login" element={<LoginAuth />} /> */}
          <Route path="/login" element={<Login />} />
          {/* <Route path="/discover" element={<Discover />} /> */}
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dataset-example" element={<DatasetPage />} />
          <Route path="/upload" element={<Upload/>} />
          <Route path="/view-datasets" element={<DatasetOperationPage />} />
          {/* <Route path="dataset-example" element={<DatasetPage />} /> */}
          <Route path="/dataset/:id" element={<DatasetPage />} />
          
          
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/download/:id" element={<Download />} />
        </Routes>
        <Toaster/>
        <Footer />
      </Router>
   
    </div>
  );
}

export default App;