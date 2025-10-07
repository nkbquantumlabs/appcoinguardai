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
function Home() {
  return (
    <>
      <title>Coinguard: AI-Powered DeFi Security & Intelligence Platform</title>
      <meta
        name="description"
        content="Coinguard: AI-driven DeFi security platform protects traders from memecoin scams, rug pulls, and risks with real-time analytics and contract audits."
      ></meta>

      {/* <SplashCursor />
      <TextHoverEffectDemo /> */}
      {/* <PreBuyingLaunch/> */}
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