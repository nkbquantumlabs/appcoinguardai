import React from "react";

const TopHolders = ({ data, formatNumber }) => {
  const truncateMiddle = (text, frontChars = 4, backChars = 4) => {
    if (!text || typeof text !== "string") return "Invalid address";
    if (text.length <= frontChars + backChars + 5) return text;
    return `${text.slice(0, frontChars)}.....${text.slice(-backChars)}`;
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (!data || !Array.isArray(data.topHolders) || data.topHolders.length === 0) {
    return null;
  }

  return (
    <div className="mb-4" style={{ width: "100%" }}>
      <style>{`
        /* Top Holders Container */
        .holders-container {
          padding: 1px;
          background: #141416;
          border-radius: 12px;
          overflow: hidden;
        }

        /* Responsive visibility classes */
        .md-hidden { display: block; }
        .md-block { display: none; }

        @media (min-width: 768px) {
          .md-hidden { display: none; }
          .md-block { display: block; }
        }

        @media (min-width: 640px) {
          .holders-container {
            padding: 2px;
          }
        }

        /* Mobile View for Top Holders */
        @media (max-width: 767px) {
          .holders-header-mobile {
            display: grid;
            grid-template-columns: 32px 1fr 80px 60px;
            align-items: center;
            padding: 12px 8px;
            border-bottom: 1px solid rgba(33, 33, 33, 0.7);
          }

          .holders-item-mobile {
            display: grid;
            grid-template-columns: 32px 1fr 80px 60px;
            align-items: center;
            padding: 12px 8px;
            border-bottom: 1px solid rgba(33, 33, 33, 0.7);
          }

          .holders-item-mobile:last-child {
            border-bottom: none;
          }

          .holders-address-mobile {
            overflow-wrap: anywhere;
            text-align: left;
            color: #fff;
            font-size: 12px;
            justify-self: stretch;
          }

          .holders-amount-mobile {
            text-align: center;
            color: #fff;
            font-weight: 600;
            font-size: 12px;
            justify-self: center;
          }

          .holders-percent-mobile {
            text-align: right;
            color: #fff;
            font-weight: 600;
            font-size: 12px;
            justify-self: end;
          }

          .holders-header-mobile span,
          .holders-item-mobile span,
          .holders-item-mobile button {
            font-size: 12px;
            line-height: 1.2;
          }
        }

        /* Desktop View for Top Holders */
        @media (min-width: 768px) {
          .holders-header-desktop {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 16px;
            border-bottom: 1px solid rgba(33, 33, 33, 0.7);
          }

          .holders-item-desktop {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 16px;
            border-bottom: 1px solid rgba(33, 33, 33, 0.7);
          }

          .holders-item-desktop:last-child {
            border-bottom: none;
          }

          .holders-address-desktop {
            flex: 2;
            margin-right: 16px;
          }

          .holders-amount-desktop {
            flex: 1;
            text-align: center;
          }

          .holders-percent-desktop {
            flex: 1;
            text-align: right;
          }

          .holders-header-desktop span {
            font-size: 12px;
          }

          .holders-amount-desktop,
          .holders-percent-desktop {
            font-size: 12px;
          }
        }

        .clickable {
          cursor: pointer;
          transition: opacity 0.2s;
          background: none;
          border: none;
          padding: 0;
        }

        .clickable:hover {
          opacity: 0.7;
        }

        .clickable:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }

        .section-title {
          display: block;
          color: #CCFF00;
          opacity: 0.75;
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 12px;
        }
      `}</style>

      <span className="section-title">TOP HOLDERS</span>
      <div className="holders-container">
        {/* Mobile View */}
        <div className="md-hidden">
          <div className="holders-header-mobile">
            <span style={{ color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>
              #
            </span>
            <span style={{ color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>
              Address
            </span>
            <span
              className="holders-amount-mobile"
              style={{ color: "rgba(255,255,255,0.6)", fontWeight: 600 }}
            >
              Amount
            </span>
            <span
              className="holders-percent-mobile"
              style={{ color: "rgba(255,255,255,0.6)", fontWeight: 600 }}
            >
              %
            </span>
          </div>
          {data.topHolders
            .filter((h) => {
              const amt = Number(h?.amount);
              return h && h.address && !Number.isNaN(amt) && isFinite(amt);
            })
            .slice(0, 20)
            .map((holder, idx) => {
              const addrFull = holder.address || "";
              const addrTruncated = truncateMiddle(addrFull, 4, 4);
              return (
                <div key={idx} className="holders-item-mobile">
                  <span
                    style={{
                      color: "#CCFF00",
                      opacity: 0.75,
                      fontWeight: 600,
                    }}
                  >
                    {idx + 1}
                  </span>
                  <button
                    onClick={() => copyToClipboard(addrFull)}
                    title={addrFull}
                    type="button"
                    className="holders-address-mobile clickable"
                    aria-label={`Copy address ${addrFull}`}
                    disabled={!addrFull}
                  >
                    {addrTruncated}
                  </button>
                  <span className="holders-amount-mobile">
                    {formatNumber(Number(holder.amount || 0))}
                  </span>
                  <span className="holders-percent-mobile">{`${Number(
                    holder.percent || 0
                  ).toFixed(2)}%`}</span>
                </div>
              );
            })}
        </div>

        {/* Desktop View */}
        <div className="md-block">
          <div className="holders-header-desktop">
            <span
              style={{
                color: "rgba(255,255,255,0.6)",
                fontWeight: 600,
                width: 32,
                flexShrink: 0,
              }}
            >
              #
            </span>
            <span
              className="holders-address-desktop"
              style={{
                color: "rgba(255,255,255,0.6)",
                fontWeight: 600,
                textAlign: "left",
              }}
            >
              Address
            </span>
            <span
              className="holders-amount-desktop"
              style={{ color: "rgba(255,255,255,0.6)", fontWeight: 600 }}
            >
              Amount
            </span>
            <span
              className="holders-percent-desktop"
              style={{ color: "rgba(255,255,255,0.6)", fontWeight: 600 }}
            >
              Percentage
            </span>
          </div>
          {data.topHolders
            .filter((h) => {
              const amt = Number(h?.amount);
              return h && h.address && !Number.isNaN(amt) && isFinite(amt);
            })
            .slice(0, 20)
            .map((holder, idx) => {
              const addrFull = holder.address || "";
              return (
                <div key={idx} className="holders-item-desktop">
                  <span
                    style={{
                      color: "#CCFF00",
                      opacity: 0.75,
                      fontWeight: 600,
                      width: 32,
                      flexShrink: 0,
                    }}
                  >
                    {idx + 1}
                  </span>
                  <div
                    className="holders-address-desktop"
                    style={{ minWidth: 0 }}
                  >
                    <button
                      onClick={() => copyToClipboard(addrFull)}
                      title={addrFull}
                      type="button"
                      className="clickable"
                      style={{
                        color: "#fff",
                        fontSize: 13,
                        textAlign: "left",
                        width: "100%",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      aria-label={`Copy address ${addrFull}`}
                      disabled={!addrFull}
                    >
                      {addrFull || "Invalid address"}
                    </button>
                  </div>
                  <span
                    className="holders-amount-desktop"
                    style={{ color: "#fff", fontWeight: 600 }}
                  >
                    {formatNumber(Number(holder.amount || 0))}
                  </span>
                  <span
                    className="holders-percent-desktop"
                    style={{ color: "#fff", fontWeight: 600 }}
                  >{`${Number(holder.percent || 0).toFixed(2)}%`}</span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default TopHolders;
