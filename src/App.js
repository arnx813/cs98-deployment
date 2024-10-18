import { useState } from "react";
import Login from "./Login";
import Discover from "./Discover";
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
