import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  IoShieldCheckmark,
  IoAnalytics,
  IoWallet,
  IoChevronForward,
  IoClose,
  IoChevronBack,
  IoChevronForward as IoChevronForwardNext,
} from "react-icons/io5";
import { AiOutlineSecurityScan, AiOutlineAlert } from "react-icons/ai";
import {
  MdOutlineCrisisAlert,
  MdOutlineGeneratingTokens,
} from "react-icons/md";
import { GrMoney } from "react-icons/gr";
import { IoMdAnalytics } from "react-icons/io";
import { TbRobotOff, TbDeviceAnalytics } from "react-icons/tb";
import { SiDowndetector } from "react-icons/si";
import { GiWhaleTail } from "react-icons/gi";
import { RiRobot2Fill } from "react-icons/ri";
import { BsDropletHalf } from "react-icons/bs";

const FeaturesSection = () => {
  const [expandedFeature, setExpandedFeature] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef(null);
  const navigate = useNavigate();

  const features = [
    {
      title: "Token Scan",
      icon: <AiOutlineSecurityScan className="w-5 h-5" />,
      description:
        "Analyze smart contracts using AI to detect potential threats like honeypots, mint functions, and high-risk patterns before you buy.",
      link: "/app/ai-token-scan",
    },
    {
      title: "Liquidity Scanner",
      icon: <BsDropletHalf className="w-5 h-5" />,
      description:
        "Check if a token's liquidity is locked or vulnerable, helping you avoid projects that may pull liquidity and disappear.",
      link: "/app/liquidity-scanner",
    },
    {
      title: "RugShield",
      icon: <IoShieldCheckmark className="w-5 h-5" />,
      description:
        "Real-time protection against rug pulls. Flags suspicious ownership setups, liquidity unlocks, and sudden fund movements.",
      link: "/app/rugshield",
    },
    {
      title: "Honeypot Detector",
      icon: <MdOutlineCrisisAlert className="w-5 h-5" />,
      description:
        "Detect tokens where users can buy but not sell. Protect yourself from deceptive contracts that trap funds.",
      link: "/app/honeypot-detector",
    },
    {
      title: "NFT Generator",
      icon: <IoMdAnalytics className="w-5 h-5" />,
      description:
        "Scan upcoming presales for risks like hidden minting, dev backdoors, or fake team wallets — before you commit.",
      link: "/app/nft-generator",
    },
    // {
    //   title: "Bot Checker",
    //   icon: <TbRobotOff className="w-5 h-5" />,
    //   description:
    //     "Track malicious bot activity around tokens. Identify sandwich attacks, frontruns, and automated dump patterns.",
    // },
    {
      title: "Whale Tracker",
      icon: <GiWhaleTail className="w-5 h-5" />,
      description:
        "Monitor large wallets, devs, and whales. See who's buying, selling, or prepping for major moves.",
      link: "/app/whale-tracker",
    },
    {
      title: "Portfolio Overview",
      icon: <IoWallet className="w-5 h-5" />,
      description:
        "Connect your wallet to see real-time holdings, asset risk scores, and wallet health — all in one view.",
      comingSoon: true,
    },
    {
      title: "Coinguard AI",
      icon: <RiRobot2Fill className="w-5 h-5" />,
      description:
        "Ask anything. Your personal crypto AI can explain tokens, scan contracts, give safety tips, and track trends in real time.",
      link: "/app/ai-chat",
    },
    {
      title: "Smart Picks",
      icon: <MdOutlineGeneratingTokens className="w-5 h-5" />,
      description:
        "Get curated token suggestions based on AI risk scores, and market trends — updated daily.",
      comingSoon: true,
    },
    {
      title: "Insight Hub",
      icon: <IoAnalytics className="w-5 h-5" />,
      description:
        "Access expert-written blogs, token safety guides, community updates, and market breakdowns — powered by AI and human research.",
      comingSoon: true,
    },
  ];

  const cardsPerView = {
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
  };

  const handleNext = () => {
    const maxIndex = Math.ceil(
      features.length -
        (window.innerWidth >= 1280
          ? cardsPerView.xl
          : window.innerWidth >= 1024
          ? cardsPerView.lg
          : window.innerWidth >= 768
          ? cardsPerView.md
          : cardsPerView.sm)
    );
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev <= 0
        ? Math.ceil(
            features.length -
              (window.innerWidth >= 1280
                ? cardsPerView.xl
                : window.innerWidth >= 1024
                ? cardsPerView.lg
                : window.innerWidth >= 768
                ? cardsPerView.md
                : cardsPerView.sm)
          )
        : prev - 1
    );
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
      <div
        className={
          window.innerWidth >= 1024 ? "text-center mb-8" : "text-center mb-16"
        }
      >
        {/* <span className="inline-block px-3 py-1 text-xs font-mono tracking-widest text-[#CCFF00] bg-[#CCFF00]/10 mb-4">
          OUR FLAGSHIP PRODUCTS
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          All Security Tools{" "}
          <span className="text-[#CCFF00]">Built Into One App</span>
        </h2>
        <p className="text-white/70 max-w-2xl mx-auto">
          Safeguard your crypto journey with a complete suite of protection
          tools — no extra installs, no switching tabs. Quarter 4th of 2025 will
          be a game-changer, as we introduce our mobile app for iOS and Android.
        </p> */}

        <span className="inline-block px-3 py-1 text-xs font-mono tracking-widest text-[#CCFF00] bg-[#CCFF00]/10 mb-4">
          OUR FLAGSHIP PRODUCTS
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          All Security Tools{" "}
          <span className="text-[#CCFF00]">Unified in One Platform
</span>
        </h2>
        <p className="text-white/70 max-w-2xl mx-auto">
         Safeguard your crypto journey with a complete suite of protection tools — seamless, integrated, and always accessible. No extra installs, no switching tabs, just everything you need in one place.
        </p>

      </div>

      <div className="relative">
        {window.innerWidth >= 1024 && (
          <p className="text-center text-white/70 text-sm mb-0">
            Click a card to read more details
          </p>
        )}

        {window.innerWidth >= 1024 ? (
          <div className="wrapper">
            <div
              className="inner"
              style={{
                "--quantity": features.length,
                animationPlayState: isHovered ? "paused" : "running",
              }}
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="card"
                  style={{ "--index": index }}
                  onClick={() => setExpandedFeature(feature)}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className="relative bg-black/50 border border-white/20 p-6 group transition-all duration-300 hover:border-[#CCFF00]/50 cursor-pointer h-full">
                    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/20 group-hover:border-[#CCFF00] transition-all duration-500 delay-75"></div>
                    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/20 group-hover:border-[#CCFF00] transition-all duration-500 delay-75"></div>
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/20 group-hover:border-[#CCFF00] transition-all duration-500 delay-75"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/20 group-hover:border-[#CCFF00] transition-all duration-500 delay-75"></div>

                    <div className="flex items-start">
                      <div className="p-2 bg-[#CCFF00]/10 border border-[#CCFF00]/30 mr-3 flex-shrink-0">
                        {React.cloneElement(feature.icon, {
                          className: "w-5 h-5 text-[#CCFF00]",
                        })}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-white/60 text-sm line-clamp-2">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="overflow-hidden" ref={carouselRef}>
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentIndex *
                  (100 /
                    (window.innerWidth >= 1280
                      ? cardsPerView.xl
                      : window.innerWidth >= 1024
                      ? cardsPerView.lg
                      : window.innerWidth >= 768
                      ? cardsPerView.md
                      : cardsPerView.sm))
                }%)`,
              }}
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-2`}
                  onClick={() => setExpandedFeature(feature)}
                >
                  <div className="relative bg-black/50 border border-white/20 p-6 group transition-all duration-300 hover:border-[#CCFF00]/50 cursor-pointer h-full">
                    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/20 group-hover:border-[#CCFF00] transition-all duration-500 delay-75"></div>
                    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/20 group-hover:border-[#CCFF00] transition-all duration-500 delay-75"></div>
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/20 group-hover:border-[#CCFF00] transition-all duration-500 delay-75"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/20 group-hover:border-[#CCFF00] transition-all duration-500 delay-75"></div>

                    <div className="flex items-start">
                      <div className="p-2 bg-[#CCFF00]/10 border border-[#CCFF00]/30 mr-3 flex-shrink-0">
                        {React.cloneElement(feature.icon, {
                          className: "w-5 h-5 text-[#CCFF00]",
                        })}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-white/60 text-sm line-clamp-2">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {window.innerWidth < 1024 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black/50 p-2 text-[#CCFF00] hover:bg-[#CCFF00]/20 transition-colors"
            >
              <IoChevronBack className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black/50 p-2 text-[#CCFF00] hover:bg-[#CCFF00]/20 transition-colors"
            >
              <IoChevronForwardNext className="w-6 h-6" />
            </button>

            <p className="text-center text-white/70 text-sm mt-6">
              Tap a card to read more details
            </p>
          </>
        )}
      </div>

      {expandedFeature && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative bg-black border border-[#CCFF00]/30 max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setExpandedFeature(null)}
              className="absolute top-4 right-4 p-1 text-white/70 hover:text-[#CCFF00] transition-colors"
            >
              <IoClose className="w-6 h-6" />
            </button>

            <div className="flex items-start mb-6">
              <div className="p-3 bg-[#CCFF00]/10 border border-[#CCFF00]/30 mr-4 flex-shrink-0">
                {React.cloneElement(expandedFeature.icon, {
                  className: "w-8 h-8 text-[#CCFF00]",
                })}
              </div>
              <div>
                <span className="inline-block px-2 py-1 text-xs font-mono tracking-widest text-[#CCFF00] bg-[#CCFF00]/10 mb-2">
                  FEATURE DETAIL
                </span>
                <h3 className="text-2xl font-bold text-white">
                  {expandedFeature.title}
                </h3>
              </div>
            </div>

            <div className="prose prose-invert">
              <p className="text-white/80 mb-6">
                {expandedFeature.description}
              </p>

              <div className="bg-black/50 border border-white/10 p-4">
                <h4 className="text-[#CCFF00] font-mono text-sm mb-2">
                  HOW IT PROTECTS YOU:
                </h4>
                <ul className="space-y-2">
                  {expandedFeature.description
                    .split(". ")
                    .filter(Boolean)
                    .map((point, i) => (
                      <li key={i} className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 mt-2 mr-2 bg-[#CCFF00] rounded-full flex-shrink-0"></span>
                        <span className="text-white/80">
                          {point.replace(/\.$/, "")}.
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            {expandedFeature.comingSoon ? (
              <div className="mt-8 w-full py-3 bg-gray-600/20 border border-gray-500/30 text-gray-400 font-medium text-center rounded">
                Coming Soon
              </div>
            ) : expandedFeature.link ? (
              <button
                onClick={() => {
                  setExpandedFeature(null);
                  navigate(expandedFeature.link);
                }}
                className="mt-8 w-full py-3 bg-[#CCFF00]/10 border border-[#CCFF00]/30 text-[#CCFF00] font-medium hover:bg-[#CCFF00]/20 transition-colors"
              >
                Early Access
              </button>
            ) : null}
          </div>
        </div>
      )}

      <style>
        {`
          .wrapper {
            width: 100%;
            height: 500px;
            position: relative;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: visible;
          }

          @media (min-width: 1024px) {
            .wrapper {
              margin-top: -3rem; /* Negative margin to pull carousel closer to instruction text */
            }

            .inner {
              --w: 800px;
              --h: 400px;
              --translateZ: 600px;
              --rotateX: -10deg;
              --perspective: 2000px;
              position: relative;
              width: var(--w);
              height: var(--h);
              transform-style: preserve-3d;
              transform: perspective(var(--perspective));
              animation: rotating 20s linear infinite;
            }

            @keyframes rotating {
              from {
                transform: perspective(var(--perspective)) rotateX(var(--rotateX)) rotateY(0);
              }
              to {
                transform: perspective(var(--perspective)) rotateX(var(--rotateX)) rotateY(360deg);
              }
            }

            .card {
              position: absolute;
              width: 250px;
              height: 200px;
              border-radius: 20px; /* Increased for more rounded corners */
              overflow: hidden;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotateY(calc((360deg / var(--quantity)) * var(--index))) translateZ(var(--translateZ));
              transition: transform 0.3s ease;
            }

            .card:hover {
              transform: translate(-50%, -50%) rotateY(calc((360deg / var(--quantity)) * var(--index))) translateZ(calc(var(--translateZ) + 50px)) scale(1.05);
            }
          }

          @media (max-width: 1023px) {
            .wrapper {
              overflow: hidden;
            }

            .card {
              border-radius: 20px; /* Consistent rounded corners for mobile */
            }
          }
        `}
      </style>
    </div>
  );
};

export default FeaturesSection;
