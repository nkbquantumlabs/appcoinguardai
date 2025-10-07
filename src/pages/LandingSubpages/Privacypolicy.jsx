import React from "react";
import { Link } from "react-router-dom";

export default function Privacypolicy() {
  return (
    <>
       <title>
        Coinguard Privacy Policy — Your Data Protection & Security Assurance
      </title>
      <meta
        name="description"
        content="Explore Coinguard’s Privacy Policy: how we collect, use, and protect your data. Learn about your privacy rights, security practices, and commitment to transparency in our Web3 security platform."
      ></meta>
      <meta
        name="keywords"
        content="Coinguard Privacy Policy, Data Protection, Web3 Privacy, Blockchain Security Privacy, Crypto Data Security, User Privacy Web3"
      ></meta>

      <div className="bg-black text-white px-6 py-10 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 font-['DM Sans']">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-400 mb-0 font-['Manrope']">
          Effective Date: June 2025
        </p>
        <p className="text-sm text-gray-400 mb-4 font-['Manrope']">
          Last Updated: June 9, 2025
        </p>

        <section className="space-y-0 py-4 text-white ">
          <p className="font-['Manrope']">
            Coinguard respects your privacy. This Privacy Policy explains how we
            collect, use, and protect your personal data when you use our
            website, tools, and services.
          </p>

          <div>
            <h2 className="text-2xl font-semibold text-white pt-4 font-['DM Sans']">
              1. What Information We Collect
            </h2>
            <ul className=" list-inside space-y-1 font-['Manrope']">
              <li>
                <span className="font-medium">Directly from You:</span>
                <ul className="list-disc list-inside">
                  <li>Email address (if you subscribe or register)</li>
                  <li>Feedback or messages sent to support</li>
                  <li>
                    Payment information (for premium tiers via secure third
                    parties)
                  </li>
                </ul>
              </li>
              <li>
                <span className="font-medium">Automatically via Usage:</span>
                <ul className="list-disc list-inside">
                  <li>IP address, device/browser type</li>
                  <li>Approximate location</li>
                  <li>Platform behavior (pages viewed, buttons clicked)</li>
                </ul>
              </li>
              <li>
                <span className="font-medium">Blockchain Data:</span>
                <ul className="list-disc list-inside">
                  <li>Wallet addresses connected</li>
                  <li>Token holdings and transaction history</li>
                  <li>On-chain activity analytics</li>
                </ul>
              </li>
              <li>
                <span className="font-medium">Cookies and Tracking:</span>{" "}
                Session identifiers, analytics cookies, preferences
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white pt-4 font-['DM Sans']">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc list-inside space-y-0 font-['Manrope']">
              <li>Provide platform access and personalize your experience</li>
              <li>Analyze wallet/token data and provide insights</li>
              <li>Display sentiment and risk alerts</li>
              <li>Customer support and fraud prevention</li>
              <li>Platform improvements</li>
            </ul>
            <p className="mt-2">We do not sell your personal data.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white pt-4 font-['DM Sans']">
              3. AI & Machine Learning Use
            </h2>
            <p className="font-['Manrope']">
              Our AI systems may process your interactions to offer
              recommendations detect threats and provide insights. This is done
              pseudonymously and not used to personally identify you.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white pt-4 font-['DM Sans']">
              4. Data Sharing
            </h2>
            <p className='font-["Manrope"]'>We may share limited data with:</p>
            <ul className="list-disc list-inside space-y-0 font-['Manrope']">
              <li>Payment processors (e.g., Stripe)</li>
              <li>Cloud hosting partners</li>
              <li>Audit & AI vendors (under NDA)</li>
              <li>Law enforcement (if legally required)</li>
            </ul>
            <p className="mt-2 font-['Manrope']">
              We do not sell, rent, or trade your data for marketing.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white pt-4 font-['DM Sans']">
              5. Wallet & Token Analytics
            </h2>
            <ul className="list-disc list-inside space-y-0 font-['Manrope']">
              <li>We analyze only public on-chain data</li>
              <li>Pseudonymized for user protection</li>
              <li>We never ask for or store private keys</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white pt-4 font-['DM Sans']">
              6. Your Rights
            </h2>
            <ul className="list-disc list-inside space-y-0 font-['Manrope']">
              <li>View your stored data</li>
              <li>Request account deletion</li>
              <li>Opt-out of emails or cookies</li>
              <li>Revoke connected wallets</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white pt-4 font-['DM Sans']">
              7. Data Security
            </h2>
            <ul className="list-disc list-inside space-y-0 font-['Manrope']">
              <li>Encryption at rest and in transit</li>
              <li>Token-level API access</li>
              <li>Role-based access control</li>
              <li>Regular security audits</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white pt-4 font-['DM Sans']">
              8. International Data Transfers
            </h2>
            <p className="font-['Manrope']">
              Your data may be processed or stored in other countries. By using
              Coinguard, you consent to these transfers.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white pt-4 font-['DM Sans']">
              9. Children’s Privacy
            </h2>
            <p className="font-['Manrope']">
              Coinguard is not intended for users under 18. We do not knowingly
              collect data from minors.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white pt-4 font-['DM Sans']">
              10. Changes to This Policy
            </h2>
            <p className="font-['Manrope']">
              We may update this policy. Changes will be posted here with an
              updated effective date.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white pt-4 font-['DM Sans']">
              11. Contact
            </h2>
             <Link to="mailto:support@coinguard.ai" className="font-[Manrope]">
                    Email:{" "}
                    <span className="text-blue-500">
                     support@coinguard.ai
                    </span>
                  </Link>
          </div>
        </section>
      </div>
    </>
  );
}
