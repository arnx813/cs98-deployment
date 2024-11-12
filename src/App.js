import Discover from "./Discover";
import DatasetPage from "./DatasetPage"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Profile from "./Profile";
import { SignupForm } from "./Authentication/signup-auth";
import { LoginAuth } from "./Authentication/login-auth";
import { UploadForm } from "./DatasetOperations/Upload-Form";
import { Toaster } from "./components/ui/toaster";
import DatasetOperationPage from "./DatasetOperations/page";

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
          <Route path="/dataset-example" element={<DatasetPage />} />
          <Route path="/upload" element={<UploadForm />} />
          <Route path="/view-datasets" element={<DatasetOperationPage />} />
          {/* <Route path="dataset-example" element={<DatasetPage />} /> */}
          <Route path="/dataset/:id" element={<DatasetPage />} />
          
          
        </Routes>
      </Router>
      <Toaster/>
    </div>
  );
}

export default App;