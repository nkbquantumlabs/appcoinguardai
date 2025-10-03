import React, { useState, useEffect } from "react";
import HoneySearch from "../components/Honeypot/HoneySearch";
import HoneyOverview from "../components/Honeypot/HoneyOverview";
import HoneyDetails from "../components/Honeypot/HoneyDetails";
import HoneyTokenHolders from "../components/Honeypot/HoneyTokenHolders";
import LiquidityPools from "../components/Honeypot/LiquidityPools";

const HoneypotDetector = () => {
  const [network, setNetwork] = useState("Ethereum");
  const [tokenAddress, setTokenAddress] = useState("");
  const [scannedAddress, setScannedAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (!network) setNetwork("Ethereum");
  }, [network]);

  const validateAddress = (network, address) => {
    if (!address) return false;
    
    if (network === "Ethereum" || network === "BSC") {
      return /^0x[a-fA-F0-9]{40}$/.test(address);
    }
    
    if (network === "Solana") {
      return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
    }
    
    return false;
  };

  const getApiUrl = (network, address) => {
    const baseUrl = import.meta.env.VITE_HONEYPOT_API_URL;
    switch (network) {
      case "BSC":
        return `${baseUrl}/api/honeypot-check/bsc/${address}`;
      case "Ethereum":
        return `${baseUrl}/api/honeypot-check/eth/${address}`;
      case "Solana":
      default:
        return `${baseUrl}/api/honeypot-check/sol/${address}`;
    }
  };

  const checkHoneypot = async () => {
    setError("");
    setData(null);
    setHasSearched(true);

    if (!validateAddress(network, tokenAddress)) {
      setError(`Invalid address format for ${network}`);
      return;
    }

    // Freeze the address being displayed for this scan
    setScannedAddress(tokenAddress);

    setIsLoading(true);
    try {
      const apiUrl = getApiUrl(network, tokenAddress);
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      
      const responseData = await response.json();

      if (!responseData.honeypot || typeof responseData.honeypot !== "object") {
        throw new Error("Invalid response from server");
      }

      // For Solana, topLiquidityPools is inside honeypot object
      // For BSC/ETH, topLiquidityPools is at root level
      const combinedData = {
        ...responseData.honeypot,
        topLiquidityPools: responseData.honeypot.topLiquidityPools || responseData.topLiquidityPools || []
      };

      setData(combinedData);
    } catch (err) {
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (err instanceof Error) {
        if (err.message.includes("Failed to fetch")) {
          errorMessage = "Network error. Please check your internet connection.";
        } else if (err.message.includes("API Error: 404")) {
          errorMessage = `${network} endpoint not available. Please try Solana or contact support.`;
        } else if (err.message.includes("API Error:")) {
          errorMessage = `Server error: ${err.message}`;
        } else if (err.message === "Invalid response from server") {
          errorMessage = "Please select correct chain";
        }
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1">
      {/* Mobile Layout (unchanged) - shows on screens smaller than 1024px */}
      <div className="block lg:hidden">
        <div className="pt-5 px-[20px] max-[425px]:px-[16px] pb-8 max-w-3xl mx-auto">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold mb-6 text-center text-white">
            Honeypot Detector
          </h1>
          <HoneySearch
            network={network}
            setNetwork={setNetwork}
            tokenAddress={tokenAddress}
            setTokenAddress={setTokenAddress}
            isLoading={isLoading}
            checkHoneypot={checkHoneypot}
            hasSearched={hasSearched}
            error={error}
          />

          {data && (
            <>
              <HoneyOverview data={data} network={network} tokenAddress={scannedAddress} />
              <HoneyDetails data={data} />
              <LiquidityPools data={data} />
              <HoneyTokenHolders data={data} network={network} />
            </>
          )}
        </div>
      </div>

      {/* Desktop Layout - shows on screens 1024px and larger */}
      <div className="hidden lg:block">
        <div className="pt-4 pb-8">
          <div className="max-w-7xl mx-auto px-8">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-center text-white mt-0">
              Honeypot Detector
            </h1>
          </div>
          <div className="border-b border-gray-800 mb-6 w-full" />
          <div className="max-w-7xl mx-auto px-1 lg:px-[64px] lg:py-8">
            {/* Initial Search Bar (centered) - Only show when no data */}
            {!data && (
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
                  <HoneySearch
                    network={network}
                    setNetwork={setNetwork}
                    tokenAddress={tokenAddress}
                    setTokenAddress={setTokenAddress}
                    isLoading={isLoading}
                    checkHoneypot={checkHoneypot}
                    hasSearched={hasSearched}
                    error={error}
                  />
                </div>
              </div>
            )}

            {/* Results Layout - Only show when data exists */}
            {data && (
              <>
                <div style={{ marginBottom: '24px' }}>
                  <HoneySearch
                    network={network}
                    setNetwork={setNetwork}
                    tokenAddress={tokenAddress}
                    setTokenAddress={setTokenAddress}
                    isLoading={isLoading}
                    checkHoneypot={checkHoneypot}
                    hasSearched={hasSearched}
                    error={error}
                  />
                </div>
                
                <HoneyOverview data={data} network={network} tokenAddress={scannedAddress} />
                
                <div style={{
                  marginTop: '32px'
                }}>
                  <HoneyDetails data={data} />
                  <LiquidityPools data={data} />
                  <HoneyTokenHolders data={data} network={network} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoneypotDetector;
