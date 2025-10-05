import React from "react";
import { FiExternalLink } from "react-icons/fi";
import { MdVerified } from "react-icons/md";

const RugDex = ({ data }) => {
  const dexUrls = data?.dexData?.dexUrls || data?.dexUrls || [];
  const isVerified = data?.dexData?.isVerified || data?.isVerified || false;

  const handleOpenUrl = (url) => {
    window.open(url, "_blank");
  };

  const getDexName = (url) => {
    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname.replace("www.", "");
      return hostname.split(".")[0];
    } catch {
      return "DEX";
    }
  };

  if (dexUrls.length === 0) {
    return null;
  }

  return (
    <div className="rug-dex-container">
      <style>{`
        .rug-dex-container {
          width: 100%;
          margin-bottom: 24px;
        }

        .dex-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }

        .section-title {
          color: #CCFF00;
          opacity: 0.75;
          font-size: 16px;
          font-weight: 600;
        }


        .dex-table-container {
          background: #141416;
          border-radius: 16px;
          padding: 1px;
          overflow: hidden;
        }

        .dex-table {
          width: 100%;
          border-collapse: collapse;
        }

        .dex-table thead {
          background: rgba(255, 255, 255, 0.02);
        }

        .dex-table th {
          color: rgba(255, 255, 255, 0.6);
          font-size: 12px;
          font-weight: 600;
          text-align: left;
          padding: 12px 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .dex-table th:first-child {
          width: 60px;
          text-align: center;
        }

        .dex-table th:last-child {
          width: 80px;
          text-align: center;
        }

        .dex-table tbody tr {
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .dex-table tbody tr:last-child {
          border-bottom: none;
        }

        .dex-table tbody tr:hover {
          background: transparent;
        }

        .dex-table td {
          padding: 14px 16px;
          color: #fff;
          font-size: 14px;
        }

        .dex-number-cell {
          text-align: center;
        }

        .dex-number {
          color: #CCFF00;
          font-size: 14px;
          font-weight: 700;
        }

        .dex-name-cell {
          font-weight: 600;
          text-transform: capitalize;
          letter-spacing: 0.3px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .verified-badge-inline {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: rgba(22, 163, 74, 0.15);
          color: #16a34a;
          border: 1px solid rgba(22, 163, 74, 0.4);
          border-radius: 999px;
          padding: 3px 8px;
          font-size: 11px;
          font-weight: 700;
        }

        .verified-badge-inline svg {
          width: 12px;
          height: 12px;
        }

        .dex-action-cell {
          text-align: center;
        }

        .dex-icon {
          color: rgba(255, 255, 255, 0.5);
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .dex-table tbody tr:hover .dex-icon {
          color: #CCFF00;
          transform: translateX(3px);
        }

        .no-pairs {
          text-align: center;
          padding: 40px 20px;
          color: rgba(255, 255, 255, 0.5);
          font-size: 14px;
        }

        @media (max-width: 640px) {
          .dex-table th,
          .dex-table td {
            padding: 10px 12px;
            font-size: 13px;
          }

          .dex-number {
            font-size: 13px;
          }

          .verified-badge-inline {
            font-size: 10px;
            padding: 2px 6px;
          }
        }
      `}</style>

      <div className="dex-header">
        <span className="section-title">DEX PAIRS</span>
      </div>

      <div className="dex-table-container">
        {dexUrls.length > 0 ? (
          <table className="dex-table">
            <thead>
              <tr>
                <th>#</th>
                <th>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>DEX Platform</span>
                    {isVerified && (
                      <span className="verified-badge-inline">
                        <MdVerified />
                        Verified
                      </span>
                    )}
                  </div>
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dexUrls.map((url, idx) => (
                <tr
                  key={idx}
                  onClick={() => handleOpenUrl(url)}
                  title={url}
                >
                  <td className="dex-number-cell">
                    <span className="dex-number">{idx + 1}</span>
                  </td>
                  <td className="dex-name-cell">
                    {getDexName(url)}
                  </td>
                  <td className="dex-action-cell">
                    <FiExternalLink className="dex-icon" size={18} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-pairs">No DEX pairs available</div>
        )}
      </div>
    </div>
  );
};

export default RugDex;
