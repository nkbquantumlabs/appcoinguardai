import React from "react";

const topBlocks = [
  { percent: "8.0%", label: "Staking Rewards" },
  { percent: "15.0%", label: "Liquidity Providers" },
  { percent: "14.0%", label: "Trading Rewards" },
  { percent: "12%", label: "Investors" },
  { percent: "15%", label: "Community Treasury" },
];

const bottomBlocks = [
  { percent: "6.0%", label: "Airdrops" },
  { percent: "7.2%", label: "Strategic Investments" },
  { percent: "2.0%", label: "EIP" },
  { percent: "20.0%", label: "Presale" },
  { percent: "8%", label: "Team" },
];

export default function Tokenomics() {
  return (
    <div className="relative w-full bg-black text-white py-14 overflow-hidden">
      <div className="max-w-[98%] sm:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-20 text-white">
          Tokenomics
        </h2>
      </div>

      <div className="w-[98%] sm:max-w-[1200px] mx-auto px-0 sm:px-4">
        <img
          src="/elements/tokenomics.png"
          alt="Tokenomics"
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="hidden sm:block absolute top-0 left-0 h-full w-48 bg-gradient-to-r from-black via-black/90 to-transparent z-10 pointer-events-none" />
      <div className="hidden sm:block absolute top-0 right-0 h-full w-48 bg-gradient-to-l from-black via-black/90 to-transparent z-10 pointer-events-none" />

      <div className="w-full overflow-hidden mt-12 relative group">
        <div className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-black to-transparent z-10 block sm:hidden pointer-events-none" />
        <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-black to-transparent z-10 block sm:hidden pointer-events-none" />

        <div
          className="flex gap-2 animate-[scrollLeft_25s_linear_infinite] group-hover:[animation-play-state:paused] w-max"
          style={{ animationName: "scrollLeft" }}
        >
          {[...topBlocks, ...topBlocks, ...topBlocks].map((item, index) => (
            <div
              key={`top-${index}`}
              className="min-w-[100px] sm:min-w-[220px] bg-white/5 backdrop-blur-sm rounded-lg p-2 sm:p-4 text-center border"
              style={{
                borderColor: "rgba(204, 255, 0, 0.3)",
              }}
            >
              <p className="text-base sm:text-2xl font-bold text-white">
                {item.percent}
              </p>
              <p className="text-xs sm:text-sm text-white">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full overflow-hidden mt-10 relative group">
        <div className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-black to-transparent z-10 block sm:hidden pointer-events-none" />
        <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-black to-transparent z-10 block sm:hidden pointer-events-none" />

        <div
          className="flex gap-2 animate-[scrollRight_25s_linear_infinite] group-hover:[animation-play-state:paused] w-max"
          style={{ animationName: "scrollRight" }}
        >
          {[...bottomBlocks, ...bottomBlocks, ...bottomBlocks].map(
            (item, index) => (
              <div
                key={`bottom-${index}`}
                className="min-w-[100px] sm:min-w-[220px] bg-white/5 backdrop-blur-sm rounded-lg p-2 sm:p-4 text-center border"
                style={{
                  borderColor: "rgba(204, 255, 0, 0.3)",
                }}
              >
                <p className="text-base sm:text-2xl font-bold text-white">
                  {item.percent}
                </p>
                <p className="text-xs sm:text-sm text-white">{item.label}</p>
              </div>
            )
          )}
        </div>
      </div>

      <style>{`
        @keyframes scrollLeft {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        @keyframes scrollRight {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
