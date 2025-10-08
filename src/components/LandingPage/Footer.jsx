import { useEffect } from "react";
import {
  BsDiscord,
  BsFacebook,
  BsInstagram,
  BsTwitterX,
  BsYoutube,
} from "react-icons/bs";
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
    // "https://www.facebook.com/coinguardai/",
    // "https://discord.gg/coinguardai",
    "https://www.binance.com/en/square/profile/coinguardai",
    "https://coinmarketcap.com/community/profile/coinguardai/",
    "https://www.quora.com/profile/Coinguard",
    "https://www.youtube.com/@CoinguardAI/",
  ];

  const socialIcons = [
    BsTwitterX,
    RiTelegram2Line,
    BsInstagram,
    // BsFacebook,
    // BsDiscord,
    SiBinance,
    SiCoinmarketcap,
    FaQuora,
    BsYoutube,
  ];

  return (
    <div className="w-full border-t border-white border-opacity-20">
      <footer className="w-full bg-black text-gray-300 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-28">
            <div>
              <div className="flex items-center mb-4 space-x-2">
                <Link to={"/"}>
                  <h3 className="text-white text-4xl sm:text-3xl tracking-wider font-[Righteous] font-semibold">
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

            <div>
              <h3 className="text-white font-semibold mb-4 text-xl sm:text-lg font-['DM_Sans']">
                Product
              </h3>
              <ul className="space-y-3 text-base font-[Manrope]">
                <li>
                  <Link
                    to="/About"
                    className="text-white hover:text-gray-300 transition"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-white hover:text-gray-300 transition"
                    to={"/feature"}
                  >
                    Features
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4 text-xl sm:text-lg font-['DM_Sans']">
                Resources
              </h3>
              <ul className="space-y-3 text-base font-[Manrope]">
                <li>
                  <Link
                    target="_blank"
                    to={"https://docs.coinguard.ai/"}
                    className="text-white hover:text-gray-300 transition"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    to={"https://docs.coinguard.ai/"}
                    className="text-white hover:text-gray-300 transition"
                  >
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    to={"https://docs.coinguard.ai/"}
                    className="text-white hover:text-gray-300 transition"
                  >
                    Security Guide
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    to={"https://blog.coinguard.ai/"}
                    className="text-white hover:text-gray-300 transition"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4 text-xl sm:text-lg font-['DM_Sans']">
                Legal
              </h3>
              <ul className="space-y-3 text-base font-[Manrope]">
                <li>
                  <Link
                    to={"/terms-of-service"}
                    className="text-white hover:text-gray-300 transition"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/privacy-policy"}
                    className="text-white hover:text-gray-300 transition"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/cookie-policy"}
                    className="text-white hover:text-gray-300 transition"
                  >
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/disclaimer"}
                    className="text-white hover:text-gray-300 transition"
                  >
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {socialIcons.map((Icon, index) => (
              <a
                key={index}
                href={socialLinks[index]}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center text-white border border-white/20 hover:text-[#CCFF00] hover:border-[#CCFF00] transition-colors duration-300 rounded-full"
              >
                <Icon className="w-5 h-5 text-white" />
              </a>
            ))}
          </div>
        </div>

        <div className="w-full border-t border-white border-opacity-20">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white">
            <p className="text-center text-base md:text-left">
              © 2025 Coinguard. All rights reserved.
            </p>
            <ul className="flex flex-wrap items-center justify-center md:justify-end gap-4 text-center">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                <span className="text-white text-base">
                  All Systems Operational
                </span>
              </li>
              <li className="text-white text-base">
                Built with security in mind
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
