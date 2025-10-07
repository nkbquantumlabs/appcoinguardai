import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoSparklesOutline, IoClose } from "react-icons/io5";

const AppPromo = () => {
  const [expandedFeature, setExpandedFeature] = useState(null);

  const walletFeatures = [
    {
      title: "Multi-Chain Support",
      description: "Ethereum, Binance, and Solana.",
      benefits:
        "Seamlessly interact with multiple blockchain networks, including Ethereum, Binance Smart Chain, and Solana, allowing you to manage diverse assets in one wallet with unified security and ease.",
    },
    {
      title: "Cross-Chain Swapper",
      description: "Swap assets seamlessly across chains.",
      benefits:
        "Effortlessly exchange assets between different blockchains like Ethereum, Binance, and Solana without relying on external exchanges, reducing fees and enhancing transaction speed.",
    },
    {
      title: "Non-Custodial",
      description: "You control your keys, you control your funds.",
      benefits:
        "Maintain full ownership of your private keys, ensuring that only you have access to your funds, with no third-party custody risks, enhancing security and autonomy.",
    },
    {
      title: "Built-In Token Swaps",
      description: "Trade tokens instantly within the wallet.",
      benefits:
        "Execute token trades directly from your wallet interface, leveraging integrated decentralized exchange protocols for fast, secure, and cost-effective transactions without leaving the app.",
    },
    {
      title: "Multi-Platform Access",
      description: "Web Extension, Android, iOS, and Windows.",
      benefits:
        "Access your wallet across multiple platforms, including browser extensions, mobile apps for Android and iOS, and a dedicated Windows application, ensuring flexibility and convenience wherever you are.",
    },
    {
      title: "Token Suggestions",
      description: "AI-powered market guidance.",
      benefits:
        "Receive curated token recommendations and market insights driven by advanced AI algorithms, analyzing risk scores, and market trends to help you make informed investment decisions.",
    },
    {
      title: "Portfolio Overview",
      description: "Track assets, performance, and risks in one view.",
      benefits:
        "Monitor your entire crypto portfolio in a single, intuitive interface, with real-time data on asset performance, risk assessments, and market trends to optimize your investment strategy.",
    },
    {
      title: "Seamless App Connection",
      description:
        "Connect your Coinguard Wallet to the Coinguard app instantly.",
      benefits:
        "Instantly link your wallet to the Coinguard mobile app for a unified experience, enabling real-time security monitoring, portfolio management, and access to all Coinguard features on the go.",
    },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter width="3000%" x="-1000%" height="3000%" y="-1000%" id="unopaq">
          <feColorMatrix
            values="1 0 0 0 0 
                    0 1 0 0 0 
                    0 0 1 0 0 
                    0 0 0 3 0"
          ></feColorMatrix>
        </filter>
      </svg>

      {/* Main Container with Glowing Border */}
      <div className="relative bg-black p-8 lg:p-12 rounded-xl overflow-hidden container-glow border-[#CCFF00]/20 hover:border-[#CCFF00]/50 md:border-[#CCFF00]/30 md:hover:border-[#CCFF00]/60">
        {/* Container Border Elements */}
        <div className="backdrop"></div>
        <div className="a l"></div>
        <div className="a r"></div>
        <div className="a t"></div>
        <div className="a b"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#CCFF00]/10 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#CCFF00]/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Flex Layout */}
        <div className="relative flex flex-col lg:flex-row gap-12 items-center z-10">
          {/* LEFT SIDE - App Preview */}
          <div className="relative w-72 h-[500px] flex-shrink-0">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Phone mockup */}
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gray-900 rounded-[40px] border-8 border-gray-800 shadow-2xl overflow-hidden">
                  <img
                    src="/LandingPage/cgw.png"
                    alt="Coinguard App Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Phone notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-gray-800 rounded-b-xl z-10"></div>
                {/* Home indicator */}
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-1/4 h-1 bg-white/30 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Content */}
          <div className="flex-1 text-left">
            <h2 className="text-[23px] sm:text-[34px] md:text-[42px] font-bold text-white mb-6 leading-tight">
              <span className="text-[#CCFF00]">Upcoming Coinguard</span>
              <span className="inline md:hidden">
                <br />
              </span>{" "}
              Pro Wallet
            </h2>

            <p className="text-white/80 mb-8 text-lg max-w-2xl leading-relaxed">
              The ultimate crypto security solution is now in your pocket.
              Protect your investments, detect scams in real-time, and manage
              your portfolio.
            </p>

            {/* CoinGuard Wallet Section */}
            <h3 className="text-xl font-semibold text-white mb-4">
              Tap on the titles to view full details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {walletFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start cursor-pointer"
                  onClick={() => setExpandedFeature(feature)}
                >
                  <div className="bg-[#CCFF00]/10 p-1 rounded-full mr-3 mt-0.5">
                    <IoSparklesOutline className="w-4 h-4 text-[#CCFF00]" />
                  </div>
                  <span className="text-white/90">{feature.title}</span>
                  <span className="mt-1.5 pl-2 text-[#CCFF00]">
                    <IoMdArrowDropdown />
                  </span>
                </div>
              ))}
            </div>

            {/* Coming Soon Button */}
            <div className="flex justify-center lg:justify-start lg:pl-40">
              <div className="backdrop"></div>
              <button className="button">
                <div className="a l"></div>
                <div className="a r"></div>
                <div className="a t"></div>
                <div className="a b"></div>
                <div className="text btn-shine">Coming Soon</div>
              </button>
            </div>
          </div>
        </div>
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
                <IoSparklesOutline className="w-8 h-8 text-[#CCFF00]" />
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
                  WHAT IT OFFERS:
                </h4>
                <ul className="space-y-2">
                  {expandedFeature.benefits
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
          </div>
        </div>
      )}

      {/* Inline CSS */}
      <style jsx="true">{`
        /* Container Glow Effect */
        .container-glow {
          position: relative;
          border: 1px solid #0000;
        }

        .container-glow::before {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0.3;
          background: radial-gradient(
              circle at 50% 50%,
              #0000 0,
              #0000 20%,
              #111111aa 50%
            ),
            radial-gradient(ellipse 100% 100%, #fff, #fff0);
          background-size: 3px 3px, auto auto;
          transition: 0.3s;
        }

        .container-glow:hover::before {
          opacity: 0.3;
        }

        .container-glow .a {
          pointer-events: none;
          position: absolute;
          --w: 2px;
          --t: -40px;
          --s: calc(var(--t) * -1);
          --e: calc(100% + var(--t));
          --g: #fff0, #fff3 var(--s), #fffa var(--s), #fff, #fffa var(--e),
            #fff3 var(--e), #fff0;
        }

        .container-glow .a::before {
          content: "";
          position: absolute;
          inset: 0;
          background: inherit;
          filter: blur(4px) url(#unopaq);
          z-index: -2;
        }

        .container-glow .a::after {
          content: "";
          position: absolute;
          inset: 0;
          background: inherit;
          filter: blur(10px) url(#unopaq);
          opacity: 1;
          z-index: -2;
          transition: 0.3s;
        }

        .container-glow:hover .a::after {
          opacity: 1;
        }

        .container-glow .l {
          left: -2px;
        }

        .container-glow .r {
          right: -2px;
        }

        .container-glow .l,
        .container-glow .r {
          background: linear-gradient(var(--g));
          top: var(--t);
          bottom: var(--t);
          width: var(--w);
        }

        .container-glow .t {
          top: -2px;
        }

        .container-glow .b {
          bottom: -2px;
        }

        .container-glow .t,
        .container-glow .b {
          background: linear-gradient(90deg, var(--g));
          left: var(--t);
          right: var(--t);
          height: var(--w);
        }

        .container-glow .backdrop {
          position: absolute;
          inset: -9900%;
          background: radial-gradient(
            circle at 50% 50%,
            #0000 0,
            #0000 20%,
            #111111aa 50%
          );
          background-size: 3px 3px;
          z-index: -1;
        }

        /* Button Styles */
        .button {
          position: relative;
          cursor: pointer;
          border: none;
          width: 140px;
          height: 40px;
          background: #111;
          color: #fff;
          font-family: "Poppins", sans-serif;
          font-weight: 600;
          font-size: 16px;
        }

        .text {
          position: relative;
          z-index: 1;
        }

        .btn-shine {
          background: linear-gradient(
            to right,
            #9f9f9f 0,
            #fff 10%,
            #868686 20%
          );
          background-size: 400px auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 2.5s linear infinite;
          font-weight: 600;
          font-size: 16px;
          text-decoration: none;
          white-space: nowrap;
          font-family: "Poppins", sans-serif;
        }

        @keyframes shine {
          0% {
            background-position: -200px;
          }
          100% {
            background-position: 200px;
          }
        }

        .button::before {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0.3;
          background: radial-gradient(
              circle at 50% 50%,
              #0000 0,
              #0000 20%,
              #111111aa 50%
            ),
            radial-gradient(ellipse 100% 100%, #fff, #fff0);
          background-size: 3px 3px, auto auto;
          transition: 0.3s;
        }

        .button:hover::before {
          opacity: 0.3;
        }

        .button .a {
          pointer-events: none;
          position: absolute;
          --w: 2px;
          --t: -40px;
          --s: calc(var(--t) * -1);
          --e: calc(100% + var(--t));
          --g: #fff0, #fff3 var(--s), #fffa var(--s), #fff, #fffa var(--e),
            #fff3 var(--e), #fff0;
        }

        .button .a::before {
          content: "";
          position: absolute;
          inset: 0;
          background: inherit;
          filter: blur(4px) url(#unopaq);
          z-index: -2;
        }

        .button .a::after {
          content: "";
          position: absolute;
          inset: 0;
          background: inherit;
          filter: blur(10px) url(#unopaq);
          opacity: 1;
          z-index: -2;
          transition: 0.3s;
        }

        .button:hover .a::after {
          opacity: 1;
        }

        .button .l {
          left: -2px;
        }

        .button .r {
          right: -2px;
        }

        .button .l,
        .button .r {
          background: linear-gradient(var(--g));
          top: var(--t);
          bottom: var(--t);
          width: var(--w);
        }

        .button .t {
          top: -2px;
        }

        .button .b {
          bottom: -2px;
        }

        .button .t,
        .button .b {
          background: linear-gradient(90deg, var(--g));
          left: var(--t);
          right: var(--t);
          height: var(--w);
        }

        .button .backdrop {
          position: absolute;
          inset: -9900%;
          background: radial-gradient(
            circle at 50% 50%,
            #0000 0,
            #0000 20%,
            #111111aa 50%
          );
          background-size: 3px 3px;
          z-index: -1;
        }
      `}</style>
    </div>
  );
};

export default AppPromo;
