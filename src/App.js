import { useState } from "react";
import Login from "./Login";
import Discover from "./Discover";
import Download from "./Download";
import { useNavigate } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Profile from "./Profile";
import { SignupForm } from "./Authentication/signup-auth";
import { LoginAuth } from "./Authentication/login-auth";
import DatasetPage from "./DatasetPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SignupForm />} />
          <Route path="/login" element={<LoginAuth />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="dataset-example" element={<DatasetPage />} /> */}
          <Route path="/dataset/:id" element={<DatasetPage />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/download/:id" element={<Download />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
