import React from "react";

const NFT = () => {
  return (
    <div
      className="
        flex flex-col items-center justify-center bg-black text-center overflow-hidden px-4
        gap-6 sm:gap-5 md:gap-6 lg:gap-8
        fixed inset-0 w-full h-full   /* mobile fix */
        sm:relative sm:h-screen sm:w-full  /* desktop: normal centered */
      "
    >
      {/* Heading */}
      <div className="flex-shrink-0">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-white z-10 leading-normal sm:leading-relaxed">
          Coinguard{" "}
          <span className="text-[#ccff00] inline-block">NFT Generator</span>
        </h1>
      </div>

      {/* Description */}
      <div className="flex-shrink-0 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        <p className="text-white/70 text-sm sm:text-base md:text-lg lg:text-xl font-normal leading-loose sm:leading-relaxed px-1">
          Transform your ideas into unique, collectible digital assets with{" "}
          <span className="text-[#ccff00] font-normal">
            Coinguard's AI-driven Solana-based NFT Generator
          </span>
          .
        </p>
      </div>

      {/* NFT GIF Section */}
      <div className="relative w-44 h-44 sm:w-48 sm:h-48 md:w-52 md:h-52 lg:w-56 lg:h-56 xl:w-60 xl:h-60 flex-shrink-0">
        <img
          src="/nft-chimp.gif"
          alt="NFT Chimp Animation"
          className="w-full h-full object-cover rounded-lg"
        />

        {/* Corner borders */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#ccff00]/50"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#ccff00]/50"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#ccff00]/50"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#ccff00]/50"></div>
      </div>

      {/* Coming Soon Text */}
      <div className="flex-shrink-0">
        <h2 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-6xl font-extrabold tracking-wide leading-none sm:leading-tight">
          <span
            className="text-transparent"
            style={{ WebkitTextStroke: "2px #ccff0090" }}
          >
            COMING SOON
          </span>
        </h2>
      </div>
    </div>
  );
};

export default NFT;
