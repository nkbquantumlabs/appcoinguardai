import React from 'react';
import { copyToClipboard } from '../../shared/CopyAlert';
import { useEffect, useState } from "react";

const LiquidityHolders = ({ holders, lpHolders }) => {
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


  const formatBalance = (balance) => {
  // Handle empty or invalid input
  if (balance === null || balance === undefined || balance === "") return "0";

  // Convert safely — keep string form for big numbers
  const num = Number(balance);

  // If conversion failed (NaN)
  if (isNaN(num)) return balance.toString();
  
  // If value is effectively 0 (including very small)
  if (Math.abs(num) < 1e-12) return "0";

  // Define unit thresholds (short scale)
  const units = [
    { value: 1e18, suffix: "Qu" }, // Quintillion
    { value: 1e15, suffix: "Q" }, // Quadrillion
    { value: 1e12, suffix: "T" },   // Trillion
    { value: 1e9,  suffix: "B" },   // Billion
    { value: 1e6,  suffix: "M" },   // Million
    { value: 1e3,  suffix: "K" },   // Thousand
  ];

  // Loop through to find proper suffix
  for (const unit of units) {
    if (num >= unit.value) {
      const scaled = num / unit.value;
      return `${scaled.toLocaleString("en-US", {
        maximumFractionDigits: 2,
      })}${unit.suffix}`;
    }
  }
  // For very small numbers, show as exponential (e.g., 2.16e-9)
  if (num < 0.01) {
    return num.toExponential(2);
  }

  // Default fallback
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
      flex: 2,
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: 0,
      textAlign: "left",
      marginRight: 16,
    },
    address: {
      color: "#fff",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "block",
    },
    balance: {
      color: "#fff",
      fontWeight: 600,
      textAlign: "center",
      flex: 1,
    },
    percent: {
      color: "#fff",
      fontWeight: 600,
      textAlign: "right",
      flex: 1,
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
    <div style={{ ...styles.section }}>
      {/* TOP 10 HOLDERS */}
      {holders && holders.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          <span style={{
            color: '#CCFF00be',
            fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
            fontWeight: '600',
            marginBottom: '16px',
            letterSpacing: '1px',
            display: 'block',
            fontFamily: 'inherit',
            textTransform: 'none',
            lineHeight: 'normal',
          }}>TOP 10 HOLDERS</span>
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
              flex: 2,
              textAlign: "left",
              marginRight: 16,
            }}
          >
            Address
          </span>
          <span
            style={{
              ...styles.headerText,
              flex: 1,
              textAlign: "center",
            }}
          >
            Balance
          </span>
          <span
            style={{
              ...styles.headerText,
              flex: 1,
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
            <div style={{ ...styles.addressBtn, minWidth: 0 }}>
              <button
                onClick={() => copyToClipboard(holder.address)}
                title={holder.address}
                type="button"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  color: "#fff",
                  fontSize: screenWidth <= 480 ? "0.7rem" : "0.9rem",
                  textAlign: "left",
                  width: "100%",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {screenWidth >= 1024 ? holder.address : truncateAddress(holder.address, screenWidth)}
              </button>
            </div>
            <span
              style={{
                ...styles.balance,
                fontSize: screenWidth <= 480 ? "0.75rem" : "0.9rem",
              }}
              title={holder.balance}
            >
              {formatBalance(holder.balance)}
            </span>
            <span
              style={{
                ...styles.percent,
                fontSize: screenWidth <= 480 ? "0.75rem" : "0.9rem",
              }}
            >
              {holder.percent ? `${Number(holder.percent).toFixed(2)}%` : holder.share ? `${Number(holder.share).toFixed(2)}%` : 'NaN%'}
            </span>
          </div>
        ))}
      </div>
        </div>
      )}

    </div>
  );
};

export default LiquidityHolders;