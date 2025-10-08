import axios from "axios";
import { useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { IoMailOutline } from "react-icons/io5";

// Newsletter Component
const NewsletterBox = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async () => {
    setError("");
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/api/subscribe`,
        {
          email: email,
        }
      );
      console.log(res.status);

      setSuccess(true);
      setEmail("");
    } catch (err) {
      setError("email already Registered");
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
   <div className="w-full max-w-[1250px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 pb-16 sm:pb-20 md:pb-24 lg:pb-28 xl:pb-32">
      <div className="relative bg-black/50 border border-white/30 p-8 lg:p-12 group transition-all duration-300 hover:border-[#CCFF00]/50">
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/30 group-hover:border-[#CCFF00] transition-all duration-500 delay-75"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/30 group-hover:border-[#CCFF00] transition-all duration-500 delay-75"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/30 group-hover:border-[#CCFF00] transition-all duration-500 delay-75"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/30 group-hover:border-[#CCFF00] transition-all duration-500 delay-75"></div>

        <div className="relative flex flex-col lg:flex-row gap-10 items-center">
          <div className="flex-1">
            <div className="flex items-center mb-4">
              <IoMailOutline className="w-7 h-7 text-[#CCFF00] mr-3" />
              <span className="text-sm font-mono tracking-widest text-[#CCFF00]">
                SECURITY UPDATES
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-medium text-white mb-4 leading-tight">
              Stay <span className="text-[#CCFF00]">Informed</span>
            </h2>

            <p className="text-white/70 mb-8 text-base max-w-2xl">
              Get critical security alerts, platform updates, and threat
              analysis delivered securely to your inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl">
              <input
                type="email"
                placeholder="secure@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow px-5 py-3 bg-white/5 border border-white/30 focus:border-[#CCFF00] focus:outline-none text-white placeholder-white/40 transition-all text-sm"
              />
              <button
                onClick={handleSubmit}
                disabled={submitting || success}
                className="relative px-6 py-3 bg-transparent text-white font-medium hover:text-[#CCFF00] transition-all flex items-center justify-center border border-white/30 hover:border-[#CCFF00] group/button min-w-[140px]"
              >
                {submitting ? (
                  <ImSpinner2 className="animate-spin h-5 w-5 text-[#CCFF00]" />
                ) : success ? (
                  <FaRegCheckCircle className="h-5 w-5 text-[#CCFF00]" />
                ) : (
                  <>
                    <span className="relative z-10">Subscribe</span>
                    <div className="absolute inset-0 bg-[#CCFF00] opacity-0 group-hover/button:opacity-10 transition-opacity duration-300"></div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2 h-4 w-4 group-hover/button:translate-x-1 group-hover/button:stroke-[#CCFF00] transition-all"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </>
                )}
              </button>
            </div>

            {error && (
              <p className="text-red-500 mt-2 text-sm font-medium">{error}</p>
            )}

            {success && (
              <p className="text-[#CCFF00] mt-2 text-sm font-medium">
                You're subscribed!
              </p>
            )}
          </div>

          <div className="hidden lg:block relative w-48 h-48">
            <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-40 h-40 border border-[#CCFF00]/20 group-hover:border-[#CCFF00]/40 rotate-45 transition-all duration-700 flex items-center justify-center">
                <IoMailOutline className="w-16 h-16 text-[#CCFF00]/60 group-hover:text-[#CCFF00] -rotate-45 transition-all duration-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterBox;
