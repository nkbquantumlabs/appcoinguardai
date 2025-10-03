import React, { useState } from "react";
import axios from "axios";
import WhaleSearch from "../components/Whale/WhaleSearch";
import WhaleOverview from "../components/Whale/WhaleOverview";
import WhaleHoldings from "../components/Whale/WhaleHoldings";
import WhalePerformance from "../components/Whale/WhalePerformance";
import WhaleActivity from "../components/Whale/WhaleActivity";
import WhaleLoader from "../components/Whale/WhaleLoader";

const WhaleTracker = () => {
  const [address, setAddress] = useState("");
  const [displayAddress, setDisplayAddress] = useState("");
  const [chain, setChain] = useState("Solana");
  const [days, setDays] = useState("1");
  const [loading, setLoading] = useState(false);
  const [walletData, setWalletData] = useState(null);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [hasSuccessfulSearch, setHasSuccessfulSearch] = useState(false);

  const getApiUrl = (chain, address, days) => {
    const chainKey = chain === "BSC" ? "bsc" : chain === "Ethereum" ? "eth" : "sol";
    const baseUrl = import.meta.env.VITE_WHALE_API_URL;
    return `${baseUrl}/api/whale/${chainKey}/${address}?days=${days}`;
  };

  const validateAddress = (chain, address) => {
    if (!address) return false;
    if (chain === "Ethereum" || chain === "BSC") {
      return /^0x[a-fA-F0-9]{40}$/.test(address);
    }
    if (chain === "Solana") {
      return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
    }
    return false;
  };

  const fetchWalletData = async () => {
    setError("");
    setHasSearched(true);
    setLoading(true);

    if (!validateAddress(chain, address)) {
      setError(`Invalid address format for ${chain}`);
      setLoading(false);
      throw new Error(`Invalid address format for ${chain}`);
    }

    try {
      const apiUrl = getApiUrl(chain, address, days);
      const res = await axios.get(apiUrl);
      
      if (res.data) {
        setWalletData(res.data);
        setDisplayAddress(address);
        setError("");
        setHasSuccessfulSearch(true); // Mark as successful search
        setLoading(false); // Immediately stop loading when data is received
      }
    } catch (err) {
      console.error("API Error:", err);
      setError(
        err?.response?.data?.details ||
        err.message ||
        "Failed to fetch wallet data. Please check the address or server."
      );
      setWalletData(null);
      setLoading(false); // Stop loading on error
      throw err;
    }
  };

  return (
    <div className="flex-1 text-white">
      <div className="pt-4 sm:pt-5 pb-6 sm:pb-8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-8 max-[425px]:px-4">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-3xl font-bold lg:mb-[12px] text-center text-white lg:mt-0">
            Whale Tracker
          </h1>
        </div>
        <div className="hidden lg:block border-b border-gray-800 mb-6 w-full" />
      </div>
      <div className="max-w-7xl mx-auto px-5 lg:px-16">
        {/* Search Bar - Always visible */}
        <div className="mb-6 pb-6" style={{ maxWidth: '700px', margin: '0 auto' }}>
          <WhaleSearch
            address={address}
            setAddress={setAddress}
            chain={chain}
            setChain={setChain}
            days={days}
            setDays={setDays}
            loading={loading}
            fetchWalletData={fetchWalletData}
            hasSearched={hasSearched}
            hasSuccessfulSearch={hasSuccessfulSearch}
            error={error}
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center p-10 w-full overflow-hidden">
            <WhaleLoader />
          </div>
        ) : walletData ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <WhaleOverview
                  walletData={walletData}
                  address={displayAddress}
                  blockchain={chain.toLowerCase()}
                />
              </div>
              <div>
                <WhalePerformance walletData={walletData} />
              </div>
            </div>
            <WhaleHoldings walletData={walletData} blockchain={chain} />
            <WhaleActivity walletData={walletData} chain={chain} days={days} />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default WhaleTracker;