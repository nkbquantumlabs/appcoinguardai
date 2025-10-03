import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Shield, ShieldCheck, Copy, Check, X } from 'lucide-react';
import { 
  MdSecurity, 
  MdWarning, 
  MdVerified, 
  MdBlock, 
  MdShield,
  MdInfo
} from 'react-icons/md';
import { copyToClipboard } from '../../shared/CopyAlert';

const baseDiamondSvg = `<svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.9485 11.0195C21.2909 11.6283 21.2909 12.3717 20.9485 12.9805L17.5735 18.9805C17.2192 19.6103 16.5529 20 15.8303 20H8.16969C7.44715 20 6.78078 19.6103 6.42654 18.9805L3.05154 12.9805C2.70908 12.3717 2.70908 11.6283 3.05154 11.0195L6.42654 5.01948C6.78078 4.38972 7.44715 4 8.16969 4H15.8303C16.5529 4 17.2192 4.38972 17.5735 5.01948L20.9485 11.0195Z" fill="{{FILL_COLOR}}" {{STROKE}} stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const HoneyOverview = ({ data, network, tokenAddress }) => {
  
  const sanitizeInput = (input) => {
    if (input == null || input === undefined || input === '') return null;
    return String(input);
  };

  const formatPercentage = (num) => {
    if (num === undefined || num === null) return null;
    return (num * 100).toFixed(2) + '%';
  };

  const formatAddress = (addr) => {
    if (!addr) return 'N/A';
    if (addr.length <= 10) return addr;
    return `${addr.substring(0, 4)}....${addr.substring(addr.length - 4)}`;
  };

  const truncateTokenName = (name, maxLength) => {
    if (!name) return 'N/A';
    if (name.length > maxLength) {
      return name.substring(0, maxLength) + '...';
    }
    return name;
  };


  const formatNumberAbbreviated = (num) => {
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toString();
  };

  const getDiamondSvgWithStroke = (isHoneypot) => {
    let strokeAttr = '';
    if (isHoneypot !== null) {
      const strokeColor = isHoneypot ? 'red' : '#ccff00';
      strokeAttr = `stroke="${strokeColor}"`;
    } else {
      strokeAttr = `stroke="rgba(200, 200, 200, 0.5)"`;
    }
    return baseDiamondSvg.replace('{{STROKE}}', strokeAttr).replace('{{FILL_COLOR}}', '#000000');
  };

  const [diamondFill1, setDiamondFill1] = useState('#000000');
  const [diamondFill2, setDiamondFill2] = useState('#000000');
  const [isLoading, setIsLoading] = useState(true);
  const [isHoneypot, setIsHoneypot] = useState(null);
  const [statusSvgXml, setStatusSvgXml] = useState(getDiamondSvgWithStroke(null));

  useEffect(() => {
    let animating = true;

    const flashDiamond = (setFill) => {
      if (!animating) return;
      setFill('rgba(0, 191, 255, 0.09)');
      setTimeout(() => {
        if (!animating) return;
        setFill('#000000');
      }, 250);
    };

    setTimeout(() => flashDiamond(setDiamondFill1), 0);
    setTimeout(() => flashDiamond(setDiamondFill2), 500);

    setTimeout(() => {
      if (!animating) return;
      const honeypotStatus = data.is_honeypot === '1' || data.is_honeypot === 1 || data.is_honeypot === true;
      setIsHoneypot(honeypotStatus);
      setStatusSvgXml(getDiamondSvgWithStroke(honeypotStatus));
      setIsLoading(false);
    }, 1000);

    return () => {
      animating = false;
    };
  }, [data.is_honeypot]);

  const renderTokenHeader = () => {
    const statusBorderColor = isHoneypot ? '#fff' : isHoneypot === false ? '#fff' : 'gray';
    const statusTextColor = isHoneypot ? '#ef4444' : isHoneypot === false ? '#CCFF00' : 'gray';
    const iconColor = isHoneypot ? 'red' : isHoneypot === false ? '#CCFF00' : 'gray';
    
    const StatusIcon = isHoneypot ? X : isHoneypot === false ? Check : null;
    const ShieldIcon = isHoneypot ? AlertTriangle : ShieldCheck;

    return (
      <div className="w-full flex items-center justify-center mb-6 lg:mb-0">
        <div className="bg-[#141416] rounded-3xl lg:rounded-[36px] w-full max-w-4xl lg:max-w-none mx-auto relative lg:aspect-square lg:max-h-[500px]" 
             style={{ height: '410px' }}>
          
          {/* Token Info at top */}
          <div className="absolute top-5 left-0 right-0 text-center">
            <h1 className="text-white text-xl md:text-2xl lg:text-xl font-bold capitalize">
              {/* Mobile: 20 chars max */}
              <span className="block sm:hidden">
                {truncateTokenName(data.token_name, 20)}
              </span>
              {/* Desktop: 25 chars max */}
              <span className="hidden sm:block">
                {truncateTokenName(data.token_name, 25)}
              </span>
            </h1>
            <p className="text-[#8ca714] text-sm font-medium mt-1">
              ${data.token_symbol || 'N/A'}
            </p>
          </div>
          
          {/* Diamond Layout - Center */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            {/* Left diamonds */}
            <div className="flex flex-col items-center">
              <div 
                className="w-20 h-20 md:w-24 md:h-24 lg:w-20 lg:h-20 xl:w-24 xl:h-24"
                dangerouslySetInnerHTML={{
                  __html: baseDiamondSvg
                    .replace('{{FILL_COLOR}}', diamondFill1)
                    .replace('{{STROKE}}', 'stroke="rgba(200, 200, 200, 0.5)"')
                    .replace('width="100"', 'width="100%"')
                    .replace('height="100"', 'height="100%"')
                }}
              />
              <div 
                className="w-20 h-20 md:w-24 md:h-24 lg:w-20 lg:h-20 xl:w-24 xl:h-24 -mt-4"
                dangerouslySetInnerHTML={{
                  __html: baseDiamondSvg
                    .replace('{{FILL_COLOR}}', diamondFill2)
                    .replace('{{STROKE}}', 'stroke="rgba(200, 200, 200, 0.5)"')
                    .replace('width="100"', 'width="100%"')
                    .replace('height="100"', 'height="100%"')
                }}
              />
            </div>
            
            {/* Status diamond */}
            <div className="relative ">
              <div 
                className="w-20 h-20 md:w-24 md:h-24 lg:w-20 lg:h-20 xl:w-24 xl:h-24 -ml-4"
                dangerouslySetInnerHTML={{ 
                  __html: statusSvgXml
                    .replace('width="100"', 'width="100%"')
                    .replace('height="100"', 'height="100%"')
                }}
              />
              {!isLoading && StatusIcon && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <StatusIcon color={iconColor} size={20} className="md:w-6 md:h-6 lg:w-5 lg:h-5 xl:w-6 xl:h-6 -ml-4" />
                </div>
              )}
            </div>
          </div>
          
          {/* Status Message at bottom */}
          {!isLoading && (
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2">
              <div 
                className="flex justify-center items-center px-2 py-2 rounded-2xl w-[220px] sm:w-full lg:w-[200px] xl:w-[220px] border bg-transparent"
                style={{ borderColor: statusBorderColor }}
              >
                <ShieldIcon color={statusTextColor} size={18} className="lg:w-4 lg:h-4 xl:w-5 xl:h-5" />
                <span className="ml-2 font-bold text-xs lg:text-xs xl:text-sm" style={{ color: statusTextColor }}>
                  {isHoneypot ? 'Honeypot Detected!' : isHoneypot === false ? 'No Honeypot Found' : 'Loading...'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderKeyMetrics = () => {
    // Determine chain ID based on actual search data, not dropdown selection
    const getChainId = () => {
      // First, try to get chain from the data itself
      if (data.chainId) {
        return data.chainId.toUpperCase();
      }
      
      // Check if we have Solana-specific data structure
      if (data.topLiquidityPools && Array.isArray(data.topLiquidityPools) && data.topLiquidityPools.length > 0) {
        const chainId = data.topLiquidityPools[0].chainId;
        if (chainId) {
          if (chainId.toLowerCase() === 'solana') return 'SOL';
          if (chainId.toLowerCase() === 'bsc') return 'BSC';
          if (chainId.toLowerCase() === 'ethereum') return 'ETH';
          return chainId.toUpperCase();
        }
      }
      
      // Check if we have BSC/ETH data structure
      if (data.dex && Array.isArray(data.dex)) {
        // This suggests BSC/ETH data - we can infer from other data
        // For now, fallback to network prop only if we have actual data
        const normalizedNetwork = network ? network.toLowerCase() : '';
        switch (normalizedNetwork) {
          case 'ethereum':
          case 'eth':
            return 'ETH';
          case 'bsc':
          case 'binance':
            return 'BSC';
          default:
            return 'BSC'; // Default for GoPlus API structure
        }
      }
      
      return 'N/A';
    };

    // Determine if this is Solana or BSC/ETH data structure based on actual data
    const isSolanaNetwork = data.topLiquidityPools && Array.isArray(data.topLiquidityPools) && data.topLiquidityPools.length > 0;
    
    // Check multiple possible locations for topLiquidityPools
    // The data structure should be: data.topLiquidityPools (from HoneySearch combination)
    let topLiquidityPools = data.topLiquidityPools || [];
    
    const isSolanaData = isSolanaNetwork && topLiquidityPools && Array.isArray(topLiquidityPools) && topLiquidityPools.length > 0;
    const isBscEthData = !isSolanaNetwork && data.dex && Array.isArray(data.dex);
    
    
    // Get pool data based on data structure
    let poolData = null;
    let dexName = 'N/A';
    let pairAddress = 'N/A';
    let liquidityUSD = 'N/A';
    let priceUSD = 'N/A';
    let volume24h = 'N/A';
    
    // Get price USD from multiple possible sources
    const getPriceUSD = () => {

      // Function to recursively search for price in nested objects
      const findPriceInObject = (obj, path = '') => {
        if (!obj || typeof obj !== 'object') return null;
        
        for (const [key, value] of Object.entries(obj)) {
          const currentPath = path ? `${path}.${key}` : key;
          
          // Check if this key looks like a price field
          if (key.toLowerCase().includes('price') || key.toLowerCase().includes('usd')) {
            if (value && !isNaN(Number(value)) && Number(value) > 0) {
              return value;
            }
          }
          
          // Recursively search nested objects (but not too deep to avoid infinite loops)
          if (typeof value === 'object' && value !== null && path.split('.').length < 3) {
            const nestedPrice = findPriceInObject(value, currentPath);
            if (nestedPrice) return nestedPrice;
          }
        }
        return null;
      };

      let foundPrice = null;

      // Method 1: Direct field access for common patterns
      const directFields = [
        data.priceUSD,
        data.price_usd,
        data.price,
        data.token_price,
        data.current_price,
        data.usd_price,
      ];

      for (const price of directFields) {
        if (price && !isNaN(Number(price)) && Number(price) > 0) {
          foundPrice = price;
          break;
        }
      }

      // Method 2: For Solana data structure, check pool data
      if (!foundPrice && isSolanaData && topLiquidityPools && topLiquidityPools.length > 0) {
        const poolPrice = topLiquidityPools[0].priceUSD;
        if (poolPrice && !isNaN(Number(poolPrice)) && Number(poolPrice) > 0) {
          foundPrice = poolPrice;
        }
      }

      // Method 3: Recursive search through the entire data object
      if (!foundPrice) {
        foundPrice = findPriceInObject(data);
      }

      // Method 4: Last resort - check for any numeric field that could be a price
      if (!foundPrice) {
        for (const [key, value] of Object.entries(data)) {
          if (typeof value === 'string' || typeof value === 'number') {
            const numValue = Number(value);
            if (!isNaN(numValue) && numValue > 0 && numValue < 10 && 
                (key.includes('price') || key.includes('usd') || key.includes('Price'))) {
              foundPrice = value;
              break;
            }
          }
        }
      }

      if (foundPrice) {
        const formattedPrice = `$${Number(foundPrice).toFixed(8)}`;
        return formattedPrice;
      }
      
      return 'N/A';
    };

    if (isSolanaData && topLiquidityPools.length > 0) {
      // Solana data structure
      poolData = topLiquidityPools[0];
      dexName = poolData.dex ? poolData.dex.toUpperCase() : 'N/A';
      pairAddress = poolData.pairAddress || 'N/A';
      liquidityUSD = poolData.liquidityUSD ? `$${formatNumberAbbreviated(Number(poolData.liquidityUSD))}` : 'N/A';
      volume24h = poolData.volume24h ? `$${formatNumberAbbreviated(Number(poolData.volume24h))}` : 'N/A';
    } else if (isBscEthData && data.dex.length > 0) {
      // BSC/ETH data structure
      poolData = data.dex[0];
      dexName = poolData.name || 'N/A';
      pairAddress = poolData.pair || 'N/A';
      liquidityUSD = poolData.liquidity ? `$${formatNumberAbbreviated(Number(poolData.liquidity))}` : 'N/A';
      volume24h = 'N/A'; // Not available in GoPlus API
    }

    // Set price USD for all chains using the universal function
    priceUSD = getPriceUSD();
    
    // Get total supply from either data structure
    let totalSupply = data.totalSupply || data.total_supply;
    
    // Get token address from actual API response data only, not from search input
    let displayTokenAddress = 'N/A';
    
    // For Solana data structure, get token address from pool data
    if (isSolanaData && topLiquidityPools && topLiquidityPools.length > 0) {
      displayTokenAddress = topLiquidityPools[0].baseTokenAddress || 'N/A';
    } else {
      // For BSC/ETH data structure, get from data response
      displayTokenAddress = data.token_address || 'N/A';
    }
    
    // Determine what to show in the last field based on actual data structure
    const getVolumeOrHolderField = () => {
      if (isSolanaData) {
        return { label: 'Volume', value: volume24h || 'N/A' };
      } else {
        // For BSC/Ethereum data structure, show holder count
        const holderCount = data.holder_count || data.holderCount || 'N/A';
        return { 
          label: 'Holder Count', 
          value: holderCount !== 'N/A' ? formatNumberAbbreviated(Number(holderCount)) : 'N/A' 
        };
      }
    };

    const volumeOrHolderField = getVolumeOrHolderField();
    
    const metrics = [
      { label: 'Total Supply', value: totalSupply ? formatNumberAbbreviated(Number(totalSupply)) : 'N/A' },
      { label: 'Token Address', value: displayTokenAddress, copyable: displayTokenAddress && displayTokenAddress !== 'N/A', hideIcon: true },
      { label: 'Chain', value: getChainId() },
      { label: 'DEX', value: dexName || 'N/A' },
      { label: 'Pair Address', value: pairAddress || 'N/A', copyable: pairAddress && pairAddress !== 'N/A', hideIcon: true },
      { label: 'Liquidity', value: liquidityUSD || 'N/A' },
      { label: 'Price', value: priceUSD || 'N/A' },
      volumeOrHolderField,
    ];



    if (metrics.length === 0) return null;

    const leftColumn = metrics.slice(0, Math.ceil(metrics.length / 2));
    const rightColumn = metrics.slice(Math.ceil(metrics.length / 2));

    const handleHolderKeyAddressValue = (value)=>{
      let windowSize = window.innerWidth;
      if(windowSize<935 && windowSize>768 || windowSize<430){
        return value.substring(0,27);
      }      
      return value;
    }

    return (
      <div className="w-full max-w-6xl lg:max-w-none mx-auto px-1.5 lg:px-0 h-full flex flex-col">
        <h2 className="text-[#CCFF00] text-base md:text-lg lg:text-base font-semibold mb-3 lg:mb-2 tracking-wider opacity-75">
          KEY METRICS
        </h2>
        
        <div className="bg-[#141416] rounded-2xl p-4 md:p-6 lg:p-4 xl:p-5 flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-2 gap-4 lg:gap-2.5 xl:gap-3.5">
            {/* Left Column */}
            <div className="space-y-3 lg:space-y-2 xl:space-y-2.5">
              {leftColumn.map((item, index) => (
                <div key={index} className="bg-black rounded-xl p-4 lg:p-3 xl:p-3.5 min-h-[60px] lg:min-h-[48px] xl:min-h-[52px] flex flex-col justify-center">
                  <span className="text-white/60 text-xs md:text-sm lg:text-xs xl:text-sm mb-1">{item.label}</span>
                  {item.copyable ? (
                    <button
                      onClick={() => copyToClipboard(item.value || '')}
                      className="text-left flex items-center group"
                    >
                      <span className="text-white text-sm md:text-base lg:text-sm xl:text-base font-medium">
                        {formatAddress(item.value || 'N/A')}
                      </span>
                      {!item.hideIcon && (
                        <Copy size={12} className="ml-2 text-gray-400 group-hover:text-white transition-colors lg:w-3 lg:h-3 xl:w-3.5 xl:h-3.5" />
                      )}
                    </button>
                  ) : (
                    <span className="text-white text-sm md:text-base lg:text-sm xl:text-base font-medium">
                      {item.value || 'N/A'}
                    </span>
                  )}
                </div>
              ))}
            </div>
            
            {/* Right Column */}
            <div className="space-y-3 lg:space-y-2 xl:space-y-2.5">
              {rightColumn.map((item, index) => (
                <div key={index} className="bg-black rounded-xl p-4 lg:p-3 xl:p-3.5 min-h-[60px] lg:min-h-[48px] xl:min-h-[52px] flex flex-col justify-center">
                  <span className="text-white/60 text-xs md:text-sm lg:text-xs xl:text-sm mb-1">{item.label}</span>
                  {item.copyable ? (
                    <button
                      onClick={() => copyToClipboard(item.value || '')}
                      className="text-left flex items-center group"
                    >
                      <span className="text-white text-sm md:text-base lg:text-sm xl:text-base font-medium">
                        {formatAddress(item.value || 'N/A')}
                      </span>
                      {!item.hideIcon && (
                        <Copy size={12} className="ml-2 text-gray-400 group-hover:text-white transition-colors lg:w-3 lg:h-3 xl:w-3.5 xl:h-3.5" />
                      )}
                    </button>
                  ) : (
                    <span className="text-white text-sm md:text-base lg:text-sm xl:text-base font-medium">
                      {handleHolderKeyAddressValue(item.value) || 'N/A'}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSecurityFlags = () => {
    const flags = [
      { 
        label: 'Honeypot', 
        value: data.is_honeypot === '1', 
        type: 'danger',
        icon: MdSecurity,
        description: 'Token may prevent selling'
      },
      { 
        label: 'Blacklisted', 
        value: data.is_blacklisted === '1', 
        type: 'danger',
        icon: MdBlock,
        description: 'Token is on blacklist'
      },
      { 
        label: 'Anti-Whale', 
        value: data.is_anti_whale === '1', 
        type: 'warning',
        icon: MdShield,
        description: 'Large transaction limits'
      },
      { 
        label: 'Whitelisted', 
        value: data.is_whitelisted === '1', 
        type: 'success',
        icon: MdVerified,
        description: 'Token is verified'
      },
      { 
        label: 'Proxy Contract', 
        value: data.is_proxy === '1', 
        type: 'warning',
        icon: MdInfo,
        description: 'Uses proxy pattern'
      },
    ];

    return (
      <div className="w-full max-w-6xl mx-auto px-1.5 mt-8 lg:mt-0">
        <h2 className="text-[#CCFF00be] text-base md:text-lg font-semibold mb-6 tracking-wider">
          SECURITY FLAGS
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {flags.map((flag, index) => {
            const getStyles = () => {
              if (flag.value) {
                if (flag.type === 'danger') return { 
                  bg: 'bg-red-500/10', 
                  border: 'border-red-500/30', 
                  icon: 'text-red-400',
                  text: 'text-red-400',
                  status: 'text-red-400'
                };
                if (flag.type === 'warning') return { 
                  bg: 'bg-yellow-500/10', 
                  border: 'border-yellow-500/30', 
                  icon: 'text-yellow-400',
                  text: 'text-yellow-400',
                  status: 'text-yellow-400'
                };
                if (flag.type === 'success') return { 
                  bg: 'bg-green-500/10', 
                  border: 'border-green-500/30', 
                  icon: 'text-green-400',
                  text: 'text-green-400',
                  status: 'text-green-400'
                };
              }
              return { 
                bg: 'bg-gray-500/5', 
                border: 'border-gray-600/20', 
                icon: 'text-gray-500',
                text: 'text-gray-400',
                status: 'text-gray-500'
              };
            };
            
            const styles = getStyles();
            const IconComponent = flag.icon;
            
            return (
              <div 
                key={index} 
                className={`${styles.bg} ${styles.border} border rounded-xl p-4 transition-all duration-200 hover:scale-105`}
              >
                {/* Mobile Layout - Icon and name on left, status on right */}
                <div className="flex sm:hidden items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <IconComponent className={`${styles.icon} text-xl`} />
                    <div className={`${styles.text} text-sm font-semibold`}>
                      {flag.label}
                    </div>
                  </div>
                  <div className={`${styles.status} text-xs font-medium`}>
                    {flag.value ? (
                      <span>Active</span>
                    ) : (
                      <span>Inactive</span>
                    )}
                  </div>
                </div>

                {/* Desktop Layout - Centered vertical layout */}
                <div className="hidden sm:flex flex-col items-center text-center space-y-3">
                  <div className="flex items-center justify-center">
                    <IconComponent className={`${styles.icon} text-2xl`} />
                  </div>
                  
                  <div className="space-y-1">
                    <div className={`${styles.text} text-sm font-semibold`}>
                      {flag.label}
                    </div>
                    <div className={`${styles.status} text-xs font-medium`}>
                      {flag.value ? (
                        <span>Active</span>
                      ) : (
                        <span>Inactive</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };



  return (
    <div className="py-6">
      <div className="w-full max-w-6xl mx-auto">
        {/* Mobile Layout - Stack vertically (unchanged) */}
        <div className="block lg:hidden">
          {renderTokenHeader()}
          {renderKeyMetrics()}
          {renderSecurityFlags()}
        </div>
        
        {/* Desktop Layout - Grid layout */}
        <div className="hidden lg:block">
          <div className="grid lg:grid-cols-2 gap-8 mb-8 items-stretch">
            {/* Left Column - Animation */}
            <div className="flex items-center justify-center h-[410px]">
              {renderTokenHeader()}
            </div>
            
            {/* Right Column - Key Metrics */}
            <div className="flex items-center h-[410px]">
              <div className="w-full">
                {renderKeyMetrics()}
              </div>
            </div>
          </div>
          
          {/* Security Flags - Full Width */}
          {renderSecurityFlags()}
        </div>
      </div>
    </div>
  );
};



export default HoneyOverview;