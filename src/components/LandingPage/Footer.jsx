import { useEffect } from "react";
import { BsInstagram, BsTwitterX, BsYoutube } from "react-icons/bs";
import { FaQuora } from "react-icons/fa6";
import { RiTelegram2Line } from "react-icons/ri";
import { SiBinance, SiCoinmarketcap } from "react-icons/si";
import { Link } from "react-router-dom";

export default function Footer() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const socialLinks = [
    "https://x.com/Coinguard_AI/",
    "https://t.me/coinguardai_official/",
    "https://instagram.com/coinguard.ai/",
    "https://www.binance.com/en/square/profile/coinguardai",
    "https://coinmarketcap.com/community/profile/coinguardai/",
    "https://www.quora.com/profile/Coinguard",
    "https://www.youtube.com/@CoinguardAI/",
  ];

  const socialIcons = [
    BsTwitterX,
    RiTelegram2Line,
    BsInstagram,
    SiBinance,
    SiCoinmarketcap,
    FaQuora,
    BsYoutube,
  ];

  return (
    <div className="w-full border-t border-white/20 bg-black relative overflow-hidden">
      {/* Neon Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#ccff0040] to-transparent blur-[100px] opacity-30 pointer-events-none" />

      <footer className="w-full text-gray-300 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-28 relative z-10">
        <div className="max-w-[1300px] mx-auto py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-28">
            {/* Brand */}
            <div className="transform sm:translate-x-4 md:translate-x-8 lg:translate-x-12 xl:translate-x-16">
              <div className="flex items-center mb-4 space-x-2">
                <Link to={"/"}>
                  <h3 className="text-white text-4xl sm:text-3xl tracking-wider font-[Righteous] font-semibold transition-all duration-300 ">
                    coinguard
                  </h3>
                </Link>
              </div>
              <p className="text-base text-white mb-6 font-[Manrope] w-full sm:w-[15rem]">
                The ultimate memecoin safety net. Protecting traders from scams,
                rug pulls, and malicious contracts through advanced AI
                technology.
              </p>
            </div>

            {/* Product */}
            <div className="transform sm:translate-x-4 md:translate-x-8 lg:translate-x-12 xl:translate-x-16">
              <h3 className="text-white font-semibold mb-4 text-xl sm:text-lg font-['DM_Sans'] relative after:content-[''] after:block after:w-12 after:h-[2px] after:bg-[#CCFF00] after:mt-2 after:rounded-full">
                Product
              </h3>
              <ul className="space-y-3 text-base font-[Manrope]">
                <li>
                  <Link
                    to="/About"
                    className="text-white hover:text-[#CCFF00] transition-all duration-300 hover:drop-shadow-[0_0_8px_#ccff00]"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/feature"}
                    className="text-white hover:text-[#CCFF00] transition-all duration-300 hover:drop-shadow-[0_0_8px_#ccff00]"
                  >
                    Features
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="transform sm:translate-x-4 md:translate-x-8 lg:translate-x-12 xl:translate-x-16">
              <h3 className="text-white font-semibold mb-4 text-xl sm:text-lg font-['DM_Sans'] relative after:content-[''] after:block after:w-16 after:h-[2px] after:bg-[#CCFF00] after:mt-2 after:rounded-full">
                Resources
              </h3>
              <ul className="space-y-3 text-base font-[Manrope]">
                <li>
                  <Link
                    target="_blank"
                    to={"https://docs.coinguard.ai/"}
                    className="text-white hover:text-[#CCFF00] transition-all duration-300 hover:drop-shadow-[0_0_8px_#ccff00]"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    to={"https://blog.coinguard.ai/"}
                    className="text-white hover:text-[#CCFF00] transition-all duration-300 hover:drop-shadow-[0_0_8px_#ccff00]"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Icons */}
          <div className="mt-10 flex flex-wrap justify-center gap-5">
            {socialIcons.map((Icon, index) => (
              <a
                key={index}
                href={socialLinks[index]}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center text-white border border-white/20 rounded-full hover:text-[#CCFF00] hover:border-[#CCFF00] hover:shadow-[0_0_15px_#ccff00] transition-all duration-300"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="w-full border-t border-white/20">
          <div className="max-w-[1300px] mx-auto py-6 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-28 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white">
            <p className="text-center text-base md:text-left">
              © 2025 Coinguard. All rights reserved.
            </p>
            <ul className="flex flex-wrap items-center justify-center md:justify-end gap-4 text-center">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#CCFF00] rounded-full animate-pulse shadow-[0_0_10px_#ccff00]"></span>
                <span className="text-white text-base">
                  All Systems Operational
                </span>
              </li>
              <li className="text-white text-base">
                Built with <span className="text-[#CCFF00]">security</span> in
                mind
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
