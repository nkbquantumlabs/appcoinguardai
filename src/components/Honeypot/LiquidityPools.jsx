import React, { useState } from 'react';
// No import needed! copyToClipboard is now globally available

const LiquidityPools = ({ data }) => {
  // State for managing visible cards
  const [visibleCount, setVisibleCount] = useState(2);

  // Get liquidity pools data from props
  const liquidityPools = data?.topLiquidityPools || [];

  if (!liquidityPools || !Array.isArray(liquidityPools) || liquidityPools.length === 0) {
    return null;
  }


  const renderLiquidityPools = () => {

    // Calculate display logic
    const totalCards = liquidityPools.length;
    const showButton = totalCards > 2;
    const displayedPools = liquidityPools.slice(0, visibleCount);
    const isShowingAll = visibleCount >= totalCards;

    const handleViewMore = () => {
      setVisibleCount(prev => Math.min(prev + 2, totalCards));
    };

    const handleViewLess = () => {
      setVisibleCount(2);
    };

    const truncateAddress = (addr) =>
    `${addr.slice(0, 10)}....${addr.slice(-10)}`;

  const getResponsiveTruncatedAddress = (addr) => {
    if (!addr) return "N/A";
    
    return {
      xs: `${addr.slice(0, 6)}...${addr.slice(-6)}`,       // Very small screens (< 640px)
      sm: `${addr.slice(0, 8)}...${addr.slice(-8)}`,       // Small screens (640px - 768px)
      md: `${addr.slice(0, 12)}...${addr.slice(-12)}`,     // Medium screens (768px - 1024px)
      full: addr                                           // Large screens (> 1024px)
    };
  };

    const formatLiquidity = (usd) => {
      if (usd >= 1000000) return `$${(usd / 1000000).toFixed(2)}M`;
      if (usd >= 1000) return `$${(usd / 1000).toFixed(2)}K`;
      return `$${usd.toFixed(2)}`;
    };

    const formatVolume = (volume) => {
      if (volume >= 1000000) return `$${(volume / 1000000).toFixed(2)}M`;
      if (volume >= 1000) return `$${(volume / 1000).toFixed(2)}K`;
      return `$${volume.toFixed(2)}`;
    };

    const formatNativePrice = (price) => {
      if (!price || price === "N/A") return "N/A";
      const priceStr = String(price);
      const decimalIndex = priceStr.indexOf('.');
      if (decimalIndex === -1) return priceStr;
      return priceStr.slice(0, decimalIndex + 14); // 1 for decimal + 13 digits
    };

    const formatTokenAmount = (amount) => {
      if (!amount || amount === 0) return '0';
      const num = Number(amount);
      if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`;
      if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
      if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
      if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
      return num.toLocaleString();
    };

    return (
      <div className="mb-8 w-full">
        <p className="text-lg sm:text-xl font-semibold mb-4 tracking-wider text-[#CCFF00be]">
          LIQUIDITY POOLS
        </p>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {displayedPools.map((pool, index) => {
              return (
                <div key={index}>
                  <div className="bg-[#141416] rounded-lg p-4 border border-[#212121b8] h-full">
                    <div className="bg-[#0a0a0b] rounded-lg p-4 h-full">
                    {/* Header with DEX and Pair */}
                    <div className="flex flex-col gap-3 mb-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[#CCFF00] text-sm font-bold uppercase">
                          {pool.dex}
                        </span>
                        <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs uppercase">
                          {pool.chainId}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                        <span className="text-white font-bold text-xl">
                          {pool.baseToken}/{pool.quoteToken}
                        </span>
                        <div className="text-left sm:text-right">
                          <div className="text-white font-bold text-xl">
                            {pool.liquidityUSD ? formatLiquidity(pool.liquidityUSD) : "N/A"}
                          </div>
                          <div className="text-gray-400 text-sm">Total Liquidity</div>
                        </div>
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="mb-4">
                      {/* Mobile Layout - Stacked with dividers */}
                      <div className="sm:hidden space-y-0">
                        <div className="flex justify-between items-center py-3 border-b border-gray-600/30">
                          <span className="text-gray-400 text-sm">Price USD</span>
                          <span className="text-white font-semibold text-lg">
                            {pool.priceUSD ? `$${Number(pool.priceUSD).toFixed(6)}` : "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-600/30">
                          <span className="text-gray-400 text-sm">24h Volume</span>
                          <span className="text-white font-semibold text-lg">
                            {pool.volume24h ? formatVolume(pool.volume24h) : "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-600/30">
                          <span className="text-gray-400 text-sm">Native Price</span>
                          <span className="text-white font-semibold text-lg">
                            {formatNativePrice(pool.priceNative)}
                          </span>
                        </div>
                      </div>
                      
                      {/* Desktop Layout - Centered cards */}
                      <div className="hidden sm:grid sm:grid-cols-3 gap-3">
                        <div className="bg-black/50 rounded-lg p-3 text-center">
                          <div className="text-gray-400 text-sm mb-1">Price USD</div>
                          <div className="text-white font-semibold text-lg">
                            {pool.priceUSD ? `$${Number(pool.priceUSD).toFixed(6)}` : "N/A"}
                          </div>
                        </div>
                        <div className="bg-black/50 rounded-lg p-3 text-center">
                          <div className="text-gray-400 text-sm mb-1">24h Volume</div>
                          <div className="text-white font-semibold text-lg">
                            {pool.volume24h ? formatVolume(pool.volume24h) : "N/A"}
                          </div>
                        </div>
                        <div className="bg-black/50 rounded-lg p-3 text-center">
                          <div className="text-gray-400 text-sm mb-1">Native Price</div>
                          <div className="text-white font-semibold text-lg">
                            {formatNativePrice(pool.priceNative)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pooled Tokens */}
                    {pool.pooledTokens && pool.pooledTokens.length > 0 && (
                      <div className="mb-4">
                        <div className="text-gray-400 text-sm mb-3 font-medium">Pooled Tokens</div>
                        <div className="grid grid-cols-1 gap-3">
                          {pool.pooledTokens.map((token, tokenIndex) => (
                            <div key={tokenIndex} className="bg-black/50 rounded-lg p-3">
                              {/* Desktop Layout */}
                              <div className="hidden sm:flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <span className="text-[#CCFF00] font-bold text-sm">
                                    {token.symbol}
                                  </span>
                                  <span className="text-gray-300 text-sm">
                                    {token.amount ? formatTokenAmount(token.amount) : "N/A"}
                                  </span>
                                </div>
                                {/* Address in center for desktop */}
                                <div className="flex-1 text-center mx-4">
                                  <button
                                    onClick={() => copyToClipboard(token.address)}
                                    className="text-gray-400 text-xs font-mono cursor-pointer"
                                    title="Click to copy token address"
                                  >
                                    {token.address ? `${token.address.slice(0, 8)}...${token.address.slice(-8)}` : "N/A"}
                                  </button>
                                </div>
                                <span className="text-white font-semibold">
                                  {token.usd ? formatLiquidity(token.usd) : "N/A"}
                                </span>
                              </div>
                              
                              {/* Mobile Layout */}
                              <div className="sm:hidden">
                                <div className="flex justify-between items-center mb-2">
                                  <div className="flex items-center gap-2">
                                    <span className="text-[#CCFF00] font-bold text-sm">
                                      {token.symbol}
                                    </span>
                                    <span className="text-gray-300 text-sm">
                                      {token.amount ? formatTokenAmount(token.amount) : "N/A"}
                                    </span>
                                  </div>
                                  <span className="text-white font-semibold">
                                    {token.usd ? formatLiquidity(token.usd) : "N/A"}
                                  </span>
                                </div>
                                {/* Address below for mobile */}
                                <button
                                  onClick={() => copyToClipboard(token.address)}
                                  className="text-gray-400 text-xs font-mono cursor-pointer block"
                                  title="Click to copy token address"
                                >
                                  {token.address ? `${token.address.slice(0, 12)}...${token.address.slice(-12)}` : "N/A"}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Pair Address */}
                    <div className="border-t border-[#212121b8] pt-3">
                      <button
                        className="w-full bg-black/50 rounded-lg p-3 text-left"
                        onClick={() => copyToClipboard(pool.pairAddress)}
                        title="Click to copy pair address"
                      >
                        <div className="text-gray-400 text-sm mb-1">Pair Address</div>
                        {/* Responsive address display */}
                        <div className="text-white text-sm font-mono">
                          {/* Very small screens (< 480px) */}
                          <span className="block sm:hidden">
                            {getResponsiveTruncatedAddress(pool.pairAddress).xs}
                          </span>
                          {/* Small to medium screens (480px - 768px) */}
                          <span className="hidden sm:block md:hidden">
                            {getResponsiveTruncatedAddress(pool.pairAddress).sm}
                          </span>
                          {/* Medium to large screens (768px - 1024px) */}
                          <span className="hidden md:block lg:hidden">
                            {getResponsiveTruncatedAddress(pool.pairAddress).md}
                          </span>
                          {/* Large screens (> 1024px) - full address */}
                          <span className="hidden lg:block break-all">
                            {pool.pairAddress}
                          </span>
                        </div>
                      </button>
                    </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* View More/Less Button */}
          {showButton && (
            <div className="flex justify-center mt-6 pt-4">
              <button
                onClick={isShowingAll ? handleViewLess : handleViewMore}
                className="border-2 border-[#CCFF00be] text-[#CCFF00be] px-6 py-2 rounded-lg font-semibold hover:bg-[#CCFF00be]/10 transition-colors"
              >
                {isShowingAll ? 'View Less' : 'View More'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-1.5">
      {renderLiquidityPools()}
    </div>
  );
};

export default LiquidityPools;
