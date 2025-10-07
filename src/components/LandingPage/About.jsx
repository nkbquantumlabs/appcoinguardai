import React from "react";
import { IoShieldCheckmark, IoWallet, IoStarOutline } from "react-icons/io5";
import { AiOutlineSecurityScan } from "react-icons/ai";
import { MdOutlineCrisisAlert } from "react-icons/md";
import { TbRobotOff } from "react-icons/tb";
import { GiWhaleTail } from "react-icons/gi";
import { RiRobot2Fill, RiNftFill } from "react-icons/ri";
import { BsDropletHalf } from "react-icons/bs";
import { IoMdAnalytics } from "react-icons/io";

const AboutCoinguard = () => {
  return (
    <>
      <title>
        About Coinguard — AI-Powered Web3 Security & DeFi Protection
      </title>
      <meta
        name="description"
        content="Discover the story behind Coinguard, the AI-powered Web3 security platform. Learn about our mission to protect DeFi users with token scans, audits, whale tracking, and AI security tools."
      ></meta>
      <meta
        name="keywords"
        content="About Coinguard, Coinguard Mission, Web3 Security Platform, DeFi Security Tools, AI Blockchain Security, Whale Tracking Tools"
      ></meta>

      <main className="bg-black text-gray-300 min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-gradient-to-r from-[#CCFF00]/10 to-[#CCFF00]/5 rounded-full mix-blend-soft-light filter blur-2xl sm:blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-gradient-to-r from-[#CCFF00]/5 to-[#CCFF00]/10 rounded-full mix-blend-soft-light filter blur-2xl sm:blur-3xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/4 left-1/4 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-[#CCFF00]/10 rounded-full mix-blend-soft-light filter blur-2xl sm:blur-3xl opacity-10 animate-pulse delay-2000"></div>
        </div>

        <section className="relative px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
            {/* Hero Section */}
            <div className="text-center space-y-6 sm:space-y-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                About{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CCFF00] to-[#aaff00]">
                  Coinguard
                </span>
              </h1>

              <div className="max-w-3xl mx-auto transform transition-all duration-500 hover:scale-[1.02]">
                <div className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-300 bg-gradient-to-b from-white/5 to-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-[#CCFF00]/20 shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#CCFF00]/5 to-transparent opacity-10"></div>
                  <strong className="text-white relative z-10">
                    Guarding Your Crypto Journey, Every Step of the Way.
                  </strong>{" "}
                  At{" "}
                  <span className="font-semibold text-[#CCFF00] relative z-10">
                    Coinguard
                  </span>
                  , we believe security is the cornerstone of trust in the
                  blockchain world. Our mission is to empower traders and
                  investors with advanced AI-powered tools to detect scams, rug
                  pulls, and malicious smart contracts before they cause harm.
                </div>
              </div>
            </div>

            {/* Mission Section */}
            <SectionCard>
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="h-0.5 bg-gradient-to-r from-[#CCFF00] to-transparent flex-grow mr-4"></div>
                <SectionTitle>Our Mission</SectionTitle>
                <div className="h-0.5 bg-gradient-to-l from-[#CCFF00] to-transparent flex-grow ml-4"></div>
              </div>
              <SectionContent>
                Our mission is to build the most reliable and user-friendly
                crypto security platform, where every investor can verify before
                they trust. By combining cutting-edge AI algorithms, detailed
                blockchain analytics, and intuitive design, we detect threats
                instantly and present them in clear, actionable terms. We aim to
                eliminate fear from trading, empowering you to make confident,
                informed investment decisions in a secure environment.
              </SectionContent>
            </SectionCard>

            {/* Difference Section */}
            <SectionCard>
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="h-0.5 bg-gradient-to-r from-[#CCFF00] to-transparent flex-grow mr-4"></div>
                <SectionTitle>
                  What Makes{" "}
                  <span className="text-[#CCFF00]">
                    Coinguard
                    <span className="sm:hidden">
                      <br />
                    </span>{" "}
                    Unique
                  </span>
                </SectionTitle>
                <div className="h-0.5 bg-gradient-to-l from-[#CCFF00] to-transparent flex-grow ml-4"></div>
              </div>
              <SectionContent>
                Unlike other platforms that focus solely on token analysis,
                Coinguard safeguards your entire trading experience—from initial
                research to final execution. We go beyond identifying risks by
                providing actionable insights that protect your portfolio across
                DeFi, NFTs, and emerging blockchain projects. Our holistic
                approach ensures you're equipped with the knowledge and tools to
                navigate the crypto landscape securely.
              </SectionContent>
            </SectionCard>

            {/* Core Features */}
            <SectionCard>
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="h-0.5 bg-gradient-to-r from-[#CCFF00] to-transparent flex-grow mr-4"></div>
                <SectionTitle>
                  Our Core Security <br className="sm:hidden" />
                  Features
                </SectionTitle>

                <div className="h-0.5 bg-gradient-to-l from-[#CCFF00] to-transparent flex-grow ml-4"></div>
              </div>
              <div className="flex flex-col space-y-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0 mt-6 sm:mt-8">
                <FeatureItem
                  icon={
                    <AiOutlineSecurityScan className="h-6 w-6 sm:h-7 sm:w-7 text-[#CCFF00]" />
                  }
                  title="Token Scan"
                  description="Analyze smart contracts using AI to detect potential threats like honeypots, mint functions, and high-risk patterns before you buy."
                />
                <FeatureItem
                  icon={
                    <BsDropletHalf className="h-6 w-6 sm:h-7 sm:w-7 text-[#CCFF00]" />
                  }
                  title="Liquidity Scanner"
                  description="Check if a token's liquidity is locked or vulnerable, helping you avoid projects that may pull liquidity and disappear."
                />
                <FeatureItem
                  icon={
                    <IoShieldCheckmark className="h-6 w-6 sm:h-7 sm:w-7 text-[#CCFF00]" />
                  }
                  title="RugShield"
                  description="Real-time protection against rug pulls. Flags suspicious ownership setups, liquidity unlocks, and sudden fund movements."
                />
                <FeatureItem
                  icon={
                    <MdOutlineCrisisAlert className="h-6 w-6 sm:h-7 sm:w-7 text-[#CCFF00]" />
                  }
                  title="Honeypot Detector"
                  description="Detect tokens where users can buy but not sell. Protect yourself from deceptive contracts that trap funds."
                />
                <FeatureItem
                  icon={
                    <GiWhaleTail className="h-6 w-6 sm:h-7 sm:w-7 text-[#CCFF00]" />
                  }
                  title="Whale Tracker"
                  description="Monitor large wallet movements and whale activity in real-time. Track smart money, identify accumulation patterns, and get alerts for significant transactions."
                />
                <FeatureItem
                  icon={
                    <RiNftFill className="h-6 w-6 sm:h-7 sm:w-7 text-[#CCFF00]" />
                  }
                  title="NFT Generator"
                  description="Scan upcoming presales for risks like hidden minting, dev backdoors, or fake team wallets — before you commit."
                />
                <FeatureItem
                  icon={
                    <IoWallet className="h-6 w-6 sm:h-7 sm:w-7 text-[#CCFF00]" />
                  }
                  title="Portfolio Overview"
                  description="Connect your wallet to see real-time holdings, asset risk scores, and wallet health — all in one view."
                />
                <FeatureItem
                  icon={
                    <RiRobot2Fill className="h-6 w-6 sm:h-7 sm:w-7 text-[#CCFF00]" />
                  }
                  title="Coinguard AI"
                  description="Ask anything. Your personal crypto AI can explain tokens, scan contracts, give safety tips, and track trends in real time."
                />
                <FeatureItem
                  icon={
                    <IoStarOutline className="h-6 w-6 sm:h-7 sm:w-7 text-[#CCFF00]" />
                  }
                  title="Smart Picks"
                  description="Discover curated token suggestions tailored by AI—factoring in risk scores, and evolving market trends—to help you spot smarter opportunities with confidence."
                />
                <FeatureItem
                  icon={
                    <IoMdAnalytics className="h-6 w-6 sm:h-7 sm:w-7 text-[#CCFF00]" />
                  }
                  title="Insight Hub"
                  description="Dive into expert blogs, safety guides, and AI-powered market updates, enriched with human research, to stay ahead with deeper insights and practical knowledge."
                />
                {/* <FeatureItem
                icon={
                  <GiWhaleTail  className="h-6 w-6 sm:h-7 sm:w-7 text-[#CCFF00]" />
                }
             title="Whale Tracker"
                description="Monitor large wallets, devs, and whales. See who's buying, selling, or prepping for major moves."
                className="sm:col-span-2"
              /> */}
              </div>
            </SectionCard>

            {/* Team Introduction */}
            <SectionCard>
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="h-0.5 bg-gradient-to-r from-[#CCFF00] to-transparent flex-grow mr-4"></div>
                <SectionTitle>Meet Our Team</SectionTitle>
                <div className="h-0.5 bg-gradient-to-l from-[#CCFF00] to-transparent flex-grow ml-4"></div>
              </div>
              <SectionContent>
                Our team at Coinguard consists of blockchain experts, AI
                researchers, and cybersecurity specialists with decades of
                collective experience. Driven by a passion for innovation and
                user empowerment, we work tirelessly to stay ahead of evolving
                threats in the crypto space. Our diverse expertise ensures that
                Coinguard remains at the forefront of security and usability,
                delivering tools you can trust.
              </SectionContent>
            </SectionCard>

            {/* Values */}
            <SectionCard>
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="h-0.5 bg-gradient-to-r from-[#CCFF00] to-transparent flex-grow mr-4"></div>
                <SectionTitle>Our Core Values</SectionTitle>
                <div className="h-0.5 bg-gradient-to-l from-[#CCFF00] to-transparent flex-grow ml-4"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
                <ValueItem
                  title="Transparency"
                  description="All results are presented in clear, jargon-free language for maximum accessibility."
                />
                <ValueItem
                  title="User Privacy"
                  description="We prioritize your security by never storing private keys or sensitive wallet information."
                />
                <ValueItem
                  title="Independence"
                  description="Our analysis remains unbiased, free from external influence or affiliations."
                />
                <ValueItem
                  title="Innovation"
                  description="We continuously adapt to new scam tactics and market trends to keep you protected."
                />
              </div>
            </SectionCard>

            {/* Vision */}
            <SectionCard>
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="h-0.5 bg-gradient-to-r from-[#CCFF00] to-transparent flex-grow mr-4"></div>
                <SectionTitle>Our Vision</SectionTitle>
                <div className="h-0.5 bg-gradient-to-l from-[#CCFF00] to-transparent flex-grow ml-4"></div>
              </div>
              <SectionContent>
                We envision a crypto ecosystem where investors of all levels
                have access to accurate, real-time data and robust security
                tools. By integrating AI, blockchain analytics, and user-centric
                design, we strive to build a safer, smarter, and more
                transparent future for digital finance, fostering trust and
                confidence across the Web3 landscape.
              </SectionContent>
            </SectionCard>

            {/* Why Choose */}
            <SectionCard>
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="h-0.5 bg-gradient-to-r from-[#CCFF00] to-transparent flex-grow mr-4"></div>
                <SectionTitle>
                  Why Choose <span className="text-[#CCFF00]">Coinguard?</span>
                </SectionTitle>
                <div className="h-0.5 bg-gradient-to-l from-[#CCFF00] to-transparent flex-grow ml-4"></div>
              </div>
              <ul className="mt-6 sm:mt-8 space-y-4">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#CCFF00] rounded-full mr-3 sm:mr-4 mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300 text-base sm:text-lg">
                    Fast, accurate, and intuitive interface designed for all
                    users.
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#CCFF00] rounded-full mr-3 sm:mr-4 mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300 text-base sm:text-lg">
                    AI-powered insights that evolve with the dynamic crypto
                    market.
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#CCFF00] rounded-full mr-3 sm:mr-4 mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300 text-base sm:text-lg">
                    Comprehensive coverage for DeFi tokens, NFTs, and more.
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#CCFF00] rounded-full mr-3 sm:mr-4 mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300 text-base sm:text-lg">
                    Trusted by traders, analysts, and blockchain developers
                    worldwide.
                  </span>
                </li>
              </ul>
            </SectionCard>

            {/* Closing Statement */}
            <div className="bg-gradient-to-b from-white/5 to-white/10 backdrop-blur p-6 sm:p-8 md:p-10 rounded-3xl border border-[#CCFF00]/20 shadow-2xl text-center relative overflow-hidden transform transition-all duration-500 hover:scale-[1.01]">
              <div className="absolute -top-16 -right-16 w-32 h-32 sm:w-40 sm:h-40 bg-[#CCFF00]/10 rounded-full mix-blend-soft-light filter blur-2xl sm:blur-3xl opacity-10"></div>
              <div className="absolute -bottom-16 -left-16 w-32 h-32 sm:w-40 sm:h-40 bg-[#CCFF00]/10 rounded-full mix-blend-soft-light filter blur-2xl sm:blur-3xl opacity-10"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#CCFF00]/5 to-transparent opacity-5"></div>

              <div className="relative">
                <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-[#CCFF00]/20 to-[#CCFF00]/10 rounded-full mb-4 sm:mb-6 border border-[#CCFF00]/30 mx-auto shadow-lg">
                  <div className="bg-black rounded-full p-2 sm:p-3">
                    <IoShieldCheckmark className="h-6 w-6 sm:h-8 sm:w-8 text-[#CCFF00] animate-pulse" />
                  </div>
                </div>
                <p
                  className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#CCFF00] to-[#aaff00] leading-[1.2]"
                  style={{ paddingBottom: "0.15em", overflow: "visible" }}
                >
                  Stay Safe. Stay Smart. Stay Guarded.
                </p>

                <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Whether you're avoiding honeypots, or verifying liquidity,{" "}
                  <span className="font-semibold text-[#CCFF00]">
                    Coinguard
                  </span>{" "}
                  is your ultimate partner in navigating the fast-paced crypto
                  market with security and confidence.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

// Reusable components
const SectionCard = ({ children }) => (
  <div className="bg-gradient-to-b from-white/5 to-white/10 backdrop-blur-sm p-6 sm:p-8 lg:p-10 rounded-3xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:border-[#CCFF00]/30 group">
    {children}
  </div>
);

const SectionTitle = ({ children }) => (
  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center">
    {children}
  </h2>
);

const SectionContent = ({ children }) => (
  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed text-center max-w-3xl mx-auto">
    {children}
  </p>
);

const FeatureItem = ({ icon, title, description, className = "" }) => (
  <div
    className={`flex items-start p-4 sm:p-5 bg-gradient-to-b from-white/5 to-white/10 rounded-2xl hover:from-[#CCFF00]/5 hover:to-[#CCFF00]/10 transition-all duration-300 w-full ${className}`}
  >
    <div className="p-2 rounded-full mr-3 sm:mr-4 mt-0.5 border border-white/20 transition-all duration-300 group-hover-hover:border-[#CCFF00] group-hover-hover:scale-110 hover:border-[#CCFF00] hover:scale-110">
      <div className="bg-black p-1 rounded-full">{icon}</div>
    </div>
    <div className="flex-1">
      <h4 className="font-semibold text-white text-sm sm:text-base md:text-lg transition-colors duration-300 hover:text-[#CCFF00]">
        {title}
      </h4>
      <p className="text-gray-300 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base">
        {description}
      </p>
    </div>
  </div>
);

const ValueItem = ({ title, description }) => (
  <div className="flex items-start p-4 sm:p-5 bg-gradient-to-b from-white/5 to-white/10 rounded-2xl hover:from-[#CCFF00]/5 hover:to-[#CCFF00]/10 transition-all duration-300">
    <div className="w-2 h-2 bg-[#CCFF00] rounded-full mr-3 sm:mr-4 mt-2 flex-shrink-0"></div>
    <div className="flex-1">
      <h4 className="font-semibold text-white text-sm sm:text-base md:text-lg">
        {title}
      </h4>
      <p className="text-gray-300 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base">
        {description}
      </p>
    </div>
  </div>
);

export default AboutCoinguard;
