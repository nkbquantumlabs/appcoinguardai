import { useEffect } from "react";
import {
  IoClose,
  IoCheckmarkCircle,
  IoWarning,
  IoAlertCircle,
} from "react-icons/io5";

const Alert = ({ type, message, txHash, onClose, autoClose = true }) => {
  useEffect(() => {
    if (autoClose && type !== "success") {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose, type]);

  const getAlertStyles = () => {
    switch (type) {
      case "success":
        return {
          bg: "bg-[rgb(240,253,244)]",
          border: "border-[rgba(74,222,128,0.3)]",
          icon: (
            <IoCheckmarkCircle className="w-6 h-6 text-[rgb(74,222,128)] drop-shadow-[0_0_6px_rgba(74,222,128,0.4)]" />
          ),
          titleColor: "text-[rgb(22,101,52)]",
          textColor: "text-[rgb(21,128,61)]",
        };
      case "warning":
        return {
          bg: "bg-[rgb(255,251,235)]",
          border: "border-[rgba(250,204,21,0.3)]",
          icon: (
            <IoWarning className="w-6 h-6 text-[rgb(250,204,21)] drop-shadow-[0_0_6px_rgba(250,204,21,0.4)]" />
          ),
          titleColor: "text-[rgb(133,77,14)]",
          textColor: "text-[rgb(161,98,7)]",
        };
      case "error":
        return {
          bg: "bg-[rgb(254,242,242)]",
          border: "border-[rgba(248,113,113,0.3)]",
          icon: (
            <IoAlertCircle className="w-6 h-6 text-[rgb(248,113,113)] drop-shadow-[0_0_6px_rgba(248,113,113,0.4)]" />
          ),
          titleColor: "text-[rgb(127,29,29)]",
          textColor: "text-[rgb(153,27,27)]",
        };
      case "info":
      default:
        return {
          bg: "bg-[rgb(239,246,255)]",
          border: "border-[rgba(96,165,250,0.3)]",
          icon: (
            <IoAlertCircle className="w-6 h-6 text-[rgb(96,165,250)] drop-shadow-[0_0_6px_rgba(96,165,250,0.4)]" />
          ),
          titleColor: "text-[rgb(30,64,175)]",
          textColor: "text-[rgb(37,99,235)]",
        };
    }
  };

  const styles = getAlertStyles();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className={`${styles.bg} ${styles.border} border rounded-xl p-4 shadow-lg max-w-sm w-full animate-slideIn transition-all duration-300`}
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">{styles.icon}</div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className={`${styles.titleColor} text-sm font-semibold mb-1`}>
                {type === "success" && "Transaction Successful"}
                {type === "error" && "Transaction Failed"}
                {type === "warning" && "Warning"}
                {type === "info" && "Information"}
              </h3>
              <button
                onClick={onClose}
                className="flex-shrink-0 text-gray-400 hover:text-black transition-colors"
              >
                <IoClose className="w-5 h-5" />
              </button>
            </div>

            <p
              className={`${styles.textColor} text-xs mb-2 leading-relaxed`}
            >
              {type === "success" ? (
                <>
                  You will receive CGAI once the presale is over.
                  {message && (
                    <>
                      <br />
                      <span className="opacity-80">{message}</span>
                    </>
                  )}
                </>
              ) : (
                message
              )}
            </p>

            {/* Transaction Hash for Success */}
            {type === "success" && txHash && (
              <div className="mt-3 space-y-2">
                <div className="bg-[rgb(220,243,234)] rounded-lg p-2 border border-[rgba(22,101,52,0.2)]">
                  <p className="text-[10px] text-[rgb(22,101,52)] mb-1">
                    Transaction Hash:
                  </p>
                  <p className="text-[rgb(21,128,61)] text-xs font-mono break-all">
                    {txHash.slice(0, 16)}...{txHash.slice(-16)}
                  </p>
                </div>

                <div className="flex gap-2">
                  <a
                    href={`https://solscan.io/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[rgb(22,101,52)] hover:bg-[rgb(21,128,61)] text-white text-xs font-medium py-2 px-3 rounded-lg transition-all duration-200 shadow-md"
                  >
                    View on Solscan
                  </a>
                  <button
                    onClick={() => navigator.clipboard.writeText(txHash)}
                    className="bg-[rgb(240,253,244)] hover:bg-[rgb(220,243,234)] border border-[rgba(22,101,52,0.3)] text-[rgb(22,101,52)] text-xs font-medium py-2 px-3 rounded-lg transition-all duration-200"
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateY(-10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.25s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Alert;
