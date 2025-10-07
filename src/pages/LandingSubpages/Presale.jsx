import PresaleCard from "../../components/LandingPage/Presale/PresaleCard";
import PresaleSection from "../../components/LandingPage/Presale/PresaleSection";
import PresaleHeader from "../../components/LandingPage/Presale/Header";

const PreSale = () => {
  return (
    <div className="min-h-screen bg-black">
      <PresaleHeader />
      <div className="-mt-4">
        <PresaleSection />
      </div>
      <PresaleCard />
    </div>
  );
};

export default PreSale;
