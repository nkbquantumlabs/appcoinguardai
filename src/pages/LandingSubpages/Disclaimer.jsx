import React from "react";

function Disclaimer() {
  return (
    <>
      <title>Coinguard: Disclaimer</title>
      <meta
        name="description"
        content="Coinguard: AI-driven DeFi security platform protects traders from memecoin scams, rug pulls, and risks with real-time analytics and contract audits."
      ></meta>

      <div className="bg-black text-white px-6 py-10 max-w-5xl mx-auto">
        <div className="max-w-5xl mx-auto space-y-2">
          <header>
            <h1 className="text-3xl font-bold mb-2 font-['DM Sans']">
              Coinguard Disclaimer
            </h1>
            <p className="text-sm text-gray-400 mb-4 font-['Manrope']">
              Effective Date: June 2025 • Last Updated: June 9, 2025
            </p>
            <p className="mt-4 font-['Manrope']">
              This Disclaimer governs the use of Coinguard’s web platform,
              mobile application, browser extension, and all associated products
              and services (collectively, the "Platform" or "Services"). By
              using Coinguard, you acknowledge and accept the limitations
              outlined below.
            </p>
          </header>

          {[
            {
              title: "1. Informational Purposes Only",
              content: [
                "All content, analytics, tools, reports, visualizations, and AI-generated insights on Coinguard are strictly for educational and informational purposes. They are not intended to constitute financial, investment, legal, tax, or accounting advice.",
                "Coinguard does not recommend or endorse any cryptocurrency, token, wallet, or blockchain project. Any reliance on Coinguard’s data, risk assessments, or suggestions is at your sole discretion and risk.",
              ],
            },
            {
              title: "2. No Investment Advice or Professional Counsel",
              content: [
                "Nothing presented on Coinguard should be interpreted as personalized investment advice. Our AI models and human-curated data provide informational alerts, community scores, risk indicators, and sentiment analysis without offering guarantees of accuracy, future performance, or market behavior.",
                "Users should always perform their own research (DYOR) and consult with licensed financial advisors or legal professionals before making financial decisions.",
              ],
            },
            {
              title: "3. Use at Your Own Risk",
              content: [
                "By using Coinguard, you acknowledge:",
                "• Crypto markets are highly volatile and speculative",
                "• Risk factors such as rug pulls, honeypots, and malicious smart contracts are prevalent",
                "• Coinguard cannot eliminate, predict, or prevent malicious activity",
                "• You are solely responsible for the decisions you make based on Coinguard’s tools",
                "Coinguard disclaims all liability for any loss, including without limitation to loss of digital assets, missed profits, or reputational harm.",
              ],
            },
            {
              title: "4. Limitations of AI Technology",
              content: [
                "Our platform integrates machine learning and artificial intelligence (AI) to scan tokens, flag suspicious wallet behavior, analyze developer activity, and identify potential fraud indicators.",
                "However, AI has known limitations, including:",
                "• False positives and false negatives in token evaluations",
                "• Incomplete or outdated on-chain data",
                "• Limited understanding of evolving scam tactics",
                "• Susceptibility to adversarial inputs",
                "Coinguard’s algorithms and models are continuously evolving, but cannot offer guarantees of precision. Users must not treat AI outputs as infallible.",
              ],
            },
            {
              title: "5. CGT Token Disclaimer",
              content: [
                "The Coinguard Token ($CGT) is a utility token intended for accessing premium features, staking, community voting, and other functional aspects of the platform.",
                "Holding, staking, or interacting with CGT:",
                "• Does not confer ownership, equity, or governance rights over Coinguard Inc.",
                "• Does not promise or imply profit, yield, dividends, or appreciation",
                "• Does not exempt users from tax or compliance responsibilities in their jurisdiction",
                "• Does not imply Coinguard’s endorsement of any other token or project",
                "Always review your country’s regulations before engaging in any crypto token activity.",
              ],
            },
            {
              title: "6. Wallet and Portfolio Analysis",
              content: [
                "When connecting a wallet to Coinguard:",
                "• We do not access, store, or request your private keys",
                "• Our system reads only publicly available on-chain data",
                "• You are responsible for ensuring your wallet security and avoiding phishing attempts",
                "• We cannot recover stolen funds or assets from malicious contracts",
                "Coinguard is not a wallet provider or custody solution and assumes no liability for any wallet breach or compromise.",
              ],
            },
            {
              title: "7. Community Contributions & Crowdsourced Flags",
              content: [
                "Coinguard enables users to:",
                "• Report suspicious tokens or wallet behaviors",
                "• Comment on developer reputation",
                "• Contribute to sentiment scores and flag tokens",
                "These community-driven inputs are subject to moderation, but may not always be accurate, objective, or up to date. Coinguard disclaims any responsibility for damage caused by user-submitted content.",
              ],
            },
            {
              title: "8. External Links and Integrations",
              content: [
                "Our platform may reference or embed:",
                "• Third-party APIs (e.g., DexTools, GeckoTerminal, Twitter)",
                "• Public dashboards (e.g., WhaleTracker, BSCScan)",
                "• Blockchain explorers and data aggregators",
                "• Educational content or YouTube videos",
                "We do not control the content, functionality, or accuracy of external sources and are not responsible for any consequences arising from their use.",
              ],
            },
            {
              title: "9. Service Availability and Bugs",
              content: [
                "We strive to maintain a secure and reliable experience, but:",
                "• Downtime may occur without notice",
                "• Features may be temporarily limited",
                "• Data may lag or become temporarily inaccessible",
                "• Bugs or inaccuracies may surface despite internal QA",
                "We are not liable for damages resulting from outages, feature rollbacks, failed transactions, or service suspension.",
              ],
            },
            {
              title: "10. Regulatory & Jurisdictional Notice",
              content: [
                "Coinguard operates as a decentralized analytics and educational platform. We are not:",
                "• A registered investment advisor",
                "• A securities broker or issuer",
                "• A tax consultant or fiduciary",
                "• A KYC/AML-compliant financial intermediary",
                "Your use of Coinguard is subject to the laws applicable in your jurisdiction. It is your responsibility to ensure compliance with relevant regulations regarding cryptocurrency usage, reporting, and taxation.",
              ],
            },
            {
              title: "11. Indemnification",
              content: [
                "You agree to indemnify, defend, and hold harmless Coinguard, its affiliates, founders, developers, contractors, and contributors from any claims, liabilities, damages, or losses—including legal fees—arising out of your use of the Services, violation of these terms, or interaction with CGT tokens.",
              ],
            },
            {
              title: "12. No Warranties",
              content: [
                "The Coinguard platform and all services are provided “as is” and “as available,” without warranty of any kind. We expressly disclaim any warranties, express or implied, including:",
                "• Fitness for a particular purpose",
                "• Accuracy, timeliness, or completeness",
                "• Security against viruses or malicious code",
                "• Compatibility with your hardware or browser",
              ],
            },
            {
              title: "13. Updates and Revisions",
              content: [
                "We may update this disclaimer periodically as the platform evolves or as laws change. Updated versions will be made available on our website with a modified effective date. Your continued use after updates signifies acceptance of those changes.",
              ],
            },
            {
              title: "14. Contact Us",
              content: [
                <span key="email">
                  📧 Email:{" "}
                  <a
                    href="mailto:support@Coinguard.ai"
                    className="text-blue-500 underline"
                  >
                    support@Coinguard.ai
                  </a>
                </span>,
                <span key="website">
                  🌐 Website:{" "}
                  <a
                    href="https://Coinguard.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    https://Coinguard.ai
                  </a>
                </span>,
              ],
            },
          ].map((section, i) => (
            <section key={i} className="space-y-0">
              <h2 className="text-2xl font-semibold text-white pt-4 font-['DM Sans']">
                {section.title}
              </h2>
              {section.content.map((text, j) => (
                <p key={j} className="font-['Manrope']">
                  {text}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}

export default Disclaimer;
