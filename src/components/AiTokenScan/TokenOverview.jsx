import React, { useEffect, useState, useId } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import StatusBadge from "./StatusBadge";
import { copyToClipboard } from "../../shared/CopyAlert";

const TokenOverview = ({ tokenData, address, showGauge }) => {
  const scale = useMotionValue(0);
  const progress = useMotionValue(0);
  const scoreCount = useMotionValue(0);
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    if (!showGauge) return;
    const score = tokenData.scanScore || 0;
    const progressValue = score / 100;

    const animations = [
      animate(scale, 1, { duration: 1, ease: [0.645, 0.045, 0.355, 1] }),
      animate(progress, progressValue, { duration: 1, ease: "easeOut" }),
      animate(scoreCount, score, {
        duration: 1,
        ease: "easeOut",
        onUpdate: (latest) => setDisplayScore(Math.round(latest)),
      }),
    ];

    return () => animations.forEach((anim) => anim.stop());
  }, [tokenData.scanScore, scale, progress, scoreCount, showGauge]);

  const totalArcLength = 283;
  const strokeDashoffset = useTransform(progress, [0, 1], [totalArcLength, 0]);

  // Unique gradient ID to prevent collisions across multiple instances
  const gradientId = useId();

  const [isMdUp, setIsMdUp] = useState(
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 768px)").matches
      : false
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handler = (e) => setIsMdUp(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const formatAddress = (addr) => {
    if (!addr) return "N/A";
    const chars = isMdUp ? 8 : 5;
    return `${addr.slice(0, chars)}....${addr.slice(-chars)}`;
  };

  const truncateText = (text, maxLength = 20) => {
    if (!text || typeof text !== "string") return "Unknown Token";
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength)}...`;
  };


  return (
    <>
      <style>{`
        .gauge-container {
          max-width: 350px;
        }
        .overview-grid {
          grid-template-columns: repeat(1, minmax(0, 1fr));
        }
        @media (min-width: 640px) {
          .gauge-container {
            max-width: 400px;
          }
          .overview-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 639px) {
          .gauge-svg {
            max-height: 120px;
          }
        }
        
      `}</style>
      <div className="w-full">
        {showGauge ? (
          <div className="bg-[#141416] rounded-[20px] sm:rounded-[24px] md:rounded-[36px] p-3 sm:p-4">
            <div className="text-center mb-3 sm:mb-4">
              <span className="text-white text-lg sm:text-xl md:text-2xl font-bold capitalize">
                {truncateText(tokenData?.tokenName)}
              </span>
              <span className="text-[#8ca714] text-[10px] sm:text-xs md:text-sm font-medium mt-1 block">
                ${tokenData?.tokenSymbol || "N/A"}
              </span>
            </div>
            <div className="flex justify-center mb-4 sm:mb-6 md:mb-8">
              <div className="gauge-container relative w-full sm:w-[70%]">
                <svg
                  width="100%"
                  viewBox="0 0 200 140"
                  preserveAspectRatio="xMidYMid meet"
                  className="gauge-svg max-h-[140px]"
                >
                  <defs>
                    <linearGradient
                      id={gradientId}
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#FF4D4D" />
                      <stop offset="50%" stopColor="#FFFF00" />
                      <stop offset="100%" stopColor="#00FF00" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M10,110 A90,90 0 0,1 190,110"
                    stroke="#212121"
                    strokeWidth="26"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <motion.path
                    d="M10,110 A90,90 0 0,1 190,110"
                    stroke={`url(#${gradientId})`}
                    strokeWidth="18"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={totalArcLength}
                    strokeDashoffset={strokeDashoffset}
                  />
                  <circle cx="100" cy="100" r="40" fill="#141416" />
                </svg>
                <span className="absolute top-[45%] left-1/2 -translate-x-1/2 text-white text-2xl sm:text-3xl md:text-[40px] font-bold">
                  {displayScore}
                </span>
                <span className="block text-[#818181] text-[10px] sm:text-xs md:text-[15px] font-medium text-center mt-3 sm:mt-4">
                  SCAN SCORE
                </span>
              </div>
            </div>
            <div className="flex justify-around md:justify-center md:space-x-20">
              <StatusBadge status="alert" count={tokenData.alerts} />
              <StatusBadge status="attention" count={tokenData.attentions} />
              <StatusBadge status="pass" count={tokenData.passed} />
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col lg:-mt-2">
            <span className="text-[#CCFF00]/75 text-xs sm:text-sm md:text-base font-semibold mb-4 sm:mb-3 md:mb-4 mt-6 sm:mt-0 block tracking-wide">
              TOKEN OVERVIEW
            </span>
            <div className="bg-[#141416] rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 flex-1 flex flex-col">
              <div className="overview-grid grid gap-3 sm:gap-4 flex-1">
                <div className="bg-black rounded-lg p-2 sm:p-3 md:p-4 flex flex-col justify-center">
                  <span className="text-white/60 text-[10px] sm:text-xs mb-1">
                    Deploy Time
                  </span>
                  <span className="text-white text-xs sm:text-sm font-medium">
                    {tokenData.launchDate}
                  </span>
                </div>
                <div className="bg-black rounded-lg p-2 sm:p-3 md:p-4 flex flex-col justify-center">
                  <span className="text-white/60 text-[10px] sm:text-xs mb-1">
                    Token Address
                  </span>
                  <button
                    onClick={() => copyToClipboard(address)}
                    className="text-left w-full"
                  >
                    <span className="text-white text-xs sm:text-sm font-medium break-all">
                      {formatAddress(address)}
                    </span>
                  </button>
                </div>
                <div className="bg-black rounded-lg p-2 sm:p-3 md:p-4 flex flex-col justify-center">
                  <span className="text-white/60 text-[10px] sm:text-xs mb-1">
                    Pair Address
                  </span>
                  <button
                    onClick={() => copyToClipboard(tokenData.pairAddress)}
                    className="text-left w-full"
                  >
                    <span className="text-white text-xs sm:text-sm font-medium break-all">
                      {formatAddress(tokenData.pairAddress)}
                    </span>
                  </button>
                </div>
                <div className="bg-black rounded-lg p-2 sm:p-3 md:p-4 flex flex-col justify-center">
                  <span className="text-white/60 text-[10px] sm:text-xs mb-1">
                    DEX Address
                  </span>
                  <button
                    onClick={() => {
                      if (tokenData.dexAddresses?.[0]) {
                        window.open(tokenData.dexAddresses[0], '_blank');
                      }
                    }}
                    className="text-left w-full"
                  >
                    <span className="text-white text-xs sm:text-sm font-medium break-all">
                      {tokenData.dexAddresses?.[0] ? formatAddress(tokenData.dexAddresses[0]) : 'N/A'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TokenOverview;
