import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GrScan } from "react-icons/gr";
import { RiStockFill, RiRobot2Fill } from "react-icons/ri";
import { FaIdCard } from "react-icons/fa";
import { BsDropletHalf } from "react-icons/bs";
import { TbRobotOff } from "react-icons/tb";
import { GiWhaleTail } from "react-icons/gi";

const lottieAnimations = [
  "/LandingPage/service-cards-json/a.json",
  "/LandingPage/service-cards-json/b.json",
  "/LandingPage/service-cards-json/c.json",
  "/LandingPage/service-cards-json/d.json",
  "/LandingPage/service-cards-json/e.json",
  "/LandingPage/service-cards-json/f.json",
];

const services = [
  {
    title: "Early App Features",
    subtitle: " Token Scans",
    description:
      "Scan smart contracts with AI to detect scams, honeypots, risky permissions, and hidden functions. Integrate real-time token analysis with contextual explanations and actionable alerts.",
    buttons: ["Early Access "],
    link: "/app/ai-token-scan",
    align: "left",
  },
  {
    title: "Early App Features",
    subtitle: "Rug Shield",
    description:
      "Instantly scans tokens for rug pull risk by analyzing contract ownership, mint controls, LP status, and hidden dev privileges. Delivers a clear risk score and threat breakdown before you buy.",
    buttons: ["Early Access"],
    link: "/app/rugshield",
    align: "right",
    overlap: "md:-mt-24 md:z-30",
  },
  {
    title: "Early App Features",
    subtitle: "Honeypot Detector",
    description:
      "Scan Solana, Ethereum & BSC tokens with our AI honeypot finder. Instantly check if a token is safe, blacklist/whitelist status & avoid crypto scams.",
    buttons: ["Early Access"],
    link: "/app/honeypot-detector",
    align: "left",
    overlap: "md:-mt-24",
  },
  {
    title: "Early App Features",
    subtitle: "Coinguard AI",
    description:
      "Ask anything — from Is this token safe? — and get smart, real-time answers. Built for safe trading, education, and DeFi co-piloting.",
    buttons: ["Early Access"],
    link: "/app/ai-chat",
    align: "right",
    overlap: "md:-mt-24 md:z-30",
  },
  {
    title: "Early App Features",
    subtitle: "Liquidity Scanner",
    description:
      "Scan Solana, Ethereum, and BSC tokens in seconds. Instantly verify token safety, check blacklist/whitelist status, and dodge crypto scams before they happen.",
    buttons: ["Early Access"],
    link: "/app/liquidity-scanner",
    align: "left",
    overlap: "md:-mt-24",
  },
  {
    title: "Early App Features",
    subtitle: "Whale Tracker",
    description:
      "Monitor large wallet movements and whale activity in real-time. Track smart money, identify accumulation patterns, and get alerts for significant transactions.",
    buttons: ["Early Access"],
    link: "/app/whale-tracker",
    align: "right",
    overlap: "md:-mt-24 md:z-30",
  },
];

const ServiceCards = () => {
  const cardRefs = useRef([]);
  const lottieInstances = useRef([]);
  const [visibleStates, setVisibleStates] = useState(
    Array(services.length).fill(false)
  );
  const navigate = useNavigate();

  useEffect(() => {
    services.forEach((_, index) => {
      const container = document.getElementById(`lottie-${index}`);
      const mobileContainer = document.getElementById(`lottie-mobile-${index}`);

      if (container && window.lottie) {
        const anim = window.lottie.loadAnimation({
          container,
          renderer: "svg",
          loop: true,
          autoplay: false,
          path: lottieAnimations[index],
        });
        lottieInstances.current[index] = { desktop: anim };
      }

      if (mobileContainer && window.lottie) {
        const mobileAnim = window.lottie.loadAnimation({
          container: mobileContainer,
          renderer: "svg",
          loop: true,
          autoplay: false,
          path: lottieAnimations[index],
        });
        lottieInstances.current[index] = {
          ...lottieInstances.current[index],
          mobile: mobileAnim,
        };
      }
    });

    return () => {
      lottieInstances.current.forEach((anim) => {
        anim?.desktop?.destroy();
        anim?.mobile?.destroy();
      });
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const newStates = [...visibleStates];
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            newStates[index] = true;
            lottieInstances.current[index]?.desktop?.play();
            lottieInstances.current[index]?.mobile?.play();
          } else {
            lottieInstances.current[index]?.desktop?.stop();
            lottieInstances.current[index]?.mobile?.stop();
          }
        });
        setVisibleStates(newStates);
      },
      { threshold: 0.3 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      cardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [visibleStates]);

  const renderMobileIcon = (index) => {
    const iconClass = "-rotate-45 text-black text-xl";
    switch (index) {
      case 0:
        return <GrScan className={iconClass} />;
      case 1:
        return <RiStockFill className={iconClass} />;
      case 2:
        return <FaIdCard className={iconClass} />;
      case 3:
        return <RiRobot2Fill className={iconClass} />;
      case 4:
        return <BsDropletHalf className={iconClass} />;
      case 5:
        return <GiWhaleTail className={iconClass} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full px-4 py-24 overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-20 text-white">
          Current Features
        </h2>
      </div>

      <div className="max-w-[1200px] mx-auto flex flex-col gap-y-10 relative">
        {services.map((service, index) => {
          const isRight = service.align === "right";
          const overlapClass = service.overlap || "";
          // Desktop sizes remain the same
          const baseSizeClass =
            index === 0 || index === 1
              ? "w-72 h-72"
              : index === 3
              ? "w-72 h-72"
              : "w-40 h-40";

          // Increased mobile sizes for indices 0, 1, and 3 only
          const mobileSizeClass =
            index === 0 || index === 1 || index === 3
              ? "w-32 h-32" // Larger size for indices 0, 1, and 3
              : "w-24 h-24"; // Original size for other indices

          const lottieInnerScale =
            index === 0
              ? 1.7
              : index === 1
              ? 0.8
              : index === 2
              ? 1
              : index === 3
              ? 1.2
              : index === 5
              ? 1.2
              : 1.3;

          // Increased mobile scaling for indices 0, 1, and 3 only
          const mobileLottieScale =
            index === 0
              ? 1.6 // Increased from 1.2
              : index === 1
              ? 0.8 // Increased from 0.6
              : index === 2
              ? 0.9 // Same as before
              : index === 3
              ? 1.1 // Increased from 0.9
              : index === 5
              ? 0.9
              : 1.0;

          const isVisible = visibleStates[index];

          return (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              data-index={index}
              className={`relative rounded-[2rem] border border-white/10 backdrop-blur-md
                bg-white/5 group overflow-hidden transition-all duration-500 md:duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
                w-full md:w-[60%] md:mb-8
                ${overlapClass}
                ${isRight ? "md:ml-auto md:mr-4" : "md:mr-auto md:ml-4"}
                hover:border-[#CCFF00]/50 md:border-[#CCFF00]/30 md:hover:border-[#CCFF00]/60
                transform 
                ${
                  isVisible
                    ? "opacity-100 blur-0 translate-x-0"
                    : `${
                        index % 2 === 0 ? "-translate-x-16" : "translate-x-16"
                      } opacity-0 blur-md`
                }
              `}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-white/0 group-hover:via-white/5 group-hover:to-white/10 transition-all duration-500 pointer-events-none"></div>
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#CCFF00]/30 group-hover:border-[#CCFF00]/60 transition-all duration-300"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#CCFF00]/30 group-hover:border-[#CCFF00]/60 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#CCFF00]/30 group-hover:border-[#CCFF00]/60 transition-all duration-300"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#CCFF00]/30 group-hover:border-[#CCFF00]/60 transition-all duration-300"></div>

              <div className="grid md:grid-cols-5 p-8 md:p-10 gap-8 items-center relative">
                <div className="md:col-span-3 text-white">
                  <h2 className="text-lg md:text-2xl font-light text-gray-300 leading-tight flex items-center justify-between">
                    <span className="flex-1 min-w-0">
                      <span className="block text-white/70 text-sm md:text-lg pb-2 whitespace-nowrap overflow-hidden text-ellipsis">
                        {service.title}
                      </span>
                      <span className="block text-white font-bold text-xl md:text-4xl">
                        {service.subtitle}
                      </span>
                    </span>
                    {/* Mobile Lottie Container - Larger for indices 0, 1, and 3 */}
                    <div className="md:hidden relative flex-shrink-0 ml-4">
                      <div
                        id={`lottie-mobile-${index}`}
                        className={`relative ${mobileSizeClass}`}
                        style={{
                          transform: `scale(${mobileLottieScale})`,
                          transformOrigin: "center center",
                        }}
                      ></div>
                    </div>
                  </h2>
                  <p className="text-sm md:text-base text-white/70 mt-4">
                    {service.description}
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={() => navigate(service.link)}
                      className="flex items-center justify-center px-6 py-2 text-white group-hover:text-[#CCFF00] transition-colors duration-300 border border-white/20 rounded-full group-hover:border-[#CCFF00]/50"
                    >
                      {service.buttons[0]}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:stroke-[#CCFF00]"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Desktop Lottie Container - Unchanged */}
                <div className="hidden md:col-span-2 md:flex justify-end">
                  <div
                    id={`lottie-${index}`}
                    className={`relative ${baseSizeClass}`}
                    style={{
                      transform: `scale(${lottieInnerScale})`,
                      transformOrigin: "center center",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceCards;
