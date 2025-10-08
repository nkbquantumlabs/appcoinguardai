import { AppWindowIcon } from "lucide-react";
import React from "react";
import { AiFillWechat, AiOutlineSecurityScan } from "react-icons/ai";
import { FaMobileScreenButton, FaWallet } from "react-icons/fa6";
import { GiWhaleTail } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";
import { IoMdAnalytics } from "react-icons/io";
import { IoShieldCheckmark, IoWallet } from "react-icons/io5";
import { MdOutlineCrisisAlert } from "react-icons/md";
import { RiRobot2Fill } from "react-icons/ri";
import { TbRobotOff } from "react-icons/tb";
import { IoStarOutline } from "react-icons/io5";
import { RiNftFill } from "react-icons/ri";
import { IoStar } from "react-icons/io5";

import { Link } from "react-router-dom";

const ProductModel = ({ onMouseEnter, onMouseLeave }) => {
  return (
    <div
      className="fixed left-1/2 transform -translate-x-1/2 top-[145px] w-[700px] bg-[rgb(17,17,17)] shadow-lg rounded-xl p-6 grid grid-cols-2 gap-6 z-[55] text-white"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Column 1 */}
      <div>
        <h4 className="text-gray-600 text-sm font-semibold mb-3">
          AI Security Tools
        </h4>
        <ul className="space-y-2">
          <li>
            <Link
              to="/app/ai-token-scan"
              className="flex items-start gap-2 hover:text-[#CCFF00]"
            >
              <span>
                <AiOutlineSecurityScan className="w-4 h-4 mt-1" />
              </span>
              <div>
                <p className="font-medium">Token Scan</p>
                <p className="text-xs text-gray-500">
                  AI-powered smart contract & token safety assessment
                </p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              to="/app/rugshield"
              className="flex items-start gap-2 hover:text-[#CCFF00]"
            >
              <span>
                <IoShieldCheckmark className="w-4 h-4 mt-1" />
              </span>
              <div>
                <p className="font-medium">Rugshield</p>
                <p className="text-xs text-gray-500">
                  Early rug-pull detection & prevention system
                </p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              to="/app/liquidity-scanner"
              className="flex items-start gap-2 hover:text-[#CCFF00]"
            >
              <span>
                <GrMoney className="w-4 h-4 mt-1" />
              </span>
              <div>
                <p className="font-medium">Liquidity Scan</p>
                <p className="text-xs text-gray-500">
                  Automated liquidity pool health & safety analysis
                </p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              to="/app/honeypot-detector"
              className="flex items-start gap-2 hover:text-[#CCFF00]"
            >
              <span>
                <MdOutlineCrisisAlert className="w-4 h-4 mt-1" />
              </span>
              <div>
                <p className="font-medium">Honeypot Detector</p>
                <p className="text-xs text-gray-500">
                  Detect malicious liquidity traps instantly
                </p>
              </div>
            </Link>
          </li>
          {/* Whale Tracker added here - below Honeypot Detector */}
          <li>
            <Link
              to="/app/whale-tracker"
              className="flex items-start gap-2 hover:text-[#CCFF00]"
            >
              <span>
                <GiWhaleTail className="w-4 h-4 mt-1" />
              </span>
              <div>
                <p className="font-medium">Whale Tracker</p>
                <p className="text-xs text-gray-500">
                  Real-time whale tracking & smart money alerts
                </p>
              </div>
            </Link>
          </li>
        </ul>

        <h4 className="text-gray-600 text-sm font-semibold mt-6 mb-3">
          Communication & Insights
        </h4>
        <ul className="space-y-2">
          <li>
            <Link
              to="/app/ai-chat"
              className="flex items-start gap-2 hover:text-[#CCFF00]"
            >
              <span>
                <AiFillWechat className="w-4 h-4 mt-1" />
              </span>
              <div>
                <p className="font-medium">Coinguard AI</p>
                <p className="text-xs text-gray-500">
                  24/7 Coinguard AI for crypto market analysis & security alerts
                </p>
              </div>
            </Link>
          </li>
        </ul>

        <h4 className="text-gray-600 text-sm font-semibold mt-6 mb-3">
          Creative AI
        </h4>
        <ul className="space-y-2">
          <li>
            <Link
              to="/app/nft-generator"
              className="flex items-start gap-2 hover:text-[#CCFF00]"
            >
              <span>
                <RiNftFill className="w-4 h-5 mt-1" />
              </span>
              <div>
                <p className="font-medium">NFT Generator</p>
                <p className="text-xs text-gray-500">
                  AI-driven NFT creation with customizable art & metadata
                </p>
              </div>
            </Link>
          </li>
        </ul>
      </div>

      {/* Column 2 */}
      <div>
        <h4 className="text-gray-600 text-sm font-semibold mb-3">
          Flagship Upcoming Products
        </h4>
        <ul className="space-y-4">
          <li>
            <Link
              to="#"
              className="flex items-start gap-2 hover:text-[#CCFF00]"
            >
              <span>
                <FaMobileScreenButton className="w-4 h-4 mt-1" />
              </span>
              <div>
                <p className="font-medium">Coinguard App (Coming Soon)</p>
                <p className="text-xs text-gray-500">
                  All-in-one platform for safe memecoin trading — detect scams
                  instantly, monitor wallets, track portfolios, trade with
                  AI-powered protection, explore tokens, and get AI insights,
                  news & trends.
                </p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="flex items-start gap-2 hover:text-[#CCFF00]"
            >
              <span>
                <FaWallet className="w-4 h-4 mt-1" />
              </span>
              <div>
                <p className="font-medium">Coinguard Wallet (Coming Soon)</p>
                <p className="text-xs text-gray-500">
                  Multi-platform wallet with built-in Pro Security Tools — scans
                  any token before purchase, delivers instant safety reports,
                  and provides real-time trading guidance.
                </p>
              </div>
            </Link>
          </li>
        </ul>

        <h4 className="text-gray-600 text-sm font-semibold mt-6 mb-3">
          Other Upcoming Tools
        </h4>
        <ul className="space-y-2">
          <li>
            <Link
              to="#"
              className="flex items-start gap-2 hover:text-[#CCFF00]"
            >
              <span>
                <IoWallet className="w-4 h-4 mt-1" />
              </span>
              <div>
                <p className="font-medium">Portfolio Overview</p>
                <p className="text-xs text-gray-500">
                  Unified dashboard for holdings & risks
                </p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="flex items-start gap-2 hover:text-[#CCFF00]"
            >
              <span>
                <IoStar className="w-4 h-4 mt-1" />
              </span>
              <div>
                <p className="font-medium">Smart Picks</p>
                <p className="text-xs text-gray-500">
                  AI-curated token recommendations and investment opportunities
                </p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="flex items-start gap-2 hover:text-[#CCFF00]"
            >
              <span>
                <IoMdAnalytics className="w-4 h-4 mt-1" />
              </span>
              <div>
                <p className="font-medium">Insight Hub</p>
                <p className="text-xs text-gray-500">
                  Comprehensive market analysis and investment insights
                </p>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductModel;
