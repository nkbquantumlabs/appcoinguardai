import TypingAnimation from "./ui/typing-animation";
import React, { useEffect, useRef, useState } from "react";
import { BiSolidVolumeMute, BiSolidVolumeFull } from "react-icons/bi";

// Video Card Component with NFT-style borders
const VideoCard = () => {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!isVisible) {
      video.pause();
    } else {
      video.currentTime = 0;
      video.muted = true;
      setMuted(true);
      video.play().catch(() => {});
    }

    return () => {
      video.pause();
    };
  }, [isVisible]);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (muted) {
      video.muted = false;
      video
        .play()
        .then(() => setMuted(false))
        .catch(() => {
          video.muted = true;
          setMuted(true);
        });
    } else {
      video.muted = true;
      setMuted(true);
    }
  };

  return (
    <div className="relative w-[260px] h-[380px] sm:w-[280px] sm:h-[400px] lg:w-[320px] lg:h-[450px] mx-auto group">
      {/* Main container with border */}
      <div className="relative w-full h-full bg-black/50 border border-white/30 group-hover:border-[#CCFF00]/50 transition-all duration-300 z-10">
        {/* Video */}
        <video
          ref={videoRef}
          src="/LandingPage/video/lily.webm"
          autoPlay
          playsInline
          muted={true}
          loop
          className="w-full h-full object-cover object-top sm:object-center md:object-contain"
        />

        {/* Fixed U-shaped fade overlay */}
        <div className="absolute bottom-0 left-0 w-full h-24 pointer-events-none z-20">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="block"
          >
            <defs>
              <linearGradient id="videoFade" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#000000" stopOpacity="1" />
                <stop offset="40%" stopColor="#000000" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#000000" stopOpacity="0.6" />
                <stop offset="80%" stopColor="#000000" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="100" height="100" fill="url(#videoFade)" />
          </svg>
        </div>

        {/* GIF + button overlay */}
        <div className="absolute w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 pointer-events-none bottom-4 left-1/2 transform -translate-x-1/2 flex items-center justify-center z-30">
          <img
            src="/LandingPage/elements/halo.gif"
            alt="Overlay GIF"
            className="w-full h-full"
          />
          <button
            onClick={toggleMute}
            className="absolute inset-0 m-auto w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-white bg-opacity-75 backdrop-blur-md rounded-full flex items-center justify-center focus:outline-none pointer-events-auto transition-all duration-200 hover:bg-opacity-90 hover:scale-105"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? (
              <BiSolidVolumeMute className="text-black text-xs sm:text-sm md:text-base" />
            ) : (
              <BiSolidVolumeFull className="text-black text-xs sm:text-sm md:text-base" />
            )}
          </button>
        </div>
      </div>

      {/* Corner borders - with proper z-index */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/30 group-hover:border-[#CCFF00] transition-all duration-500 delay-75 z-0 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/30 group-hover:border-[#CCFF00] transition-all duration-500 delay-75 z-0 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/30 group-hover:border-[#CCFF00] transition-all duration-500 delay-75 z-0 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/30 group-hover:border-[#CCFF00] transition-all duration-500 delay-75 z-0 pointer-events-none"></div>
    </div>
  );
};

function HeroSection() {
  return (
    <>
      <header className="bg-black text-white py-6 px-4 sm:py-8 sm:px-6 md:py-10 md:px-8 lg:py-12 lg:px-12">
        <div className="mx-auto max-w-[1200px] flex flex-col items-center justify-between gap-6 md:gap-10 lg:flex-row">
          <div className="relative w-full lg:w-2/3 bg-white/5 border border-transparent group transition-all duration-300 hover:border-white/20 shadow-xl p-5 md:p-6 lg:p-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-white/0 group-hover:via-white/5 group-hover:to-white/10 transition-all duration-500 pointer-events-none"></div>

            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-white/50 transition-all duration-300"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-white/50 transition-all duration-300"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-white/50 transition-all duration-300"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-white/50 transition-all duration-300"></div>

            <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-4 font-['DM_Sans'] leading-snug tracking-tight">
              <TypingAnimation>
                Your First Line of Defense in the Crypto World.
              </TypingAnimation>
            </h1>

            <p className="text-xs sm:text-sm md:text-base leading-relaxed font-['Manrope'] text-gray-300">
              <span className="block text-xs sm:text-sm md:text-base font-semibold mb-2 text-white">
                Coinguard is your AI-powered shield against rug pulls, scams,
                and hidden threats.
              </span>
              Coinguard is an all-in-one AI platform that scans for rug pulls,
              honeypots, dev backdoors, bots, and presale scams. It tracks dev
              wallets, flags wash trading, low liquidity, and pump-and-dump
              risks — all with a real-time portfolio view, AI assistant, token
              picks, and trending insights to help you trade smarter and safer.
            </p>
          </div>

          <div className="w-full lg:w-1/3 flex justify-center items-center mt-6 lg:mt-0">
            <VideoCard />
          </div>
        </div>
      </header>
    </>
  );
}

export default HeroSection;
