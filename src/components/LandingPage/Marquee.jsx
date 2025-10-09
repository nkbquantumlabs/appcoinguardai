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
      marginBottom: "1px",
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

  return (
    <div
      style={styles.container}
      role="region"
      aria-label="Presale announcement"
    >
      <span style={styles.text}>
        Presale is live for <span style={styles.highlight}>$CGAI</span>!!! Join Presale to enjoy exclusive benefits.
      </span>
      <Link
        to="/presale"
        style={styles.button}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor;
          e.currentTarget.style.transform = styles.buttonHover.transform;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = styles.button.backgroundColor;
          e.currentTarget.style.transform = "translateX(0)";
        }}
      >
        Join Presale
        <span style={styles.arrow}>›</span>
      </Link>

      <style>
        {`
          @media (max-width: 768px) {
            .container {
              font-size: 13px;
              padding: 6px 15px;
              flex-direction: column;
              gap: 8px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Marquee;