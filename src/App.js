import { useState } from "react";
import Login from "./Login";
import Discover from "./Discover";
import DatasetPage from "./DatasetPage"
import { useNavigate } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Checkout from "./Checkout";
import Profile from "./Profile";
import { SignupForm } from "./Authentication/signup-auth";
import { LoginAuth } from "./Authentication/login-auth";
import { SettingsDialog } from "./components/settings-dialog";
import { UploadForm } from "./components/upload-form";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SignupForm/>} />
          <Route path="/login" element={<LoginAuth />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dataset-example" element={<DatasetPage />} />
          <Route path="/upload" element={<UploadForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;