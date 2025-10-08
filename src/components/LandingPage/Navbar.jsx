import React, { useEffect, useState, useRef } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import LaunchAppButton from "./LaunchAppButton";
import { Link, useLocation } from "react-router-dom";
import ProductModel from "./ProductModel";
import CompanyModel from "./CompanyModel";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProductModel, setShowProductModel] = useState(false);
  const [showCompanyModel, setShowCompanyModel] = useState(false);

  const [isProductOpen, setIsProductOpen] = useState(false); // Mobile dropdown
  const [isCompanyOpen, setIsCompanyOpen] = useState(false); // Mobile dropdown
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false); // Coming soon dropdown

  const location = useLocation();
  const productTimeoutRef = useRef(null);
  const companyTimeoutRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    scrollToTop();
  }, [location.pathname]);

  // Desktop Hover Handlers
  const handleProductEnter = () => {
    if (productTimeoutRef.current) clearTimeout(productTimeoutRef.current);
    setShowProductModel(true);
  };
  const handleProductLeave = () => {
    productTimeoutRef.current = setTimeout(() => {
      setShowProductModel(false);
    }, 200);
  };
  const handleCompanyEnter = () => {
    if (companyTimeoutRef.current) clearTimeout(companyTimeoutRef.current);
    setShowCompanyModel(true);
  };
  const handleCompanyLeave = () => {
    companyTimeoutRef.current = setTimeout(() => {
      setShowCompanyModel(false);
    }, 200);
  };

  return (
    <>
      {/* TOP NAVBAR */}
      <nav className="text-white font-['DM_Sans'] fixed top-[50px] left-0 right-0 z-50 pt-2 md:pt-4 pb-2">
        <div className="w-full flex justify-center">
          <div className="max-w-[96%] w-full">
            <div className="bg-[rgb(17,17,17)] rounded-xl shadow-lg mx-auto px-2 sm:px-4 lg:px-6">
              <div className="flex justify-between items-center h-16">
                {/* Logo */}
                <div className="flex items-center mb-1 space-x-2">
                  <Link to="/">
                    <h3 className="text-white text-2xl md:text-3xl font-[Righteous] font-medium tracking-wide">
                      coinguard
                    </h3>
                  </Link>
                </div>

                {/* Desktop Menu */}
                <div className="relative hidden md:flex items-center space-x-9">
                  <li
                    className="relative list-none"
                    onMouseEnter={handleProductEnter}
                    onMouseLeave={handleProductLeave}
                  >
                    <span className="hover:text-gray-300 font-medium cursor-pointer">
                      Product
                    </span>
                    {showProductModel && (
                      <ProductModel
                        onMouseEnter={handleProductEnter}
                        onMouseLeave={handleProductLeave}
                      />
                    )}
                  </li>
                  <li
                    className="relative list-none"
                    onMouseEnter={handleCompanyEnter}
                    onMouseLeave={handleCompanyLeave}
                  >
                    <span className="hover:text-gray-300 font-medium cursor-pointer">
                      Company
                    </span>
                    {showCompanyModel && (
                      <CompanyModel
                        onMouseEnter={handleCompanyEnter}
                        onMouseLeave={handleCompanyLeave}
                      />
                    )}
                  </li>
                  <Link
                    target="_blank"
                    to="https://docs.coinguard.ai/"
                    className="hover:text-gray-300 font-medium"
                  >
                    Docs
                  </Link>
                  <Link
                    target="_blank"
                    to="https://blog.coinguard.ai/"
                    className="hover:text-gray-300 font-medium"
                  >
                    Blog
                  </Link>
                </div>

                {/* Desktop CTA */}
                <div className="hidden md:flex items-center space-x-6">
                  <LaunchAppButton />
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center md:hidden">
                  <button
                    onClick={toggleMenu}
                    className="text-gray-300 hover:text-white transition duration-200"
                  >
                    {isOpen ? (
                      <X className="h-6 w-6" />
                    ) : (
                      <Menu className="h-6 w-6" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Backdrop for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-30 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } md:hidden`}
        onClick={() => setIsOpen(false)}
      />

      {/* MOBILE DROPDOWN */}
      <div
        className={`fixed top-[9rem] left-1/2 font-['DM_Sans'] bg-[rgb(17,17,17)] rounded-xl shadow-lg z-40 transition-all duration-300 ease-in-out transform -translate-x-1/2
          max-w-[96%] w-full overflow-hidden md:hidden ${
            isOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="flex flex-col px-6 pt-6 pb-6 overflow-y-auto">
          <ul className="space-y-3 text-left">
            {/* Product Dropdown */}
            <li>
              <button
                className="flex justify-between items-center w-full text-white font-semibold hover:text-[#CCFF00]"
                onClick={() => setIsProductOpen(!isProductOpen)}
              >
                Product
                {isProductOpen ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 text-sm text-gray-300 gap-y-2 mt-2 pl-3 transition-all duration-300 overflow-hidden ${
                  isProductOpen ? "max-h-[600px]" : "max-h-0"
                }`}
              >
                <Link to="/app/ai-token-scan" onClick={() => setIsOpen(false)}>
                  Token Scan
                </Link>
                <Link to="/app/rugshield" onClick={() => setIsOpen(false)}>
                  RugShield
                </Link>
                <Link to="/app/liquidity-scanner" onClick={() => setIsOpen(false)}>
                  Liquidity Scan
                </Link>
                <Link to="/app/honeypot-detector" onClick={() => setIsOpen(false)}>
                  Honeypot Detector
                </Link>
                <Link to="/app/whale-tracker" onClick={() => setIsOpen(false)}>
                  Whale Tracker
                </Link>
                <Link to="/app/ai-chat" onClick={() => setIsOpen(false)}>
                  Coinguard AI
                </Link>
                <Link to="/app/nft-generator" onClick={() => setIsOpen(false)}>
                  NFT Generator
                </Link>

                <div>
                  <button
                    className="flex justify-between items-center w-full text-white font-semibold hover:text-[#CCFF00]"
                    onClick={() => setIsComingSoonOpen(!isComingSoonOpen)}
                  >
                    Coming Soon
                    {isComingSoonOpen ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </button>
                  <div
                    className={`grid grid-cols-1 text-sm text-gray-400 gap-y-2 mt-2 pl-3 transition-all duration-300 overflow-hidden ${
                      isComingSoonOpen ? "max-h-[400px]" : "max-h-0"
                    }`}
                  >
                    <span>Coinguard App</span>
                    <span>Coinguard Wallet</span>
                    {/* <span>Whale/Dev Wallet Tracker</span> */}
                    <span>Portfolio Overview</span>
                    <span>Smart Picks</span>
                    <span>Insight Hub</span>
                  </div>
                </div>
              </div>
            </li>

            {/* Coming Soon Dropdown */}

            {/* Company Dropdown */}
            <li>
              <button
                className="flex justify-between items-center w-full text-white font-semibold hover:text-[#CCFF00]"
                onClick={() => setIsCompanyOpen(!isCompanyOpen)}
              >
                Company
                {isCompanyOpen ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
              <div
                className={`grid grid-cols-1 text-sm text-gray-300 gap-y-2 mt-2 pl-3 transition-all duration-300 overflow-hidden ${
                  isCompanyOpen ? "max-h-[300px]" : "max-h-0"
                }`}
              >
                <Link to="/about" onClick={() => setIsOpen(false)}>
                  About
                </Link>
                <Link target="_blank" to="https://docs.coinguard.ai/">
                  Resources
                </Link>
                <Link to="/contact" onClick={() => setIsOpen(false)}>
                  Contact
                </Link>
                <Link to="/privacy-policy" onClick={() => setIsOpen(false)}>
                  Legal
                </Link>
              </div>
            </li>

            {/* Docs */}
            <li>
              <Link
                target="_blank"
                to="https://docs.coinguard.ai/"
                className="block text-white font-semibold hover:text-[#CCFF00]"
              >
                Docs
              </Link>
            </li>

            {/* Blog */}
            <li>
              <Link
                target="_blank"
                to="https://blog.coinguard.ai/"
                className="block text-white font-semibold hover:text-[#CCFF00]"
              >
                Blog
              </Link>
            </li>

            {/* Launch App Button */}
            <li className="pt-3">
              <LaunchAppButton />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
