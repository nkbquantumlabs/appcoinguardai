import React from "react";
import { Link } from "react-router-dom";

function TermsOfService() {
  return (
    <>
      <title>Coinguard: Terms Of Service</title>
      <meta
        name="description"
        content="Coinguard: AI-driven DeFi security platform protects traders from memecoin scams, rug pulls, and risks with real-time analytics and contract audits."
      ></meta>

      <div className="bg-black text-white px-6 py-10 max-w-5xl mx-auto ">
        <h1 className="text-3xl font-bold mb-2 font-['DM_Sans']">
          Terms of Service
        </h1>
        <p className="text-gray-400 mb-4 font-['Manrope']">
          Effective Date: June 2025 <br />
          Last Updated: June 9, 2025
        </p>

        <section className="space-y-0 py-4 text-white ">
          <p className="font-['Manrope']">
            Welcome to <strong>Coinguard</strong> ("Platform", "we", "our", or
            "us"). These Terms of Service ("Terms") govern your access to and
            use of our website (
            <a href="https://Coinguard.ai" className="text-blue-400 underline">
              https://Coinguard.ai
            </a>
            ), mobile and web applications, and services including AI tools,
            portfolio analysis, token scanning, and more (collectively, the
            "Services").
          </p>
          <p className="font-['Manrope']">
            By accessing or using Coinguard, you agree to these Terms. If not,
            please do not use our Services.
          </p>

          <h2 className="text-2xl font-semibold text-white pt-4 font-['DM_Sans']">
            1. Eligibility
          </h2>
          <p className="font-['Manrope']">
            You must be at least 18 years old and legally capable of entering a
            contract to use our Services.
          </p>

          <h2 className="text-2xl font-semibold text-white pt-4 font-['DM_Sans']">
            2. Platform Overview
          </h2>
          <p className="font-['Manrope']">
            Coinguard is an AI-powered platform to detect risky tokens, scams
            (rug pulls, honeypots), and developer threats.
          </p>
          <ul className="list-disc list-inside font-['Manrope'] space-y-0 pl-6">
            <li>Token Scanner</li>
            <li>Rug Shield</li>
            <li>Portfolio Tracker</li>
            {/* <li>Whale & Dev Wallet Monitoring</li> */}
            <li>Sentiment Aggregation</li>
            <li>AI Chat Assistant</li>
            <li>Token Utility via $CGT</li>
          </ul>

          <h2 className="text-2xl font-semibold text-white pt-4 font-['DM_Sans']">
            3. No Investment Advice
          </h2>
          <p className="font-['Manrope']">
            Coinguard provides information, not financial or investment advice.
            Always consult a licensed advisor before making decisions.
          </p>

          <h2 className="text-2xl font-semibold text-white pt-4 font-['DM_Sans']">
            4. User Accounts
          </h2>
          <p className="font-['Manrope']">
            Users may need to register. Keep your info accurate and your
            credentials safe. You're responsible for activity on your account.
          </p>

          <h2 className="text-2xl font-semibold text-white pt-4 font-['DM_Sans']">
            5. Acceptable Use
          </h2>
          <ul className="list-disc font-['Manrope'] list-inside space-y-0 pl-6">
            <li>Don't interfere with our systems</li>
            <li>No bots or scraping</li>
            <li>Don't upload malware</li>
            <li>No impersonation</li>
            <li>No reverse-engineering</li>
          </ul>

          <h2 className="text-2xl font-semibold text-white pt-4 font-['DM_Sans']">
            6. Token & Wallet Integration
          </h2>
          <p className="font-['Manrope']">
            Coinguard reads public blockchain data. We never store or access
            private keys. Keep your wallet credentials private.
          </p>

          <h2 className="text-2xl font-semibold text-white pt-4 font-['DM_Sans']">
            7. CGT Token Utility
          </h2>
          <ul className="list-disc font-['Manrope'] list-inside space-y-0 pl-6">
            <li>Unlock premium tools</li>
            <li>Staking for access</li>
            <li>Early insights</li>
            <li>Community rewards</li>
          </ul>
          <p className="font-['Manrope']">
            $CGT has no guaranteed returns. Use at your own risk.
          </p>

          <h2 className="text-2xl font-semibold text-white pt-4 font-['DM_Sans']">
            8. Intellectual Property
          </h2>
          <p className="font-['Manrope']">
            All content is protected. Don’t use, copy, or reproduce without
            permission.
          </p>

          <h2 className="text-2xl font-semibold text-white pt-4 font-['DM_Sans']">
            9. Third-Party Links
          </h2>
          <p className="font-['Manrope']">
            We integrate third-party tools (e.g., DexTools, Twitter). We aren't
            responsible for their content or practices.
          </p>

          <h2 className="text-2xl font-semibold text-white pt-4 font-['DM_Sans']">
            10. Termination
          </h2>
          <p className="font-['Manrope']">
            We may terminate your access for violating Terms or posing risks to
            the platform.
          </p>

          <h2 className="text-2xl font-semibold text-white pt-4 font-['DM_Sans']">
            11. Limitation of Liability
          </h2>
          <p className="font-['Manrope']">We are not liable for:</p>
          <ul className="list-disc list-inside font-['Manrope'] space-y-0 pl-6">
            <li>Financial loss</li>
            <li>Scams or exploits</li>
            <li>Analytics errors</li>
            <li>Service interruptions</li>
          </ul>

          <h2 className="text-2xl font-semibold text-white pt-4 font-['DM_Sans']">
            12. Modifications
          </h2>
          <p className="font-['Manrope']">
            We may update Terms at any time. Continued use means you accept the
            updated Terms.
          </p>

          <h2 className="text-2xl font-semibold text-white pt-4 font-['DM_Sans']">
            13. Governing Law
          </h2>
          <p className="font-['Manrope']">
            These Terms are governed by the laws of the jurisdiction where
            Coinguard is registered.
          </p>

          <h2 className="text-2xl font-semibold text-white pt-4 font-['DM_Sans']">
            14. Contact
          </h2>
          <p className="font-['Manrope']">
          
            <Link to="mailto:support@coinguard.ai">
              Email:{" "}
              <span className="text-blue-500"> support@coinguard.ai</span>
            </Link>
          </p>
        </section>
      </div>
    </>
  );
}

export default TermsOfService;
