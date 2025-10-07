import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import Support from "./Support";
import LiquidityScanner from "./LiquidityScanner";
import NFT from "./NFT";
import AiTokenScan from "./AiTokenScan";
import HoneypotDetector from "./HoneypotDetector";
import WhaleTracker from "./WhaleTracker";
import AIAssistant from "./AIAssistant";
import RugShield from "./RugShield";
import CopyAlert from "../shared/CopyAlert";

const WebApp = () => {
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
      case "/app":
      case "/app/":
        return "ai-token-scan";
      case "/app/support":
        return "support";
      case "/app/liquidity-scanner":
        return "liquidity-scanner";
      case "/app/nft-generator":
        return "nft-generator";
      case "/app/ai-token-scan":
        return "ai-token-scan";
      case "/app/honeypot-detector":
        return "honeypot-detector";
      case "/app/whale-tracker":
        return "whale-tracker";
      case "/app/ai-chat":
        return "ai-assistant";
      case "/app/rugshield":
        return "rugshield";
      default:
        return "ai-token-scan";
    }
  };

  const activePage = getActivePageFromRoute();

  return (
    <>
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
                <Route path="/" element={<AiTokenScan />} />
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
      <CopyAlert />
    </>
  );
};

export default WebApp;