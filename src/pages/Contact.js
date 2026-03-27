import React from "react";
import ContactHero from "../components/ContactComponents/ContactHero";
import ContactInfo from "../components/ContactComponents/ContactInfo";
import Footer from "../components/Footer";
import Services from "../components/ContactComponents/Services";

const Contact = () => {
  return (
    <div style={{ width: "100%", maxWidth: "100%", overflowX: "hidden" }}>
      <Services />
      <ContactHero />
      <Footer />
    </div>
  );
};

export default Contact;
