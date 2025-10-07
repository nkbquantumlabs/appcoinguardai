import { Player } from "@lottiefiles/react-lottie-player";
import {
  IoChevronBack,
  IoChevronForward,
  IoSparklesOutline,
} from "react-icons/io5";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

// Import your Lottie JSON
import botCheckerLottie from "/LandingPage/service-cards-json/g.json?url";

// Custom Prev Arrow
const PrevArrow = ({ onClick }) => (
  <button
    className="absolute left-2 md:-left-16 top-1/2 transform -translate-y-1/2 
      w-8 h-8 md:w-10 md:h-10 flex items-center justify-center 
      border-2 border-[#CCFF00] bg-black/40 backdrop-blur-sm 
      rounded-full text-[#CCFF00] hover:bg-[#CCFF00] hover:text-black 
      transition-all duration-300 z-10"
    onClick={onClick}
  >
    <IoChevronBack className="w-5 h-5 md:w-7 md:h-7" />
  </button>
);

// Custom Next Arrow
const NextArrow = ({ onClick }) => (
  <button
    className="absolute right-2 md:-right-16 top-1/2 transform -translate-y-1/2 
      w-8 h-8 md:w-10 md:h-10 flex items-center justify-center 
      border-2 border-[#CCFF00] bg-black/40 backdrop-blur-sm 
      rounded-full text-[#CCFF00] hover:bg-[#CCFF00] hover:text-black 
      transition-all duration-300 z-10"
    onClick={onClick}
  >
    <IoChevronForward className="w-5 h-5 md:w-7 md:h-7" />
  </button>
);

const NFTCard = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    dotsClass: "slick-dots !bottom-[-50px]",
    responsive: [
      {
        breakpoint: 426,
        settings: {
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  const cards = [
    {
      title: "Mint Your NFTs",
      desc: "Transform your ideas into unique, collectible digital assets with CoinGuard's powerful AI-driven NFT Generator.",
      tag: "AI-POWERED CREATION",
      link: "https://nft.coinguard.ai/",
      img: "/LandingPage/elements/nft-chimp.gif",
      type: "gif",
    },
    {
      title: "Bot Checker",
      desc: "Stay safe from fake accounts and automated bots with CoinGuard's advanced AI-powered detection system, ensuring only real users engage with your NFTs.",
      tag: "AI SECURITY",
      link: "#",
      lottie: botCheckerLottie,
      type: "lottie",
    },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-32 relative">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 md:mb-20 flex items-center justify-center gap-2">
        <span className="text-white">Create Unique</span>
        <span className="text-[#CCFF00]">NFTs</span>
        <span className="bg-[#ccff00] text-black text-xs font-bold px-2 py-0.5 rounded-full">
          NEW
        </span>
      </h2>

      <div className="px-0 md:px-12">
        <Slider {...settings}>
          {cards.map((card, index) => (
            <div key={index}>
              <div className="relative bg-black/50 border border-white/30 p-6 md:p-8 lg:p-12 group transition-all duration-300 hover:border-[#CCFF00]/50 rounded-lg">
                {/* Corner borders */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/30 group-hover:border-[#CCFF00]"></div>
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/30 group-hover:border-[#CCFF00]"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/30 group-hover:border-[#CCFF00]"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/30 group-hover:border-[#CCFF00]"></div>

                <div className="relative flex flex-col lg:flex-row gap-10 items-center">
                  {/* Left side text */}
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <IoSparklesOutline className="w-7 h-7 text-[#CCFF00] mr-3" />
                      <span className="text-sm font-mono tracking-widest text-[#CCFF00]">
                        {card.tag}
                      </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-medium text-white mb-4 leading-tight">
                      {card.title}
                    </h2>

                    <p className="text-white/70 mb-8 text-base max-w-2xl">
                      {card.desc}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl">
                      <a
                        href={card.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative px-6 py-3 bg-transparent text-white font-medium hover:text-[#CCFF00] transition-all flex items-center justify-center border border-white/30 hover:border-[#CCFF00]"
                      >
                        Explore
                      </a>
                    </div>
                  </div>

                  {/* Right side image / lottie */}
                  <div className="relative w-48 h-48 lg:w-64 lg:h-64">
                    <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100">
                      {card.type === "gif" ? (
                        <img
                          src={card.img}
                          alt={card.title}
                          className="w-48 h-48 lg:w-64 lg:h-64 object-cover rounded-lg"
                        />
                      ) : (
                        <Player
                          autoplay
                          loop
                          src={card.lottie}
                          style={{ height: "12rem", width: "12rem" }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <style jsx="true" global="true">{`
        .slick-dots li button:before {
          font-size: 12px;
          color: #ccff00 !important;
          opacity: 0.4;
        }
        .slick-dots li.slick-active button:before {
          color: #ccff00 !important;
          opacity: 1;
          font-size: 14px;
        }
        .slick-dots li button:hover:before {
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
};

export default NFTCard;
