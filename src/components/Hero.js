import React from "react";
import robo from "../images/9C0F0C22-AE93-41CF-881C-9B82EBAC9206 copy 2.png";
import "../styles/custom.css";
import { useNavigate } from "react-router-dom";
import Threads from "./Threads";

function Hero() {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate("/services");
  };

  return (
    <div
      className="deep-bridge-feature"
      style={{ overflowX: "hidden", width: "100%", maxWidth: "100%" }}
    >
      <Threads
        color={[0.714, 0.714, 0.831]} // RGB [182, 182, 212] converted to normalized (182/255, 182/255, 212/255)
        amplitude={0.7}
        distance={0.15}
        enableMouseInteraction={true}
      />
      <div
        className="gradient-overlay"
        style={{ width: "100%", maxWidth: "100%", overflowX: "hidden" }}
      >
        <div className="container" data-aos="fade-up" data-aos-delay="200">
          <div className="row justify-content-center text-center">
            {/* Hero Image above text for central focus */}
            <div className="col-12 mb-5">
              <img
                src={robo}
                alt="Sanuker AI Chatbot Illustration"
                className="img-fluid mx-auto d-block"
                style={{ maxHeight: "300px" }}
              />
            </div>

            {/* Centered Text Content */}
            <div className="col-lg-8 col-md-10">
              <h1 className="display-4 fw-bold mb-4">
                AI Sales Agent for Traditional Businesses
              </h1>
              <p className="lead mb-5">
                Bridging deeper connections for manufacturers and exporters with
                an AI assistant that works like part of your sales team.
              </p>

              {/* Centered CTA Buttons */}
              <div className="d-flex justify-content-center flex-wrap gap-3 mb-5">
                <button
                  onClick={() => {
                    navigate("/contact#waitlist-form");
                    // Scroll to form after navigation
                    setTimeout(() => {
                      const element = document.getElementById("waitlist-form");
                      if (element) {
                        element.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }
                    }, 100);
                  }}
                  className="btn btn-primary btn-lg px-3 py-3 d-inline-flex align-items-center justify-content-center"
                  style={{
                    lineHeight: "1.5",
                    textDecoration: "none",
                    minWidth: "150px",
                    backgroundColor: "#1a92da",
                  }}
                >
                  Join Us
                </button>
                <button
                  onClick={handleContactClick}
                  className="btn btn-outline-dark btn-lg px-3 py-3 d-inline-flex align-items-center justify-content-center"
                  style={{ minWidth: "150px" }}
                >
                  Learn more
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
