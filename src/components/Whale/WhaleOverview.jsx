import React from "react";
import WhaleChart from "./WhaleChart";

const WhaleOverview = ({ walletData, address, blockchain = "sol" }) => {
  const getBlockchainSymbol = (chain) => {
    const chainLower = chain.toLowerCase();
    if (chainLower.includes("sol") || chainLower.includes("solana")) return "SOL";
    if (chainLower.includes("eth") || chainLower.includes("ethereum")) return "ETH";
    if (chainLower.includes("bsc") || chainLower.includes("binance")) return "BNB";
    return "SOL";
  };

  const blockchainSymbol = getBlockchainSymbol(blockchain);

  return (
    <div className="mb-6">
      <div className="bg-[#141416] rounded-xl p-4 flex flex-col items-center -mt-3">
        <div className="text-white text-base mb-4 font-medium">
          {address.slice(0, 8)}...{address.slice(-8)}
        </div>
        
        <div className="w-[215px] h-[215px] flex justify-center items-center my-4">
          <WhaleChart
            walletData={walletData}
            address={address}
            size={230}
            strokeWidth={48}
            spacing={0.4}
            showLabels={false}
            labelColor="#f3f4f6"
            labelSize={10}
            showCenterText={true}
            subText="Total Value"
          />
        </div>
        
        <div className="flex flex-row justify-center w-full mt-4">
          <div className="flex flex-col items-center">
            <div className="text-[#888] text-sm mb-1">Balance</div>
            <div className="text-white text-base font-semibold">
              {walletData.Balance ? `${walletData.Balance} ${blockchainSymbol}` : `— ${blockchainSymbol}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhaleOverview;