import { Link, useNavigate } from "react-router-dom";

const Marquee = () => {
  const navigate = useNavigate();

  // Handle click on entire marquee
  const handleMarqueeClick = (e) => {
    // Don't navigate if clicking on the specific link
    if (e.target.tagName === 'A' || e.target.closest('a')) return;
    
    // navigate('/presale');
  };
  const styles = {
    marqueeContainer: {
      width: "100%",
      overflow: "hidden",
      backgroundColor: "#fff8e5eb",
      padding: "10px 0",
      whiteSpace: "nowrap",
      fontFamily: "Arial, sans-serif",
      fontSize: "15px",
      fontWeight: "bold",
      color: "#333333",
      textAlign: "center",
      position: "fixed",
      top: "0",
      left: "0",
      zIndex: "60",
    },
    marqueeWrap: {
      width: "100%",
      display: "flex",
      overflow: "hidden",
      position: "relative",
    },
    marqueeContent: {
      display: "flex",
      gap: "25px",
      animation: "ticker 20s linear infinite",
    },
    contentWrapper: {
      display: "inline-flex",
      alignItems: "center",
      gap: "25px",
    },
    link: {
      color: "#d32f2f",
      textDecoration: "underline",
      margin: "0 12px",
      transition: "all 0.3s ease",
    },
    linkHover: {
      color: "#b71c1c",
      textDecoration: "none",
      textShadow: "0 0 8px rgba(211, 47, 47, 0.3)",
    },
    separator: {
      color: "rgba(0, 0, 0, 0.3)",
      fontSize: "13px",
    },
    gradientOverlayLeft: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "50px",
      height: "100%",
      background: "linear-gradient(90deg, #fff8e5eb 0%, transparent 100%)",
      zIndex: 2,
      pointerEvents: "none",
    },
    gradientOverlayRight: {
      position: "absolute",
      top: 0,
      right: 0,
      width: "50px",
      height: "100%",
      background: "linear-gradient(90deg, transparent 0%, #fff8e5eb 100%)",
      zIndex: 2,
      pointerEvents: "none",
    },
  };

  // Single marquee item component
  const MarqueeItem = () => (
    <div style={styles.contentWrapper}>
      <span>Presale is Live</span>
      <Link
        to="/presale"
        style={styles.link}
        onMouseEnter={(e) => {
          e.target.style.color = styles.linkHover.color;
          e.target.style.textDecoration = styles.linkHover.textDecoration;
          e.target.style.textShadow = styles.linkHover.textShadow;
        }}
        onMouseLeave={(e) => {
          e.target.style.color = styles.link.color;
          e.target.style.textDecoration = styles.link.textDecoration;
          e.target.style.textShadow = "none";
        }}
        onClick={(e) => e.stopPropagation()}
      >
        Commit Now
      </Link>
      <span style={styles.separator}>•</span>
    </div>
  );

  // Handle hover for both marquee contents
  const handleMouseEnter = (e) => {
    const marqueeContents = document.querySelectorAll(".marquee-content");
    marqueeContents.forEach((content) => {
      content.style.animationPlayState = "paused";
    });
  };

  const handleMouseLeave = (e) => {
    const marqueeContents = document.querySelectorAll(".marquee-content");
    marqueeContents.forEach((content) => {
      content.style.animationPlayState = "running";
    });
  };

  return (
    <div
      className="marquee-container cursor-pointer"
      style={styles.marqueeContainer}
      role="region"
      aria-label="Presale announcement"
      onClick={handleMarqueeClick}
      title="Click to go to Presale"
    >
      {/* Gradient overlays for smooth edges */}
      <div style={styles.gradientOverlayLeft}></div>
      <div style={styles.gradientOverlayRight}></div>

      <div
        style={styles.marqueeWrap}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Single marquee content that contains both sets of items */}
        <div className="marquee-content" style={styles.marqueeContent}>
          {/* Render multiple items to fill the width */}
          {[...Array(16)].map((_, index) => (
            <MarqueeItem key={index} />
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes ticker {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          @media (max-width: 768px) {
            .marquee-container {
              font-size: 13px;
              padding: 8px 0;
            }
            
            .marquee-content {
              animation-duration: 22s;
            }
          }
          
          @media (max-width: 480px) {
            .marquee-content {
              animation-duration: 25s;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Marquee;
