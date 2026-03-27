import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Partners.css";
import { FaUsers, FaRocket, FaHandshake, FaBriefcase } from "react-icons/fa";
import { FiTarget, FiMail } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ContactForm from "./ContactForm";

function Career() {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate("/contact");
  };

  return (
    <section className="deep-bridge-feature py-5">
      <div className="container my-5">
        <div
          className="text-center mb-5"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <h2 className="feature-title display-5 fw-bold mb-3">
            Join Our <span className="highlight-gradient">Growing Team</span>
          </h2>
          <p className="lead text-muted">
            <FaUsers className="me-2" style={{ color: "#667eea" }} />
            We're building the future of AI-powered CRM solutions
          </p>
        </div>

        <div className="row justify-content-center mb-5">
          <div className="col-lg-10">
            <div
              className="modern-card"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {/* Card Header */}
              <div className="card-header position-relative">
                <div className="header-background-shapes">
                  <div className="shape shape-1"></div>
                  <div className="shape shape-2"></div>
                  <div className="shape shape-3"></div>
                </div>
                <div className="header-icon">
                  <FaBriefcase size={40} />
                </div>
                <h3 className="card-title mb-2 text-center w-100">
                  Career Opportunities
                </h3>
                <p className="card-subtitle mb-0">Be Part of Our Journey</p>
              </div>

              {/* Card Body */}
              <div className="card-body position-relative">
                <div className="corner-accent top-right"></div>
                <div className="corner-accent bottom-left"></div>

                <div className="text-center mb-4">
                  <p className="card-text" style={{ fontSize: "1.1rem" }}>
                    You can apply for jobs at this company. Our team is still
                    growing, and we're looking for talented individuals who are
                    passionate about AI, technology, and transforming
                    traditional businesses.
                  </p>
                </div>

                {/* Benefits Grid */}
                <div className="row g-4 mb-4">
                  <div
                    className="col-md-4"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    <div className="d-flex flex-column align-items-center text-center">
                      <div className="feature-icon-wrapper mb-3">
                        <FaRocket className="feature-icon" />
                      </div>
                      <h5
                        className="mb-2"
                        style={{ color: "#2d3748", fontWeight: "600" }}
                      >
                        Fast-Growing Startup
                      </h5>
                      <p
                        className="card-text mb-0"
                        style={{ fontSize: "0.95rem" }}
                      >
                        Join a dynamic team at an exciting stage of growth
                      </p>
                    </div>
                  </div>
                  <div
                    className="col-md-4"
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    <div className="d-flex flex-column align-items-center text-center">
                      <div className="feature-icon-wrapper mb-3">
                        <FiTarget className="feature-icon" />
                      </div>
                      <h5
                        className="mb-2"
                        style={{ color: "#2d3748", fontWeight: "600" }}
                      >
                        Impactful Work
                      </h5>
                      <p
                        className="card-text mb-0"
                        style={{ fontSize: "0.95rem" }}
                      >
                        Help transform traditional businesses with AI technology
                      </p>
                    </div>
                  </div>
                  <div
                    className="col-md-4"
                    data-aos="fade-up"
                    data-aos-delay="500"
                  >
                    <div className="d-flex flex-column align-items-center text-center">
                      <div className="feature-icon-wrapper mb-3">
                        <FaHandshake className="feature-icon" />
                      </div>
                      <h5
                        className="mb-2"
                        style={{ color: "#2d3748", fontWeight: "600" }}
                      >
                        Collaborative Culture
                      </h5>
                      <p
                        className="card-text mb-0"
                        style={{ fontSize: "0.95rem" }}
                      >
                        Work with a passionate team dedicated to innovation
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                  <p className="card-text mb-4" style={{ fontSize: "1rem" }}>
                    Interested in joining our team? Contact us to learn more
                    about open positions and opportunities.
                  </p>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Career;
