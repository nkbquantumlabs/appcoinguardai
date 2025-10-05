import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/SideBar";
import Support from "./components/Support";
import Home from "./pages/Home";
import LiquidityScanner from "./pages/LiquidityScanner";
import NFT from "./pages/NFT";
import AiTokenScan from "./pages/AiTokenScan";
import HoneypotDetector from "./pages/HoneypotDetector";
import WhaleTracker from "./pages/WhaleTracker";
import AIAssistant from "./pages/AIAssistant";
import RugShield from "./pages/RugShield";
import CopyAlert from "./shared/CopyAlert";

const AppContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const originalError = console.error;
  console.error = (...args) => {
    if (/Cannot update a component/.test(args[0])) return;
    originalError.apply(console, args);
  };

  // Get active page from current route
  const getActivePageFromRoute = () => {
    switch (location.pathname) {
      case "/":
        return "home";
      case "/support":
        return "support";
      case "/liquidity-scanner":
        return "liquidity-scanner";
      case "/nft-generator":
        return "nft-generator";
      case "/ai-token-scan":
        return "ai-token-scan";
      case "/honeypot-detector":
        return "honeypot-detector";
      case "/whale-tracker":
        return "whale-tracker";
      case "/ai-chat":
        return "ai-assistant";
      case "/rugshield":
        return "rugshield";
      default:
        return "home";
    }
  };

  const activePage = getActivePageFromRoute();

  return (
    <div className="min-h-screen transition-all duration-300">
      {/* Header */}
      <Header
        toggleSidebar={toggleSidebar}
        isSidebarOpen={sidebarOpen}
        activePage={activePage}
      />

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        activePage={activePage}
      />

      {/* Main Content */}
      <div className="lg:flex">
        {/* Desktop-only sidebar spacer */}
        <div className="hidden lg:block w-64 shrink-0" />

        {/* Main content */}
        <main
          className={`flex-1 pt-[56px] lg:pt-0 min-h-screen transition-all duration-300 ${
            sidebarOpen ? "lg:ml-0" : ""
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/support" element={<Support />} />
              <Route path="/liquidity-scanner" element={<LiquidityScanner />} />
              <Route path="/nft-generator" element={<NFT />} />
              <Route path="/ai-token-scan" element={<AiTokenScan />} />
              <Route path="/honeypot-detector" element={<HoneypotDetector />} />
              <Route path="/whale-tracker" element={<WhaleTracker />} />
              <Route path="/ai-chat" element={<AIAssistant />} />
              <Route path="/rugshield" element={<RugShield />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
      <CopyAlert />
    </Router>
  );
};

export default App;
