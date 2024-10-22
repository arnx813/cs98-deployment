

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignupForm } from "./Authentication/signup-auth";
import { LoginAuth } from "./Authentication/login-auth";
import Discover from "./Discover"
import Checkout from "./Checkout"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element ={ <SignupForm />} /> 
        <Route path="/login" element={<LoginAuth />} />
        <Route path="/discover" element={<Discover/>} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      

    </Router>
  );
}

export default App;