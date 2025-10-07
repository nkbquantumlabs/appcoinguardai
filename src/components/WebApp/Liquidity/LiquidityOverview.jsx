import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LiquiditySearch from './LiquiditySearch';

const LiquidityOverview = ({ 
  tokenData, 
  chain, 
  address, 
  setAddress, 
  setChain, 
  loading, 
  fetchScan, 
  hasSearched, 
  error,
  showOnlySearch = false,
  showOnlyTokenInfo = false,
  showOnlyRiskAndPool = false,
  showOnlyTokenMetrics = false
}) => {
  // Hook to detect screen size for responsive behavior
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 425);
      setIsMediumScreen(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
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

  const totalLiquidity =
    tokenData?.topPools?.reduce((sum, pool) => sum + pool.liquidityUSD, 0) || 0;

  const getRiskLabel = (text = '') => {
    const labelRaw = text.split('—')[0]?.trim() || 'N/A';
    const label = labelRaw.replace(/^[^a-zA-Z0-9]+/, '').trim();

    let color = '#ccc';
    if (label === 'High Risk') color = '#ff4d4d';
    else if (label === 'Medium Risk') color = '#ff9900';
    else if (label === 'Elevated Risk') color = '#c1ae43ff';
    else if (label === 'Moderate Risk') color = '#89e14fff';

    return { label, color };
  };

  const { label: riskLevelLabel, color: riskColor } = getRiskLabel(
    tokenData?.token?.riskLevel
  );

  // Show only search component
  if (showOnlySearch) {
    return (
      <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box', padding: '0 ' }}>
        <LiquiditySearch
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
    );
  }

  // Show only token info (name, symbol, liquidity animation)
  if (showOnlyTokenInfo && tokenData) {
    return (
      <div style={{ marginTop: '-6px', width: '100%', maxWidth: '100%', boxSizing: 'border-box', padding: '0 ' }}>
      <div style={{ backgroundColor: '#141416', borderRadius: '36px', padding: '30px 20px', marginBottom: '16px', height: 'auto', minHeight: '450px', display: 'flex', alignItems: 'center' }}>
        <div style={{ borderRadius: '36px', paddingTop: '12px', paddingBottom: '12px', width: '100%' }}>
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
              maxWidth: '280px',
              display: 'block'
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
                {formatValue(totalLiquidity)}
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
    );
  }

  // Show only risk and pool info
  if (showOnlyRiskAndPool && tokenData) {
    return (
      <div style={{ marginTop: '-6px', width: '100%', maxWidth: '100%', boxSizing: 'border-box', padding: '0 ' }}>
        {/* Risk & Stability Section */}
      <div style={{ marginBottom: '20px' }}>
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
              color: riskColor
            }}>
              {riskLevelLabel}
            </span>
          </div>
          <div style={{
            flex: 1, minWidth: '140px', backgroundColor: '#1c1c1f',
            padding: '14px', borderRadius: '18px', display: 'flex',
            flexDirection: 'column', justifyContent: 'center'
          }}>
            <span style={{ fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)', color: '#ccc' }}>
              Liquidity Score
            </span>
            <span style={{
              fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)',
              color: '#fff',
              fontWeight: '600'
            }}>
              {tokenData.token?.liquidityScore?.toFixed(1) || 'N/A'}
            </span>
          </div>
        </div>
      </div>

      {/* Token Overview Section */}
      <div style={{ marginBottom: '16px' }}>
        <span style={{
          color: '#CCFF00be',
          fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
          fontWeight: '600',
          marginBottom: '16px',
          letterSpacing: '1px',
          display: 'block',
          fontFamily: 'inherit',
          textTransform: 'none',
          lineHeight: 'normal',
        }}>
          POOL INFO
        </span>
        <div style={{
          backgroundColor: '#141416',
          borderRadius: '12px',
          padding: '24px',
          minHeight: '160px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px'
          }}>
            <InfoCard label="Total Supply" value={formatValue(tokenData.token?.totalSupply)} />
            <InfoCard label="Market Cap" value={formatValue(tokenData.token?.marketCap)} />
            <CreatorAddressCard creatorAddress={tokenData.token?.creatorAddress} />
            <InfoCard label="Price USD" value={tokenData.token?.priceUsd ? `$${Number(tokenData.token.priceUsd).toFixed(6)}` : 'N/A'} />
          </div>
        </div>
      </div>
      </div>
    );
  }

  // Show only TOKEN METRICS
  if (showOnlyTokenMetrics && tokenData) {
    return (
      <div style={{ marginTop: '-6px', width: '100%', maxWidth: '100%', boxSizing: 'border-box', padding: '0 ' }}>
        {/* TOKEN METRICS - Horizontal Layout */}
      <div style={{ marginTop: '24px' }}>
        <span style={{
          color: '#CCFF00be',
          fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
          fontWeight: '600',
          marginBottom: '16px',
          letterSpacing: '1px',
          display: 'block'
        }}>
          TOKEN METRICS
        </span>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMediumScreen ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          {/* Total Transfers */}
          <div style={{
            flex: 1, minWidth: '140px', backgroundColor: 'rgba(255,255,255,0.05)',
            borderRadius: '12px', padding: '20px', height: '80px',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            alignItems: isMediumScreen ? 'flex-start' : 'center'
          }}>
            <span style={{
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)',
              marginBottom: '2px',
              textAlign: isMediumScreen ? 'left' : 'center'
            }}>
              Total Transfers
            </span>
            <span style={{
              color: '#fff',
              fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)',
              fontWeight: '500',
              textAlign: isMediumScreen ? 'left' : 'center'
            }}>
              {tokenData?.token?.totalTransfers?.toLocaleString() || 'N/A'}
            </span>
          </div>

          {/* Launch Date */}
          <div style={{
            flex: 1, minWidth: '140px', backgroundColor: 'rgba(255,255,255,0.05)',
            borderRadius: '12px', padding: '20px', height: '80px',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            alignItems: isMediumScreen ? 'flex-start' : 'center'
          }}>
            <span style={{
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)',
              marginBottom: '2px',
              textAlign: isMediumScreen ? 'left' : 'center'
            }}>
              Launch Date
            </span>
            <span style={{
              color: '#fff',
              fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)',
              fontWeight: '500',
              textAlign: isMediumScreen ? 'left' : 'center'
            }}>
              {tokenData?.token?.launchDate
                ? new Date(tokenData?.token?.launchDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
                : 'N/A'}
            </span>
          </div>

          {/* Holders */}
          <div style={{
            flex: 1, minWidth: '140px', backgroundColor: 'rgba(255,255,255,0.05)',
            borderRadius: '12px', padding: '20px', height: '80px',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            alignItems: isMediumScreen ? 'flex-start' : 'center'
          }}>
            <span style={{
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)',
              marginBottom: '2px',
              textAlign: isMediumScreen ? 'left' : 'center'
            }}>
              Holders
            </span>
            <span style={{
              color: '#fff',
              fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)',
              fontWeight: '500',
              textAlign: isMediumScreen ? 'left' : 'center'
            }}>
              {tokenData?.token?.holdersCount?.toLocaleString() || 'N/A'}
            </span>
          </div>
        </div>
      </div>
      </div>
    );
  }

  // Default return - show everything (for mobile and when no specific section is requested)
  return (
    <div style={{ marginTop: '-6px', width: '100%', maxWidth: '100%', boxSizing: 'border-box', padding: '0 ' }}>
      {/* Search Component */}
      <div style={{ marginBottom: '24px' }}>
        <LiquiditySearch
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

      {/* Only render token info if tokenData exists */}
      {tokenData && (
        <>
          {/* Token Info */}
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
                  maxWidth: '280px',
                  display: 'block'
                }}>
                  {truncateTokenName(tokenData?.token?.name, 20)}
                </span>
                <span style={{
                  fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)',
                  fontWeight: '500',
                  color: '#8ca714ff',
                  marginTop: '4px',
                  marginBottom: '40px'
                }}>
                  ${tokenData?.token?.symbol || 'N/A'}
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
                    {formatValue(totalLiquidity)}
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

          {/* Risk & Stability Section */}
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
                  color: riskColor
                }}>
                  {riskLevelLabel}
                </span>
              </div>
              <div style={{
                flex: 1, minWidth: '140px', backgroundColor: '#1c1c1f',
                padding: '14px', borderRadius: '18px', display: 'flex',
                flexDirection: 'column', justifyContent: 'center'
              }}>
                <span style={{ fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)', color: '#ccc' }}>
                  Liquidity Score
                </span>
                <span style={{
                  fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)',
                  color: '#fff',
                  fontWeight: '600'
                }}>
                  {tokenData?.token?.liquidityScore?.toFixed(1) || 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Token Overview Section */}
          <div style={{ marginBottom: '24px' }}>
            <span style={{
              color: '#CCFF00be',
              fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
              fontWeight: '600',
              marginBottom: '16px',
              letterSpacing: '1px',
              display: 'block',
              fontFamily: 'inherit',
              textTransform: 'none',
              lineHeight: 'normal',
            }}>
              POOL INFO
            </span>
            <div style={{
              backgroundColor: '#141416',
              borderRadius: '12px',
              padding: '18px',
              minHeight: '140px'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isSmallScreen ? '1fr' : 'repeat(2, 1fr)',
                gap: '12px'
              }}>
                <InfoCard label="Total Supply" value={formatValue(tokenData?.token?.totalSupply)} />
                <InfoCard label="Market Cap" value={formatValue(tokenData?.token?.marketCap)} />
                <CreatorAddressCard creatorAddress={tokenData?.token?.creatorAddress} />
                <InfoCard label="Price USD" value={tokenData?.token?.priceUsd ? `$${Number(tokenData?.token?.priceUsd).toFixed(6)}` : 'N/A'} />
              </div>
            </div>
          </div>

          {/* TOKEN METRICS - Horizontal Layout */}
          <div style={{ marginTop: '24px', paddingBottom: '24px' }}>
            <span style={{
              color: '#CCFF00be',
              fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
              fontWeight: '600',
              marginBottom: '16px',
              letterSpacing: '1px',
              display: 'block'
            }}>
              TOKEN METRICS
            </span>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMediumScreen ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px'
            }}>
              {/* Total Transfers */}
              <div style={{
                flex: 1, minWidth: '140px', backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: '12px', padding: '20px', height: '80px',
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                alignItems: isMediumScreen ? 'flex-start' : 'center'
              }}>
                <span style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)',
                  marginBottom: '2px',
                  textAlign: isMediumScreen ? 'left' : 'center'
                }}>
                  Total Transfers
                </span>
                <span style={{
                  color: '#fff',
                  fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)',
                  fontWeight: '500',
                  textAlign: isMediumScreen ? 'left' : 'center'
                }}>
                  {tokenData?.token?.totalTransfers?.toLocaleString() || 'N/A'}
                </span>
              </div>

              {/* Launch Date */}
              <div style={{
                flex: 1, minWidth: '140px', backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: '12px', padding: '20px', height: '80px',
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                alignItems: isMediumScreen ? 'flex-start' : 'center'
              }}>
                <span style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)',
                  marginBottom: '2px',
                  textAlign: isMediumScreen ? 'left' : 'center'
                }}>
                  Launch Date
                </span>
                <span style={{
                  color: '#fff',
                  fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)',
                  fontWeight: '500',
                  textAlign: isMediumScreen ? 'left' : 'center'
                }}>
                  {tokenData?.token?.launchDate
                    ? new Date(tokenData?.token?.launchDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
                    : 'N/A'}
                </span>
              </div>

              {/* Holders */}
              <div style={{
                flex: 1, minWidth: '140px', backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: '12px', padding: '20px', height: '80px',
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                alignItems: isMediumScreen ? 'flex-start' : 'center'
              }}>
                <span style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)',
                  marginBottom: '2px',
                  textAlign: isMediumScreen ? 'left' : 'center'
                }}>
                  Holders
                </span>
                <span style={{
                  color: '#fff',
                  fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)',
                  fontWeight: '500',
                  textAlign: isMediumScreen ? 'left' : 'center'
                }}>
                  {tokenData?.token?.holdersCount?.toLocaleString() || 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const InfoCard = ({ label, value }) => (
  <div style={{
    flex: 1, minWidth: '140px', backgroundColor: '#000',
    borderRadius: '12px', padding: '14px', height: '73px',
    display: 'flex', flexDirection: 'column', justifyContent: 'center'
  }}>
    <span style={{
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)',
      marginBottom: '2px'
    }}>
      {label}
    </span>
    <span style={{
      color: '#fff',
      fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)',
      fontWeight: '500'
    }}>
      {value}
    </span>
  </div>
);

const CreatorAddressCard = ({ creatorAddress }) => {
  const handleCopy = async () => {
    if (creatorAddress) {
      try {
        await navigator.clipboard.writeText(creatorAddress);
        // You can add a toast notification here if needed
      } catch (err) {
        console.error('Failed to copy address:', err);
      }
    }
  };

  const formatAddress = (address) => {
    if (!address) return 'N/A';
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  return (
    <div 
      onClick={handleCopy}
      style={{
        flex: 1, minWidth: '140px', backgroundColor: '#000',
        borderRadius: '12px', padding: '14px', height: '73px',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        cursor: creatorAddress ? 'pointer' : 'default'
      }}
    >
      <span style={{
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)',
        marginBottom: '2px'
      }}>
        Creator Address {creatorAddress ? '' : ''}
      </span>
      <span style={{
        color: '#fff',
        fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)',
        fontWeight: '500',
        fontFamily: creatorAddress ? 'monospace' : 'inherit'
      }}>
        {formatAddress(creatorAddress)}
      </span>
    </div>
  );
};

export default LiquidityOverview;
