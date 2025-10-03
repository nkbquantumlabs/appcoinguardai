import React, { useState } from "react";

const TokenDetails = ({ tokenData, handleOpenUrl }) => {
  const [notifications, setNotifications] = useState([]);
  const ADDRESS_FRONT_CHARS = 8;
  const ADDRESS_BACK_CHARS = 8;
  const URL_FRONT_CHARS = 12;
  const URL_BACK_CHARS = 12;

  const colors = {
    pass: "#16a34a",
    attention: "#ca8a04",
    alert: "#dc2626",
  };

  const formatNumber = (num) => {
    if (num >= 1e12) {
      return (num / 1e12).toFixed(1) + "T";
    } else if (num >= 1e9) {
      return (num / 1e9).toFixed(1) + "B";
    } else if (num >= 1e6) {
      return (num / 1e6).toFixed(1) + "M";
    } else if (num >= 1e3) {
      return (num / 1e3).toFixed(1) + "K";
    } else {
      return num.toLocaleString();
    }
  };

  const renderStatusIcon = (status) => {
    const bgColor = `${colors[status]}20`;
    const iconColor = colors[status];

    const commonStyles = {
      backgroundColor: bgColor,
      borderRadius: "50%",
      width: 24,
      height: 24,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    };

    switch (status) {
      case "pass":
        return (
          <div style={commonStyles}>
            <svg
              className="w-[18px] h-[18px]"
              fill="none"
              stroke={iconColor}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        );

      case "attention":
        return (
          <div style={commonStyles}>
            <svg
              className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
              fill="none"
              stroke={iconColor}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        );
      case "alert":
        return (
          <div style={commonStyles}>
            <svg
              className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
              fill="none"
              stroke={iconColor}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  const copyToClipboard = async (text) => {
    if (!text || typeof text !== "string") return;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      const id = Date.now();
      setNotifications((prev) => [...prev, { id, message: "Copied to clipboard" }]);
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, 4000);
    } catch (err) {
      // silently fail; only success notification is required
    }
  };

  const truncateMiddle = (text, frontChars = 8, backChars = 8) => {
    if (!text || typeof text !== "string") return "Invalid address";
    if (text.length <= frontChars + backChars + 5) return text;
    return `${text.slice(0, frontChars)}.....${text.slice(-backChars)}`;
  };

  const orderedScanResults = tokenData.scanResults
    ? [
        ...tokenData.scanResults.filter((r) => r.status === "alert"),
        ...tokenData.scanResults.filter((r) => r.status === "attention"),
        ...tokenData.scanResults.filter((r) => r.status === "pass"),
      ]
    : [];

  const renderSecurityChecks = () => {
    return (
      <>
        <style>{`
          @media (max-width: 767px) {
            .security-check-mobile {
              display: flex;
              flex-direction: column;
              gap: 0.75rem;
            }
            .security-item-mobile {
              background: #141416;
              border-radius: 0.5rem;
              padding: 0.75rem;
              display: flex;
              flex-direction: column;
              gap: 0.5rem;
            }
            .security-header-mobile {
              display: flex;
              align-items: center;
              gap: 0.5rem;
            }
            .security-title-mobile {
              color: white;
              font-size: 0.875rem;
              font-weight: 500;
              flex: 1;
            }
            .security-description-mobile {
              color: rgba(255, 255, 255, 0.6);
              font-size: 0.75rem;
              line-height: 1.4;
            }
          }
          @media (min-width: 768px) {
            .security-tables {
              display: flex;
              flex-direction: row;
              gap: 1rem;
            }
            .security-table-container {
              width: 50%;
              background: #141416;
              border-radius: 0.5rem;
              padding: 0.5rem;
              overflow-x: auto;
              min-height: 300px;
            }
            .security-table {
              width: 100%;
              border-collapse: collapse;
            }
            .security-table th {
              color: rgba(255, 255, 255, 0.6);
              font-size: 0.75rem;
              font-weight: 600;
              padding: 0.5rem 0.75rem;
              text-align: left;
              border-bottom: 1px solid rgba(33, 33, 33, 0.7);
            }
            .security-table td {
              padding: 0.5rem 0.75rem;
              border-bottom: 1px solid rgba(33, 33, 33, 0.7);
            }
            .security-table tr:last-child td {
              border-bottom: none;
            }
          }
        `}</style>

        {/* Mobile View */}
        <div className="md:hidden security-check-mobile">
          {orderedScanResults.length > 0 ? (
            orderedScanResults.map((item, idx) => (
              <div key={idx} className="security-item-mobile">
                <div className="security-header-mobile">
                  {renderStatusIcon(item.status)}
                  <span className="security-title-mobile">{item.title}</span>
                </div>
                <p className="security-description-mobile">
                  {item.description}
                </p>
              </div>
            ))
          ) : (
            <div className="text-white/60 text-sm py-4 text-center">
              No security checks available
            </div>
          )}
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex security-tables">
          <div className="security-table-container">
            <table className="security-table">
              <thead>
                <tr>
                  <th className="w-[60px]">Status</th>
                  <th>Title</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  const totalItems = orderedScanResults.length;
                  const halfItems = Math.ceil(totalItems / 2);
                  return orderedScanResults.slice(0, halfItems).map((item, idx) => (
                    <tr key={idx}>
                      <td>{renderStatusIcon(item.status)}</td>
                      <td className="text-white text-sm font-medium truncate max-w-[150px]">
                        {item.title}
                      </td>
                      <td className="text-white/60 text-sm break-words">
                        {item.description}
                      </td>
                    </tr>
                  ));
                })()}
              </tbody>
            </table>
          </div>
          <div className="security-table-container">
            <table className="security-table">
              <thead>
                <tr>
                  <th className="w-[60px]">Status</th>
                  <th>Title</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  const totalItems = orderedScanResults.length;
                  const halfItems = Math.ceil(totalItems / 2);
                  return orderedScanResults.slice(halfItems).map((item, idx) => (
                    <tr key={idx}>
                      <td>{renderStatusIcon(item.status)}</td>
                      <td className="text-white text-sm font-medium truncate max-w-[150px]">
                        {item.title}
                      </td>
                      <td className="text-white/60 text-sm break-words">
                        {item.description}
                      </td>
                    </tr>
                  ));
                })()}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <style>{`
        .holders-container, .trade-container {
          padding: 1px;
        }
        @media (min-width: 640px) {
          .holders-container, .trade-container {
            padding: 2px;
          }
        }
        /* Mobile View for Top Holders */
        @media (max-width: 767px) {
          .holders-header-mobile {
            display: grid;
            grid-template-columns: 40px 1fr 80px 60px;
            align-items: center;
            padding: 0.75rem 0.5rem;
            border-bottom: 1px solid rgba(33, 33, 33, 0.7);
          }
          .holders-item-mobile {
            display: grid;
            grid-template-columns: 40px 1fr 80px 60px;
            align-items: center;
            padding: 0.75rem 0.5rem;
            border-bottom: 1px solid rgba(33, 33, 33, 0.7);
          }
          .holders-item-mobile:last-child {
            border-bottom: none;
          }
          .holders-header-mobile span,
          .holders-item-mobile span,
          .holders-item-mobile button {
            font-size: 0.75rem;
            line-height: 1.2;
          }
          .holders-address-mobile {
            overflow-wrap: anywhere;
            text-align: left;
          }
          .holders-amount-mobile {
            text-align: center;
          }
          .holders-percent-mobile {
            text-align: right;
          }
        }
        /* Desktop View for Top Holders */
        @media (min-width: 768px) {
          .holders-header-desktop {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.5rem 1rem;
            border-bottom: 1px solid rgba(33, 33, 33, 0.7);
          }
          .holders-item-desktop {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.5rem 1rem;
            border-bottom: 1px solid rgba(33, 33, 33, 0.7);
          }
          .holders-item-desktop:last-child {
            border-bottom: none;
          }
          .holders-address-desktop {
            flex: 2;
            margin-right: 1rem;
          }
          .holders-amount-desktop {
            flex: 1;
            text-align: center;
          }
          .holders-percent-desktop {
            flex: 1;
            text-align: right;
          }
        }

        /* Notification styles */
        .notification-container {
          position: fixed;
          top: 20px;
          right: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          z-index: 9999;
        }
        .notification {
          background: #222;
          padding: 15px 20px;
          border-radius: 8px;
          min-width: 250px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
          display: flex;
          justify-content: space-between;
          align-items: center;
          animation: slideIn 0.4s ease, fadeOut 0.5s ease forwards;
          animation-delay: 0s, 3.5s;
        }
        .notification.success { border-left: 5px solid #22c55e; }
        .notification span { flex: 1; margin-right: 10px; color: #fff; }
        .notification button { background: transparent; border: none; color: #888; cursor: pointer; font-size: 18px; }
        @keyframes slideIn { from { opacity: 0; transform: translateX(100%);} to { opacity: 1; transform: translateX(0);} }
        @keyframes fadeOut { to { opacity: 0; transform: translateX(100%);} }
      `}</style>
      <div className="w-full max-w-[100vw] px-1 sm:px-2 box-border overflow-x-hidden">
        {notifications.length > 0 && (
          <div className="notification-container">
            {notifications.map((n) => (
              <div key={n.id} className="notification success">
                <span>{n.message}</span>
                <button onClick={() => setNotifications((prev) => prev.filter((x) => x.id !== n.id))}>×</button>
              </div>
            ))}
          </div>
        )}
        {/* Security Checks */}
        <div className="mb-4 sm:mb-6 md:mb-8 w-full">
          <span className="text-[#CCFF00]/75 text-xs sm:text-sm md:text-base font-semibold mb-4 sm:mb-3 md:mb-4 mt-6 sm:mt-0 block tracking-wide">
            SECURITY CHECKS
          </span>
          {renderSecurityChecks()}
        </div>

        {/* Top Holders */}
        <div className="mb-4 sm:mb-6 md:mb-8 w-full">
          <span className="text-[#CCFF00]/75 text-xs sm:text-sm md:text-base font-semibold mb-4 sm:mb-3 md:mb-4 mt-6 sm:mt-0 block tracking-wide">
            TOP HOLDERS
          </span>

          <div className="holders-container bg-[#141416] rounded-lg w-full">
            {/* Mobile View */}
            <div className="md:hidden">
              {/* Header Row */}
              <div className="holders-header-mobile">
                <span className="text-white/60 font-semibold">#</span>
                <span className="text-white/60 font-semibold">Address</span>
                <span className="text-white/60 font-semibold holders-amount-mobile">
                  Amount
                </span>
                <span className="text-white/60 font-semibold holders-percent-mobile">
                  %
                </span>
              </div>

              {/* Holder List */}
              {(tokenData.topHolders || []).slice(0, 10).map((holder, idx) => {
                const addrFull = holder.address || "";
                const addrTruncated = truncateMiddle(addrFull, 4, 4);

                return (
                  <div key={idx} className="holders-item-mobile">
                    <span className="text-[#CCFF00]/75 font-semibold">
                      {idx + 1}
                    </span>
                    <button
                      onClick={() => copyToClipboard(addrFull)}
                      title={addrFull}
                      type="button"
                      className="text-white holders-address-mobile"
                      aria-label={`Copy address ${addrFull}`}
                      disabled={!addrFull}
                    >
                      {addrTruncated}
                    </button>
                    <span className="text-white font-medium holders-amount-mobile truncate">
                      {formatNumber(Number(holder.amount || 0))}
                    </span>
                    <span className="text-white font-semibold holders-percent-mobile">
                      {holder.percent ? `${holder.percent}%` : "0%"}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Desktop View */}
            <div className="hidden md:block">
              {/* Header Row */}
              <div className="holders-header-desktop">
                <span className="text-white/60 text-xs sm:text-sm font-semibold w-6 sm:w-8 flex-shrink-0">
                  #
                </span>
                <span className="text-white/60 text-xs sm:text-sm font-semibold holders-address-desktop text-left">
                  Address
                </span>
                <span className="text-white/60 text-xs sm:text-sm font-semibold holders-amount-desktop">
                  Amount
                </span>
                <span className="text-white/60 text-xs sm:text-sm font-semibold holders-percent-desktop">
                  Percentage
                </span>
              </div>

              {/* Holder List */}
              {(tokenData.topHolders || []).slice(0, 10).map((holder, idx) => {
                const addrFull = holder.address || "";

                return (
                  <div key={idx} className="holders-item-desktop">
                    <span className="text-[#CCFF00]/75 text-xs sm:text-sm font-semibold w-6 sm:w-8 flex-shrink-0">
                      {idx + 1}
                    </span>
                    <div className="holders-address-desktop flex-2 min-w-0">
                      <button
                        onClick={() => copyToClipboard(addrFull)}
                        title={addrFull}
                        type="button"
                        className="text-white text-xs sm:text-sm text-left w-full truncate"
                        aria-label={`Copy address ${addrFull}`}
                        disabled={!addrFull}
                      >
                        {addrFull || "Invalid address"}
                      </button>
                    </div>
                    <span className="holders-amount-desktop text-white text-xs sm:text-sm font-medium flex-1 text-center truncate">
                      {formatNumber(Number(holder.amount || 0))}
                    </span>
                    <span className="holders-percent-desktop text-white text-xs sm:text-sm font-semibold flex-1 text-right truncate">
                      {holder.percent ? `${holder.percent}%` : "0%"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TokenDetails;
