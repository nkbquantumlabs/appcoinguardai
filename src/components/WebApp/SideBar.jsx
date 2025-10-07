import { FiX, FiDroplet } from "react-icons/fi";
import { BsShieldCheck, BsQuestionCircle } from "react-icons/bs";
import { GrScan } from "react-icons/gr";
import { MdCrisisAlert } from "react-icons/md";
import { RiNftFill } from "react-icons/ri";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { GiWhaleTail } from "react-icons/gi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { TbLogout2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen, activePage }) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: "home", icon: TbLogout2, label: "Back to Home", route: "/", sameTab: true },
    {
      id: "ai-token-scan",
      icon: GrScan,
      label: "Token Scan",
      route: "/app/ai-token-scan",
    },
    {
      id: "liquidity-scanner",
      icon: FiDroplet,
      label: "Liquidity Scanner",
      route: "/app/liquidity-scanner",
    },
    {
      id: "rugshield",
      icon: BsShieldCheck,
      label: "RugShield",
      route: "/app/rugshield",
    },
    {
      id: "ai-assistant",
      icon: IoChatbubbleEllipsesOutline,
      label: "Coinguard AI",
      route: "/app/ai-chat",
    },
    {
      id: "honeypot-detector",
      icon: MdCrisisAlert,
      label: "Honeypot Detector",
      route: "/app/honeypot-detector",
    },
    {
      id: "whale-tracker",
      icon: GiWhaleTail,
      label: "Whale Tracker",
      route: "/app/whale-tracker",
    },
    {
      id: "nft-generator",
      icon: RiNftFill,
      label: "NFT Generator",
      route: "/app/nft-generator",
    },
    {
      id: "support",
      icon: BsQuestionCircle,
      label: "Support",
      route: "/app/support",
    },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          ${isOpen ? "translate-x-0" : "translate-x-full"} 
          lg:translate-x-0 
          fixed top-0 lg:left-0 lg:right-auto 
          right-0 w-72 sm:w-80 lg:w-64 h-full lg:h-screen 
          bg-black/95 backdrop-blur-md border-l lg:border-l-0 lg:border-r border-gray-800 
          z-50 transition-transform duration-300 ease-in-out
        `}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Sidebar Header */}
          <div className="px-4 py-3 sm:py-4 flex-shrink-0 flex items-center justify-between h-[55px] lg:h-16">
            {/* Show "Menu" text on small screens, logo on desktop */}
            <div className="lg:hidden">
              <span className="text-white font-semibold text-lg">Menu</span>
            </div>
            <img
              src="/App/logo/textlogo.png"
              alt="CoinGuard Logo"
              className="hidden lg:block h-6 sm:h-[38px] w-auto object-contain"
            />
            {isOpen && (
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-200 lg:hidden"
              >
                <FiX className="w-5 h-5" />
              </button>
            )}
          </div>
          <div className="border-b border-gray-800 w-full mt-0 lg:mt-[4px]" />

          {/* Menu items */}
          <nav
            className="flex-1 px-3 py-4 overflow-y-auto"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitScrollbar: "none",
            }}
          >
            <div className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.route) {
                        navigate(item.route);
                        setIsOpen(false); // Close sidebar when navigating to internal routes
                      } else if (item.link) {
                        if (item.sameTab) {
                          window.location.href = item.link;
                        } else {
                          window.open(item.link, "_blank");
                        }
                      }
                    }}
                    className={`group w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 border ${
                      isActive
                        ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-gray-600 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/50 border-transparent hover:border-gray-600"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 flex-shrink-0 ${
                        isActive ? "text-purple-300" : ""
                      }`}
                    />
                    <span className="font-medium text-sm lg:text-base flex-1 text-left">
                      {item.label}
                    </span>
                    {isActive && (
                      <div className="w-2 h-2 rounded-full bg-[#ccff00] flex-shrink-0"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="px-3 py-4 border-t border-gray-800 flex-shrink-0">
            <div className="space-y-2">
              <button
                onClick={() => {
                  navigate("/blog");
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 border text-gray-400 hover:text-white hover:bg-gray-800/50 border-transparent hover:border-gray-600"
              >
                <HiOutlineDocumentText className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium flex-1 text-left">
                  Blogs
                </span>
              </button>

              <button
                onClick={() => {
                  navigate("/app/support");
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 border ${
                  activePage === "support"
                    ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-gray-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50 border-transparent hover:border-gray-600"
                }`}
              >
                <BsQuestionCircle
                  className={`w-5 h-5 flex-shrink-0 ${
                    activePage === "support" ? "text-purple-300" : ""
                  }`}
                />
                <span className="text-sm font-medium flex-1 text-left">
                  Support
                </span>
                {activePage === "support" && (
                  <div className="w-2 h-2 rounded-full bg-[#ccff00] flex-shrink-0"></div>
                )}
              </button>
            </div>
          </div>
        </div>
      </aside>

      <style>{`
        nav::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default Sidebar;
