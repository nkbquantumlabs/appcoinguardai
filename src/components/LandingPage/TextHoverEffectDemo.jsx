// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import { TextHoverEffect } from "./ui/text-hover-effect";
// import { motion } from "framer-motion";
// import { BiSolidVolumeMute, BiSolidVolumeFull } from "react-icons/bi";

// export function TextHoverEffectDemo() {
//   const [isDesktop, setIsDesktop] = useState(false);
//   const [isSmallLayout, setIsSmallLayout] = useState(false);
//   const [isVisible, setIsVisible] = useState(true);
//   const [scrolled100vh, setScrolled100vh] = useState(false);

//   // Track window size
//   useEffect(() => {
//     function updateSize() {
//       const width = window.innerWidth;
//       setIsDesktop(width >= 768);
//       setIsSmallLayout(width < 768);
//     }

//     updateSize();
//     window.addEventListener("resize", updateSize);
//     return () => window.removeEventListener("resize", updateSize);
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollY = window.scrollY || window.pageYOffset;
//       const viewportHeight = window.innerHeight;
//       setScrolled100vh(scrollY >= viewportHeight);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       setIsVisible(!document.hidden);
//     };

//     document.addEventListener("visibilitychange", handleVisibilityChange);
//     return () => {
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//     };
//   }, []);

//   const desktopVideoRef = useRef(null);
//   const [desktopMuted, setDesktopMuted] = useState(true);

//   useEffect(() => {
//     if (!isDesktop) return;

//     const video = desktopVideoRef.current;
//     if (!video) return;

//     if (!isVisible || scrolled100vh) {
//       video.pause();
//     } else {
//       video.currentTime = 0;
//       video.muted = true;
//       setDesktopMuted(true);
//       video.play().catch(() => {});
//     }

//     return () => {
//       video.pause();
//     };
//   }, [isDesktop, isVisible, scrolled100vh]);

//   const toggleDesktopMute = () => {
//     const video = desktopVideoRef.current;
//     if (!video) return;

//     if (desktopMuted) {
//       video.muted = false;
//       video
//         .play()
//         .then(() => setDesktopMuted(false))
//         .catch(() => {
//           video.muted = true;
//           setDesktopMuted(true);
//         });
//     } else {
//       video.muted = true;
//       setDesktopMuted(true);
//     }
//   };

//   const mobileVideoRef = useRef(null);
//   const [mobileMuted, setMobileMuted] = useState(true);

//   useEffect(() => {
//     if (isDesktop) return;

//     const video = mobileVideoRef.current;
//     if (!video) return;

//     if (!isVisible || scrolled100vh) {
//       video.pause();
//     } else {
//       video.currentTime = 0;
//       video.muted = true;
//       setMobileMuted(true);
//       video.play().catch(() => {});
//     }

//     return () => {
//       video.pause();
//     };
//   }, [isDesktop, isVisible, scrolled100vh]);

//   const toggleMobileMute = () => {
//     const video = mobileVideoRef.current;
//     if (!video) return;

//     if (mobileMuted) {
//       video.muted = false;
//       video
//         .play()
//         .then(() => setMobileMuted(false))
//         .catch(() => {
//           video.muted = true;
//           setMobileMuted(true);
//         });
//     } else {
//       video.muted = true;
//       setMobileMuted(true);
//     }
//   };

//   if (isDesktop) {
//     return (
//       <div className="relative overflow-hidden bg-black flex items-center justify-center min-h-screen">
//         <motion.div
//           className="absolute inset-0 hidden md:block"
//           initial={{
//             background:
//               "radial-gradient(circle at -25% 50%, #CCFF00 0%, transparent 25%), linear-gradient(90deg, #000000 0%, #000000 100%)",
//           }}
//           animate={{
//             background: [
//               "radial-gradient(circle at -25% 50%, #CCFF00 0%, transparent 25%), linear-gradient(90deg, #000000 0%, #000000 100%)",
//               "radial-gradient(circle at -25% 50%, #CCFF00 0%, transparent 28%), linear-gradient(90deg, #000000 0%, #000000 100%)",
//               "radial-gradient(circle at -25% 50%, #CCFF00 0%, transparent 25%), linear-gradient(90deg, #000000 0%, #000000 100%)",
//             ],
//           }}
//           transition={{
//             duration: 3,
//             ease: "easeInOut",
//             repeat: Infinity,
//           }}
//         />
//         <div className="relative z-20 flex w-full max-w-7xl mx-auto items-center">
//           {/* Video on the left */}
//           <div className="w-1/2 flex justify-center items-center relative">
//             <video
//               ref={desktopVideoRef}
//               src="/video/lily.webm"
//               autoPlay
//               playsInline
//               muted={true}
//               loop
//               className="object-contain scale-105"
//               width={330}
//               height={190}
//             />
//             {/* Fixed U-shaped fade overlay - covers entire bottom area */}
//             <div className="absolute bottom-[-20px] left-0 w-full h-48 pointer-events-none">
//               <svg
//                 width="100%"
//                 height="100%"
//                 viewBox="0 0 100 100"
//                 preserveAspectRatio="none"
//                 className="block"
//               >
//                 <defs>
//                   <linearGradient
//                     id="desktopFade"
//                     x1="0%"
//                     y1="100%"
//                     x2="0%"
//                     y2="0%"
//                   >
//                     <stop offset="0%" stopColor="#000000" stopOpacity="1" />
//                     <stop offset="40%" stopColor="#000000" stopOpacity="0.9" />
//                     <stop offset="60%" stopColor="#000000" stopOpacity="0.6" />
//                     <stop offset="80%" stopColor="#000000" stopOpacity="0.3" />
//                     <stop offset="100%" stopColor="#000000" stopOpacity="0" />
//                   </linearGradient>
//                 </defs>
//                 <rect
//                   x="0"
//                   y="0"
//                   width="100"
//                   height="100"
//                   fill="url(#desktopFade)"
//                 />
//               </svg>
//             </div>
//             <div className="absolute w-20 h-20 pointer-events-none top-[64%] flex items-center justify-center">
//               <img
//                 src="/elements/halo.gif"
//                 alt="Overlay GIF"
//                 className="w-full h-full"
//               />
//               <button
//                 onClick={toggleDesktopMute}
//                 className="absolute inset-0 m-auto w-9 h-9 md:w-12 md:h-12 bg-white bg-opacity-75 backdrop-blur-md rounded-full flex items-center justify-center focus:outline-none pointer-events-auto"
//                 aria-label={desktopMuted ? "Unmute" : "Mute"}
//               >
//                 {desktopMuted ? (
//                   <BiSolidVolumeMute className="text-black text-lg md:text-xl" />
//                 ) : (
//                   <BiSolidVolumeFull className="text-black text-lg md:text-xl" />
//                 )}
//               </button>
//             </div>
//           </div>
//           {/* Text on the right */}
//           <div className="w-1/2 flex justify-center">
//             <TextHoverEffect
//               text="coinguard"
//               className="text-white fill-white"
//             />
//           </div>
//         </div>
//       </div>
//     );
//   } else {
//     return (
//       <div className="relative overflow-hidden bg-black flex flex-col items-center justify-start h-auto px-4 pt-2 pb-4">
//         <div className="w-full text-center m-0 p-0 leading-none">
//           <TextHoverEffect
//             text="coinguard"
//             className="text-white fill-white h-[70px]"
//           />
//         </div>
//         {/* Mobile video container - Fixed centering */}
//         <div className="relative w-full flex justify-center -mt-2">
//           <div className="relative flex justify-center">
//             <video
//               ref={mobileVideoRef}
//               src="/video/lily.webm"
//               autoPlay
//               playsInline
//               muted={true}
//               loop
//               className="object-contain max-w-[75%] sm:max-w-full rounded-md"
//               width={340}
//               height={140}
//             />
//             {/* Fixed U-shaped fade overlay - covers entire bottom area */}
//             <div className="absolute bottom-[-20px] left-0 w-full h-32 pointer-events-none">
//               <svg
//                 width="100%"
//                 height="100%"
//                 viewBox="0 0 100 100"
//                 preserveAspectRatio="none"
//                 className="block"
//               >
//                 <defs>
//                   <linearGradient
//                     id="mobileFade"
//                     x1="0%"
//                     y1="100%"
//                     x2="0%"
//                     y2="0%"
//                   >
//                     <stop offset="0%" stopColor="#000000" stopOpacity="1" />
//                     <stop offset="40%" stopColor="#000000" stopOpacity="0.9" />
//                     <stop offset="60%" stopColor="#000000" stopOpacity="0.6" />
//                     <stop offset="80%" stopColor="#000000" stopOpacity="0.3" />
//                     <stop offset="100%" stopColor="#000000" stopOpacity="0" />
//                   </linearGradient>
//                 </defs>
//                 <rect
//                   x="0"
//                   y="0"
//                   width="100"
//                   height="100"
//                   fill="url(#mobileFade)"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>
//         {/* GIF + button overlay moved a bit higher */}
//         <div className="relative w-16 h-16 -mt-14 sm:-mt-8">
//           <img
//             src="/elements/halo.gif"
//             alt="Overlay GIF"
//             className="w-full h-full rounded-md"
//           />
//           <button
//             onClick={toggleMobileMute}
//             className="absolute inset-0 m-auto w-8 h-8 bg-white bg-opacity-75 backdrop-blur-md rounded-full flex items-center justify-center focus:outline-none"
//             aria-label={mobileMuted ? "Unmute" : "Mute"}
//           >
//             {mobileMuted ? (
//               <BiSolidVolumeMute className="text-black text-base" />
//             ) : (
//               <BiSolidVolumeFull className="text-black text-base" />
//             )}
//           </button>
//         </div>
//       </div>
//     );
//   }
// }



"use client";
import React, { useEffect, useRef, useState } from "react";
import { TextHoverEffect } from "./ui/text-hover-effect";
import { motion } from "framer-motion";
import { BiSolidVolumeMute, BiSolidVolumeFull } from "react-icons/bi";

export function TextHoverEffectDemo() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [scrolled100vh, setScrolled100vh] = useState(false);

  // Track window size
  useEffect(() => {
    function updateSize() {
      const width = window.innerWidth;
      setIsDesktop(width >= 768);
    }

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const viewportHeight = window.innerHeight;
      setScrolled100vh(scrollY >= viewportHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const desktopVideoRef = useRef(null);
  const [desktopMuted, setDesktopMuted] = useState(true);

  useEffect(() => {
    if (!isDesktop) return;

    const video = desktopVideoRef.current;
    if (!video) return;

    if (!isVisible || scrolled100vh) {
      video.pause();
    } else {
      video.currentTime = 0;
      video.muted = true;
      setDesktopMuted(true);
      video.play().catch(() => {});
    }

    return () => {
      video.pause();
    };
  }, [isDesktop, isVisible, scrolled100vh]);

  const toggleDesktopMute = () => {
    const video = desktopVideoRef.current;
    if (!video) return;

    if (desktopMuted) {
      video.muted = false;
      video
        .play()
        .then(() => setDesktopMuted(false))
        .catch(() => {
          video.muted = true;
          setDesktopMuted(true);
        });
    } else {
      video.muted = true;
      setDesktopMuted(true);
    }
  };

  const mobileVideoRef = useRef(null);
  const [mobileMuted, setMobileMuted] = useState(true);

  useEffect(() => {
    if (isDesktop) return;

    const video = mobileVideoRef.current;
    if (!video) return;

    if (!isVisible || scrolled100vh) {
      video.pause();
    } else {
      video.currentTime = 0;
      video.muted = true;
      setMobileMuted(true);
      video.play().catch(() => {});
    }

    return () => {
      video.pause();
    };
  }, [isDesktop, isVisible, scrolled100vh]);

  const toggleMobileMute = () => {
    const video = mobileVideoRef.current;
    if (!video) return;

    if (mobileMuted) {
      video.muted = false;
      video
        .play()
        .then(() => setMobileMuted(false))
        .catch(() => {
          video.muted = true;
          setMobileMuted(true);
        });
    } else {
      video.muted = true;
      setMobileMuted(true);
    }
  };

  if (isDesktop) {
    return (
      <div className="relative overflow-hidden bg-black flex items-center justify-center min-h-screen">
        <motion.div
          className="absolute inset-0 hidden md:block"
          initial={{
            background:
              "radial-gradient(circle at -25% 50%, #CCFF00 0%, transparent 25%), linear-gradient(90deg, #000000 0%, #000000 100%)",
          }}
          animate={{
            background: [
              "radial-gradient(circle at -25% 50%, #CCFF00 0%, transparent 25%), linear-gradient(90deg, #000000 0%, #000000 100%)",
              "radial-gradient(circle at -25% 50%, #CCFF00 0%, transparent 28%), linear-gradient(90deg, #000000 0%, #000000 100%)",
              "radial-gradient(circle at -25% 50%, #CCFF00 0%, transparent 25%), linear-gradient(90deg, #000000 0%, #000000 100%)",
            ],
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />

        {/* Desktop layout - Video on left, text on right */}
        <div className="relative z-20 w-full max-w-6xl mx-auto flex items-start justify-between px-8 -mt-20">
          {/* Video container on left */}
          <div className="w-1/2 flex justify-start -ml-0">
            <div className="relative">
              <video
                ref={desktopVideoRef}
                src="/video/lily.webm"
                autoPlay
                playsInline
                muted={true}
                loop
                className="object-contain scale-105"
                width={330}
                height={190}
              />
              {/* Fixed U-shaped fade overlay */}
              <div className="absolute bottom-[-20px] left-0 w-full h-48 pointer-events-none">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="block"
                >
                  <defs>
                    <linearGradient
                      id="desktopFade"
                      x1="0%"
                      y1="100%"
                      x2="0%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#000000" stopOpacity="1" />
                      <stop offset="40%" stopColor="#000000" stopOpacity="0.9" />
                      <stop offset="60%" stopColor="#000000" stopOpacity="0.6" />
                      <stop offset="80%" stopColor="#000000" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <rect
                    x="0"
                    y="0"
                    width="100"
                    height="100"
                    fill="url(#desktopFade)"
                  />
                </svg>
              </div>
              
              <div className="absolute w-20 h-20 pointer-events-none top-[64%] left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                <img
                  src="/elements/halo.gif"
                  alt="Overlay GIF"
                  className="w-full h-full"
                />

                <button
                  onClick={toggleDesktopMute}
                  className="absolute inset-0 m-auto w-9 h-9 md:w-12 md:h-12 bg-white bg-opacity-75 backdrop-blur-md rounded-full flex items-center justify-center focus:outline-none pointer-events-auto"
                  aria-label={desktopMuted ? "Unmute" : "Mute"}
                >
                  {desktopMuted ? (
                    <BiSolidVolumeMute className="text-black text-lg md:text-xl" />
                  ) : (
                    <BiSolidVolumeFull className="text-black text-lg md:text-xl" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Text container on right */}
          <div className="w-1/2 flex justify-center">
            <div className="relative w-[1000px] h-[600px] overflow-hidden flex items-start pt-4">
              <MovingTextEffect text="coinguard" />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="relative overflow-hidden bg-black flex flex-col items-center justify-start h-auto px-4 pt-2 pb-4">
        <div className="w-full text-center m-0 p-0 leading-none">
          <TextHoverEffect
            text="coinguard"
            className="text-white fill-white h-[70px]"
          />
        </div>

        {/* Mobile video container - Fixed centering */}
        <div className="relative w-full flex justify-center -mt-2">
          <div className="relative flex justify-center">
            <video
              ref={mobileVideoRef}
              src="/video/lily.webm"
              autoPlay
              playsInline
              muted={true}
              loop
              className="object-contain max-w-[75%] sm:max-w-full rounded-md"
              width={340}
              height={140}
            />
            {/* Fixed U-shaped fade overlay - covers entire bottom area */}
            <div className="absolute bottom-[-20px] left-0 w-full h-32 pointer-events-none">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="block"
              >
                <defs>
                  <linearGradient
                    id="mobileFade"
                    x1="0%"
                    y1="100%"
                    x2="0%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#000000" stopOpacity="1" />
                    <stop offset="40%" stopColor="#000000" stopOpacity="0.9" />
                    <stop offset="60%" stopColor="#000000" stopOpacity="0.6" />
                    <stop offset="80%" stopColor="#000000" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <rect
                  x="0"
                  y="0"
                  width="100"
                  height="100"
                  fill="url(#mobileFade)"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* GIF + button overlay moved a bit higher */}
        <div className="relative w-16 h-16 -mt-14 sm:-mt-8">
          <img
            src="/elements/halo.gif"
            alt="Overlay GIF"
            className="w-full h-full rounded-md"
          />
          <button
            onClick={toggleMobileMute}
            className="absolute inset-0 m-auto w-8 h-8 bg-white bg-opacity-75 backdrop-blur-md rounded-full flex items-center justify-center focus:outline-none"
            aria-label={mobileMuted ? "Unmute" : "Mute"}
          >
            {mobileMuted ? (
              <BiSolidVolumeMute className="text-black text-base" />
            ) : (
              <BiSolidVolumeFull className="text-black text-base" />
            )}
          </button>
        </div>
      </div>
    );
  }
}

// New component for the moving text effect
const MovingTextEffect = ({ text }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Container for the oval shape */}
      <div className="relative w-[2500px] h-[2500px]">
        
        {/* Moving text - positioned behind the border */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
            initial={{ x: "100%", y: -10 }}
            animate={{ x: "-100%", y: -10 }}
            transition={{
              duration: 8,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            <span 
              className="font-[Righteous] text-[16rem] font-bold whitespace-nowrap leading-[1.2]"
              style={{
                background: "linear-gradient(45deg, #CCFF00, #00FF88, #0099FF, #FF0099, #CCFF00)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                opacity: 0.7
              }}
            >
              {text}
            </span>
          </motion.div>
        </div>

        {/* OCH image as border overlay - positioned on top */}
        <img 
          src="/image/sch.png" 
          alt="SCH Border" 
          className="w-full h-full object-contain absolute inset-0 z-10 pointer-events-none"
        />
      </div>
    </div>
  );
};
