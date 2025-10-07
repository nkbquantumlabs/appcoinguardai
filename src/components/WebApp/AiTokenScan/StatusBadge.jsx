import React, { useEffect } from "react";
import { useMotionValue, animate } from "framer-motion";

const StatusBadge = ({ status, count }) => {
  const colors = {
    pass: "#16a34a",
    attention: "#ca8a04",
    alert: "#dc2626",
  };

  const countMotion = useMotionValue(0);
  const [displayCount, setDisplayCount] = React.useState(0);

  useEffect(() => {
    const animation = animate(countMotion, count, {
      duration: 0.8,
      onUpdate: (latest) => setDisplayCount(Math.floor(latest)),
    });
    return () => animation.stop();
  }, [count, countMotion]);

  return (
    <div className="flex flex-col items-center">
      <div
        className="rounded-full flex items-center justify-center mb-1 sm:mb-2
                   w-8 h-8 sm:w-8 sm:h-8 md:w-10 md:h-10"
        style={{ backgroundColor: `${colors[status]}20` }}
      >
        <span
          className="text-sm sm:text-base md:text-lg font-bold"
          style={{ color: colors[status] }}
        >
          {displayCount}
        </span>
      </div>
      <span className="text-white/80 text-[10px] sm:text-xs font-semibold">
        {status.toUpperCase()}
      </span>
    </div>
  );
};

export default StatusBadge;
