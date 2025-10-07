import React from "react";
import { VscError } from "react-icons/vsc";
import { FaXTwitter } from "react-icons/fa6";

const KeyMetrics = ({ data, formatNumber, handleOpenUrl }) => {
  const getDomain = (url) => {
    try {
      const u = new URL(url);
      return u.hostname.replace(/^www\./, "");
    } catch (e) {
      return url;
    }
  };

  const normalizeUrl = (item) => {
    if (!item) return "";
    if (typeof item === "string") return item;
    if (typeof item === "object" && item !== null) return item.url || "";
    return "";
  };

  const websiteLabel = (item) => {
    if (item && typeof item === "object" && item.label) return item.label;
    const url = normalizeUrl(item);
    return url ? getDomain(url) : "Link";
  };

  const socialLabel = (item) => {
    if (item && typeof item === "object") {
      if (item.type && item.type.trim()) return item.type;
      if (item.url) return getDomain(item.url);
      return "Link";
    }
    if (typeof item === "string") return getDomain(item);
    return "Link";
  };

  return (
    <>
      <span className="section-title">KEY METRICS</span>
      <div className="extra-grid">
        <div className="extra-card metric-card">
          <span className="overview-label">Chain</span>
          <span className="pill">{data?.dexData?.chainId || data?.chainId || "N/A"}</span>
        </div>
        <div className="extra-card metric-card">
          <span className="overview-label">1h Price Change</span>
          <span className="pill" style={{ 
            color: (data?.dexData?.priceChange1h || data?.priceChange1h || 0) >= 0 ? '#16a34a' : '#dc2626' 
          }}>
            {data?.dexData?.priceChange1h !== undefined || data?.priceChange1h !== undefined
              ? `${(data?.dexData?.priceChange1h || data?.priceChange1h || 0) >= 0 ? '+' : ''}${Number(data?.dexData?.priceChange1h || data?.priceChange1h || 0).toFixed(2)}%`
              : "N/A"}
          </span>
        </div>
        <div className="extra-card metric-card">
          <span className="overview-label">24h Transactions</span>
          <span className="pill">{formatNumber(data?.dexData?.recentTxCount24h || data?.recentTxCount24h || 0)}</span>
        </div>
        <div className="extra-card website-card">
          <span className="overview-label">Websites</span>
          <div className="chips-row">
            {(data?.dexData?.websites || data?.websites) && (data?.dexData?.websites || data?.websites).length > 0 ? (
              (data?.dexData?.websites || data?.websites).slice(0, 2).map((item, idx) => {
                const url = normalizeUrl(item);
                const label = websiteLabel(item);
                return (
                  <span
                    key={(url || label) + idx}
                    className="chip"
                    onClick={() => url && handleOpenUrl(url)}
                    title={url || label}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h5V3H5c-1.1 0-2 .9-2 2v5h2V5zm0 14v-5H3v5c0 1.1.9 2 2 2h5v-2H5zm14 0h-5v2h5c1.1 0 2-.9 2-2v-5h-2v5z"
                      />
                    </svg>
                    {label}
                  </span>
                );
              })
            ) : (
              <span
                className="empty-icon"
                title="No websites available"
                aria-label="No websites"
              >
                <VscError />
              </span>
            )}
          </div>
        </div>
        <div className="extra-card socials-card">
          <span className="overview-label">Socials</span>
          {(data?.dexData?.socials || data?.socials) && (data?.dexData?.socials || data?.socials).length > 0 ? (
            (() => {
              const socials = ((data?.dexData?.socials || data?.socials) || []).slice(0, 3);
              return (
                <div className="socials-layout">
                  <div className="socials-row">
                    {socials.slice(0, 2).map((item, idx) => {
                      const url = normalizeUrl(item);
                      const label = socialLabel(item);
                      const lower = (url || label || "").toLowerCase();
                      const isTwitter =
                        lower.includes("twitter.com") ||
                        lower.includes("x.com") ||
                        lower.includes("twitter");
                      const isTelegram =
                        lower.includes("t.me") || lower.includes("telegram");
                      const displayLabel = isTwitter ? "X.com" : label;
                      return (
                        <span
                          key={(url || label) + idx}
                          className="chip"
                          onClick={() => url && handleOpenUrl(url)}
                          title={url || label}
                        >
                          {isTwitter ? (
                            <FaXTwitter />
                          ) : isTelegram ? (
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                              <path
                                fill="currentColor"
                                d="M9.04 15.83l-.37 5.3c.53 0 .76-.23 1.03-.5l2.48-2.38 5.14 3.76c.94.52 1.61.25 1.87-.87l3.39-15.9h.01c.3-1.4-.5-1.95-1.41-1.61L1.6 9.22c-1.35.53-1.33 1.29-.23 1.63l5.27 1.64 12.25-7.72c.58-.35 1.11-.16.68.19"
                              />
                            </svg>
                          ) : (
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                              <path
                                fill="currentColor"
                                d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h5V3H5c-1.1 0-2 .9-2 2v5h2V5zm0 14v-5H3v5c0 1.1.9 2 2 2h5v-2H5zm14 0h-5v2h5c1.1 0 2-.9 2-2v-5h-2v5z"
                              />
                            </svg>
                          )}
                          {displayLabel}
                        </span>
                      );
                    })}
                  </div>
                  {socials[2] ? (
                    <div className="socials-row single">
                      {(() => {
                        const item = socials[2];
                        const url = normalizeUrl(item);
                        const label = socialLabel(item);
                        const lower = (url || label || "").toLowerCase();
                        const isTwitter =
                          lower.includes("twitter.com") ||
                          lower.includes("x.com") ||
                          lower.includes("twitter");
                        const isTelegram =
                          lower.includes("t.me") || lower.includes("telegram");
                        const displayLabel = isTwitter ? "X.com" : label;
                        return (
                          <span
                            key={(url || label) + "-3"}
                            className="chip"
                            onClick={() => url && handleOpenUrl(url)}
                            title={url || label}
                          >
                            {isTwitter ? (
                              <FaXTwitter />
                            ) : isTelegram ? (
                              <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                  fill="currentColor"
                                  d="M9.04 15.83l-.37 5.3c.53 0 .76-.23 1.03-.5l2.48-2.38 5.14 3.76c.94.52 1.61.25 1.87-.87l3.39-15.9h.01c.3-1.4-.5-1.95-1.41-1.61L1.6 9.22c-1.35.53-1.33 1.29-.23 1.63l5.27 1.64 12.25-7.72c.58-.35 1.11-.16.68.19"
                                />
                              </svg>
                            ) : (
                              <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                  fill="currentColor"
                                  d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h5V3H5c-1.1 0-2 .9-2 2v5h2V5zm0 14v-5H3v5c0 1.1.9 2 2 2h5v-2H5zm14 0h-5v2h5c1.1 0 2-.9 2-2v-5h-2v5z"
                                />
                              </svg>
                            )}
                            {displayLabel}
                          </span>
                        );
                      })()}
                    </div>
                  ) : null}
                </div>
              );
            })()
          ) : (
            <span className="overview-value">N/A</span>
          )}
        </div>
      </div>

      <style>{`
        .extra-grid { display: grid; grid-template-columns: 1fr; gap: 12px; margin-top: 8px; }
        .extra-card { background: #141416; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 96px; }
        @media (min-width: 640px) { .extra-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .extra-grid { grid-template-columns: repeat(5, 1fr); } }

        /* Mobile: align titles left, values right for metrics/websites/socials */
        @media (max-width: 767px) {
          .metric-card, .website-card, .socials-card { flex-direction: row; align-items: center; justify-content: space-between; }
          .metric-card .overview-label, .website-card .overview-label, .socials-card .overview-label { margin: 0; text-align: left; font-size: 12px; }
          .metric-card .pill { margin-left: auto; }
          .website-card .chips-row { justify-content: flex-end; }
          .socials-card .socials-layout { flex-direction: row; justify-content: flex-end; gap: 8px; }
          .socials-card .socials-row { display: flex; gap: 8px; }
          .socials-card .socials-row.single { display: none; }
        }
        @media (min-width: 768px) { .metric-card .overview-label, .website-card .overview-label, .socials-card .overview-label { font-size: 13px; } }

        .chips-row { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; justify-content: center; }
        .chip { background: rgba(255,255,255,0.04); color: #fff; border: 1px solid rgba(255,255,255,0.12); border-radius: 999px; padding: 6px 12px; font-size: 12px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: background 0.2s ease, border-color 0.2s ease; }
        .chip:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.2); }
        .chip svg { width: 14px; height: 14px; display: block; }

        .pill { background: rgba(255,255,255,0.06); color: #fff; border: 1px solid rgba(255,255,255,0.12); border-radius: 999px; padding: 6px 12px; font-size: 13px; font-weight: 600; display: inline-flex; align-items: center; min-width: 80px; justify-content: center; }
        .empty-icon { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 999px; padding: 6px 12px; min-width: 80px; display: inline-flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.6); }
        .empty-icon svg { width: 14px; height: 14px; display: block; }

        /* Socials layout default (desktop) */
        .socials-layout { display: flex; flex-direction: column; gap: 10px; width: 100%; }
        .socials-row { display: flex; gap: 10px; justify-content: center; }
        .socials-row.single { justify-content: center; }

        .overview-label { color: rgba(255, 255, 255, 0.7); font-size: 11px; margin-bottom: 6px; text-align: center; }
        .overview-value { color: #fff; font-size: 13px; font-weight: 500; }
      `}</style>
    </>
  );
};

export default KeyMetrics;
