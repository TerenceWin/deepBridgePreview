import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Partners.css";
import "../../styles/custom.css";
import { useNavigate } from "react-router-dom";
import { FaRocket, FaEye, FaEnvelope, FaHandshake } from "react-icons/fa";
import { FiMail, FiSend, FiZap } from "react-icons/fi";
import axios from "axios";
import SuccessModal from "../SuccessModal";

const Services = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Handle scrolling to form when page loads with hash
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#waitlist-form") {
      setTimeout(() => {
        const element = document.getElementById("waitlist-form");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 300); // Delay to ensure page is rendered
    }
  }, []);

  const handleWaitlistSubmit = (e) => {
    e.preventDefault();

    // You can create a separate endpoint for waitlist or use the contacts endpoint
    axios
      .post("http://localhost:8000/api/contacts", {
        email: email,
        firstName: "Waitlist",
        lastName: "Signup",
        company: "Waitlist",
        whatsapp: "",
        country: "",
      })
      .then((response) => {
        console.log(response.data);
        setShowSuccessModal(true);
        setEmail("");
      })
      .catch((error) => {
        console.error("Error submitting waitlist:", error);
        alert("Submission failed. Please try again.");
      });
  };

  const handleContactClick = () => {
    navigate("/contact");
  };

  return (
    <div
      className="deep-bridge-feature"
      style={{
        paddingTop: "var(--navbar-height, 80px)",
        paddingBottom: "3rem",
      }}
    >
      <div className="container">
        <div
          className="text-center mb-5"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <h2 className="feature-title display-5 fw-bold mb-3">
            About <span className="highlight-gradient">Us</span>
          </h2>
          <p className="lead text-muted">
            <FiZap className="me-2" style={{ color: "#1a92da" }} />
            We're building something amazing - Join us on this journey
          </p>
        </div>

        <div className="row justify-content-center g-5 mb-5">
          {/* Info Cards */}
          <div className="col-lg-8 col-xl-7">
            <div className="row g-4">
              <div className="col-md-6" data-aos="fade-up" data-aos-delay="300">
                <div className="modern-card h-100">
                  <div className="card-body position-relative">
                    <div className=""></div>
                    <div className=""></div>

                    <div className="text-center">
                      <div className="feature-icon-wrapper mx-auto mb-4">
                        <FaEye
                          className="feature-icon"
                          style={{ color: "#1a92da" }}
                        />
                      </div>
                      <h3
                        className="h5 mb-3"
                        style={{ color: "#2d3748", fontWeight: "600" }}
                      >
                        Request a Demo
                      </h3>
                      <p className="card-text mb-0">
                        Interested in seeing what we're building? Contact us to
                        schedule a personalized demo of our AI-powered CRM
                        platform.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6" data-aos="fade-up" data-aos-delay="400">
                <div className="modern-card h-100">
                  <div className="card-body position-relative">
                    <div className=""></div>
                    <div className=""></div>

                    <div className="text-center">
                      <div className="feature-icon-wrapper mx-auto mb-4">
                        <FaHandshake
                          className="feature-icon"
                          style={{ color: "#1a92da" }}
                        />
                      </div>
                      <h3
                        className="h5 mb-3"
                        style={{ color: "#2d3748", fontWeight: "600" }}
                      >
                        Early Access
                      </h3>
                      <p className="card-text mb-0">
                        Be among the first to experience Deep-Bridge. Join our
                        waitlist to get early access when we launch.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Waitlist Section */}
        <div className="row justify-content-center" id="waitlist-form">
          <div className="col-lg-8 col-xl-7">
            <div
              className="modern-card"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              {/* Card Header */}
              <div className="card-header position-relative">
                <div className="header-background-shapes">
                  <div className="shape shape-1"></div>
                  <div className="shape shape-2"></div>
                  <div className="shape shape-3"></div>
                </div>
                <div className="header-icon">
                  <FiMail size={40} style={{ color: "#1a92da" }} />
                </div>
                <h3 className="card-title mb-2 text-center w-100">
                  Join the Waitlist
                </h3>
                <p className="card-subtitle mb-0">
                  Be the first to know when we launch
                </p>
              </div>

              {/* Card Body */}
              <div className="card-body position-relative">
                <div className=""></div>
                <div className=""></div>

                <p className="card-text text-center mb-4">
                  We're still building the product and can show you a demo. If
                  you want to join the waitlist, enter your email address below.
                </p>

                <form onSubmit={handleWaitlistSubmit}>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control form-control-modern"
                      placeholder="Enter your email address*"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="d-flex flex-column flex-md-row gap-3">
                    <button
                      type="submit"
                      className="btn btn-primary btn-modern flex-grow-1"
                    >
                      <FiMail className="me-2" style={{ color: "#1a92da" }} />
                      Join Waitlist
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <SuccessModal
          show={showSuccessModal}
          handleClose={() => setShowSuccessModal(false)}
        />
      </div>
    </div>
  );
};

export default Services;
