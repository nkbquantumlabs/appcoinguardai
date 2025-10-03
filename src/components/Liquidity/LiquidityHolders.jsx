import React, { useEffect, useState } from "react";

const LiquidityHolders = ({ holders }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const truncateAddress = (addr, screenWidth) => {
    if (screenWidth >= 1024) {
      return `${addr.slice(0, 12)}...${addr.slice(-8)}`; // 12...8 for desktop with ellipsis
    }
    if (screenWidth <= 480) {
      return `${addr.slice(0, 5)}...${addr.slice(-5)}`; // 5...5 for small screens
    }
    return `${addr.slice(0, 10)}....${addr.slice(-10)}`; // 10....10 for tablets
  };

  const copyToClipboard = (address) => {
    navigator.clipboard.writeText(address);
    alert("Address copied to clipboard!"); // Alert on copy
  };

  const formatBalance = (balance) => {
    if (!balance || balance === 0) return '0';
    
    const num = Number(balance);
    if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
    return num.toFixed(2);
  };

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!holders || holders.length === 0) return null;

  const styles = {
    section: {
      marginBottom: 32,
    },
    title: {
      color: "#CCFF00be",
      fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
      fontWeight: 600,
      marginBottom: 16,
      letterSpacing: 1,
    },
    table: {
      backgroundColor: "#141416",
      borderRadius: 8,
      padding: 12,
      display: "flex",
      flexDirection: "column",
      alignItems: "center", // Center table content
    },
    row: {
      display: "flex",
      alignItems: "center",
      padding: "8px 0",
      borderBottom: "1px solid #212121b8",
      whiteSpace: "nowrap",
      overflow: "hidden",
      width: "100%",
    },
    rank: {
      color: "#CCFF00be",
      fontWeight: 600,
      marginRight: 8,
      textAlign: "center",
    },
    addressBtn: {
      flex: 1,
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: 0,
      textAlign: "left",
    },
    address: {
      color: "#fff",
      margin: "0 8px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "block",
    },
    balance: {
      color: "#fff",
      fontWeight: 600,
      textAlign: "center",
      margin: "0 auto", // Center balance column
      marginRight: 0, // Remove right margin
      minWidth: screenWidth <= 480 ? 60 : 80, // Preserve small screen width
      maxWidth: screenWidth <= 480 ? 70 : 90, // Preserve small screen width
    },
    percent: {
      color: "#fff",
      fontWeight: 600,
      textAlign: "right",
      minWidth: 80,
    },
    headerRow: {
      display: "flex",
      alignItems: "center",
      padding: "8px 0",
      borderBottom: "1px solid #212121b8",
      whiteSpace: "nowrap",
      overflow: "hidden",
      width: "100%",
    },
    headerText: {
      color: "#ccc",
      fontWeight: 600,
      fontSize: "0.85rem",
      textTransform: "none",
      letterSpacing: "0px",
    },
  };

  return (
    <div style={{ ...styles.section, fontFamily: "sans-serif" }}>
      <h3 style={styles.title}>TOP 10 HOLDERS</h3>
      <div style={{
        ...styles.table,
        padding: screenWidth >= 1024 ? '16px' : '12px' // Add extra padding on desktop
      }}>
        {/* Header Row */}
        <div style={styles.headerRow}>
          <span
            style={{
              ...styles.headerText,
              width: screenWidth <= 480 ? 18 : 20,
              marginRight: 8,
              textAlign: "center",
            }}
          >
            #
          </span>
          <span
            style={{
              ...styles.headerText,
              flex: 1,
              textAlign: "left",
              margin: screenWidth <= 480 ? "0 4px" : "0 8px",
            }}
          >
            Address
          </span>
          <span
            style={{
              ...styles.headerText,
              textAlign: "center",
              margin: "0 auto",
              marginRight: 0, // Remove right margin to match balance column
              minWidth: screenWidth <= 480 ? 60 : 80,
              maxWidth: screenWidth <= 480 ? 70 : 90,
            }}
          >
            Balance
          </span>
          <span
            style={{
              ...styles.headerText,
              minWidth: 80,
              textAlign: "right",
            }}
          >
            Share
          </span>
        </div>

        {/* Data Rows */}
        {holders.slice(0, 10).map((holder, index) => (
          <div
            key={index}
            style={{
              ...styles.row,
            }}
          >
            <span
              style={{
                ...styles.rank,
                fontSize: screenWidth <= 480 ? "0.75rem" : "0.9rem",
                width: screenWidth <= 480 ? 18 : 20,
              }}
            >
              {index + 1}
            </span>
            <button
              style={{
                ...styles.addressBtn,
              }}
              onClick={() => copyToClipboard(holder.address)}
            >
              <span
                style={{
                  ...styles.address,
                  fontSize: screenWidth <= 480 ? "0.7rem" : "0.9rem",
                  margin: screenWidth <= 480 ? "0 4px" : "0 8px",
                }}
              >
                {truncateAddress(holder.address, screenWidth)}
              </span>
            </button>
            <span
              style={{
                ...styles.balance,
                fontSize: screenWidth <= 480 ? "0.75rem" : "0.9rem",
              }}
            >
              {formatBalance(holder.balance)}
            </span>
            <span
              style={{
                ...styles.percent,
                fontSize: screenWidth <= 480 ? "0.75rem" : "0.9rem",
              }}
            >
              {Number(holder.share).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiquidityHolders;