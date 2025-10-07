import React from "react";

// Function to format numbers in K, M, B, T format safely
const formatNumber = (value) => {
  const num = Number(value);
  if (isNaN(num)) return "—";

  const absValue = Math.abs(num);

  if (absValue >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (absValue >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (absValue >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  if (absValue >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;

  return `$${num.toFixed(2)}`;
};

const WhalePerformance = ({ walletData }) => {
  const tokenHoldings = walletData?.tokenHoldings ?? [];
  const totalTokens = tokenHoldings.length;

  // Format the USD values safely
  const formattedWalletValue = formatNumber(walletData.walletValue);
  const formattedTotalUSD = formatNumber(walletData.totalAmountUSD);
  
  // Static PNL value for now - replace with dynamic data later
  const pnlValue = "$0.00"; // Static zero value
  const isPositivePNL = false; // Always false for zero value

  const stats = [
    { label: "Available Tokens", value: totalTokens },
    { label: "Total Trades", value: Number(walletData.trades) || 0 },
    { label: "Value", value: formattedWalletValue },
    { label: "Total USD", value: formattedTotalUSD },
    { label: "Tokens Traded", value: Number(walletData.tokensTraded) || 0, isFullWidth: true },
  ];

  return (
    <div className="mb-6 w-full">
      <h2 className="text-[#CCFF00]/75 text-base font-semibold mb-4 tracking-wide -mt-3">
        WALLET PERFORMANCE
      </h2>
      <div className="bg-[#141416] rounded-xl p-4 h-[343px] flex flex-col justify-center">
        <div className="flex flex-col gap-3 h-full">
          {/* 2x2 Grid for first 4 items */}
          <div className="grid grid-cols-2 gap-3 h-[200px]">
            {stats.slice(0, 4).map((item, idx) => (
              <div
                key={idx}
                className="bg-black rounded-xl p-3 flex flex-col justify-center h-full"
              >
                <div className="text-white/60 text-xs mb-0.5">{item.label}</div>
                <div className="text-white text-sm font-medium">{item.value}</div>
              </div>
            ))}
          </div>
          
          {/* Full width Tokens Traded */}
          <div className="bg-black rounded-xl p-3 flex flex-col justify-center h-[100px]">
            <div className="text-white/60 text-xs mb-0.5">{stats[4].label}</div>
            <div className="text-white text-sm font-medium">{stats[4].value}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhalePerformance;
