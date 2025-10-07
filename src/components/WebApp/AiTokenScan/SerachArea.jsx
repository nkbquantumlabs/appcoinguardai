import React, { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MdSearch, MdInfoOutline } from "react-icons/md";
import { GoAlertFill } from "react-icons/go";
import { AiOutlineScan } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";

const CHAINS = [
  { name: "Solana", key: "solana" },
  { name: "Ethereum", key: "ethereum" },
  { name: "BSC", key: "binance" },
];

const SearchArea = ({
  address,
  setAddress,
  chain,
  setChain,
  loading,
  fetchScan,
  hasSearched,
  error,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [addressError, setAddressError] = useState("");
  const [dots, setDots] = useState("");
  const wrapperRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!chain) setChain("Solana");
  }, [chain, setChain]);

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
      }, 500);
    } else {
      setDots("");
    }
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    function handleClickOutside(event) {
      const chainButton = wrapperRef.current?.querySelector(
        'button[type="button"]'
      );
      if (
        dropdownVisible &&
        !chainButton?.contains(event.target) &&
        !dropdownRef.current?.contains(event.target)
      ) {
        setDropdownVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [dropdownVisible]);

  const selectedChain = CHAINS.find((c) => c.name === chain) || CHAINS[0];

  const handleScan = () => {
    if (!address.trim()) {
      setAddressError("Please enter a token address");
      return;
    }
    setAddressError("");
    fetchScan();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleScan();
    }
  };

  return (
    <>
      <style>{`
        @media (max-width: 429px) {
          .search-wrapper {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .search-input {
            margin-right: 0 !important;
            margin-bottom: 12px !important;
            height: 56px !important;
          }
          .scan-btn {
            width: 100% !important;
            height: 48px !important;
          }
        }
        
        @media (min-width: 431px) {
          .search-wrapper {
            flex-direction: row !important;
            align-items: center !important;
          }
          .search-input {
            margin-right: 12px;
            margin-bottom: 0 !important;
            height: 60px !important;
          }
          .scan-btn {
            width: 140px;
            height: 60px !important;
            flex-shrink: 0;
          }
        }
        
        /* Consistent dropdown background for all screens */
        .dropdown-background {
          background-color: rgba(31, 31, 31, 0.95) !important;
          backdrop-filter: blur(10px);
        }
      `}</style>

      <div className="mb-6 relative" ref={wrapperRef}>
        <div className="search-wrapper flex flex-col w-full">
          <div className="search-input flex items-center h-16 rounded-xl bg-[#111] border border-[#333] px-3 mb-3 w-full">
            <button
              className="flex items-center mr-2 pr-2 border-r border-[#333]"
              onClick={() => setDropdownVisible((prev) => !prev)}
              type="button"
            >
              <img
                src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${selectedChain.key}/info/logo.png`}
                alt={selectedChain.name}
                className="w-7 h-7 mr-1"
              />
              <FiChevronDown className={`text-white/40 text-lg transition-transform ${
                dropdownVisible ? "rotate-180" : ""
              }`} />
            </button>
            <input
              className="flex-1 text-white text-sm bg-transparent outline-none placeholder:text-white/40"
              placeholder="Search Token By Address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                if (addressError) setAddressError("");
              }}
              onKeyDown={handleKeyDown}
            />
          </div>

          <button
            className="scan-btn w-full h-12 bg-[#CCFF00]/10 rounded-lg flex items-center justify-center border border-[#CCFF00]/80 disabled:opacity-50"
            onClick={handleScan}
            disabled={loading}
            type="button"
          >
            {loading ? (
              <span className="text-[#CCFF00]/80 text-base font-semibold">Searching{dots}</span>
            ) : (
              <div className="flex items-center">
                <AiOutlineScan className="text-[#CCFF00]/80 text-xl mr-2" />
                <span className="text-[#CCFF00]/80 text-base font-semibold">Search</span>
              </div>
            )}
          </button>
        </div>

        <AnimatePresence>
          {dropdownVisible && (
            <motion.div
              ref={dropdownRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-[70px] left-0 rounded-lg py-1.5 w-48 z-50 border border-[#333] dropdown-background"
            >
              {CHAINS.map((item) => (
                <button
                  key={item.name}
                  className="flex items-center w-full py-2.5 px-3 hover:bg-[#333]/50 rounded transition-colors"
                  onClick={() => {
                    setChain(item.name);
                    setDropdownVisible(false);
                  }}
                  type="button"
                >
                  <img
                    src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${item.key}/info/logo.png`}
                    alt={item.name}
                    className="w-6 h-6 mr-2.5"
                  />
                  <span className="text-white text-base">{item.name}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {addressError && (
          <div className="flex flex-col items-center pt-24">
            <MdInfoOutline className="text-[#FFC107]/80 text-5xl mb-4 opacity-50" />
            <span className="text-[#FFC107]/80 text-lg font-semibold mb-1.5">Address Required</span>
            <span className="text-[#FFC107]/70 text-sm font-normal text-center px-10 leading-5">{addressError}</span>
          </div>
        )}

        {!hasSearched && !error && !addressError && (
          <div className="flex flex-col items-center pt-24">
            <MdSearch className="text-white/30 text-5xl mb-4 opacity-50" />
            <span className="text-white/50 text-lg font-medium mb-2">No search yet</span>
            <span className="text-white/30 text-sm font-normal text-center px-10 leading-5">
              Enter a token address to begin scanning
            </span>
          </div>
        )}

        {hasSearched && address && error && (
          <div className="flex flex-col items-center pt-24">
            <GoAlertFill className="text-red-500 text-5xl mb-4 opacity-50" />
            <span className="text-red-500 text-lg font-semibold mb-1.5">Search Failed</span>
            <span className="text-red-500 text-sm font-normal text-center px-10 leading-5">{error}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchArea;
