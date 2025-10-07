import React from "react";
import { IoNewspaperOutline, IoCodeSlashOutline } from "react-icons/io5";
import { TbFileTextSpark } from "react-icons/tb";
import { PiUsersThreeBold } from "react-icons/pi";

const FeatureCards = () => {
  const cards = [
    {
      title: "About Us",
      description:
        "Coinguard is an AI-powered crypto security platform designed to protect users from scams, rug pulls and hidden threats through real-time token scans, smart alerts, and in-depth portfolio insights.",

      icon: <PiUsersThreeBold className="w-12 h-12" />,
      ctaText: "KNOW MORE",
      visualElement: "whitepaper",
      link: "/about",
      // download: true,
    },
    {
      title: "Developer Docs",
      description:
        "Get everything you need to build with Coinguard — from API references and AI model access to integration guides and security tooling. Built for speed, clarity, and scale.",
      icon: <IoCodeSlashOutline className="w-12 h-12" />,
      ctaText: "EXPLORE DOCS",
      visualElement: "api",
      link: "https://docs.coinguard.ai/",
    },
    {
      title: "Blog",
      description:
        "Stay informed with real-time market insights, essential trading safety tips, in-depth feature breakdowns, and the latest platform updates — all from Coinguard’s trusted security experts and dedicated research team.",
      icon: <TbFileTextSpark className="w-12 h-12" />,
      ctaText: "READ POSTS",
      visualElement: "blog",
      link: "https://blog.coinguard.ai/",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-20 text-white">
          Key Documents
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className="relative p-8 bg-white/5 border border-white/20 transition-all duration-300 group min-h-[400px] flex flex-col overflow-hidden lg:hover:bg-white/10"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/5 to-white/10 lg:via-white/0 lg:to-white/0 lg:group-hover:via-white/5 lg:group-hover:to-white/10 transition-all duration-500 pointer-events-none"></div>

            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-[#CCFF00] transition-all duration-300"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-[#CCFF00] transition-all duration-300"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-[#CCFF00] transition-all duration-300"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-[#CCFF00] transition-all duration-300"></div>

            <h3 className="text-lg font-medium text-white mb-4 text-left">
              {card.title}
            </h3>

            <p className="text-white/70 mb-8 text-left">{card.description}</p>

            <div className="my-6 flex justify-center">
              <div className="p-4 rounded-full bg-white/10 text-white">
                {React.cloneElement(card.icon, {
                  className: "w-12 h-12",
                })}
              </div>
            </div>

            <div className="mt-auto flex justify-center">
              {card.download ? (
                <a
                  href={card.link}
                  download
                  className="flex items-center justify-center px-6 py-2 text-white group-hover:text-[#CCFF00] transition-colors duration-300 border border-white/20 group-hover:border-[#CCFF00] rounded-full"
                >
                  {card.ctaText}
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
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              ) : (
                <a
                  href={card.link}
                  className="flex items-center justify-center px-6 py-2 text-white group-hover:text-[#CCFF00] transition-colors duration-300 border border-white/20 group-hover:border-[#CCFF00] rounded-full"
                >
                  {card.ctaText}
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
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureCards;