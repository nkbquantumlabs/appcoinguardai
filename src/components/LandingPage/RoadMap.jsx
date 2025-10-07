import React, { useEffect, useRef, useState } from "react";

const roadmapData = [
  {
    title: "Phase 1: Launchpad Activation ",
    points: [
      "Official Coinguard landing page goes live",
      "Token Prebuy opens for early backers",
      "Whitepaper and Litepaper released",
      "Community channels activated (X, Telegram, Discord)",
    ],
    image: "/road-map-gif/1.gif",
  },
  {
    title: "Phase 2: Web App Rollout ",
    points: [
      "Coinguard Web App launches with early access to core features: Token Scans, Rug Shield, Portfolio Overview, and AI Chat. Closed beta testing begins to gather user feedback and optimize the experience.",
    ],
    image: "/road-map-gif/2.gif",
  },
  {
    title: "Phase 3: Mobile App Launch + Anti-Scam Awareness ",
    points: [
      "Coinguard App launches on Play Store & Apple Store",
      "Simple, intuitive UI designed like a token swap interface",
      "Full suite of security tools in one place",
      "Global campaign to educate users on avoiding crypto scams with Coinguard",
    ],
    image: "/road-map-gif/3.gif",
  },
  {
    title: "Phase 4: Coinguard Token (CGT) + Platform Launch ",
    points: [
      "Coinguard launches publicly with the official listing of $CGT and full access to pro tools like AI Chat, Portfolio Monitoring, Dev Scanner, Tokenomics Dashboard, and Staking.",
    ],
    image: "/road-map-gif/4.gif",
  },
  {
    title: "Phase 5: Cross-Chain Expansion ",
    points: [
      "Multi-chain integration across Ethereum, BSC, Solana, and more",
      "Optimized user experience for secure DEX trading",
    ],
    image: "/road-map-gif/5.gif",
  },
  {
    title: "Phase 6: Advanced Feature Upgrade + Verified Token Listing ",
    points: [
      " Coinguard introduces upgraded AI tools, improved UX, and a Verified Token Listing Service. Projects are scanned, vetted, and scored before launch, enabling smarter token suggestions based on real risk data.",
    ],
    image: "/road-map-gif/6.gif",
  },
  {
    title: "Phase 7:Enterprise & Developer Tools ",
    points: [
      " B2B Coinguard API suite",

      "Exchange integration (Coinguard Scanner API)",
      "Enterprise dashboard for DAOs, funds & aggregators",

      "Whitelabel AI security modules",
    ],
    image: "/road-map-gif/7.gif",
  },
];

const roadmapImageSizes = {
  0: { width: 180, height: 180 },
  1: { width: 200, height: 200 },
  2: { width: 200, height: 200 },
  3: { width: 150, height: 150 },
  4: { width: 195, height: 205 },
  5: { width: 175, height: 175 },
  6: { width: 190, height: 190 },
};

const roadmapMobileImageSizes = {
  0: { width: 150, height: 150 },
  1: { width: 170, height: 160 },
  2: { width: 170, height: 160 },
  3: { width: 130, height: 130 },
  4: { width: 145, height: 150 },
  5: { width: 130, height: 130 },
  6: { width: 140, height: 140 },
};

const RoadmapItem = ({ item, index, activeIndex, itemRefs }) => {
  const isActive = index === activeIndex;
  const isLeft = index % 2 === 0;
  const desktopSize = roadmapImageSizes[index] || { width: 140, height: 140 };
  const mobileSize = roadmapMobileImageSizes[index] || {
    width: 100,
    height: 100,
  };

  return (
    <div
      ref={(el) => (itemRefs.current[index] = el)}
      className="relative mb-16 md:mb-24"
      style={{ minHeight: "140px" }}
    >
      <div
        className={`md:hidden absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 z-10 transition-all duration-300 ${
          isActive
            ? "bg-[#CCFF00] border-[#CCFF00] scale-125 shadow-lg shadow-[#CCFF00]/30"
            : "bg-white/30 border-white scale-100"
        }`}
      ></div>

      <div
        className={`hidden md:block z-10 w-4 h-4 rounded-full border-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
          isActive
            ? "bg-[#CCFF00] border-[#CCFF00] scale-125 shadow-lg shadow-[#CCFF00]/30"
            : "bg-white/30 border-white scale-100"
        }`}
      ></div>

      <div className="md:hidden pl-8 pr-4 flex flex-col items-start text-left space-y-4">
        <div className="w-full flex justify-center">
          <img
            src={item.image}
            alt={item.title}
            style={mobileSize}
            className="object-contain rounded-lg"
            loading="lazy"
          />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
          <ul className="list-disc text-white/70 space-y-1 ml-4">
            {item.points.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="hidden md:flex flex-wrap items-center">
        {isLeft && (
          <div className="flex items-center gap-4 max-w-md w-1/2 px-2 lg:px-4 -ml-8 lg:-ml-16">
            <img
              src={item.image}
              alt={item.title}
              style={desktopSize}
              className="object-contain rounded-lg flex-shrink-0"
              loading="lazy"
            />
            <div>
              <h3 className="text-base lg:text-xl font-bold text-white mb-2">
                {item.title}
              </h3>
              <ul className="list-disc text-white/70 space-y-1 ml-4 text-sm lg:text-base">
                {item.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="w-1/2"></div>

        {!isLeft && (
          <div className="flex items-center gap-4 max-w-md w-1/2 px-2 lg:px-4 justify-end text-left ml-auto -mr-8 lg:-mr-16">
            <div>
              <h3 className="text-base lg:text-xl font-bold text-white mb-2">
                {item.title}
              </h3>
              <ul className="list-disc text-white/70 space-y-1 mr-4 text-sm lg:text-base">
                {item.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
            <img
              src={item.image}
              alt={item.title}
              style={desktopSize}
              className="object-contain rounded-lg flex-shrink-0"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </div>
  );
};

const Roadmap = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      let closestIndex = 0;
      let smallestDistance = Infinity;

      itemRefs.current.forEach((ref, index) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        const offset = Math.abs(
          rect.top + rect.height / 2 - window.innerHeight / 2
        );

        if (offset < smallestDistance) {
          smallestDistance = offset;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="py-10 text-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-20">
          Roadmap
        </h2>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-white/20 -translate-x-1/2 z-0"></div>
          <div className="md:hidden absolute left-3 top-0 bottom-0 w-[2px] bg-white/20 z-0"></div>

          {roadmapData.map((item, index) => (
            <RoadmapItem
              key={index}
              item={item}
              index={index}
              activeIndex={activeIndex}
              itemRefs={itemRefs}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
