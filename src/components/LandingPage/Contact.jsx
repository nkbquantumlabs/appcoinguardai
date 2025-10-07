import axios from "axios";
import { useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import {
  IoDocumentTextOutline,
  IoMailOutline,
  IoPersonOutline,
} from "react-icons/io5";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Please enter your name.");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (!formData.subject.trim()) {
      setError("Please enter a subject.");
      return false;
    }

    if (!formData.message.trim() || formData.message.length < 10) {
      setError("Please enter a message with at least 10 characters.");
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError(""); // clear error when typing
  };

  const handleSubmit = async () => {
    setError("");
    if (!validateForm()) return;

    setSubmitting(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE}/contact`,
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }
      );
      if (response.status === 201) {
        alert("form submitted successfully");
      } else {
        alert("something went wrong, please try again later !!");
      }

      console.log(response.status);
    } catch (error) {
      console.log(error);
    }

    // Simulate API call delay
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Reset success message after 2s
      setTimeout(() => setSuccess(false), 2000);
    }, 2000);
  };

  return (
    <>
      <title>
        Contact Coinguard — Get in Touch with Our Web3 Security Team
      </title>
      <meta
        name="description"
        content="Have questions about Coinguard’s Web3 security tools? Contact our team today for support on token scans, audits, whale tracking, AI chat, and NFT generation."
      ></meta>
      <meta
        name="keywords"
        content="Contact Coinguard, Coinguard Support, Web3 Security Contact, Crypto Security Support, DeFi Audit Contact, AI Crypto Security Contact"
      ></meta>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative bg-black/50 border border-white/30 p-8 lg:p-12 group transition-all duration-300 hover:border-[#CCFF00]/50">
          {/* Corner borders */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/30 group-hover:border-[#CCFF00] transition-all duration-500 delay-75"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/30 group-hover:border-[#CCFF00] transition-all duration-500 delay-75"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/30 group-hover:border-[#CCFF00] transition-all duration-500 delay-75"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/30 group-hover:border-[#CCFF00] transition-all duration-500 delay-75"></div>

          {/* Header */}
          <div className="flex flex-col text-center">
            <div className="flex items-center justify-center mb-4">
              <IoMailOutline className="w-7 h-7 text-[#CCFF00] mr-3" />
              <span className="text-sm font-mono tracking-widest text-[#CCFF00]">
                CONTACT US
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-medium text-white mb-4 leading-tight">
              Get In <span className="text-[#CCFF00]">Touch</span>
            </h2>

            <p className="text-white/70 mb-8 text-base max-w-[29rem] mx-auto">
              Have questions about our security solutions or need support? Send
              us a message and our team will get back to you promptly.
            </p>

            {/* Form Fields */}
            <div className="space-y-4 w-full max-w-full sm:max-w-xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <IoPersonOutline className="w-5 h-5 text-white/40" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-5 py-3 bg-white/5 border border-white/30 focus:border-[#CCFF00] focus:outline-none text-white placeholder-white/40 transition-all text-sm"
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <IoMailOutline className="w-5 h-5 text-white/40" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-5 py-3 bg-white/5 border border-white/30 focus:border-[#CCFF00] focus:outline-none text-white placeholder-white/40 transition-all text-sm"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <IoDocumentTextOutline className="w-5 h-5 text-white/40" />
                </div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full pl-10 pr-5 py-3 bg-white/5 border border-white/30 focus:border-[#CCFF00] focus:outline-none text-white placeholder-white/40 transition-all text-sm"
                />
              </div>

              {/* Message */}
              <div>
                <textarea
                  name="message"
                  placeholder="Your message..."
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-5 py-3 bg-white/5 border border-white/30 focus:border-[#CCFF00] focus:outline-none text-white placeholder-white/40 transition-all text-sm resize-none"
                />
              </div>

              {/* Button */}
              <div className="flex justify-left">
                <button
                  onClick={handleSubmit}
                  disabled={submitting || success}
                  className="relative px-6 py-3 bg-transparent text-white font-medium hover:text-[#CCFF00] transition-all flex items-center justify-center border border-white/30 hover:border-[#CCFF00] group/button min-w-[140px]"
                >
                  {submitting ? (
                    <ImSpinner2 className="animate-spin h-5 w-5 text-[#CCFF00]" />
                  ) : success ? (
                    <>
                      <FaRegCheckCircle className="h-5 w-5 text-[#CCFF00] mr-2" />
                      <span className="relative z-10">Submitted</span>
                    </>
                  ) : (
                    <>
                      <span className="relative z-10">Send Message</span>
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

              {/* Error */}
              {error && (
                <p className="text-red-500 mt-2 text-sm font-medium text-center">
                  {error}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
