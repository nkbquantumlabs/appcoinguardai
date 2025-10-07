import { Route, Routes } from "react-router-dom";
import About from "../components/LandingPage/About";
import ContactForm from "../components/LandingPage/Contact";
import "../components/LandingPage/Css/LandingPage.css";
import FeaturesSection from "../components/LandingPage/Features";
import Footer from "../components/LandingPage/Footer";
import Marquee from "../components/LandingPage/Marquee";
import Navbar from "../components/LandingPage/Navbar";
import Newsletter from "../components/LandingPage/Newsletter";
import Roadmap from "../components/LandingPage/RoadMap";
import BlogDetail from "./LandingSubpages/BlogDetail";
import BlogList from "./LandingSubpages/BlogList";
import Cookiepolicy from "./LandingSubpages/Cookiepolicy";
import Disclaimer from "./LandingSubpages/Disclaimer";
import Home from "./LandingSubpages/Home";
import Presale from "./LandingSubpages/Presale";
import Privacypolicy from "./LandingSubpages/Privacypolicy";
import Termsofservice from "./LandingSubpages/Termsofservice";

function LandingPage() {
  return (
    <>
      <Marquee />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/presale" element={<Presale />}></Route>
        <Route path="/blog" element={<BlogList />}></Route>
        <Route path="/blog/:id" element={<BlogDetail />}></Route>
        <Route path="/privacy-policy" element={<Privacypolicy />}></Route>
        <Route path="/terms-of-service" element={<Termsofservice />}></Route>
        <Route path="/cookie-policy" element={<Cookiepolicy />}></Route>
        <Route path="/disclaimer" element={<Disclaimer />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/roadmap" element={<Roadmap />}></Route>
        <Route path="/newsletter" element={<Newsletter />}></Route>
        <Route path="/contact" element={<ContactForm />}></Route>
        <Route path="/feature" element={<FeaturesSection />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default LandingPage;
