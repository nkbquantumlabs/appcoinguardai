import React from "react";
import { TextHoverEffectDemo } from "../../components/LandingPage/TextHoverEffectDemo";
import ServiceCards from "../../components/LandingPage/ServiceCards";
import FeatureCards from "../../components/LandingPage/FeatureCards";
import Roadmap from "../../components/LandingPage/RoadMap";
import HeroSection from "../../components/LandingPage/Herosection";
import SplashCursor from "../../components/LandingPage/SplashCursor";
import Tokenomics from "../../components/LandingPage/Tokenomics";
import BlogList from "../LandingSubpages/BlogList";
import ResponsiveEngagementCard from "../../components/LandingPage/ResponsiveEngagementCard";
import FeaturesSection from "../../components/LandingPage/Features";
import Newsletter from "../../components/LandingPage/Newsletter";
import PreBuyingLaunch from "../../components/LandingPage/Timer";
import VerifiedBy from "../../components/LandingPage/VerifiedBy";
import NFTCard from "../../components/LandingPage/NFTCard";
import CoinguardWallet from "../../components/LandingPage/CoinguardWallet";
import TopHero from "../../components/LandingPage/TopHero";
import Marquee from "../../components/LandingPage/Marquee";
function Home() {
  return (
    <>
      <title>
        Coinguard — All-in-One Web3 Security: Scans, Audits, AI & NFTs
      </title>
      <meta
        name="description"
        content="Coinguard is your all-in-one Web3 security platform. Scan tokens, run audits, track whales, chat with Coinguard AI, and generate NFTs — all in one place."
      ></meta>

      {/* <SplashCursor />
      <TextHoverEffectDemo /> */}
      {/* <PreBuyingLaunch/> */}
      <Marquee />
      <TopHero />
      <HeroSection />
      <ServiceCards />
      <FeaturesSection />
      {/* <ResponsiveEngagementCard /> */}
      <CoinguardWallet />
      <NFTCard />

      <VerifiedBy />

      <FeatureCards />

      {/* <Roadmap /> */}
      <BlogList />
      {/* <Tokenomics /> */}
      <Newsletter />
    </>
  );
}

export default Home;
