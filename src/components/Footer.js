import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Partners.css";
import { FaLinkedin, FaRobot, FaGem } from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import logoCropped from "../images/logo-cropped.jpeg";

function Footer() {
  return (
    <footer className="footer-modern">
      <section className="footer-content py-1 border-top">
        <div className="container">
          {/* Change row to use flexbox centering */}
          <div className="row g-4 justify-content-around align-items-start py-3">
            {/* Remove specific column classes and let content determine width */}
            <div className="col-auto">
              <div className="footer-column" style={{ maxWidth: "300px" }}>
                <h6 className="footer-title mb-4">
                  <img
                    src={logoCropped}
                    alt="Deep-Bridge"
                    className="me-2"
                    style={{ height: "30px", width: "auto" }}
                  />
                  Deep-Bridge
                </h6>
                <p className="footer-text">
                  At Deep-Bridge, we're committed to helping traditional
                  businesses thrive in a digital-first world. Our AI-powered
                  solutions are designed to simplify communication, automate
                  workflows, and drive smarter decision-making—without requiring
                  any technical expertise.
                </p>
              </div>
            </div>

            <div className="col-auto">
              <div className="footer-column" style={{ maxWidth: "250px" }}>
                <h6 className="footer-title mb-4">Follow Us</h6>
                <p className="footer-text mb-4">
                  Stay connected with us on social media for the latest updates
                  and news.
                </p>
                <div className="footer-social-links">
                  <a
                    href="https://www.linkedin.com/company/deep-bridge/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin size={24} style={{ color: "#1a92da" }} />
                  </a>
                </div>
              </div>
            </div>

            <div className="col-auto">
              <div className="footer-column" style={{ maxWidth: "220px" }}>
                <h6 className="footer-title mb-3">Contact Us</h6>
                <div className="footer-contact">
                  <div className="contact-item mb-2">
                    <FiMail className="me-2" style={{ color: "#1a92da" }} />
                    <span className="text-muted">info@deep-bridge.com</span>
                  </div>
                  <div className="contact-item mb-2">
                    <FiPhone className="me-2" style={{ color: "#1a92da" }} />
                    <span className="text-muted">+852 6725 9701</span>
                  </div>
                  <div className="contact-item">
                    <FiMapPin className="me-2" style={{ color: "#1a92da" }} />
                    <span className="text-muted" style={{ fontSize: "0.9rem" }}>
                      1118-1119 Metro Ctr. II,
                      <br />
                      21 Lam Hing Street,
                      <br />
                      Kowloon Bay, Hong Kong
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Bottom remains same */}
      <div className="footer-bottom py-3">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <p className="footer-copyright mb-0">
                © {new Date().getFullYear()} Deep-Bridge. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
