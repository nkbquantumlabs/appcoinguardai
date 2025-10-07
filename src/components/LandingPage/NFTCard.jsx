import { Player } from "@lottiefiles/react-lottie-player";
import {
  IoChevronBack,
  IoChevronForward,
  IoSparklesOutline,
} from "react-icons/io5";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import botCheckerLottie from "/LandingPage/service-cards-json/g.json?url";

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
        breakpoint: 768,
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
      img: "/LandingPage/elements/nft-chimp.gif",
      type: "gif",
    },
    {
      title: "Bot Checker",
      desc: "Stay safe from fake accounts and automated bots with CoinGuard's advanced AI-powered detection system, ensuring only real users engage with your NFTs.",
      tag: "AI SECURITY",
      lottie: botCheckerLottie,
      type: "lottie",
    },
  ];

  return (
    <div className="bg-black">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-32 relative">
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

      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 md:mb-20 flex items-center justify-center gap-2">
        <span className="text-white">Create Unique</span>
        <span className="text-[#CCFF00]">NFTs</span>
        <span className="bg-[#ccff00] text-black text-xs font-bold px-2 py-0.5 rounded-full">
          NEW
        </span>
      </h2>

      <div className="px-2 md:px-12">
        <Slider {...settings}>
          {cards.map((card, index) => (
            <div key={index} className="px-1 md:px-0">
              <div className="relative bg-black border border-white/30 p-4 md:p-8 lg:p-12 group transition-all duration-300 hover:border-[#CCFF00]/50 mx-auto w-full max-w-none md:max-w-full">
                {/* Corner borders */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/30 group-hover:border-[#CCFF00] transition-colors duration-300"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/30 group-hover:border-[#CCFF00] transition-colors duration-300"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/30 group-hover:border-[#CCFF00] transition-colors duration-300"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/30 group-hover:border-[#CCFF00] transition-colors duration-300"></div>

                <div className="overflow-hidden shadow-2xl flex flex-col md:flex-row h-[520px] md:h-auto">
                  {/* Left side content */}
                  <div className="flex-1 p-4 md:p-8 lg:p-12">
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

                    {/* Coming Soon Button */}
                    <div className="flex justify-start">
                      <div className="backdrop"></div>
                      <button className="button" disabled>
                        <div className="a l"></div>
                        <div className="a r"></div>
                        <div className="a t"></div>
                        <div className="a b"></div>
                        <div className="text btn-shine">Coming Soon</div>
                      </button>
                    </div>
                  </div>

                  {/* Right side image / lottie */}
                  <div className="relative w-full md:w-48 lg:w-64 h-48 md:h-48 lg:h-64 flex items-center justify-center">
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

      {/* Animated button styles */}
      <style jsx="true">{`
        .button {
          position: relative;
          cursor: not-allowed;
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

        .backdrop {
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

        /* Custom dots styling for mobile */
        .slick-dots {
          display: none;
          justify-content: center;
          align-items: center;
          list-style: none;
          padding: 0;
          margin: 0;
          position: absolute;
          bottom: -40px;
          width: 100%;
          left: 0;
          z-index: 10;
        }

        .slick-dots li {
          margin: 0 6px;
        }

        .slick-dots li button {
          border: none;
          background: none;
          padding: 0;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.4);
          cursor: pointer;
          transition: all 0.3s ease;
          outline: none;
        }

        .slick-dots li button:before {
          display: none;
        }

        .slick-dots li.slick-active button {
          background-color: #CCFF00;
          width: 12px;
          height: 12px;
        }

        .slick-dots li button:hover {
          background-color: rgba(204, 255, 0, 0.7);
        }

        /* Mobile: Show dots, hide arrows */
        @media (max-width: 767px) {
          .slick-dots {
            display: flex !important;
          }
          .slick-prev,
          .slick-next {
            display: none !important;
          }
        }

        /* Desktop: Show arrows, hide dots */
        @media (min-width: 768px) {
          .slick-dots {
            display: none !important;
          }
          .slick-prev,
          .slick-next {
            display: block !important;
          }
        }

        /* Mobile slider adjustments */
        @media (max-width: 767px) {
          .slick-slide {
            padding: 0 !important;
          }
          .slick-list {
            margin: 0 !important;
            padding: 0 !important;
          }
          .slick-track {
            display: flex !important;
            align-items: stretch !important;
          }
        }
      `}</style>
      </div>
    </div>
  );
};

export default NFTCard;
