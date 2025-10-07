"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

export const TextHoverEffect = ({ text }) => {
  const cx1 = useMotionValue(-100);
  const cx2 = useMotionValue(0);
  const glowPosition = useMotionValue(-100);

  const [glowY, setGlowY] = useState("50%");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setGlowY("30%");
      } else {
        setGlowY("50%");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const controls1 = animate(cx1, 100, {
      duration: 6,
      ease: "linear",
      repeat: Infinity,
    });
    const controls2 = animate(cx2, 200, {
      duration: 6,
      ease: "linear",
      repeat: Infinity,
    });
    const controls3 = animate(glowPosition, [-100, 100], {
      duration: 6,
      ease: "linear",
      repeat: Infinity,
    });

    return () => {
      controls1.stop();
      controls2.stop();
      controls3.stop();
    };
  }, [cx1, cx2, glowPosition]);

  const glowPositionStr = useTransform(glowPosition, (v) => `${v}%`);

  return (
    <div className="relative w-full h-[200px] sm:h-[250px] md:h-[70vh] overflow-visible">
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center"
        style={{ pointerEvents: "none" }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 300 120"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg
SVG namespace - World Wide Web Consortium (W3C)
http://www.w3.org/2000/svg is an XML namespace, first defined in the Scalable Vector Graphics (SVG) 1.0 Specification and subsequently added to by SVG 1.1, SVG 1.2 ...
www.w3.org
"
          className="select-none max-w-[90%] sm:max-w-[80%] md:max-w-full"
        >
          <defs>
            <linearGradient
              id="textGradient"
              x1="0%"
              x2="100%"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#00FFFF" />
              <stop offset="25%" stopColor="#FF6700" />
              <stop offset="50%" stopColor="#FF6EC7" />
              <stop offset="75%" stopColor="#B026FF" />
              <stop offset="100%" stopColor="#39FF14" />
            </linearGradient>

            <radialGradient
              id="revealMask1"
              r="20%"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="white" />
              <stop offset="100%" stopColor="black" />
              <animate
                attributeName="cx"
                values="-100%;100%"
                dur="6s"
                repeatCount="indefinite"
              />
            </radialGradient>

            <radialGradient
              id="revealMask2"
              r="20%"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="white" />
              <stop offset="100%" stopColor="black" />
              <animate
                attributeName="cx"
                values="0%;200%"
                dur="6s"
                repeatCount="indefinite"
              />
            </radialGradient>

            <radialGradient
              id="rightGlow"
              cx="50%"
              cy={glowY}
              r="10%"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
              <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
            </radialGradient>

            <mask id="textMask1">
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="url(#revealMask1)"
              />
            </mask>
            <mask id="textMask2">
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="url(#revealMask2)"
              />
            </mask>
          </defs>

          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            strokeWidth="0.3"
            className="fill-transparent stroke-neutral-20 font-[Righteous] text-6xl sm:text-7xl md:text-8xl font-bold"
            style={{ opacity: 0.7 }}
          >
            {text}
          </text>

          <motion.text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            strokeWidth="0.3"
            className="fill-transparent stroke-neutral-20 font-[Righteous] text-6xl sm:text-7xl md:text-8xl font-bold dark:stroke-neutral-800"
            initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 4, ease: "easeInOut" }}
          >
            {text}
          </motion.text>

          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-[Righteous] text-6xl sm:text-7xl md:text-8xl font-bold"
            mask="url(#textMask1)"
            fill="url(#textGradient)"
          >
            {text}
          </text>
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-[Righteous] text-6xl sm:text-7xl md:text-8xl font-bold"
            mask="url(#textMask2)"
            fill="url(#textGradient)"
          >
            {text}
          </text>

          <motion.rect
            x="-30"
            y="0"
            width="60"
            height="100%"
            fill="url(#rightGlow)"
            style={{
              x: glowPositionStr,
              opacity: useTransform(glowPosition, [-100, 100], [0, 0.9]),
              filter: "blur(8px)",
            }}
          />
        </svg>
      </div>
    </div>
  );
};
