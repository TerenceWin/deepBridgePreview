import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Partners.css";
import {
  FaRobot,
  FaBolt,
  FaChartBar,
  FaShieldAlt,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
import { FiTarget, FiArrowRight } from "react-icons/fi";

const Partners = () => {
  return (
    <section className="deep-bridge-feature py-5">
      <div className="container my-5">
        <div className="row align-items-center">
          {/* Left Content */}
          <div
            className="col-lg-6 mb-5 mb-lg-0"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <div className="pe-lg-4">
              <h2 className="feature-title display-5 fw-bold mb-4">
                Built by Exporters, for Exporters
              </h2>
              <p className="text-muted mb-4">
                We understand these challenges because we've been there
                ourselves—running a traditional trading and export business,
                juggling RFQs, quotations, and buyer messages across email,
                WhatsApp, and WeChat. Deep-Bridge is the assistant we wished we
                had: a digital sales rep you can give orders to. It prepares
                quotations, replies to inquiries, and keeps every opportunity
                moving, without adding another complex system for your team to
                manage.
              </p>
              <div className="feature-list">
                <div
                  className="d-flex align-items-center mb-3"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <div className="feature-icon-wrapper me-3">
                    <FaRobot
                      className="feature-icon"
                      style={{ color: "#1a92da" }}
                    />
                  </div>
                  <span>Automate frontline customer interactions with AI</span>
                </div>
                <div
                  className="d-flex align-items-center mb-3"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <div className="feature-icon-wrapper me-3">
                    <FaBolt
                      className="feature-icon"
                      style={{ color: "#1a92da" }}
                    />
                  </div>
                  <span>
                    Keep quotations and follow-ups organised and on track
                  </span>
                </div>
                <div
                  className="d-flex align-items-center"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <div className="feature-icon-wrapper me-3">
                    <FaChartBar
                      className="feature-icon"
                      style={{ color: "#1a92da" }}
                    />
                  </div>
                  <span>
                    Get real-time visibility into deals and buyer activity
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Modern Card */}
          <div className="col-lg-6" data-aos="fade-left" data-aos-delay="200">
            <div className="modern-card">
              {/* Enhanced Card Header */}
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
                  At Deep-Bridge
                </h3>
                <p className="card-subtitle mb-0">
                  We help manufacturers and exporters plug AI sales agents into
                  their existing workflows—so they respond faster, make fewer
                  mistakes, and keep deals moving even when the team is offline.
                </p>
              </div>

              {/* Enhanced Card Body */}
              <div className="card-body position-relative">
                {/* Decorative corner accent */}
                <div className="corner-accent top-right"></div>
                <div className="corner-accent bottom-left"></div>

                {/* Enhanced Stats Grid */}
                <div className="stats-grid">
                  <div
                    className="stat-item text-center position-relative"
                    data-aos="zoom-in"
                    data-aos-delay="400"
                  >
                    <div className="stat-icon-wrapper">
                      <FaBolt
                        className="stat-icon"
                        style={{ color: "#1a92da" }}
                      />
                    </div>
                    <div className="stat-number">Up to 95%</div>
                    <div className="stat-label">less manual quoting</div>
                    <p
                      className="stat-description mt-2 mb-0"
                      style={{ fontSize: "0.9rem", color: "#718096" }}
                    >
                      AI prepares drafts using your products, prices, and
                      templates
                    </p>
                    <div className="stat-underline"></div>
                  </div>
                  <div
                    className="stat-item text-center position-relative"
                    data-aos="zoom-in"
                    data-aos-delay="500"
                  >
                    <div className="stat-icon-wrapper">
                      <FaCheckCircle
                        className="stat-icon"
                        style={{ color: "#1a92da" }}
                      />
                    </div>
                    <div className="stat-number">20 Hours saved</div>
                    <div className="stat-label">each week</div>
                    <p
                      className="stat-description mt-2 mb-0"
                      style={{ fontSize: "0.9rem", color: "#718096" }}
                    >
                      Per rep, by offloading repetitive email and WhatsApp
                      replies
                    </p>
                    <div className="stat-underline"></div>
                  </div>
                  <div
                    className="stat-item text-center position-relative"
                    data-aos="zoom-in"
                    data-aos-delay="600"
                  >
                    <div className="stat-icon-wrapper">
                      <FaClock
                        className="stat-icon"
                        style={{ color: "#1a92da" }}
                      />
                    </div>
                    <div className="stat-number">24/7</div>
                    <div className="stat-label">coverage</div>
                    <p
                      className="stat-description mt-2 mb-0"
                      style={{ fontSize: "0.9rem", color: "#718096" }}
                    >
                      AI assistant available for buyer enquiries, even outside
                      office hours
                    </p>
                    <div className="stat-underline"></div>
                  </div>
                </div>

                {/* CTA Button */}
                <div
                  className="text-center mt-4"
                  data-aos="fade-up"
                  data-aos-delay="700"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
