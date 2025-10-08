// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import { TextHoverEffect } from "./ui/text-hover-effect";
// import { motion } from "framer-motion";

// // Add responsive styles
// const responsiveStyles = `
//   .responsive-coinguard-text {
//     background: url('/elements/bg5.gif') center center no-repeat;
//     background-size: cover;
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     background-clip: text;
//     color: transparent;
//     margin: 0px;
//     line-height: 1.1;
//     font-size: 3rem;
//     letter-spacing: 8px;
//     word-break: break-word;
//     overflow-wrap: break-word;
//   }
  
//   .responsive-subtitle-text {
//     background: linear-gradient(to right, #c4c4c4, #6a6a6a);
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     background-clip: text;
//     color: transparent;
//     margin: 0px;
//     font-size: 1.2rem;
//     letter-spacing: 2px;
//   }
  
//   /* Extra small screens (< 375px) - More conservative sizing */
//   @media (max-width: 374px) {
//     .responsive-coinguard-text {
//       font-size: 2.8rem;
//       letter-spacing: 3px;
//       line-height: 1;
//       padding: 0 8px;
//     }
//     .responsive-subtitle-text {
//       font-size: 1rem;
//       letter-spacing: 1px;
//     }
//   }
  
//   /* Small screens (375px - 479px) - Optimized for 375px */
//   @media (min-width: 375px) and (max-width: 479px) {
//     .responsive-coinguard-text {
//       font-size: 3.5rem;
//       letter-spacing: 4px;
//       line-height: 1;
//       padding: 0 10px;
//     }
//     .responsive-subtitle-text {
//       font-size: 1.2rem;
//       letter-spacing: 1.5px;
//     }
//   }
  
//   /* Medium small screens (480px - 639px) */
//   @media (min-width: 480px) and (max-width: 639px) {
//     .responsive-coinguard-text {
//       font-size: 4.2rem;
//       letter-spacing: 6px;
//       line-height: 1.1;
//     }
//     .responsive-subtitle-text {
//       font-size: 1.4rem;
//       letter-spacing: 2px;
//     }
//   }
  
//   /* Small tablets (640px - 767px) */
//   @media (min-width: 640px) and (max-width: 767px) {
//     .responsive-coinguard-text {
//       font-size: 5rem;
//       letter-spacing: 8px;
//       line-height: 1.1;
//     }
//     .responsive-subtitle-text {
//       font-size: 1.6rem;
//       letter-spacing: 3px;
//     }
//   }
  
//   /* Tablets (768px - 1023px) */
//   @media (min-width: 768px) and (max-width: 1023px) {
//     .responsive-coinguard-text {
//       font-size: 6rem;
//       letter-spacing: 10px;
//     }
//     .responsive-subtitle-text {
//       font-size: 1.8rem;
//       letter-spacing: 3px;
//     }
//   }
  
//   /* Desktop (1024px - 1279px) */
//   @media (min-width: 1024px) and (max-width: 1279px) {
//     .responsive-coinguard-text {
//       font-size: 7.5rem;
//       letter-spacing: 12px;
//     }
//     .responsive-subtitle-text {
//       font-size: 2rem;
//       letter-spacing: 4px;
//     }
//   }
  
//   /* Large desktop (1280px+) */
//   @media (min-width: 1280px) {
//     .responsive-coinguard-text {
//       font-size: 9rem;
//       letter-spacing: 14px;
//     }
//     .responsive-subtitle-text {
//       font-size: 2.2rem;
//       letter-spacing: 4px;
//     }
//   }
// `;

// export function TextHoverEffectDemo() {
//   const [isDesktop, setIsDesktop] = useState(false);
//   const [isVisible, setIsVisible] = useState(true);
//   const [scrolled100vh, setScrolled100vh] = useState(false);
//   const vantaRef = useRef(null);
//   const vantaEffect = useRef(null);

//   // Inject responsive styles
//   useEffect(() => {
//     const styleElement = document.createElement("style");
//     styleElement.textContent = responsiveStyles;
//     document.head.appendChild(styleElement);

//     return () => {
//       document.head.removeChild(styleElement);
//     };
//   }, []);

//   // Track window size
//   useEffect(() => {
//     function updateSize() {
//       const width = window.innerWidth;
//       setIsDesktop(width >= 768);
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

//   // Vanta.js effect with better Three.js conflict prevention
//   useEffect(() => {
//     let vantaScript, threeScript;
//     let scriptsLoaded = false;

//     const loadVanta = () => {
//       // Check if scripts are already being loaded
//       if (scriptsLoaded) return;
//       scriptsLoaded = true;

//       // Check if Three.js is already loaded globally
//       if (typeof window !== "undefined" && !window.THREE) {
//         // Check if Three.js script already exists in DOM
//         const existingThreeScript = document.querySelector(
//           'script[src*="three.min.js"]'
//         );
//         if (!existingThreeScript) {
//           threeScript = document.createElement("script");
//           threeScript.src =
//             "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
//           threeScript.onload = () => {
//             loadVantaWaves();
//           };
//           threeScript.onerror = () => {
//             console.warn("Failed to load Three.js");
//             scriptsLoaded = false;
//           };
//           document.head.appendChild(threeScript);
//         } else {
//           // Wait for existing script to load
//           const checkThree = setInterval(() => {
//             if (window.THREE) {
//               clearInterval(checkThree);
//               loadVantaWaves();
//             }
//           }, 100);
//         }
//       } else {
//         loadVantaWaves();
//       }
//     };

//     const loadVantaWaves = () => {
//       if (
//         typeof window !== "undefined" &&
//         (!window.VANTA || !window.VANTA.WAVES)
//       ) {
//         const existingVantaScript = document.querySelector(
//           'script[src*="vanta.waves"]'
//         );
//         if (!existingVantaScript) {
//           vantaScript = document.createElement("script");
//           vantaScript.src =
//             "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js";
//           vantaScript.onload = () => {
//             initializeVanta();
//           };
//           vantaScript.onerror = () => {
//             console.warn("Failed to load Vanta.js");
//           };
//           document.head.appendChild(vantaScript);
//         } else {
//           const checkVanta = setInterval(() => {
//             if (window.VANTA && window.VANTA.WAVES) {
//               clearInterval(checkVanta);
//               initializeVanta();
//             }
//           }, 100);
//         }
//       } else {
//         initializeVanta();
//       }
//     };

//     const initializeVanta = () => {
//       if (
//         typeof window !== "undefined" &&
//         window.VANTA &&
//         window.VANTA.WAVES &&
//         vantaRef.current &&
//         !vantaEffect.current
//       ) {
//         try {
//           vantaEffect.current = window.VANTA.WAVES({
//             el: vantaRef.current,
//             mouseControls: true,
//             touchControls: true,
//             gyroControls: false,
//             minHeight: 200.0,
//             minWidth: 200.0,
//             scale: 1.0,
//             scaleMobile: 1.0,
//             color: 0x0,
//             waveHeight: 20,
//             waveSpeed: 0.5,
//             zoom: 0.75,
//             forceAnimate: true,
//           });
//         } catch (error) {
//           console.warn("Failed to initialize Vanta effect:", error);
//         }
//       }
//     };

//     // Delay initialization to avoid conflicts
//     const timer = setTimeout(() => {
//       loadVanta();
//     }, 100);

//     return () => {
//       clearTimeout(timer);
//       if (vantaEffect.current) {
//         try {
//           vantaEffect.current.destroy();
//           vantaEffect.current = null;
//         } catch (error) {
//           console.warn("Error destroying Vanta effect:", error);
//         }
//       }
//       // Don't remove scripts as they might be used by other components
//     };
//   }, []);

//   if (isDesktop) {
//     return (
//       <div
//         className="relative overflow-hidden bg-black min-h-screen"
//         style={{ width: "100%" }}
//       >
//         {/* Background layer that moves up */}
//         <div
//           ref={vantaRef}
//           className="absolute inset-0 -top-20"
//           style={{ width: "100%", height: "calc(100% + 80px)" }}
//         ></div>

//         {/* Content layer stays in original position - perfectly centered */}
//         <div className="relative z-20 w-full h-full min-h-screen flex flex-col items-center justify-center">
//           <div className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center justify-center">
//             <VerticalLayoutWithCube />
//           </div>
//         </div>
//       </div>
//     );
//   } else {
//     return (
//       <div
//         className="relative overflow-hidden bg-black flex flex-col items-center justify-center h-auto py-8 min-h-screen"
//         style={{
//           width: "100vw",
//           minWidth: "100vw",
//           marginLeft: "calc(-50vw + 50%)",
//           marginRight: "calc(-50vw + 50%)",
//         }}
//       >
//         {/* Background layer that moves up */}
//         <div
//           ref={vantaRef}
//           className="absolute inset-0 -top-16"
//           style={{ width: "100%", height: "calc(100% + 64px)" }}
//         ></div>

//         {/* Content layer - text stays in original position */}
//         <div className="relative z-20 w-full flex flex-col items-center justify-center max-w-screen-sm mx-auto px-4">
//           <VerticalLayoutWithCube isMobile={true} />
//         </div>
//       </div>
//     );
//   }
// }

// // Component with vertical layout: Cube on top, then text, then subtitle
// const VerticalLayoutWithCube = ({ isMobile = false }) => {
//   return (
//     <div className="flex flex-col items-center justify-center w-full">
//       {/* Cube on top - Adjusted for mobile */}
//       <div className="w-full max-w-[140px] xs:max-w-[150px] sm:max-w-[180px] flex justify-center items-center mb-4 sm:mb-6 -mt-8 sm:-mt-0">
//         <img
//           src="/elements/cube.gif"
//           alt="Crypto Security GIF"
//           className="w-full h-auto rounded-xl shadow-lg"
//           loading="lazy"
//         />
//       </div>

//       {/* coinguard text in middle - Now properly responsive */}
//       <div className="mb-2 sm:mb-4 w-full px-2">
//         <h1 className="font-['Righteous'] font-bold text-center responsive-coinguard-text break-words">
//           coinguard
//         </h1>
//       </div>

//       {/* crypto security subtitle at bottom */}
//       {/* <div className="w-full px-2">
//         <p className="font-['Caveat'] text-center responsive-subtitle-text">
//           Crypto Security
//         </p>
//       </div> */}
//     </div>
//   );
// };

// // Main TopHero component
// function TopHero() {
//   return <TextHoverEffectDemo />;
// }

// export default TopHero;


import React, { useEffect, useState, useRef } from "react";
import { TextHoverEffect } from "./ui/text-hover-effect";
import { motion } from "framer-motion";
// Add responsive styles
const responsiveStyles = `
  .responsive-coinguard-text {
    background: url('/LandingPage/elements/bg5.gif') center center no-repeat;
    background-size: cover;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
    margin: 0px;
    line-height: 1.1;
    font-size: 3rem;
    letter-spacing: 8px;
  }
  
  .responsive-subtitle-text {
    background: linear-gradient(to right, #c4c4c4, #6a6a6a);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
    margin: 0px;
    font-size: 1.2rem;
    letter-spacing: 2px;
  }
  
  /* Extra small screens (< 360px) */
  @media (max-width: 359px) {
    .responsive-coinguard-text {
      font-size: 2.8rem;
      letter-spacing: 4px;
    }
    .responsive-subtitle-text {
      font-size: 1.0rem;
      letter-spacing: 1px;
    }
  }
  
  /* Small screens (360px - 400px) */
  @media (min-width: 360px) and (max-width: 400px) {
    .responsive-coinguard-text {
      font-size: 3.0rem;
      letter-spacing: 5px;
    }
    .responsive-subtitle-text {
      font-size: 1.1rem;
      letter-spacing: 1.5px;
    }
  }
  
  /* Previous extra small (< 380px) - now overridden for 360-400 */
  @media (max-width: 374px) {
    .responsive-coinguard-text {
      font-size: 3.2rem;
      letter-spacing: 5px;
    }
    .responsive-subtitle-text {
      font-size: 1.1rem;
      letter-spacing: 1px;
    }
  }
  
  /* Small screens (380px - 479px) */
  @media (min-width: 380px) {
    .responsive-coinguard-text {
      font-size: 4.2rem;
      letter-spacing: 7px;
    }
    .responsive-subtitle-text {
      font-size: 1.4rem;
      letter-spacing: 2px;
    }
  }
  
  /* Medium small screens (480px - 639px) */
  @media (min-width: 480px) {
    .responsive-coinguard-text {
      font-size: 5.2rem;
      letter-spacing: 9px;
    }
    .responsive-subtitle-text {
      font-size: 1.6rem;
      letter-spacing: 3px;
    }
  }
  
  /* Small tablets (640px - 767px) */
  @media (min-width: 640px) {
    .responsive-coinguard-text {
      font-size: 5.5rem;
      letter-spacing: 10px;
    }
    .responsive-subtitle-text {
      font-size: 1.8rem;
      letter-spacing: 4px;
    }
  }
  
  /* Tablets (768px - 1023px) */
  @media (min-width: 768px) {
    .responsive-coinguard-text {
      font-size: 7rem;
      letter-spacing: 12px;
    }
    .responsive-subtitle-text {
      font-size: 2rem;
      letter-spacing: 4px;
    }
  }
  
  /* Desktop (1024px - 1279px) */
  @media (min-width: 1024px) {
    .responsive-coinguard-text {
      font-size: 8.5rem;
      letter-spacing: 14px;
    }
    .responsive-subtitle-text {
      font-size: 2.3rem;
      letter-spacing: 5px;
    }
  }
  
  /* Large desktop (1280px+) */
  @media (min-width: 1280px) {
    .responsive-coinguard-text {
      font-size: 10rem;
      letter-spacing: 15px;
    }
    .responsive-subtitle-text {
      font-size: 2.5rem;
      letter-spacing: 5px;
    }
  }
`;
export function TextHoverEffectDemo() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [scrolled100vh, setScrolled100vh] = useState(false);
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);
  // Inject responsive styles
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = responsiveStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
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
  // Vanta.js effect with better Three.js conflict prevention
  useEffect(() => {
    let vantaScript, threeScript;
    let scriptsLoaded = false;
    
    const loadVanta = () => {
      // Check if scripts are already being loaded
      if (scriptsLoaded) return;
      scriptsLoaded = true;
      
      // Check if Three.js is already loaded globally
      if (typeof window !== 'undefined' && !window.THREE) {
        // Check if Three.js script already exists in DOM
        const existingThreeScript = document.querySelector('script[src*="three.min.js"]');
        if (!existingThreeScript) {
          threeScript = document.createElement('script');
          threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
          threeScript.onload = () => {
            loadVantaWaves();
          };
          threeScript.onerror = () => {
            console.warn('Failed to load Three.js');
            scriptsLoaded = false;
          };
          document.head.appendChild(threeScript);
        } else {
          // Wait for existing script to load
          const checkThree = setInterval(() => {
            if (window.THREE) {
              clearInterval(checkThree);
              loadVantaWaves();
            }
          }, 100);
        }
      } else {
        loadVantaWaves();
      }
    };
    const loadVantaWaves = () => {
      if (typeof window !== 'undefined' && (!window.VANTA || !window.VANTA.WAVES)) {
        const existingVantaScript = document.querySelector('script[src*="vanta.waves"]');
        if (!existingVantaScript) {
          vantaScript = document.createElement('script');
          vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js';
          vantaScript.onload = () => {
            initializeVanta();
          };
          vantaScript.onerror = () => {
            console.warn('Failed to load Vanta.js');
          };
          document.head.appendChild(vantaScript);
        } else {
          const checkVanta = setInterval(() => {
            if (window.VANTA && window.VANTA.WAVES) {
              clearInterval(checkVanta);
              initializeVanta();
            }
          }, 100);
        }
      } else {
        initializeVanta();
      }
    };
    const initializeVanta = () => {
      if (typeof window !== 'undefined' && window.VANTA && window.VANTA.WAVES && vantaRef.current && !vantaEffect.current) {
        try {
          vantaEffect.current = window.VANTA.WAVES({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x0,
            waveHeight: 20,
            waveSpeed: 0.5,
            zoom: 0.75,
            forceAnimate: true
          });
        } catch (error) {
          console.warn('Failed to initialize Vanta effect:', error);
        }
      }
    };
    // Delay initialization to avoid conflicts
    const timer = setTimeout(() => {
      loadVanta();
    }, 100);
    return () => {
      clearTimeout(timer);
      if (vantaEffect.current) {
        try {
          vantaEffect.current.destroy();
          vantaEffect.current = null;
        } catch (error) {
          console.warn('Error destroying Vanta effect:', error);
        }
      }
      // Don't remove scripts as they might be used by other components
    };
  }, []);
  if (isDesktop) {
    return (
      <div className="relative overflow-hidden bg-black min-h-screen" style={{ width: '100%' }}>
        {/* Background layer that moves up */}
        <div ref={vantaRef} className="absolute inset-0 top-0" style={{ width: '100%', height: '100%' }}></div>
        
        {/* Content layer stays in original position - perfectly centered */}
        <div className="relative z-20 w-full h-full min-h-screen flex flex-col items-center justify-center pt-20 sm:pt-24 lg:pt-28">
          <div className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center justify-center">
            <VerticalLayoutWithCube />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="relative overflow-hidden bg-black flex flex-col items-center justify-center h-auto py-8 min-h-screen pt-20 sm:pt-24" style={{ width: '100vw', minWidth: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}>
        {/* Background layer that moves up */}
        <div ref={vantaRef} className="absolute inset-0 top-0" style={{ width: '100%', height: '100%' }}></div>
        
        {/* Content layer - text stays in original position */}
        <div className="relative z-20 w-full flex flex-col items-center justify-center max-w-screen-sm mx-auto px-2">
          <VerticalLayoutWithCube isMobile={true} />
        </div>
      </div>
    );
  }
}
// Component with vertical layout: Cube on top, then text, then subtitle
const VerticalLayoutWithCube = ({ isMobile = false }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Cube on top - Only cube moves up on small screens */}
      <div className="w-full max-w-[160px] xs:max-w-[180px] sm:max-w-[200px] md:max-w-[220px] lg:max-w-[240px] xl:max-w-[260px] flex justify-center items-center mb-4 sm:mb-6 lg:mb-8 -mt-10 sm:-mt-0">
        <img
          src="/LandingPage/elements/cube.gif"
          alt="Crypto Security GIF"
          className="w-full h-auto rounded-xl shadow-lg"
          loading="lazy"
        />
      </div>
      {/* coinguard text in middle - Fully responsive */}
      <div className="mb-2 sm:mb-4 lg:mb-6 w-full">
        <h1 className="font-['Righteous'] font-bold text-center responsive-coinguard-text">
          coinguard
        </h1>
      </div>
      {/* crypto security subtitle at bottom - Fully responsive */}
      {/* <div className="w-full">
        <p className="font-['Caveat'] text-center responsive-subtitle-text">
          Crypto Security
        </p>
      </div> */}
    </div>
  );
};
// Main TopHero component
function TopHero() {
  return <TextHoverEffectDemo />;
}
export default TopHero;