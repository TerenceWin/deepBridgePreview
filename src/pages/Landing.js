import React from "react";
import Hero from "../components/Hero";
import Partners from "../components/Partners";
import Features from "../components/Features";
import VisionMission from "../components/VissionMission";
import MyForm from "../components/Form";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <div style={{ width: "100%", maxWidth: "100%", overflowX: "hidden" }}>
      <Hero />
      <Partners />
      <Features />
      <VisionMission />
      <Footer />
    </div>
  );
};

export default Landing;
