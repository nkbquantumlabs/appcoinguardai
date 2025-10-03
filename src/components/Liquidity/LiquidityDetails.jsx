import React, { useState } from 'react';
// No import needed! Can use copyToClipboard() or navigator.clipboard.writeText() - both show alerts!

const LiquidityDetails = ({ tokenData, showOnlyPoolsAndTokens = false, showOnlyMetrics = false }) => {

  
  const [activeTimeframe, setActiveTimeframe] = useState('24h');
  const [visiblePoolsCount, setVisiblePoolsCount] = useState(2);
  const [poolTimeframes, setPoolTimeframes] = useState({});
  const formatValue = (value, isPrice = false) => {
    if (value == null) return 'N/A';
    if (typeof value === 'number') {
      if (isPrice) return `$${value.toFixed(6)}`;
      if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
      if (value >= 1000) return `$${(value / 1000).toFixed(2)}K`;
      return value.toLocaleString();
    }
    return value.toString();
  };

  const formatTokenAmount = (amount) => {
    if (amount == null) return 'N/A';
    const num = Number(amount);
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
    return num.toFixed(2);
  };

  const formatPercent = (val) => {
    if (val == null) return 'N/A';
    const color = val >= 0 ? '#4CAF50' : '#F44336';
    return (
      <span style={{ color, fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)' }}>
        {val.toFixed(2)}%
      </span>
    );
  };

  const handleOpenUrl = (url) => {
    window.open(url, '_blank');
  };

  const getTimeframeData = (pool, timeframe) => {
    switch (timeframe) {
      case '1h':
        return {
          priceChange: pool.priceChange1h,
          buys: pool.txns1hBuys,
          sells: pool.txns1hSells,
          volume: pool.volume1h
        };
      case '6h':
        return {
          priceChange: pool.priceChange6h,
          buys: pool.txns6hBuys,
          sells: pool.txns6hSells,
          volume: pool.volume6h
        };
      case '24h':
      default:
        return {
          priceChange: pool.priceChange24h,
          buys: pool.txns24hBuys,
          sells: pool.txns24hSells,
          volume: pool.volume24h
        };
    }
  };

  const getPoolTimeframe = (poolIndex) => {
    return poolTimeframes[poolIndex] || '24h';
  };

  const setPoolTimeframe = (poolIndex, timeframe) => {
    setPoolTimeframes(prev => ({
      ...prev,
      [poolIndex]: timeframe
    }));
  };

  const TimeframeTabs = ({ poolIndex = null }) => (
    <div style={{
      display: 'flex',
      gap: '4px',
      marginBottom: '12px',
      backgroundColor: 'rgba(255,255,255,0.05)',
      borderRadius: '8px',
      padding: '4px',
    }}>
      {['1h', '6h', '24h'].map((timeframe) => {
        const isActive = poolIndex !== null 
          ? getPoolTimeframe(poolIndex) === timeframe 
          : activeTimeframe === timeframe;
        
        return (
          <button
            key={timeframe}
            onClick={() => {
              if (poolIndex !== null) {
                setPoolTimeframe(poolIndex, timeframe);
              } else {
                setActiveTimeframe(timeframe);
              }
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: isActive ? '#CCFF00be' : 'transparent',
              color: isActive ? '#000' : '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.85rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {timeframe.toUpperCase()}
          </button>
        );
      })}
    </div>
  );

  const sections = [];

  // Add TOKEN METRICS section only if showOnlyMetrics is true or no filtering is applied
  if (showOnlyMetrics || (!showOnlyPoolsAndTokens && !showOnlyMetrics)) {
    sections.push({
      title: 'TOKEN METRICS',
      items: [
        { label: 'Total Transfers', value: tokenData.token?.totalTransfers?.toLocaleString() || 'N/A' },
        { label: 'Whale Ownership', value: `${tokenData.token?.percentWhaleOwned?.toFixed(2)}%` },
        { label: 'Renounced Ownership', value: tokenData.token?.isRenounced ? 'Yes' : 'No' },
        {
          label: 'Launch Date',
          value: tokenData.token?.launchDate
            ? new Date(tokenData.token?.launchDate).toLocaleDateString("en-US",{ year: "numeric", month: "short", day: "numeric" })
            : 'N/A',
        },
        { label: 'Circulating Supply', value: formatValue(tokenData.token?.circulatingSupply) },
        { label: 'Liquidity Score', value: tokenData.token?.liquidityScore?.toFixed(1) || 'N/A' },
      ],
    });
  }

  // Add TOP LIQUIDITY POOLS section only if showOnlyPoolsAndTokens is true or no filtering is applied
  if ((showOnlyPoolsAndTokens || (!showOnlyPoolsAndTokens && !showOnlyMetrics)) && tokenData.topPools && tokenData.topPools.length > 0) {
    sections.push({
      title: 'TOP LIQUIDITY POOLS',
      isCustom: true,
      customContent: (
        <div>
          {/* Timeframe Tabs for mobile only - affects all pools */}
          <div style={{ display: window.innerWidth >= 1024 ? 'none' : 'block' }}>
            <div style={{
              display: 'flex',
              gap: '4px',
              marginBottom: '12px',
              backgroundColor: 'rgba(255,255,255,0.05)',
              borderRadius: '8px',
              padding: '4px',
            }}>
              {['1h', '6h', '24h'].map((timeframe) => (
                <button
                  key={timeframe}
                  onClick={() => {
                    // Set timeframe for all visible pools on mobile
                    setActiveTimeframe(timeframe);
                    for (let i = 0; i < visiblePoolsCount; i++) {
                      setPoolTimeframe(i, timeframe);
                    }
                  }}
                  style={{
                    flex: '1',
                    padding: '8px 16px',
                    backgroundColor: activeTimeframe === timeframe ? '#CCFF00be' : 'transparent',
                    color: activeTimeframe === timeframe ? '#000' : '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'center',
                    minWidth: '0',
                  }}
                >
                  {timeframe.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          
          {tokenData.topPools.slice(0, visiblePoolsCount).map((pool, poolIndex) => {
            const poolTimeframe = getPoolTimeframe(poolIndex);
            const timeframeData = getTimeframeData(pool, poolTimeframe);
            return (
              <div
                key={poolIndex}
                style={{
                  backgroundColor: 'transparent',
                  borderRadius: '8px',
                  padding: 0,
                  border: 'none',
                  cursor: pool.pairUrl ? 'pointer' : 'default',
                  textAlign: 'left',
                  width: '100%',
                  marginBottom: '12px',
                }}
                onClick={() => pool.pairUrl && handleOpenUrl(pool.pairUrl)}
              >
                <div style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderRadius: '15px',
                  padding: '12px',
                }}>
                  {/* Header with Timeframe Tabs on Desktop */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{
                      color: '#fff',
                      fontSize: 'clamp(0.8rem, 1.4vw, 1rem)',
                      fontWeight: '600',
                    }}>
                      {pool.dex.toUpperCase()}: {pool.pair}
                    </span>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {/* Timeframe Tabs on Desktop - Top Right of each container */}
                      {window.innerWidth >= 1024 && (
                        <div style={{
                          display: 'flex',
                          gap: '2px',
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          borderRadius: '6px',
                          padding: '2px',
                        }}>
                          {['1H', '6H', '24H'].map((timeframe) => (
                            <button
                              key={timeframe}
                              onClick={(e) => {
                                e.stopPropagation();
                                setPoolTimeframe(poolIndex, timeframe.toLowerCase());
                              }}
                              style={{
                                padding: '4px 8px',
                                backgroundColor: poolTimeframe === timeframe.toLowerCase() ? '#CCFF00be' : 'transparent',
                                color: poolTimeframe === timeframe.toLowerCase() ? '#000' : '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '0.7rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                              }}
                            >
                              {timeframe}
                            </button>
                          ))}
                        </div>
                      )}
                      
                      {pool.pairUrl && (
                        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(0.9rem, 1.4vw, 1rem)' }}>↗</span>
                      )}
                    </div>
                  </div>
                  
                  <div style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)',
                    marginBottom: '12px'
                  }}>
                    Liquidity: {formatValue(pool.liquidityUSD)}
                  </div>

                  {/* Compact Data Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                    gap: '8px',
                  }}>
                    <div style={{
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      borderRadius: '8px',
                      padding: '8px',
                    }}>
                      <div style={{ color: '#fff', fontSize: 'clamp(0.65rem, 0.9vw, 0.75rem)', fontWeight: '600' }}>
                        Price Change
                      </div>
                      <div style={{ marginTop: '4px' }}>
                        {formatPercent(timeframeData.priceChange)}
                      </div>
                    </div>

                    <div style={{
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      borderRadius: '8px',
                      padding: '8px',
                    }}>
                      <div style={{ color: '#fff', fontSize: 'clamp(0.65rem, 0.9vw, 0.75rem)', fontWeight: '600' }}>
                        Volume
                      </div>
                      <div style={{ color: '#fff', fontSize: 'clamp(0.7rem, 1vw, 0.85rem)', marginTop: '4px' }}>
                        {formatValue(timeframeData.volume)}
                      </div>
                    </div>

                    <div style={{
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      borderRadius: '8px',
                      padding: '8px',
                    }}>
                      <div style={{ color: '#fff', fontSize: 'clamp(0.65rem, 0.9vw, 0.75rem)', fontWeight: '600' }}>
                        Buys / Sells
                      </div>
                      <div style={{ color: '#fff', fontSize: 'clamp(0.7rem, 1vw, 0.85rem)', marginTop: '4px' }}>
                        {timeframeData.buys} / {timeframeData.sells}
                      </div>
                    </div>

                    <div style={{
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      borderRadius: '8px',
                      padding: '8px',
                    }}>
                      <div style={{ color: '#fff', fontSize: 'clamp(0.65rem, 0.9vw, 0.75rem)', fontWeight: '600' }}>
                        Price (USD)
                      </div>
                      <div style={{ color: '#fff', fontSize: 'clamp(0.7rem, 1vw, 0.85rem)', marginTop: '4px' }}>
                        {formatValue(parseFloat(pool.price), true)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Show More / View Less Button */}
          {tokenData.topPools.length > 2 && (
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <button
                onClick={() => {
                  if (visiblePoolsCount >= tokenData.topPools.length) {
                    // If showing all, go back to 2
                    setVisiblePoolsCount(2);
                  } else {
                    // Show 2 more (increment by 2)
                    setVisiblePoolsCount(prev => Math.min(prev + 2, tokenData.topPools.length));
                  }
                }}
                style={{
                  backgroundColor: 'transparent',
                  color: visiblePoolsCount >= tokenData.topPools.length ? '#ff4d4d' : '#CCFF00be',
                  border: visiblePoolsCount >= tokenData.topPools.length ? '1px solid #ff4d4d' : '1px solid #CCFF00be',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {visiblePoolsCount >= tokenData.topPools.length ? 'View Less' : 'Show More'}
              </button>
            </div>
          )}
        </div>
      )
    });
  }

  // Add pooled tokens section if available
  const pooledTokens = tokenData.pooledTokens || 
                      tokenData.token?.pooledTokens || 
                      tokenData.liquidity?.pooledTokens ||
                      (tokenData.topPools && tokenData.topPools[0]?.pooledTokens);
  
  // Add POOLED TOKENS section only if showOnlyPoolsAndTokens is true or no filtering is applied
  if ((showOnlyPoolsAndTokens || (!showOnlyPoolsAndTokens && !showOnlyMetrics)) && pooledTokens && pooledTokens.length > 0) {
    sections.push({
      title: 'POOLED TOKENS',
      isCustom: true,
      customContent: (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '12px',
        }}>
          {pooledTokens.map((token, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: '15px',
                padding: '16px',
              }}
            >
              {/* Token Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px',
              }}>
                <span style={{
                  color: '#fff',
                  fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)',
                  fontWeight: '600',
                }}>
                  {token.symbol || `Token ${index + 1}`}
                </span>
                <span style={{
                  color: '#CCFF00be',
                  fontSize: 'clamp(0.8rem, 1.2vw, 1rem)',
                  fontWeight: '600',
                }}>
                  {formatValue(token.usd)}
                </span>
              </div>

              {/* Compact Data Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
              }}>
                <div style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderRadius: '8px',
                  padding: '8px',
                }}>
                  <div style={{ 
                    color: '#fff', 
                    fontSize: 'clamp(0.65rem, 0.9vw, 0.75rem)', 
                    fontWeight: '600',
                    marginBottom: '4px'
                  }}>
                    Amount
                  </div>
                  <div style={{ 
                    color: '#fff', 
                    fontSize: 'clamp(0.7rem, 1vw, 0.85rem)', 
                    fontWeight: '600'
                  }}>
                    {formatTokenAmount(token.amount)}
                  </div>
                </div>

                <div style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderRadius: '8px',
                  padding: '8px',
                }}>
                  <div style={{ 
                    color: '#fff', 
                    fontSize: 'clamp(0.65rem, 0.9vw, 0.75rem)', 
                    fontWeight: '600',
                    marginBottom: '4px'
                  }}>
                    Full Amount
                  </div>
                  <div style={{ 
                    color: '#fff', 
                    fontSize: 'clamp(0.7rem, 1vw, 0.85rem)', 
                    fontWeight: '600'
                  }}>
                    {Number(token.amount).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Address Section */}
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: '8px',
                padding: '8px',
                marginTop: '8px',
                cursor: 'pointer',
              }}
              onClick={() => navigator.clipboard.writeText(token.address)}>
                <div style={{ 
                  color: '#fff', 
                  fontSize: 'clamp(0.65rem, 0.9vw, 0.75rem)', 
                  fontWeight: '600',
                  marginBottom: '4px'
                }}>
                  Contract Address (Click to Copy)
                </div>
                <div style={{ 
                  color: '#fff', 
                  fontSize: 'clamp(0.65rem, 0.9vw, 0.75rem)', 
                  fontFamily: 'monospace',
                  wordBreak: 'break-all'
                }}>
                  {`${token.address.slice(0, 8)}...${token.address.slice(-8)}`}
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    });
  }

  return (
    <div style={{ width: '100%', overflowY: 'auto' }}>
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} style={{ marginBottom: '32px' }}>
          <span style={{
            color: '#CCFF00be',
            fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
            fontWeight: '600',
            marginBottom: '16px',
            letterSpacing: '1px',
            display: 'block',
          }}>{section.title}</span>
          
          {section.isCustom ? (
            section.customContent
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {section.items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  style={{
                    backgroundColor: 'transparent',
                    borderRadius: '8px',
                    padding: 0,
                    border: 'none',
                    cursor: item.url ? 'pointer' : 'default',
                    textAlign: 'left',
                    width: '100%',
                  }}
                  onClick={() => item.url && handleOpenUrl(item.url)}
                >
                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    padding: '12px',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    borderRadius: '15px',
                  }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <span style={{
                        color: '#fff',
                        fontSize: 'clamp(0.7rem, 1.1vw, 0.85rem)',
                        fontWeight: '500',
                        marginBottom: '4px'
                      }}>{item.label}</span>
                      <span style={{
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontSize: 'clamp(0.65rem, 0.9vw, 0.75rem)'
                      }}>{item.value}</span>
                    </div>
                    {item.url && (
                      <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(0.9rem, 1.4vw, 1rem)' }}>↗</span>
                    )}
                  </div>
                  {item.extraContent && <div>{item.extraContent}</div>}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LiquidityDetails;
