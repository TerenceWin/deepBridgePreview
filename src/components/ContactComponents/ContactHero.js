import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Partners.css";
import "../../styles/custom.css";
import { FaUsers } from "react-icons/fa";

const ContactHero = () => {
  return (
    <>
      {/* Career Section */}
      <section
        className="deep-bridge-feature"
        style={{ paddingBottom: "3rem" }}
      >
        <div className="container" data-aos="fade-up" data-aos-delay="200">
          <div className="text-center mb-5">
            <h2 className="feature-title display-5 fw-bold mb-3">
              Join Our <span className="highlight-gradient">Growing Team</span>
            </h2>
            <p className="lead text-muted">
              <FaUsers className="me-2" style={{ color: "#1a92da" }} />
              We're building the future of AI-powered CRM. <br /> Contact us by
              sending over your resume on this email <br />{" "}
              careers@deep-bridge.com
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactHero;
