import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/VissionMission.css";
import { FaEye, FaRobot, FaBolt, FaChartLine } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";

function VisionMission() {
  return (
    <section className="deep-bridge-feature py-5">
      <div className="container my-5">
        <div className="row g-4">
          {/* Vision Section */}
          <div className="col-lg-4 mb-4 mb-lg-0">
            <div
              className="modern-card vision-card"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              {/* Card Header */}
              <div className="card-header position-relative">
                <div className="header-background-shapes">
                  <div className="shape shape-1"></div>
                  <div className="shape shape-2"></div>
                  <div className="shape shape-3"></div>
                </div>
                <div className="header-icon">
                  <FaEye size={40} style={{ color: "#FFFFFF" }} />
                </div>
                <h3 className="card-title mb-2 text-center w-100">
                  Our Vision
                </h3>
                <p className="card-subtitle mb-0">Looking Forward</p>
              </div>

              {/* Card Body */}
              <div className="card-body position-relative">
                <p
                  className="card-text fw-bold mb-3"
                  style={{ fontSize: "1.1rem", color: "#2d3748" }}
                >
                  "Empowering traditional businesses with AI-driven efficiency."
                </p>
                <p className="card-text">
                  We aim to bridge the gap between traditional industries and
                  the power of AI, enabling businesses to stay competitive in an
                  evolving digital landscape.
                </p>
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="col-lg-8">
            <div
              className="modern-card mission-card"
              data-aos="fade-left"
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
                  <FiTarget size={40} style={{ color: "#FFFFFF" }} />
                </div>
                <h3 className="card-title mb-2 text-center w-100">
                  Our Mission
                </h3>
                <p className="card-subtitle mb-0">What We Stand For</p>
              </div>

              {/* Card Body */}
              <div className="card-body position-relative">
                <p
                  className="card-text fw-bold mb-4"
                  style={{ fontSize: "1.1rem", color: "#2d3748" }}
                >
                  "Revolutionizing traditional B2B industries by providing
                  AI-powered automation that enhances communication, streamlines
                  operations, and drives business growth."
                </p>

                {/* Mission Points */}
                <div className="mission-points">
                  <div
                    className="d-flex align-items-start mb-4"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    <div className="feature-icon-wrapper me-3">
                      <FaRobot
                        className="feature-icon"
                        style={{ color: "#1a92da" }}
                      />
                    </div>
                    <div>
                      <h5
                        className="mb-2"
                        style={{ color: "#2d3748", fontWeight: "600" }}
                      >
                        AI Without Complexity
                      </h5>
                      <p className="card-text mb-0">
                        We deliver AI solutions that require no technical
                        expertise, making adoption seamless.
                      </p>
                    </div>
                  </div>

                  <div
                    className="d-flex align-items-start mb-4"
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    <div className="feature-icon-wrapper me-3">
                      <FaBolt
                        className="feature-icon"
                        style={{ color: "#1a92da" }}
                      />
                    </div>
                    <div>
                      <h5
                        className="mb-2"
                        style={{ color: "#2d3748", fontWeight: "600" }}
                      >
                        Faster Decision-Making
                      </h5>
                      <p className="card-text mb-0">
                        We optimize workflows, automate interactions, and
                        generate predictive insights to help businesses stay
                        ahead.
                      </p>
                    </div>
                  </div>

                  <div
                    className="d-flex align-items-start"
                    data-aos="fade-up"
                    data-aos-delay="500"
                  >
                    <div className="feature-icon-wrapper me-3">
                      <FaChartLine
                        className="feature-icon"
                        style={{ color: "#1a92da" }}
                      />
                    </div>
                    <div>
                      <h5
                        className="mb-2"
                        style={{ color: "#2d3748", fontWeight: "600" }}
                      >
                        Competitive Edge
                      </h5>
                      <p className="card-text mb-0">
                        We empower businesses to operate smarter, scale faster,
                        and thrive in a digital-first world.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VisionMission;
