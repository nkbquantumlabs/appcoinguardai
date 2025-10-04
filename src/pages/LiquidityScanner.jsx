import React, { useState } from 'react';
import axios from 'axios';
import LiquidityOverview from '../components/Liquidity/LiquidityOverview';
import LiquidityDetails from '../components/Liquidity/LiquidityDetails';
import LiquidityHolders from '../components/Liquidity/LiquidityHolders';
import LPHolders from '../components/Liquidity/LPHolders';

const LiquidityScanner = () => {
  // API Configuration from environment
  const LIQUIDITY_API_URL = import.meta.env.VITE_LIQUIDITY_API_URL;
  const [address, setAddress] = useState('');
  const [chain, setChain] = useState('');
  const [tokenData, setTokenData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState('');

  const getApiUrl = (chain, address) => {
    switch (chain) {
      case 'BSC':
        return `${LIQUIDITY_API_URL}/api/liquidity/bsc/${address}`;
      case 'Ethereum':
        return `${LIQUIDITY_API_URL}/api/liquidity/eth/${address}`;
      case 'Solana':
      default:
        return `${LIQUIDITY_API_URL}/api/liquidity/sol/${address}`;
    }
  };

  const validateAddress = (chain, address) => {
    if (!address) return false;

    if (chain === 'Ethereum' || chain === 'BSC') {
      return /^0x[a-fA-F0-9]{40}$/.test(address);
    }

    if (chain === 'Solana') {
      return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
    }

    return false;
  };

  const fetchTokenData = async () => {
    setError('');
    setTokenData(null);
    setHasSearched(true);

    if (!validateAddress(chain, address)) {
      setError(`Invalid address for ${chain} chain`);
      return;
    }

    setLoading(true);
    try {
      const apiUrl = getApiUrl(chain, address);
      const res = await axios.get(apiUrl);
      setTokenData(res.data);
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to fetch liquidity data');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenUrl = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="flex-1">
      {/* Mobile Layout - shows on screens smaller than 1280px */}
      <div className="block xl:hidden">
        <div className="pt-5 px-[20px] max-[425px]:px-[16px] pb-8 max-w-3xl mx-auto">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold mb-6 pb-[6px] text-center text-white">
            Liquidity Scanner
          </h1>

          {!tokenData && (
            <LiquidityOverview 
              tokenData={null} 
              chain={chain}
              address={address}
              setAddress={setAddress}
              setChain={setChain}
              loading={loading}
              fetchScan={fetchTokenData}
              hasSearched={hasSearched}
              error={error}
            />
          )}

          {tokenData && (
            <>
              <LiquidityOverview 
                tokenData={tokenData} 
                chain={chain}
                address={address}
                setAddress={setAddress}
                setChain={setChain}
                loading={loading}
                fetchScan={fetchTokenData}
                hasSearched={hasSearched}
                error={error}
              />
              <LPHolders 
                lpHolders={tokenData.lpHolders || tokenData.token?.lpHolders || tokenData.topPools?.[0]?.lpHolders}
              />
              <LiquidityDetails tokenData={tokenData} handleOpenUrl={handleOpenUrl} showOnlyPoolsAndTokens={true} />
              <LiquidityHolders 
                holders={tokenData.token.topHolders}
                lpHolders={null}
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
              Liquidity Scanner
            </h1>
          </div>
          <div className="border-b border-gray-800 mb-6 w-full" />
          <div className="max-w-7xl mx-auto px-1 lg:px-[64px] lg:py-8">
            {/* Initial Search Bar - Only show when no tokenData */}
            {!tokenData && (
              <div className="mb-6 pb-6" style={{ maxWidth: '700px', margin: '0 auto' }}>
                <LiquidityOverview 
                  tokenData={null} 
                  chain={chain}
                  address={address}
                  setAddress={setAddress}
                  setChain={setChain}
                  loading={loading}
                  fetchScan={fetchTokenData}
                  hasSearched={hasSearched}
                  error={error}
                  showOnlySearch={true}
                />
              </div>
            )}

            {/* Two Column Layout - Only show when tokenData exists */}
            {tokenData && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '60px',
                alignItems: 'start'
              }}>
                {/* Left Column: Token Overview */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  minHeight: '500px'
                }}>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                    <LiquidityOverview 
                      tokenData={tokenData} 
                      chain={chain}
                      address={null}
                      setAddress={null}
                      setChain={null}
                      loading={false}
                      fetchScan={null}
                      hasSearched={false}
                      error=""
                      showOnlyTokenInfo={true}
                    />
                  </div>
                </div>
                
                {/* Right Column: Search + Risk + Pool Info */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  minHeight: '500px'
                }}>
                  {/* Add some top spacing to move search bar down */}
                  <div style={{ height: '20px' }}></div>
                  <div style={{ marginBottom: '16px' }}>
                    <LiquidityOverview 
                      tokenData={null} 
                      chain={chain}
                      address={address}
                      setAddress={setAddress}
                      setChain={setChain}
                      loading={loading}
                      fetchScan={fetchTokenData}
                      hasSearched={hasSearched}
                      error={error}
                      showOnlySearch={true}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <LiquidityOverview 
                      tokenData={tokenData} 
                      chain={chain}
                      address={null}
                      setAddress={null}
                      setChain={null}
                      loading={false}
                      fetchScan={null}
                      hasSearched={false}
                      error=""
                      showOnlyRiskAndPool={true}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TOKEN METRICS - Full Width */}
            {tokenData && (
              <div style={{ paddingBottom: '24px' }}>
                <LiquidityOverview 
                  tokenData={tokenData} 
                  chain={chain}
                  address={null}
                  setAddress={null}
                  setChain={null}
                  loading={false}
                  fetchScan={null}
                  hasSearched={false}
                  error=""
                  showOnlyTokenMetrics={true}
                />
              </div>
            )}

            {/* LP HOLDERS - Full Width */}
            {tokenData && (
              <LPHolders 
                lpHolders={tokenData.lpHolders || tokenData.token?.lpHolders || tokenData.topPools?.[0]?.lpHolders}
              />
            )}

            {/* TOP LIQUIDITY POOLS & POOLED TOKENS - Full Width */}
            {tokenData && (
              <LiquidityDetails tokenData={tokenData} handleOpenUrl={handleOpenUrl} showOnlyPoolsAndTokens={true} />
            )}

            {/* TOP 10 HOLDERS - Full Width */}
            {tokenData && (
              <LiquidityHolders 
                holders={tokenData.token.topHolders}
                lpHolders={null}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiquidityScanner;
