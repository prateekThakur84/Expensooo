import React from "react";
import HeroSection from "../../components/LandingPage/HeroSection";
import HowItWorks from "../../components/LandingPage/HowItWorks";
import FeaturesSection from "../../components/LandingPage/FeaturesSection";
import CallToAction from "../../components/LandingPage/CallToAction";
import Footer from "../../components/LandingPage/Footer";

const LandingPage = () => {
  return (
    <div className="bg-white text-gray-800">
      <HeroSection />
      <HowItWorks />
      <FeaturesSection />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default LandingPage;
