import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import PopularVouchers from "@/components/PopularVouchers";
import ExploreMore from "@/components/ExploreMore";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <PopularVouchers />
      <ExploreMore />
      <Footer />
    </div>
  );
};

export default Index;
