import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Partners.css";
import { FaHeadset, FaHandshake, FaRocket } from "react-icons/fa";
import { FiZap } from "react-icons/fi";

const ContactInfo = () => {
  const infoCards = [
    {
      icon: FaHeadset,
      title: "24/7 Support",
      description:
        "Our team is always ready to assist you with any questions or concerns about our AI-powered CRM solutions.",
    },
    {
      icon: FaRocket,
      title: "Fast Response",
      description:
        "We typically respond to inquiries within 24 hours, ensuring you get the help you need quickly.",
    },
    {
      icon: FaHandshake,
      title: "Expert Consultation",
      description:
        "Schedule a free consultation to discuss how Deep-Bridge can transform your business operations.",
    },
  ];

  return (
    <section className="deep-bridge-feature" style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
      <div className="container">
        <div
          className="text-center mb-5"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <h2 className="feature-title display-5 fw-bold mb-3">
            Why Contact <span className="highlight-gradient">Deep-Bridge</span>
          </h2>
          <p className="lead text-muted">
            <FiZap className="me-2" style={{ color: "#667eea" }} />
            We're committed to helping your business succeed
          </p>
        </div>

        <div className="row g-4">
          {infoCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div
                key={index}
                className="col-md-4"
                data-aos="fade-up"
                data-aos-delay={200 + index * 100}
              >
                <div className="modern-card h-100">
                  <div className="card-body position-relative">
                    <div className="corner-accent top-right"></div>
                    <div className="corner-accent bottom-left"></div>

                    <div className="text-center">
                      <div className="feature-icon-wrapper mx-auto mb-4">
                        <IconComponent className="feature-icon" />
                      </div>
                      <h3
                        className="h5 mb-3"
                        style={{ color: "#2d3748", fontWeight: "600" }}
                      >
                        {card.title}
                      </h3>
                      <p className="card-text mb-0">{card.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
