import { useState } from "react";
import Login from "./Login";
import Discover from "./Discover";
import DatasetPage from "./DatasetPage"
import { useNavigate } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
          </Route>
          <Route path="/discover" element={<Discover />} />
          <Route path="/dataset-example" element={<DatasetPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
