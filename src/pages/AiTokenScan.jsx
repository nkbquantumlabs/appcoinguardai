import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchArea from "../components/AiTokenScan/SerachArea";
import TokenOverview from "../components/AiTokenScan/TokenOverview";
import TokenDetails from "../components/AiTokenScan/TokenDetails";

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
    const baseUrl = import.meta.env.VITE_AI_TOKEN_SCAN_API_URL;
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
    if (!address) return false;
    if (chain === "Ethereum" || chain === "BSC") {
      return /^0x[a-fA-F0-9]{40}$/.test(address);
    }
    if (chain === "Solana") {
      return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
    }
    return false;
  };

  const fetchScan = async () => {
    setError("");
    setTokenData(null);
    setHasSearched(true);

    if (!validateAddress(chain, address)) {
      setError(`Invalid address format for ${chain}`);
      return;
    }

    // Freeze the address being displayed in TokenOverview for this scan
    setScannedAddress(address);

    setLoading(true);
    try {
      const apiUrl = getApiUrl(chain, address);
      const res = await axios.get(apiUrl);
      setTokenData(res.data);
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to scan token address");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenUrl = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="flex-1">
      {/* Mobile Layout (unchanged) - shows on screens smaller than 1024px */}
      <div className="block lg:hidden">
        <div className="pt-5 px-[20px] max-[425px]:px-[16px] pb-8 max-w-3xl mx-auto">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold mb-6 text-center text-white">
            AI Token Scanner
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
              {/* Show gauge above TokenOverview only on mobile */}
              {!isMdUp && (
                <TokenOverview
                  tokenData={tokenData}
                  address={scannedAddress}
                  showGauge={true}
                />
              )}
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

      {/* Desktop Layout - shows on screens 1024px and larger */}
      <div className="hidden lg:block">
        <div className="pt-4 pb-8">
          <div className="max-w-7xl mx-auto px-8">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-center text-white mt-0">
              AI Token Scanner
            </h1>
          </div>
          <div className="border-b border-gray-800 mb-6 w-full" />
          <div className="max-w-7xl mx-auto px-1 lg:px-[64px] lg:py-8">
            {/* Initial Search Bar (centered) - Only show when no tokenData */}
            {!tokenData && (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                marginTop: '64px',
                marginBottom: '40px',
                maxWidth: '700px',
                width: '100%',
                margin: '64px auto 40px auto'
              }}>
                <div style={{ width: '100%' }}>
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
