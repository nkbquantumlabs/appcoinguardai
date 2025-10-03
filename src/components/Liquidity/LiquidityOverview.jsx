import React from 'react';
import { motion } from 'framer-motion';

const LiquidityOverview = ({ tokenData, chain }) => {
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
    tokenData.topPools?.reduce((sum, pool) => sum + pool.liquidityUSD, 0) || 0;

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
    tokenData.token?.riskLevel
  );
  const priceStability = tokenData.token?.priceStabilityScore || 'N/A';

  return (
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
              Price Stability
            </span>
            <span style={{
              fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)',
              color: '#fff',
              fontWeight: '600'
            }}>
              {priceStability}
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
          display: 'block'
        }}>
          POOL INFO
        </span>
        <div style={{
          backgroundColor: '#141416',
          borderRadius: '12px',
          padding: '16px'
        }}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
            <InfoCard label="Total Supply" value={formatValue(tokenData.token?.totalSupply)} />
            <InfoCard label="Market Cap" value={formatValue(tokenData.token?.marketCap)} />
          </div>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
            <InfoCard label="Price USD" value={tokenData.token?.priceUsd ? `$${Number(tokenData.token.priceUsd).toFixed(6)}` : 'N/A'} />
            {chain === 'Solana' ? (
              <InfoCard label="24 Hour Volume" value={formatValue(tokenData.token?.volume24h)} />
            ) : (
              <InfoCard label="Holders" value={tokenData.token?.holdersCount?.toLocaleString() || 'N/A'} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ label, value }) => (
  <div style={{
    flex: 1, minWidth: '140px', backgroundColor: '#000',
    borderRadius: '12px', padding: '12px', height: '60px',
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
      fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)',
      fontWeight: '500'
    }}>
      {value}
    </span>
  </div>
);

export default LiquidityOverview;
