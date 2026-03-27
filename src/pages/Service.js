import React from "react";
import ServiceHero from "../components/serviceComponents/ServiceHero";
import Problem from "../components/serviceComponents/Problem";
import CrossPlatform from "../components/serviceComponents/CrossPlatform";
import Footer from "../components/Footer";

const Service = () => {
  return (
    <div style={{ width: "100%", maxWidth: "100%", overflowX: "hidden" }}>
      <ServiceHero />
      <Problem />
      <CrossPlatform />
      <Footer />
    </div>
  );
};

export default Service;
