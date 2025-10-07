import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchArea from "../../components/WebApp/AiTokenScan/SerachArea";
import TokenOverview from "../../components/WebApp/AiTokenScan/TokenOverview";
import TokenDetails from "../../components/WebApp/AiTokenScan/TokenDetails";

const AiTokenScan = () => {
  const [address, setAddress] = useState("");
  const [scannedAddress, setScannedAddress] = useState("");
  const [chain, setChain] = useState("Solana");
  const [loading, setLoading] = useState(false);
  const [tokenData, setTokenData] = useState(null);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [isMdUp, setIsMdUp] = useState(
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 768px)").matches
      : false
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handler = (e) => setIsMdUp(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const getApiUrl = (chain, address) => {
    const baseUrl = import.meta.env.VITE_BASE_API_URL;
    switch (chain) {
      case "BSC":
        return `${baseUrl}/api/aitoken/bsc/${address}`;
      case "Ethereum":
        return `${baseUrl}/api/aitoken/eth/${address}`;
      case "Solana":
      default:
        return `${baseUrl}/api/aitoken/sol/${address}`;
    }
  };

  const validateAddress = (chain, address) => {
    if (!address || address.trim().length === 0) return false;
    
    const trimmedAddress = address.trim();
    
    if (chain === "Ethereum" || chain === "BSC") {
      return /^0x[a-fA-F0-9]{40}$/.test(trimmedAddress);
    }
    if (chain === "Solana") {
      return /^[1-9A-HJ-NP-Za-km-z]{25,50}$/.test(trimmedAddress);
    }
    return false;
  };

  const fetchScan = async () => {
    setError("");
    setTokenData(null);
    setHasSearched(true);

    const trimmedAddress = address.trim();
    
    if (!validateAddress(chain, trimmedAddress)) {
      setError(`Invalid address format for ${chain}`);
      return;
    }

    // Freeze the address being displayed in TokenOverview for this scan
    setScannedAddress(trimmedAddress);

    setLoading(true);
    try {
      const apiUrl = getApiUrl(chain, trimmedAddress);
      const res = await axios.get(apiUrl);
      
      if (res.data && res.data.success !== false) {
        setTokenData(res.data);
      } else {
        setError(res.data?.message || res.data?.error || "Token not found or invalid address");
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setError("Token not found");
      } else if (err.response?.status === 400) {
        setError("Invalid token address format");
      } else {
        setError(err?.response?.data?.message || err?.response?.data?.error || "Failed to scan token address");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOpenUrl = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="flex-1">
      {/* Mobile Layout (unchanged) - shows on screens smaller than 1280px */}
      <div className="block xl:hidden">
        <div className="pt-5 px-[20px] max-[425px]:px-[16px] pb-8 max-w-3xl mx-auto">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold mb-6 text-center text-white">
            Token Scan
          </h1>
          <SearchArea
            address={address}
            setAddress={setAddress}
            chain={chain}
            setChain={setChain}
            loading={loading}
            fetchScan={fetchScan}
            hasSearched={hasSearched}
            error={error}
          />

          {tokenData && (
            <>
              {/* Show gauge above TokenOverview for all screens below 1280px */}
              <TokenOverview
                tokenData={tokenData}
                address={scannedAddress}
                showGauge={true}
              />
              <TokenOverview
                tokenData={tokenData}
                address={scannedAddress}
                showGauge={false}
              />
              <TokenDetails
                tokenData={tokenData}
                handleOpenUrl={handleOpenUrl}
              />
            </>
          )}
        </div>
      </div>

      {/* Desktop Layout - shows on screens 1280px and larger */}
      <div className="hidden xl:block">
        <div className="pt-4 pb-8">
          <div className="max-w-7xl mx-auto px-8">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-center text-white mt-0">
              Token Scan
            </h1>
          </div>
          <div className="border-b border-gray-800 mb-6 w-full" />
          <div className="max-w-7xl mx-auto px-1 lg:px-[64px] lg:py-8">
            {/* Initial Search Bar - Only show when no tokenData */}
            {!tokenData && (
              <div className="mb-6 pb-6" style={{ maxWidth: '700px', margin: '0 auto' }}>
                <SearchArea
                  address={address}
                  setAddress={setAddress}
                  chain={chain}
                  setChain={setChain}
                  loading={loading}
                  fetchScan={fetchScan}
                  hasSearched={hasSearched}
                  error={error}
                />
              </div>
            )}

            {/* Two Column Layout - Only show when tokenData exists */}
            {tokenData && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '60px',
                alignItems: 'stretch'
              }}>
                {/* Left Column: Search + Token Overview */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}>
                  <div style={{ marginBottom: '24px' }}>
                    <SearchArea
                      address={address}
                      setAddress={setAddress}
                      chain={chain}
                      setChain={setChain}
                      loading={loading}
                      fetchScan={fetchScan}
                      hasSearched={hasSearched}
                      error={error}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <TokenOverview
                      tokenData={tokenData}
                      address={scannedAddress}
                      showGauge={false}
                    />
                  </div>
                </div>
                
                {/* Right Column: Gauge */}
                {isMdUp && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'stretch'
                  }}>
                    <TokenOverview
                      tokenData={tokenData}
                      address={scannedAddress}
                      showGauge={true}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Bottom Section: Full Width Token Details */}
            {tokenData && (
              <div style={{
                width: '100%',
                marginTop: '32px'
              }}>
                <TokenDetails
                  tokenData={tokenData}
                  handleOpenUrl={handleOpenUrl}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiTokenScan;
