import React, { useState, useEffect } from "react";
import { FiExternalLink } from "react-icons/fi";

const colors = [
  '#FFC971', // brighter warm orange
  '#FF6F91', // richer coral pink
  '#9DFF8C', // lively mint green
  '#66E0FF', // vivid sky blue
  '#5BA0FF', // stronger azure
  '#9A7DFF', // bold violet
  '#FF9DFF', // glowing magenta
  '#F0F0F0', // clean platinum white-grey
  '#f4a12d', // juicy orange-yellow
];

const otherColor = '#87CEEB';

// Function to add transparency to a hex color
const addTransparency = (hex, alpha) => {
  // Remove # if present
  const cleanHex = hex.replace('#', '');
  // Convert alpha to hex (0-255 to 00-FF)
  const alphaHex = Math.round(alpha * 255).toString(16).padStart(2, '0');
  return `#${cleanHex}${alphaHex}`;
};

// Function to format balance in K, M, B, T
const formatBalance = (value) => {
  if (!isFinite(value)) return '—';
  const absValue = Math.abs(value);
  if (absValue >= 1e12) return `${(value / 1e12).toFixed(2)}T`;
  if (absValue >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
  if (absValue >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
  if (absValue >= 1e3) return `${(value / 1e3).toFixed(2)}K`;
  return value.toFixed(2);
};

const WhaleHoldings = ({ walletData, blockchain }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const tokenHoldings = walletData?.tokenHoldings || walletData?.holdings || [];
  const sortedHoldings = [...tokenHoldings]
    .map(token => ({
      ...token,
      numericValue: token.value || parseFloat(token.balance || '0'),
    }))
    .sort((a, b) => b.numericValue - a.numericValue);

  const totalValue = sortedHoldings.reduce((sum, t) => sum + t.numericValue, 0);

  // Function to get DexScreener URL based on blockchain
  const getDexScreenerUrl = (tokenAddress, blockchain) => {
    if (!tokenAddress) return null;
    const chain = blockchain?.toLowerCase();
    if (chain === 'solana' || chain === 'sol') {
      return `https://dexscreener.com/solana/${tokenAddress}`;
    } else if (chain === 'ethereum' || chain === 'eth') {
      return `https://dexscreener.com/ethereum/${tokenAddress}`;
    } else if (chain === 'bsc' || chain === 'binance') {
      return `https://dexscreener.com/bsc/${tokenAddress}`;
    }
    return `https://dexscreener.com/solana/${tokenAddress}`; // Default to Solana
  };

  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Dynamic max-width calculation based on screen size
  const getTokenNameMaxWidth = () => {
    if (screenWidth >= 1536) return '300px'; // 2xl screens
    if (screenWidth >= 1280) return '250px'; // xl screens
    if (screenWidth >= 1024) return '200px'; // lg screens
    if (screenWidth >= 768) return '160px';  // md screens
    if (screenWidth >= 640) return '140px';  // sm screens
    if (screenWidth >= 480) return '120px';  // xs screens
    return '100px'; // very small screens
  };

  // Determine if we should show ellipsis based on screen size and text length
  const shouldTruncate = (tokenName) => {
    if (!tokenName) return false;
    const maxWidth = parseInt(getTokenNameMaxWidth());
    // Rough estimation: 1 character ≈ 8-10px for the font size we're using
    const estimatedTextWidth = tokenName.length * 9;
    return estimatedTextWidth > maxWidth;
  };
  const displayedHoldings = sortedHoldings.slice(0, visibleCount);
  const showButton = sortedHoldings.length > 10;

  const handleViewMoreLess = () => {
    if (visibleCount >= sortedHoldings.length) {
      setVisibleCount(10);
    } else {
      setVisibleCount(prev => prev + 10);
    }
  };

  return (
    <div className="mb-6 px-0.5">
      {/* Updated heading to match Wallet Performance style */}
      <h2 className="text-[#CCFF00]/75 text-base font-semibold mb-4 tracking-wide">
        TOKEN HOLDINGS
      </h2>

      <div className="bg-[#141416] rounded-2xl p-4 shadow-lg">
        {sortedHoldings.length > 0 ? (
          <>
            {/* Desktop Table Headers */}
            {screenWidth >= 768 && (
              <div className="grid grid-cols-12 gap-4 items-center py-2 mb-3 border-b border-[#2A2A2E]">
                <div className="col-span-4 flex items-center">
                  <div className="w-2.5 h-2.5 mr-3 flex-shrink-0"></div>
                  <div className="text-[#888] text-xs font-semibold uppercase tracking-wide">
                    Token
                  </div>
                </div>
                <div className="col-span-5 text-center">
                  <div className="text-[#888] text-xs font-semibold uppercase tracking-wide">
                    Address
                  </div>
                </div>
                <div className="col-span-3 text-right">
                  <div className="text-[#888] text-xs font-semibold uppercase tracking-wide">
                    Balance
                  </div>
                </div>
              </div>
            )}
            
            {displayedHoldings.map((token, index) => {
              const color = index < 9 ? colors[index] : otherColor;
              const bal = token.numericValue;
              const percentage = totalValue > 0 ? (bal / totalValue) * 100 : 0;
              const backgroundColor = addTransparency(color, 0.2); // 20% opacity

              return (
              <div key={index}>
                <div className={`py-2 ${screenWidth >= 768 ? 'grid grid-cols-12 gap-4 items-center' : 'flex justify-between items-center'}`}>
                  {/* Token Section */}
                  <div className={`${screenWidth >= 768 ? 'col-span-4 flex items-center' : 'flex items-center flex-1'}`}>
                    <div 
                      className="w-2.5 h-2.5 rounded-full mr-3 flex-shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    
                    {/* Token Name & Symbol */}
                    <div className="min-w-0 flex-1">
                      <div 
                        className={`text-white font-semibold transition-all duration-200 ${
                          screenWidth < 768 ? 'text-sm' : 'text-[15px]'
                        } ${
                          shouldTruncate(token?.name) ? 'truncate' : ''
                        }`}
                        style={{
                          maxWidth: shouldTruncate(token?.name) ? getTokenNameMaxWidth() : 'none'
                        }}
                        title={token?.name ?? 'Unknown'}
                      >
                        {token?.name ?? 'Unknown'}
                      </div>
                      <div className={`text-[#888] mt-0.5 transition-all duration-200 ${
                        screenWidth < 768 ? 'text-xs' : 'text-[13px]'
                      }`}>
                        {token?.symbol ?? '—'}
                      </div>
                      {/* Address on mobile - keep stacked */}
                      {token?.tokenAddress && screenWidth < 768 && (
                        <a
                          href={getDexScreenerUrl(token.tokenAddress, blockchain)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#666] mt-1 font-mono text-[10px] inline-block"
                          title="View on DexScreener"
                        >
                          {screenWidth < 480 
                            ? `${token.tokenAddress.slice(0, 6)}...${token.tokenAddress.slice(-4)}`
                            : `${token.tokenAddress.slice(0, 8)}...${token.tokenAddress.slice(-6)}`
                          }
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Token Address - Center column on desktop */}
                  {screenWidth >= 768 && (
                    <div className="col-span-5 text-center">
                      {token?.tokenAddress ? (
                        <a
                          href={getDexScreenerUrl(token.tokenAddress, blockchain)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#ccc] font-mono text-sm inline-block"
                          title="View on DexScreener"
                        >
                          {`${token.tokenAddress.slice(0, 10)}...${token.tokenAddress.slice(-10)}`}
                        </a>
                      ) : (
                        <span className="text-[#666] text-sm">—</span>
                      )}
                    </div>
                  )}

                  {/* Balance & Percentage */}
                  <div className={`flex flex-col items-end ${screenWidth >= 768 ? 'col-span-3' : 'min-w-[80px] flex-shrink-0'}`}>
                    <div className={`text-white font-semibold transition-all duration-200 ${
                      screenWidth < 768 ? 'text-sm' : 'text-[15px]'
                    }`}>
                      {formatBalance(bal)}
                    </div>
                    <div
                      className="mt-1 py-0.5 px-1.5 rounded-[10px] self-end"
                      style={{ backgroundColor }}
                    >
                      <div 
                        className={`font-semibold transition-all duration-200 ${
                          screenWidth < 768 ? 'text-[10px]' : 'text-[11px]'
                        }`}
                        style={{ color }}
                      >
                        {percentage.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>
                {/* Add divider except for the last item */}
                {index < displayedHoldings.length - 1 && (
                  <div className="h-px bg-[#333] my-2" />
                )}
              </div>
            );
            })}
          </>
        ) : (
          <div className="text-[#888] text-center py-4 text-[15px]">No token holdings found</div>
        )}
        {showButton && (
          <button 
            className="bg-transparent border border-[#CCFF00] rounded-[25px] py-2.5 px-6 self-center mt-3 mx-auto block"
            onClick={handleViewMoreLess}
          >
            <div className="text-[#CCFF00] text-[13px] font-semibold uppercase">
              {visibleCount >= sortedHoldings.length ? 'View less' : 'View more'}
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default WhaleHoldings;
