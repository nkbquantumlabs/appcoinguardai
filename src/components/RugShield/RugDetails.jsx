import React from "react";

const RugDetails = ({ data, formatNumber }) => {
  return (
    <div className="rug-dt-container">
  <style>{`
        .rug-dt-container {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          margin-bottom: 24px;
        }

        .token-details-card {
          background: #141416;
          border-radius: 16px;
          padding: 20px;
        }

        .section-title {
          color: #CCFF00;
          opacity: 0.75;
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
          display: block;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .metric-box {
          background: #000000;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .metric-label {
          color: rgba(255, 255, 255, 0.6);
          font-size: 12px;
          font-weight: 500;
        }

        .metric-value {
          color: #fff;
          font-size: 16px;
          font-weight: 600;
        }

        .token-info-card {
          background: #141416;
          border-radius: 16px;
          padding: 20px;
          padding-bottom: 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .bg-image-container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 120px;
          overflow: hidden;
          border-radius: 16px 16px 0 0;
        }

        .bg-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.3;
        }

        .token-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          padding-top: 60px;
        }

        .token-logo {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 4px solid rgba(255, 255, 255, 0.1);
          object-fit: cover;
          background: #1a1a1c;
        }

        .token-name {
          color: #fff;
          font-size: 24px;
          font-weight: 700;
          text-align: center;
          margin-top: 12px;
        }

        .token-symbol {
          color: #CCFF00;
          font-size: 16px;
          font-weight: 500;
          margin-top: 4px;
        }

        .token-price {
          color: #ffffff;
          font-size: 20px;
          font-weight: 700;
          margin-top: 50px;
          margin-bottom:-50px;
        }

        @media (min-width: 1024px) {
          .rug-dt-container {
            grid-template-columns: 1fr 1fr;
            gap: 24px;
          }
        }

        @media (max-width: 1023px) {
          .token-details-card {
            order: 2;
          }
        
          .bg-image-container {
            height: 120px;
          }

          .token-info-card {
            order: 1;
            height: 350px;
          }

          .token-content {
            padding-top: 80px;
          }

          .token-logo {
            margin-top:-20px;
          }
        }

      `}</style>

      {/* Left Side - Token Details */}
      <div className="token-details-card">
        <span className="section-title">TOKEN DETAILS</span>
        <div className="metrics-grid">
          <div className="metric-box">
            <span className="metric-label">Launch Date</span>
            <span className="metric-value">
              {data?.dexData?.launchDate || data?.launchDate || "N/A"}
            </span>
          </div>

          <div className="metric-box">
            <span className="metric-label">Liquidity</span>
            <span className="metric-value">
              ${formatNumber(data?.dexData?.liquidity || data?.liquidity || 0)}
            </span>
          </div>

          <div className="metric-box">
            <span className="metric-label">24h Volume</span>
            <span className="metric-value">
              ${formatNumber(data?.dexData?.volume24h || data?.volume24h || 0)}
            </span>
          </div>

          <div className="metric-box">
            <span className="metric-label">Market Cap</span>
            <span className="metric-value">
              ${formatNumber(data?.dexData?.marketCap || data?.marketCap || 0)}
            </span>
          </div>

          <div className="metric-box">
            <span className="metric-label">Buyers</span>
            <span className="metric-value">
              {formatNumber(data?.dexData?.buyers || data?.buyers || 0)}
            </span>
          </div>

          <div className="metric-box">
            <span className="metric-label">Sellers</span>
            <span className="metric-value">
              {formatNumber(data?.dexData?.sellers || data?.sellers || 0)}
            </span>
          </div>
        </div>
      </div>

      {/* Right Side - Token Info */}
      <div className="token-info-card">
        {/* Background Image */}
        {(data?.dexData?.bgImage || data?.bgImage) && (
          <div className="bg-image-container">
            <img
              src={data?.dexData?.bgImage || data?.bgImage}
              alt="Token background"
              className="bg-image"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        )}

        {/* Token Content */}
        <div className="token-content">
          {/* Token Logo */}
          {(data?.dexData?.logo || data?.logo) && (
            <img
              src={data?.dexData?.logo || data?.logo}
              alt="Token logo"
              className="token-logo"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}

          {/* Token Name */}
          <h2 className="token-name">
            {data?.dexData?.tokenName || data?.tokenName || data?.name || "Unknown Token"}
          </h2>

          {/* Token Symbol */}
          <span className="token-symbol">
            ${data?.dexData?.symbol || data?.symbol || data?.tokenSymbol || "N/A"}
          </span>

          {/* Token Price */}
          <span className="token-price">
            ${Number(data?.dexData?.priceUsd || data?.priceUsd || 0).toFixed(6)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RugDetails;
