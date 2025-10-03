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

const DAYS_OPTIONS = [
  { label: "24 Hours", value: "1" },
  { label: "7 Days", value: "7" },
  { label: "1 Month", value: "30" },
  { label: "2 Months", value: "60" },
  { label: "3 Months", value: "90" },
];

const WhaleSearch = ({
  address,
  setAddress,
  chain,
  setChain,
  days,
  setDays,
  loading,
  fetchWalletData,
  hasSearched,
  hasSuccessfulSearch,
  error,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [daysDropdownVisible, setDaysDropdownVisible] = useState(false);
  const [addressError, setAddressError] = useState("");
  const [dots, setDots] = useState("");
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!chain) setChain("BSC");
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
    if (hasSuccessfulSearch && address.trim()) {
      fetchWalletData();
    }
  }, [days]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setDropdownVisible(false);
        setDaysDropdownVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const selectedChain = CHAINS.find((c) => c.name === chain) || CHAINS[2];
  const selectedDays = DAYS_OPTIONS.find((d) => d.value === days) || DAYS_OPTIONS[0];

  const handleScan = () => {
    if (!address.trim()) {
      setAddressError("Please enter a wallet address");
      return;
    }
    setAddressError("");
    fetchWalletData();
  };

  return (
    <>
      <style>{`
        @media (min-width: 640px) {
          /* Desktop layout ≥640px */
          .search-wrapper {
            flex-direction: row !important;
            align-items: center !important;
          }
          .search-input {
            margin-right: 12px;
            margin-bottom: 0 !important;
            height: 60px !important;
            flex: 1;
          }
          .scan-btn {
            width: 140px;
            height: 60px !important;
            flex-shrink: 0;
          }
          .interval-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 12px;
          }
          .interval-text {
            padding-top: 8px;
          }
          .interval-dropdown {
            width: 140px;
            padding-top: 2px;
          }
        }

        @media (max-width: 639px) {
          /* Mobile layout <640px */
          .search-wrapper {
            flex-direction: column !important;
          }
          .search-input {
            margin-bottom: 12px !important;
            height: 50px !important;
          }
          .scan-btn {
            width: 100%;
            height: 50px !important;
          }
        }

        .dropdown-background {
          background-color: rgba(31, 31, 31, 0.95) !important;
          backdrop-filter: blur(10px);
        }
      `}</style>

      <div className="mb-6 relative" ref={wrapperRef}>
        {/* Search + Scan */}
        <div className="search-wrapper flex flex-col w-full">
          <div className="search-input flex items-center rounded-xl bg-[#111] border border-[#333] px-3 mb-3 w-full">
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
              <FiChevronDown
                className={`text-white/40 text-lg transition-transform ${
                  dropdownVisible ? "rotate-180" : ""
                }`}
              />
            </button>
            <input
              id="wallet-address-input"
              name="walletAddress"
              className="flex-1 text-white text-sm bg-transparent outline-none placeholder:text-white/40"
              placeholder="Search Wallet By Address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                if (addressError) setAddressError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handleScan()}
              autoComplete="off"
            />
          </div>

          {/* Mobile: Interval row above button */}
          <div className="flex justify-between items-center mb-3 px-1 sm:hidden">
            <span className="text-white text-sm font-medium">Activity Interval</span>
            <button
              className="flex items-center py-1.5 px-2.5 rounded-lg bg-[#111] border border-[#333]"
              onClick={() => setDaysDropdownVisible((prev) => !prev)}
              type="button"
            >
              <span className="text-white mr-1">{selectedDays.label}</span>
              <FiChevronDown
                className={`text-white/40 text-lg transition-transform ${
                  daysDropdownVisible ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          <button
            className="scan-btn w-full bg-[#CCFF00]/10 rounded-lg flex items-center justify-center border border-[#CCFF00]/80 disabled:opacity-50"
            onClick={handleScan}
            disabled={loading}
            type="button"
          >
            {loading ? (
              <span className="text-[#CCFF00]/80 text-base font-semibold">
                Scanning{dots}
              </span>
            ) : (
              <div className="flex items-center">
                <AiOutlineScan className="text-[#CCFF00]/80 text-xl mr-2" />
                <span className="text-[#CCFF00]/80 text-base font-semibold">
                  Scan
                </span>
              </div>
            )}
          </button>
        </div>

        {/* Desktop: Interval row below */}
        <div className="interval-row hidden sm:flex">
          <span className="interval-text text-white text-sm font-medium">Activity Interval</span>
          <button
            className="interval-dropdown flex items-center py-1.5 px-2.5 rounded-lg bg-[#111] border border-[#333]"
            onClick={() => setDaysDropdownVisible((prev) => !prev)}
            type="button"
          >
            <span className="text-white mr-1">{selectedDays.label}</span>
            <FiChevronDown
              className={`text-white/40 text-lg transition-transform ${
                daysDropdownVisible ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Chain Dropdown */}
        <AnimatePresence>
          {dropdownVisible && (
            <motion.div
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

        {/* Days Dropdown */}
        <AnimatePresence>
          {daysDropdownVisible && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-[130px] right-0 rounded-lg py-1.5 w-48 z-50 border border-[#333] dropdown-background"
            >
              {DAYS_OPTIONS.map((item) => (
                <button
                  key={item.value}
                  className="flex items-center w-full py-2.5 px-3 hover:bg-[#333]/50 rounded transition-colors"
                  onClick={async () => {
                    setDays(item.value);
                    setDaysDropdownVisible(false);
                    // Trigger data fetch when duration changes
                    if (hasSuccessfulSearch) {
                      try {
                        await fetchWalletData();
                      } catch (error) {
                        // Error handling is already done in fetchWalletData
                      }
                    }
                  }}
                  type="button"
                >
                  <span className="text-white text-base">{item.label}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Placeholders / Errors */}
        {addressError && (
          <div className="flex flex-col items-center pt-24">
            <MdInfoOutline className="text-[#FFC107]/80 text-5xl mb-4 opacity-50" />
            <span className="text-[#FFC107]/80 text-lg font-semibold mb-1.5">
              Address Required
            </span>
            <span className="text-[#FFC107]/70 text-sm font-normal text-center px-10 leading-5">
              {addressError}
            </span>
          </div>
        )}

        {!hasSearched && !error && !addressError && (
          <div className="flex flex-col items-center pt-24">
            <MdSearch className="text-white/30 text-5xl mb-4 opacity-50" />
            <span className="text-white/50 text-lg font-medium mb-2">
              No search yet
            </span>
            <span className="text-white/30 text-sm font-normal text-center px-10 leading-5">
              Enter a wallet address to begin scanning
            </span>
          </div>
        )}

        {hasSearched && address && error && (
          <div className="flex flex-col items-center pt-24">
            <GoAlertFill className="text-red-500 text-5xl mb-4 opacity-50" />
            <span className="text-red-500 text-lg font-semibold mb-1.5">
              Scan Failed
            </span>
            <span className="text-red-500 text-sm font-normal text-center px-10 leading-5">
              {error}
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default WhaleSearch;
