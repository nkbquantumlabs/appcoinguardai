import React from "react";
import { Link } from "react-router-dom";

const Marquee = () => {
  const styles = {
    container: {
      width: "100%",
      backgroundColor: "#fff8e5eb",
      padding: "8px 20px",
      fontFamily: "Arial, sans-serif",
      position: "fixed",
      top: "0",
      left: "0",
      zIndex: "60",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "15px",
    },
    mobileContainer: {
      overflow: "hidden",
      whiteSpace: "nowrap",
      position: "relative",
      width: "100%",
    },
    scrollingText: {
      display: "inline-block",
      animation: "scroll-left 45s linear infinite",
      paddingRight: "100%",
    },
    text: {
      fontSize: "16px",
      fontWeight: "normal",
      color: "#333333",
      margin: 0,
    },
    highlight: {
      fontWeight: "700",
      color: "#d32f2f",
    },
    button: {
      backgroundColor: "#000000",
      color: "#ffffff",
      padding: "6px 18px",
      border: "none",
      borderRadius: "2px",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      textDecoration: "none",
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      transition: "all 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#333333",
      transform: "translateX(2px)",
    },
    arrow: {
      fontSize: "16px",
      transition: "transform 0.3s ease",
    },
  };

  // Base message to display
  const message = (
    <>
      Presale is live for <span style={styles.highlight}>$CGAI</span>!!! Join
      Presale to enjoy exclusive benefits.
    </>
  );

  // Automatically generate multiple copies for marquee effect
  const repeatedMessages = Array.from({ length: 15 }).map((_, i) => (
    <span key={i}>
      {message}
      &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
    </span>
  ));

  return (
    <div
      style={styles.container}
      className="marquee-container"
      role="region"
      aria-label="Presale announcement"
    >
      {/* Desktop Content */}
      <div className="marquee-desktop-content">
        <span style={styles.text}>{message}</span>
        <Link
          to="/presale"
          style={styles.button}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor =
              styles.buttonHover.backgroundColor;
            e.currentTarget.style.transform = styles.buttonHover.transform;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor =
              styles.button.backgroundColor;
            e.currentTarget.style.transform = "translateX(0)";
          }}
        >
          Join Presale
          <span style={styles.arrow}>›</span>
        </Link>
      </div>

      {/* Mobile Content - Continuous Scrolling */}
      <div className="marquee-mobile-content" style={styles.mobileContainer}>
        <div style={styles.scrollingText}>{repeatedMessages}</div>
        <Link to="/presale" className="mobile-fixed-button" style={styles.button}>
          Join Presale <span style={styles.arrow}>›</span>
        </Link>
      </div>

      <style>
        {`
          @keyframes scroll-left {
            0% {
              transform: translate3d(100%, 0, 0);
            }
            100% {
              transform: translate3d(-200%, 0, 0);
            }
          }

          .marquee-desktop-content {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 15px;
          }

          .marquee-mobile-content {
            display: none;
          }

          @media (max-width: 768px) {
            .marquee-desktop-content {
              display: none;
            }

            .marquee-mobile-content {
              display: flex;
              align-items: center;
              overflow: hidden;
              white-space: nowrap;
              width: 100%;
              position: relative;
            }

            .marquee-container {
              padding: 8px 0 !important;
            }

            .marquee-mobile-content span {
              font-size: 14px;
            }

            .mobile-fixed-button {
              position: absolute !important;
              right: 10px !important;
              top: 50% !important;
              transform: translateY(-50%) !important;
              font-size: 12px !important;
              padding: 6px 12px !important;
              z-index: 10 !important;
              background-color: #000000 !important;
              color: #ffffff !important;
              text-decoration: none !important;
              border-radius: 2px !important;
              display: inline-flex !important;
              align-items: center !important;
              gap: 4px !important;
              box-shadow: 0 2px 4px rgba(0,0,0,0.2) !important;
            }

            .mobile-fixed-button:hover {
              background-color: #333333 !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Marquee;
