import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import LiquiditySearch from '../components/Liquidity/LiquiditySearch';
import LiquidityOverview from '../components/Liquidity/LiquidityOverview';
import LiquidityDetails from '../components/Liquidity/LiquidityDetails';
import LiquidityHolders from '../components/Liquidity/LiquidityHolders';

const LiquidityScanner = () => {
  // API Configuration from environment
  const LIQUIDITY_API_URL = import.meta.env.VITE_LIQUIDITY_API_URL;
  const [address, setAddress] = useState('');
  const [chain, setChain] = useState('');
  const [tokenData, setTokenData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState('');


  const formatValue = (value) => {
    if (typeof value === 'number') {
      if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
      if (value >= 1000) return `$${(value / 1000).toFixed(2)}K`;
      return value.toLocaleString();
    }
    return value || 'N/A';
  };

  const truncateTokenName = (name, maxLength = 20) => {
    if (!name) return 'Unknown Token';
    if (name.length <= maxLength) return name;
    return `${name.substring(0, maxLength)}...`;
  };

  const getApiUrl = (chain, address) => {
    switch (chain) {
      case 'BSC':
        return `${LIQUIDITY_API_URL}/monitor/liquidity/bsc/${address}`;
      case 'Ethereum':
        return `${LIQUIDITY_API_URL}/monitor/liquidity/eth/${address}`;
      case 'Solana':
      default:
        return `${LIQUIDITY_API_URL}/monitor/liquidity/sol/${address}`;
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
      setError(`Invalid address format for ${chain}`);
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
      {/* Mobile Layout (unchanged) - shows on screens smaller than 1024px */}
      <div className="block lg:hidden">
        <div className="pt-5 px-[20px] max-[425px]:px-[16px] pb-8 max-w-3xl mx-auto">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold mb-6 text-center text-white">
            Liquidity Scanner
          </h1>
          <LiquiditySearch
            address={address}
            setAddress={setAddress}
            chain={chain}
            setChain={setChain}
            loading={loading}
            fetchScan={fetchTokenData}
            hasSearched={hasSearched}
            error={error}
          />

          {tokenData && (
            <>
              <LiquidityOverview tokenData={tokenData} chain={chain} />
              <LiquidityDetails tokenData={tokenData} handleOpenUrl={handleOpenUrl} />
              <LiquidityHolders holders={tokenData.token.topHolders} />
            </>
          )}
        </div>
      </div>

      {/* Desktop Layout - shows on screens 1024px and larger */}
      <div className="hidden lg:block">
        <div className="pt-4 pb-8">
          <div className="max-w-7xl mx-auto px-8">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-center text-white mt-0">
              Liquidity Scanner
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
                <LiquiditySearch
                  address={address}
                  setAddress={setAddress}
                  chain={chain}
                  setChain={setChain}
                  loading={loading}
                  fetchScan={fetchTokenData}
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
              alignItems: 'start'
            }}>
              {/* Left Column: Token Overview (Name, Icon, Liquidity only) */}
              <div>
                <div style={{ marginTop: '-6px', width: '100%', maxWidth: '100%', boxSizing: 'border-box', padding: '0 ' }}>
                  <div style={{ backgroundColor: '#141416', borderRadius: '36px', padding: '20px', marginBottom: '16px' }}>
                    <div style={{ borderRadius: '36px', paddingTop: '12px', paddingBottom: '12px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '8px', paddingTop: '8px' }}>
                        <span style={{
                          fontSize: 'clamp(1.4rem, 2vw, 1.8rem)',
                          fontWeight: '700',
                          color: '#fff',
                          textTransform: 'capitalize',
                          marginTop: '-30px',
                          textAlign: 'center',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          maxWidth: '100%'
                        }}>
                          {truncateTokenName(tokenData.token?.name, 20)}
                        </span>
                        <span style={{
                          fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)',
                          fontWeight: '500',
                          color: '#8ca714ff',
                          marginTop: '4px',
                          marginBottom: '40px'
                        }}>
                          ${tokenData.token?.symbol || 'N/A'}
                        </span>

                        {/* SVG + Water Animation */}
                        <div style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: '100%',
                          height: '150px',
                          marginBottom: '40px',
                          position: 'relative'
                        }}>
                          <svg
                            width="150"
                            height="150"
                            viewBox="0 0 30 42"
                            style={{
                              zIndex: 2,
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-75px, -78px)',
                              maxWidth: '100%',
                              height: 'auto'
                            }}
                          >
                            <path
                              fill="transparent"
                              d="m13.552735,2.0426703 q1.5,3.7999997 10,14.9999997 a12.8,12.8 0 1 1 -20.0000007,0 Q12.052736,5.84267 13.552735,2.0426703Z"
                              stroke="#ffffff"
                              strokeWidth={1.3}
                            />
                          </svg>

                          <div style={{
                            height: '96px',
                            width: '88px',
                            overflow: 'hidden',
                            borderRadius: '50px',
                            position: 'relative',
                            marginTop: '14px',
                            left: '-5px'
                          }}>
                            <motion.div
                              initial={{ rotate: 0, top: '60%' }}
                              animate={{ rotate: 360, top: '42%' }}
                              transition={{
                                rotate: { duration: 5, repeat: Infinity, ease: 'linear', repeatType: 'loop' },
                                top: { duration: 5, ease: 'linear' }
                              }}
                              style={{
                                backgroundColor: '#5bd6ffff',
                                position: 'absolute',
                                height: '200%',
                                width: '200%',
                                borderRadius: '38px',
                                left: '-50%'
                              }}
                            />
                          </div>
                        </div>

                        <div style={{ textAlign: 'center' }}>
                          <span style={{
                            color: '#fff',
                            fontSize: 'clamp(1rem, 2vw, 1.4rem)',
                            fontWeight: '600',
                            marginBottom: '4px',
                            display: 'block'
                          }}>
                            {(() => {
                              const totalLiquidity = tokenData.topPools?.reduce((sum, pool) => sum + pool.liquidityUSD, 0) || 0;
                              if (typeof totalLiquidity === 'number') {
                                if (totalLiquidity >= 1000000) return `$${(totalLiquidity / 1000000).toFixed(2)}M`;
                                if (totalLiquidity >= 1000) return `$${(totalLiquidity / 1000).toFixed(2)}K`;
                                return totalLiquidity.toLocaleString();
                              }
                              return totalLiquidity || 'N/A';
                            })()}
                          </span>
                          <span style={{
                            color: '#ccc',
                            fontSize: 'clamp(0.8rem, 1.5vw, 1rem)',
                            fontWeight: '500'
                          }}>
                            Total Liquidity (USD)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
      
            </div>
            
            {/* Right Column: Search + Risk + Pool Info */}
            <div>
              {/* Search Bar */}
              <div style={{ marginBottom: '24px' }}>
                <LiquiditySearch
                  address={address}
                  setAddress={setAddress}
                  chain={chain}
                  setChain={setChain}
                  loading={loading}
                  fetchScan={fetchTokenData}
                  hasSearched={hasSearched}
                  error={error}
                />
              </div>

              {/* Risk & Stability Section */}
              {tokenData && (
                <>
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <div style={{
                        flex: 1, minWidth: '140px', backgroundColor: '#1c1c1f',
                        padding: '14px', borderRadius: '18px', display: 'flex',
                        flexDirection: 'column', justifyContent: 'center'
                      }}>
                        <span style={{ fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)', color: '#ccc' }}>
                          Risk Level
                        </span>
                        <span style={{
                          fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)',
                          fontWeight: '600',
                          color: (() => {
                            const labelRaw = (tokenData.token?.riskLevel || '').split('—')[0]?.trim() || 'N/A';
                            const label = labelRaw.replace(/^[^a-zA-Z0-9]+/, '').trim();
                            if (label === 'High Risk') return '#ff4d4d';
                            else if (label === 'Medium Risk') return '#ff9900';
                            else if (label === 'Elevated Risk') return '#c1ae43ff';
                            else if (label === 'Moderate Risk') return '#89e14fff';
                            return '#ccc';
                          })()
                        }}>
                          {(() => {
                            const labelRaw = (tokenData.token?.riskLevel || '').split('—')[0]?.trim() || 'N/A';
                            return labelRaw.replace(/^[^a-zA-Z0-9]+/, '').trim();
                          })()}
                        </span>
                      </div>
                      <div style={{
                        flex: 1, minWidth: '140px', backgroundColor: '#1c1c1f',
                        padding: '14px', borderRadius: '18px', display: 'flex',
                        flexDirection: 'column', justifyContent: 'center'
                      }}>
                        <span style={{ fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)', color: '#ccc' }}>
                          Price Stability
                        </span>
                        <span style={{
                          fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)',
                          color: '#fff',
                          fontWeight: '600'
                        }}>
                          {tokenData.token?.priceStabilityScore || 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pool Info Section */}
                  <div>
                    <span style={{
                      color: '#CCFF00be',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      marginBottom: '12px',
                      letterSpacing: '1px',
                      display: 'block'
                    }}>
                      POOL INFO
                    </span>
                    <div style={{
                      backgroundColor: '#141416',
                      borderRadius: '12px',
                      padding: '21px'
                    }}>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '11px',
                      }}>
                      <div style={{
                        backgroundColor: '#000',
                        borderRadius: '12px',
                        padding: '12px',
                        minHeight: '50px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                      }}>
                        <div style={{ color: '#ccc', fontSize: '0.75rem', marginBottom: '4px' }}>
                          Total Supply
                        </div>
                        <div style={{ color: '#fff', fontSize: '0.95rem', fontWeight: '600' }}>
                          {(() => {
                            const value = tokenData.token?.totalSupply;
                            if (typeof value === 'number') {
                              if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
                              if (value >= 1000) return `$${(value / 1000).toFixed(2)}K`;
                              return value.toLocaleString();
                            }
                            return value || 'N/A';
                          })()}
                        </div>
                      </div>
                      
                      <div style={{
                        backgroundColor: '#000',
                        borderRadius: '12px',
                        padding: '12px',
                        minHeight: '50px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                      }}>
                        <div style={{ color: '#ccc', fontSize: '0.75rem', marginBottom: '4px' }}>
                          Market Cap
                        </div>
                        <div style={{ color: '#fff', fontSize: '0.95rem', fontWeight: '600' }}>
                          {(() => {
                            const value = tokenData.token?.marketCap;
                            if (typeof value === 'number') {
                              if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
                              if (value >= 1000) return `$${(value / 1000).toFixed(2)}K`;
                              return value.toLocaleString();
                            }
                            return value || 'N/A';
                          })()}
                        </div>
                      </div>
                      
                      <div style={{
                        backgroundColor: '#000',
                        borderRadius: '12px',
                        padding: '12px',
                        minHeight: '50px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                      }}>
                        <div style={{ color: '#ccc', fontSize: '0.75rem', marginBottom: '4px' }}>
                          Price USD
                        </div>
                        <div style={{ color: '#fff', fontSize: '0.95rem', fontWeight: '600' }}>
                          {tokenData.token?.priceUsd ? 
                            `$${Number(tokenData.token.priceUsd).toFixed(6)}` : 
                            'N/A'
                          }
                        </div>
                      </div>
                      
                      <div style={{
                        backgroundColor: '#000',
                        borderRadius: '12px',
                        padding: '12px',
                        minHeight: '50px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                      }}>
                        <div style={{ color: '#ccc', fontSize: '0.75rem', marginBottom: '4px' }}>
                          {chain === 'Solana' ? '24 Hour Volume' : 'Holders'}
                        </div>
                        <div style={{ color: '#fff', fontSize: '0.95rem', fontWeight: '600' }}>
                          {chain === 'Solana' 
                            ? (tokenData.token?.volume24h 
                                ? `$${(tokenData.token.volume24h >= 1000000 
                                    ? (tokenData.token.volume24h / 1000000).toFixed(2) + 'M' 
                                    : tokenData.token.volume24h >= 1000 
                                      ? (tokenData.token.volume24h / 1000).toFixed(2) + 'K' 
                                      : tokenData.token.volume24h.toLocaleString())}` 
                                : 'N/A')
                            : (tokenData.token?.holdersCount?.toLocaleString() || 'N/A')
                          }
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          )}

          {/* Middle Section: LP Holders + Pools vs Token Metrics */}
          {tokenData && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '60px',
              marginTop: '24px',
              marginBottom: '32px'
            }}>
              {/* Left Column: Token Metrics */}
              <div>
                <LiquidityDetails 
                  tokenData={tokenData} 
                  handleOpenUrl={handleOpenUrl}
                  showOnlyMetrics={true}
                />
              </div>
              
              {/* Right Column: LP Holders Only */}
              <div>
                {/* TOP 10 LP HOLDERS - Original Size */}
                <div style={{ marginBottom: '32px' }}>
                  <LiquidityHolders holders={tokenData.token.topHolders} />
                </div>
              </div>
            </div>
          )}

          {/* Bottom Section: Full Width Pooled Tokens and Top Liquidity Pools */}
          {tokenData && (
            <div style={{
              width: '100%',
              marginTop: '32px'
            }}>
              <LiquidityDetails 
                tokenData={tokenData} 
                handleOpenUrl={handleOpenUrl}
                showOnlyPoolsAndTokens={true}
              />
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiquidityScanner;
