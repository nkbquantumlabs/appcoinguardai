import { IoCopyOutline, IoPowerOutline } from "react-icons/io5";
import { PiSwapFill } from "react-icons/pi";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BsWallet2 } from "react-icons/bs";
import { PiWalletDuotone } from "react-icons/pi";
import { IoWalletOutline } from "react-icons/io5";

const PresaleHeader = () => {
  const { connected, publicKey, disconnect, select, wallets } = useWallet();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleConnectWallet = () => {
    if (connected) {
      setShowDropdown(!showDropdown);
    } else {
      // Trigger the wallet modal by clicking the hidden WalletMultiButton
      const walletButton = document.querySelector(".wallet-adapter-button");
      if (walletButton) {
        walletButton.click();
      }
    }
  };

  const handleCopyAddress = async () => {
    if (publicKey) {
      try {
        await navigator.clipboard.writeText(publicKey.toString());
        // Create a temporary notification instead of alert
        const notification = document.createElement("div");
        notification.textContent = "Address copied to clipboard!";
        notification.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: #14F195;
          color: #000;
          padding: 12px 20px;
          border-radius: 8px;
          font-weight: 600;
          z-index: 10000;
          box-shadow: 0 4px 12px rgba(20, 241, 149, 0.3);
        `;
        document.body.appendChild(notification);
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 3000);
      } catch (err) {
        console.error("Failed to copy address:", err);
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = publicKey.toString();
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);

        const notification = document.createElement("div");
        notification.textContent = "Address copied to clipboard!";
        notification.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: #14F195;
          color: #000;
          padding: 12px 20px;
          border-radius: 8px;
          font-weight: 600;
          z-index: 10000;
          box-shadow: 0 4px 12px rgba(20, 241, 149, 0.3);
        `;
        document.body.appendChild(notification);
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 3000);
      }
    }
    setShowDropdown(false);
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (err) {
      // Handle disconnect error silently
    }
    setShowDropdown(false);
  };

  const handleChangeWallet = () => {
    // First disconnect current wallet
    disconnect();
    // Small delay to ensure disconnect completes
    setTimeout(() => {
      const walletButton = document.querySelector(".wallet-adapter-button");
      if (walletButton) {
        walletButton.click();
      }
    }, 100);
    setShowDropdown(false);
  };

  return (
    <div className="w-full flex justify-center items-center px-2 sm:px-4 md:px-8 lg:px-6 py-4 sm:py-6 relative">
      <header className="w-full max-w-[1200px] bg-[rgb(17,17,17)] rounded-xl shadow-lg py-3 relative z-10">
        <div className="flex items-center justify-between h-10 sm:h-12 relative">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer ml-4"
            onClick={handleLogoClick}
          >
            <h3 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-[Righteous] font-medium tracking-wide">
              coinguard
            </h3>
          </div>

          {/* Hidden Solana Wallet Button */}
          <div style={{ display: "none" }}>
            <WalletMultiButton />
          </div>

          {/* Connect Wallet Button */}
          <div className="wallet-button-wrapper ml-auto mr-6" ref={dropdownRef}>
            <button onClick={handleConnectWallet} className="wallet-button">
              <span className="wallet-button-text">
                {connected && publicKey ? (
                  `${publicKey.toString().slice(0, 4)}...${publicKey
                    .toString()
                    .slice(-4)}`
                ) : (
                  <span className="flex items-center gap-2">
                    <IoWalletOutline className="text-[#ffd277] w-5 h-5 relative top-[1px]" />
                    Connect Wallet
                  </span>
                )}
              </span>
            </button>

            {/* Dropdown Menu */}
            {connected && showDropdown && (
              <div className="wallet-dropdown">
                <button onClick={handleCopyAddress} className="dropdown-item">
                  <IoCopyOutline className="w-4 h-4" /> Copy Address
                </button>
                <button onClick={handleChangeWallet} className="dropdown-item">
                  <PiSwapFill className="w-4 h-4" /> Change Wallet
                </button>
                <button
                  onClick={handleDisconnect}
                  className="dropdown-item disconnect"
                >
                  <IoPowerOutline className="w-4 h-4" /> Disconnect
                </button>
              </div>
            )}
          </div>

          <style>{`
            @keyframes gradientShift {
              0%, 100% {
                background-position: left;
              }
              50% {
                background-position: right;
              }
            }

            .wallet-button {
              min-width: 140px;
              height: 40px;
              border: none;
              border-radius: 10px;
              background: linear-gradient(to right, #77530a, #ffd277, #77530a, #77530a, #ffd277, #77530a);
              background-size: 250%;
              color: #ffd277;
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              overflow: hidden;
              animation: gradientShift 3s ease-in-out infinite;
              font-weight: 600;
              font-size: 0.875rem;
            }
            
            @media (min-width: 640px) {
              .wallet-button {
                font-size: 1rem;
                min-width: 160px;
              }
            }

            .wallet-button:active {
              transform: scale(0.95);
            }

            .wallet-button-text {
              position: absolute;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #ffd277;
              width: 97%;
              height: 90%;
              border-radius: 8px;
              background-color: rgba(0, 0, 0, 0.842);
              z-index: 1;
            }

            .wallet-button-wrapper {
              position: relative;
            }

            .wallet-dropdown {
              position: absolute;
              top: 100%;
              right: 0;
              margin-top: 8px;
              background: #1a1a1a;
              border: 1px solid #333;
              border-radius: 12px;
              box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
              z-index: 999999;
              min-width: 160px;
              max-width: 200px;
              overflow: hidden;
            }
            
            @media (max-width: 640px) {
              .wallet-dropdown {
                right: -8px;
                margin-top: 4px;
                min-width: 140px;
                max-width: 180px;
                border-radius: 8px;
              }
            }
            
            @media (max-width: 480px) {
              .wallet-dropdown {
                right: -12px;
                margin-top: 2px;
                min-width: 130px;
                max-width: 160px;
                font-size: 13px;
              }
            }

            .dropdown-item {
              width: 100%;
              padding: 12px 16px;
              background: none;
              border: none;
              color: #fff;
              font-size: 14px;
              text-align: left;
              cursor: pointer;
              transition: background-color 0.2s ease;
              display: flex;
              align-items: center;
              gap: 8px;
            }
            
            @media (max-width: 640px) {
              .dropdown-item {
                padding: 10px 12px;
                font-size: 13px;
                gap: 6px;
              }
            }
            
            @media (max-width: 480px) {
              .dropdown-item {
                padding: 8px 10px;
                font-size: 12px;
                gap: 4px;
              }
            }

            .dropdown-item:hover {
              background-color: #333;
            }

            .dropdown-item.disconnect {
              color: #ff6b6b;
              border-top: 1px solid #333;
            }

            .dropdown-item.disconnect:hover {
              background-color: #2a0f0f;
            }
          `}</style>
        </div>
      </header>
    </div>
  );
};

export default PresaleHeader;
