import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function ModernVideoCarouselPage() {
  const [currentIndex, setCurrentIndex] = useState(2);
  const [direction, setDirection] = useState(0);
  const [mutedStates, setMutedStates] = useState(new Array(6).fill(true));
  const [isInView, setIsInView] = useState(true);
  const videoRefs = useRef([]);
  const carouselRef = useRef(null);

  const videos = [
    {
      id: 1,
      videoSrc: "/video/5.mp4",
      description: "The Coinguard Roadmap: What's Coming Next",
    },
    {
      id: 2,
      videoSrc: "/video/6.mp4",
      description: "After the Token Launch: How We're Going Viral",
    },
    {
      id: 3,
      videoSrc: "/video/1.mp4",
      description: "What is Coinguard? Your AI Security Shield for Crypto",
    },
    {
      id: 4,
      videoSrc: "/video/2.mp4",
      description: "Our Mission: Making Crypto Safer for Everyone",
    },
    {
      id: 5,
      videoSrc: "/video/3.mp4",
      description: "The $CGT Token: Powering the Coinguard Ecosystem",
    },
    {
      id: 6,
      videoSrc: "/video/4.mp4",
      description:
        "Inside the Coinguard App: Features That Protect Your Portfolio",
    },
  ];

  const getVisibleCards = () => {
    const result = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + videos.length) % videos.length;
      result.push({ ...videos[index], position: i + 2, originalIndex: index });
    }
    return result;
  };

  const playMainVideo = () => {
    if (!isInView) return;
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex) {
          video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      playMainVideo();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    playMainVideo();
  }, [currentIndex, isInView]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          playMainVideo();
        } else {
          videoRefs.current.forEach((video) => video && video.pause());
        }
      },
      { threshold: 0.5 }
    );

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    return () => {
      if (carouselRef.current) observer.unobserve(carouselRef.current);
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        videoRefs.current.forEach((video) => video && video.pause());
      } else {
        if (isInView) playMainVideo();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isInView]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const toggleMute = (index) => {
    const updatedMutedStates = [...mutedStates];
    updatedMutedStates[index] = !updatedMutedStates[index];
    setMutedStates(updatedMutedStates);

    const video = videoRefs.current[index];
    if (video) {
      video.muted = updatedMutedStates[index];
      if (!video.paused && isInView) {
        video.play().catch(() => {});
      }
    }
  };

  const cardStyles = {
    0: "hidden sm:block sm:w-28 sm:h-44 md:w-32 md:h-48 opacity-40 rotate-[-10deg] translate-x-[-50%]",
    1: "hidden sm:block sm:w-36 sm:h-56 md:w-40 md:h-60 opacity-60 rotate-[-5deg] translate-x-[-25%]",
    2: "w-72 h-96 sm:w-60 sm:h-[28rem] md:w-72 md:h-[28rem] scale-100 z-30 opacity-100 border-2 border-[#CCFF00] rounded-xl",
    3: "hidden sm:block sm:w-36 sm:h-56 md:w-40 md:h-60 opacity-60 rotate-[5deg] translate-x-[25%]",
    4: "hidden sm:block sm:w-28 sm:h-44 md:w-32 md:h-48 opacity-40 rotate-[10deg] translate-x-[50%]",
  };

  const renderCard = (card, position) => {
    const isMain = position === 2;
    return (
      <div
        key={card.id}
        className={`relative overflow-hidden bg-black/80 shadow-lg transition-all duration-500 ease-in-out transform ${cardStyles[position]}`}
        onClick={() => {
          if (!isMain) setCurrentIndex(card.originalIndex);
        }}
      >
        <video
          ref={(el) => (videoRefs.current[card.originalIndex] = el)}
          src={card.videoSrc}
          className="w-full h-full object-cover rounded-xl"
          autoPlay={isMain && isInView}
          muted={mutedStates[card.originalIndex]}
          loop
          playsInline
        />

        {isMain && (
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={card.id}
              initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col justify-between p-4"
            >
              <div className="flex justify-between items-center" />
              <div className="text-center mt-4">
                <h3 className="text-xl sm:text-2xl font-bold text-white font-['DM_Sans'] uppercase">
                  {card.title}
                </h3>
                <p className="text-white/70 text-sm mt-2 font-['Manrope']">
                  {card.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {isMain && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMute(card.originalIndex);
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/40 hover:bg-white/60 p-3 rounded-full backdrop-blur-md z-50 transition-all duration-300"
          >
            {mutedStates[card.originalIndex] ? (
              <Play className="text-white w-6 h-6" />
            ) : (
              <Volume2 className="text-white w-6 h-6" />
            )}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-['DM_Sans'] uppercase">
            Secure Every <span className="text-[#CCFF00]">Transaction</span>
          </h2>
          <p className="text-white/70 text-base sm:text-lg font-['Manrope'] mt-3 max-w-2xl mx-auto">
            Fortify your digital assets with our real-time blockchain
            monitoring. Smart alerts. Tamper-proof protection. Peace of mind.
          </p>
        </div>

        <div
          id="video-carousel"
          ref={carouselRef}
          className="relative w-full overflow-visible"
        >
          <div className="flex items-center justify-center relative h-[28rem] sm:h-[32rem] px-4 sm:px-8">
            <div className="flex items-center justify-center w-full space-x-0 sm:space-x-6 relative overflow-visible">
              {getVisibleCards().map((card) => renderCard(card, card.position))}
            </div>

            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-0 sm:left-4 transform -translate-y-1/2 z-30 sm:z-10 w-10 h-10 sm:w-12 sm:h-12
    bg-white/30 backdrop-blur-md text-[#CCFF00]/80 rounded-full flex items-center justify-center
    border border-white/20 hover:scale-105 transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            {/* Right Arrow */}
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-0 sm:right-4 transform -translate-y-1/2 z-30 sm:z-10 w-10 h-10 sm:w-12 sm:h-12
    bg-white/30 backdrop-blur-md text-[#CCFF00]/80 rounded-full flex items-center justify-center
    border border-white/20 hover:scale-105 transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <button className="relative px-6 sm:px-8 py-2.5 bg-white/5 border border-white/30 hover:border-transparent transition-all duration-300 group rounded-md">
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-transparent group-hover:border-[#CCFF00] transition-all duration-300" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-transparent group-hover:border-[#CCFF00] transition-all duration-300" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-transparent group-hover:border-[#CCFF00] transition-all duration-300" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-transparent group-hover:border-[#CCFF00] transition-all duration-300" />
            <span className="text-white group-hover:text-[#CCFF00] transition-colors duration-300 font-medium text-sm sm:text-base uppercase">
              {/* <Link target="_blank" to={"https://app.coinguard.ai/"}> */}
              See All Features
              {/* </Link> */}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
