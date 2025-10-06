import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMailOutline } from "react-icons/io5";
import { ImSpinner2 } from "react-icons/im";
import { FaRegCheckCircle } from "react-icons/fa";

const Support = () => {
  const categories = [
    "General Inquiry",
    "Technical Issue",
    "Account Problem",
    "Billing",
  ];
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!validateEmail(formData.email)) {
      setFormError("Please enter a valid email address.");
      return;
    }
    if (!selectedCategory) {
      setFormError("Please select a category from the dropdown.");
      return;
    }
    if (!formData.subject.trim()) {
      setFormError("Subject is required. Please enter a subject.");
      return;
    }
    if (formData.subject.trim().length < 5) {
      setFormError("Subject is too short. Please enter at least 5 characters.");
      return;
    }
    if (!formData.message.trim()) {
      setFormError("Message is required. Please describe your issue.");
      return;
    }
    if (formData.message.trim().length < 10) {
      setFormError("Message is too short. Please enter at least 10 characters.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/api/ticket`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          category: selectedCategory,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit ticket');
      }

      setSubmitting(false);
      setFormSuccess(true);
      setFormData({ email: "", subject: "", message: "" });
      setSelectedCategory("");
    } catch (error) {
      setSubmitting(false);
      setFormError("Failed to submit ticket. Please try again later.");
      console.error('Error submitting ticket:', error);
    }
  };

  const handleNewsletterSubmit = async () => {
    setError("");
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/api/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }

      setSubmitting(false);
      setSuccess(true);
      setEmail("");
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      setSubmitting(false);
      setError("Failed to subscribe. Please try again later.");
      console.error('Error subscribing:', error);
    }
  };

  return (
    <section className="px-4 sm:px-6 md:px-16 py-4 sm:py-6 md:py-8 bg-[#121212] text-white">
      <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold mb-6 text-center">
        Get in Touch
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-black p-4 sm:p-6 rounded-lg border border-[#333]">
          {formSuccess ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center py-8">
                <FaRegCheckCircle className="w-16 h-16 text-[#ccff00] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Your submission was successful.
                </h3>
                <p className="text-gray-400 mb-6">
                  We will review it and respond within 24 hours.
                </p>
                <button
                  onClick={() => setFormSuccess(false)}
                  className="px-6 py-2.5 bg-[#ccff00] text-black font-medium rounded-lg hover:bg-[#ccff00]/90 transition-all duration-300"
                >
                  Submit Another Ticket
                </button>
              </div>
            </div>
          ) : (
            <>
              <h3 className="text-lg sm:text-xl font-semibold mb-4">
                Submit a Support Ticket
              </h3>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3 py-3 sm:py-4 rounded-md bg-black border border-gray-600 focus:outline-none focus:border-[#ccff00] placeholder-gray-400 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Category
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="w-full text-left px-3 py-3 sm:py-4 pr-10 rounded-md bg-black border border-gray-600 focus:outline-none focus:border-[#ccff00] text-sm"
                    >
                      {selectedCategory || "Select a category"}
                      <IoMdArrowDropdown
                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-[#999] pointer-events-none transition-transform duration-300 ease-in-out ${
                          dropdownOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </button>

                    {dropdownOpen && (
                      <ul className="absolute z-20 mt-2 w-full bg-[#0d0d0d]/80 backdrop-blur-md border border-[#333] rounded-lg shadow-xl overflow-hidden">
                        {categories.map((category, index) => (
                          <li
                            key={index}
                            onClick={() => {
                              setSelectedCategory(category);
                              setDropdownOpen(false);
                            }}
                            className="px-4 py-3 hover:bg-[#ccff00] hover:bg-opacity-20 transition-all duration-300 cursor-pointer text-white text-sm"
                          >
                            {category}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Brief details of your issue"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full px-3 py-3 sm:py-4 rounded-md bg-black border border-gray-600 focus:outline-none focus:border-[#ccff00] placeholder-gray-400 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Please describe your issue in detail"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-3 py-3 sm:py-4 rounded-md bg-black border border-gray-600 focus:outline-none focus:border-[#ccff00] placeholder-gray-400 text-sm"
                  ></textarea>
                </div>

                {formError && (
                  <div className="text-red-500 text-sm font-medium">
                    {formError}
                  </div>
                )}

                <div className="relative w-full mt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="relative w-full px-6 py-2.5 bg-white/5 border border-white/30 hover:border-[#CCFF00be] transition-all duration-300 rounded-lg text-sm disabled:opacity-50"
                  >
                    {submitting ? (
                      <ImSpinner2 className="animate-spin h-4 w-4 text-[#ccff00] mx-auto" />
                    ) : (
                      <span className="text-white font-medium">
                        Submit Ticket
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-black p-4 sm:p-6 rounded-lg border border-[#333] text-sm">
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="border-b border-gray-600 mb-6" />
            <p>
              <span className="font-semibold">Email:</span>
              <br />
              support@coinguard.ai
            </p>
            <p className="mt-4">
              <span className="font-semibold">Response Time:</span>
              <br />
              Within 24 hours
            </p>
            <p className="mt-4">
              <span className="font-semibold">Live Chat:</span>
              <br />
              Available 24/7
            </p>
          </div>

          <div className="bg-black p-4 sm:p-6 rounded-lg border border-[#333] text-sm">
            <h3 className="text-lg font-semibold mb-4">FAQ</h3>
            <div className="border-b border-gray-600 mb-6" />
            <div className="mb-3">
              <p className="font-semibold">Is my info safe?              </p>
              <p className="text-gray-400">
              Yes, all communication is secure and your information is handled confidentially.
              </p>
            </div>
            <div className="mb-3">
              <p className="font-semibold">How do I contact support?
              </p>
              <p className="text-gray-400">
              Reach out to our team using the contact options on this page, and we’ll assist you promptly.

              </p>
            </div>
            <div>
              <p className="font-semibold">Response time?
              </p>
              <p className="text-gray-400">
              Yes, all communication is secure and your information is handled confidentially.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-4 sm:py-6 md:py-8 space-y-8 sm:space-y-12">
        <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-center text-white">
          Join Our Newsletter
        </h2>

        <div className="relative bg-black border border-white/30 p-4 xs:p-6 sm:p-8 lg:p-12 group transition-all duration-300 hover:border-[#CCFF00]/50">
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/30 group-hover:border-[#CCFF00] transition-all duration-500 delay-75"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/30 group-hover:border-[#CCFF00] transition-all duration-500 delay-75"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/30 group-hover:border-[#CCFF00] transition-all duration-500 delay-75"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/30 group-hover:border-[#CCFF00] transition-all duration-500 delay-75"></div>

          <div className="relative flex flex-col lg:flex-row gap-6 sm:gap-10 items-center space-y-4 lg:space-y-0">
            <div className="flex-1 w-full">
              <div className="flex items-center mb-3 sm:mb-4">
                <IoMailOutline className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 text-[#CCFF00] mr-2 sm:mr-3" />
                <span className="text-xs xs:text-sm font-mono tracking-widest text-[#CCFF00]">
                  SECURITY UPDATES
                </span>
              </div>

              <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-medium text-white leading-tight mb-3 sm:mb-4">
                Stay <span className="text-[#CCFF00]">Informed</span>
              </h2>

              <p className="text-white/70 text-sm xs:text-base max-w-2xl mb-4 sm:mb-6 xs:mb-8">
                Get critical security alerts, platform updates, and threat
                analysis delivered securely to your inbox.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <input
                  type="email"
                  placeholder="secure@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow px-4 py-2 xs:px-5 xs:py-3 bg-white/5 border border-white/30 focus:border-[#CCFF00] focus:outline-none text-white placeholder-white/40 transition-all text-xs xs:text-sm"
                />
                <button
                  onClick={handleNewsletterSubmit}
                  disabled={submitting || success}
                  className="relative px-4 py-2 xs:px-5 xs:py-3 sm:px-6 sm:py-3 bg-transparent text-white font-medium hover:text-[#CCFF00] transition-all flex items-center justify-center border border-white/30 hover:border-[#CCFF00] group/button min-w-[120px] sm:min-w-[140px] text-xs xs:text-sm"
                >
                  {submitting ? (
                    <ImSpinner2 className="animate-spin h-4 w-4 xs:h-5 xs:w-5 text-[#CCFF00]" />
                  ) : success ? (
                    <FaRegCheckCircle className="h-4 w-4 xs:h-5 xs:w-5 text-[#CCFF00]" />
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
                        className="ml-2 h-3 w-3 xs:h-4 xs:w-4 group-hover/button:translate-x-1 group-hover/button:stroke-[#CCFF00] transition-all"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </>
                  )}
                </button>
              </div>

              {error && (
                <p className="text-red-500 mt-2 text-xs xs:text-sm font-medium">
                  {error}
                </p>
              )}

              {success && (
                <p className="text-[#CCFF00] mt-2 text-xs xs:text-sm font-medium">
                  You're subscribed!
                </p>
              )}
            </div>

            <div className="hidden lg:block relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48">
              <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 border border-[#CCFF00]/20 group-hover:border-[#CCFF00]/40 rotate-45 transition-all duration-700 flex items-center justify-center">
                  <IoMailOutline className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-[#CCFF00]/60 group-hover:text-[#CCFF00] -rotate-45 transition-all duration-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Support;
