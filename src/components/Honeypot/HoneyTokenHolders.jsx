import React, { useEffect, useState } from "react";

const HoneyTokenHolders = ({ data, network }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const sanitizeInput = (input) => {
    if (input == null || input === undefined || input === "") return null;
    return String(input);
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Address copied to clipboard");
    } catch (err) {
    }
  };

  const truncateAddress = (addr, screenWidth) => {
    if (screenWidth >= 1024) {
      return `${addr.slice(0, 12)}...${addr.slice(-8)}`;
    }
    if (screenWidth <= 480) {
      return `${addr.slice(0, 5)}...${addr.slice(-5)}`;
    }
    return `${addr.slice(0, 10)}....${addr.slice(-10)}`;
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

  const renderHolders = (network) => {
    if (
      !data?.holders ||
      !Array.isArray(data.holders) ||
      data.holders.length === 0
    )
      return null;

    const percentDisplay = (network, percent) => {
      let value;

      network === "Solana"
        ? percent != null
          ? (value = Number(percent).toFixed(4) + "%")
          : "--"
        : percent != null
        ? (value = (Number(percent) * 100).toFixed(4) + "%")
        : "--";
      return value;
    };

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
        padding: screenWidth >= 1024 ? '16px' : '12px',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
        whiteSpace: screenWidth >= 1024 ? "normal" : "nowrap",
        overflow: screenWidth >= 1024 ? "visible" : "hidden",
        textOverflow: screenWidth >= 1024 ? "unset" : "ellipsis",
        display: "block",
        wordBreak: screenWidth >= 1024 ? "break-all" : "normal",
      },
      balance: {
        color: "#fff",
        fontWeight: 600,
        textAlign: "center",
        marginLeft: screenWidth >= 1024 ? "-270px" : "0",
        marginRight: screenWidth >= 1024 ? "270px" : "0",
        minWidth: screenWidth <= 480 ? 60 : 80,
        maxWidth: screenWidth <= 480 ? 70 : 90,
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
        <h3 style={styles.title}>TOP HOLDERS</h3>
        <div style={styles.table}>
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
                marginLeft: screenWidth >= 1024 ? "-270px" : "0",
                marginRight: screenWidth >= 1024 ? "270px" : "0",
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
          {data.holders.map((holder, index) => (
            <div key={index} style={styles.row}>
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
                style={styles.addressBtn}
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
                {percentDisplay(network, holder.percent)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderLPHolders = () => {
    if (
      !data?.lp_holders ||
      !Array.isArray(data.lp_holders) ||
      data.lp_holders.length === 0
    )
      return null;

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
        padding: screenWidth >= 1024 ? '16px' : '12px',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
        whiteSpace: screenWidth >= 1024 ? "normal" : "nowrap",
        overflow: screenWidth >= 1024 ? "visible" : "hidden",
        textOverflow: screenWidth >= 1024 ? "unset" : "ellipsis",
        display: "block",
        wordBreak: screenWidth >= 1024 ? "break-all" : "normal",
      },
      balance: {
        color: "#fff",
        fontWeight: 600,
        textAlign: "center",
        marginLeft: screenWidth >= 1024 ? "-270px" : "0",
        marginRight: screenWidth >= 1024 ? "270px" : "0",
        minWidth: screenWidth <= 480 ? 60 : 80,
        maxWidth: screenWidth <= 480 ? 70 : 90,
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
        <h3 style={styles.title}>LP HOLDERS</h3>
        <div style={styles.table}>
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
                marginLeft: screenWidth >= 1024 ? "-270px" : "0",
                marginRight: screenWidth >= 1024 ? "270px" : "0",
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
          {data.lp_holders.slice(0, 10).map((lp_holder, index) => (
            <div key={index} style={styles.row}>
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
                style={styles.addressBtn}
                onClick={() => copyToClipboard(lp_holder.address)}
              >
                <span
                  style={{
                    ...styles.address,
                    fontSize: screenWidth <= 480 ? "0.7rem" : "0.9rem",
                    margin: screenWidth <= 480 ? "0 4px" : "0 8px",
                  }}
                >
                  {truncateAddress(lp_holder.address, screenWidth)}
                </span>
              </button>
              <span
                style={{
                  ...styles.balance,
                  fontSize: screenWidth <= 480 ? "0.75rem" : "0.9rem",
                }}
              >
                {formatBalance(lp_holder.balance)}
              </span>
              <span
                style={{
                  ...styles.percent,
                  fontSize: screenWidth <= 480 ? "0.75rem" : "0.9rem",
                }}
              >
                {lp_holder.percent != null
                  ? (Number(lp_holder.percent) * 100).toFixed(2) + "%"
                  : "--"}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-1.5">
      {renderHolders(network)}
      {renderLPHolders()}
    </div>
  );
};

export default HoneyTokenHolders;
