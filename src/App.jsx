import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import WebApp from "./pages/WebApp";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Landing Page Routes */}
        <Route path="/*" element={<LandingPage />} />
        
        {/* Web App Routes */}
        <Route path="/app/*" element={<WebApp />} />
      </Routes>
    </Router>
  );
};

export default App;
