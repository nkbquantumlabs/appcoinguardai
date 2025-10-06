import React, { useState } from "react";
import axios from "axios";
import RugSearch from "../components/RugShield/RugSearch";
import RugDetails from "../components/RugShield/RugDetails";
import KeyMetrics from "../components/RugShield/KeyMetrics";
import RugDex from "../components/RugShield/RugDex";
import TopHolders from "../components/RugShield/TopHolders";

const RugShield = () => {
  const [address, setAddress] = useState("");
  const [scannedAddress, setScannedAddress] = useState("");
  const [chain, setChain] = useState("Solana");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const getApiUrl = (chain, address) => {
    const baseUrl = import.meta.env.VITE_BASE_API_URL;
    switch (chain) {
      case "BSC":
        return `${baseUrl}/api/rugshield/bsc/${address}`;
      case "Ethereum":
        return `${baseUrl}/api/rugshield/eth/${address}`;
      case "Solana":
      default:
        return `${baseUrl}/api/rugshield/sol/${address}`;
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

  const formatNumber = (num) => {
    if (num === undefined || num === null) return "0";
    if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
    if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
    return num.toString();
  };

  const fetchScan = async () => {
    setError("");
    setData(null);
    setHasSearched(true);

    if (!validateAddress(chain, address)) {
      setError(`Invalid address format for ${chain}`);
      return;
    }

    // Freeze the address being displayed for this scan
    setScannedAddress(address);

    setLoading(true);
    try {
      const apiUrl = getApiUrl(chain, address);
      const res = await axios.get(apiUrl);
      setData(res.data);
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
      {/* Mobile Layout - shows on screens smaller than 1024px */}
      <div className="block lg:hidden">
        <div className="pt-5 px-[20px] max-[425px]:px-[16px] pb-8 max-w-3xl mx-auto">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold mb-6 text-center text-white">
            Rug Shield
          </h1>
          <RugSearch
            address={address}
            setAddress={setAddress}
            chain={chain}
            setChain={setChain}
            loading={loading}
            fetchScan={fetchScan}
            hasSearched={hasSearched}
            error={error}
          />

          {data && (
            <>
              <RugDetails
                data={data}
                formatNumber={formatNumber}
              />
              <div style={{ marginTop: 16 }}>
                <KeyMetrics data={data} formatNumber={formatNumber} handleOpenUrl={handleOpenUrl} />
              </div>
              <div style={{ marginTop: 16 }}>
                <RugDex data={data} />
              </div>
              <div style={{ marginTop: 16 }}>
                <TopHolders data={data} formatNumber={formatNumber} />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Desktop Layout - shows on screens 1024px and larger */}
      <div className="hidden lg:block">
        <div className="pt-4 pb-8">
          <div className="max-w-7xl mx-auto px-8">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-center text-white mt-0">
              Rug Shield
            </h1>
          </div>
          <div className="border-b border-gray-800 mb-6 w-full" />
          <div className="max-w-7xl mx-auto px-1 lg:px-[64px] lg:py-8">
            {/* Initial Search Bar - Only show when no data */}
            {!data && (
              <div className="mb-6 pb-6" style={{ maxWidth: '700px', margin: '0 auto' }}>
                <RugSearch
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

            {/* Results Layout - Only show when data exists */}
            {data && (
              <>
                <div style={{ marginBottom: '24px', maxWidth: '700px', margin: '0 auto 24px auto' }}>
                  <RugSearch
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
                
                <RugDetails
                  data={data}
                  formatNumber={formatNumber}
                />
                
                <div style={{ marginTop: '32px' }}>
                  <KeyMetrics data={data} formatNumber={formatNumber} handleOpenUrl={handleOpenUrl} />
                </div>
                
                <div style={{ marginTop: '32px' }}>
                  <RugDex data={data} />
                </div>
                
                <div style={{ marginTop: '32px' }}>
                  <TopHolders data={data} formatNumber={formatNumber} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RugShield;
