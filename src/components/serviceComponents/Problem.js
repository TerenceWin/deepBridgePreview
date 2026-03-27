import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/custom.css";
import "./Problem.css";
import problemImage from "./image/problem.png";
import { FiMail, FiFileText, FiUsers } from "react-icons/fi";

const Problem = () => {
  const featureCards = [
    {
      title: "Endless email & chat threads",
      description:
        "RFQs, sample requests, and price negotiations buried inside Gmail, Outlook, WhatsApp, WeChat, and Teams.",
      icon: <FiMail />,
    },
    {
      title: "Scattered files & formats",
      description:
        "Specs in PDF, price lists in Excel, POs as images, contracts as Word attachments—all needing manual re-typing into ERPs and CRMs.",
      icon: <FiFileText />,
    },
    {
      title: "Tribal knowledge in people's heads",
      description:
        "Only a few reps remember which buyer ordered which SKU, what price was agreed, and which factory can pass which certification.",
      icon: <FiUsers />,
    },
  ];

  return (
    <section className="problem-section">
      <div className="problem-background"></div>
      <div className="container">
        <p
          className="cross-platform-label text-center"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Why exporters struggle today
        </p>
        {/* Main Hero Content */}
        <div className="row align-items-center problem-main-content">
          {/* Centered Text Content */}
          <div className="col-lg-8 col-md-10 mx-auto mb-4 mb-lg-0">
            <div
              className="problem-content"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h1 className="problem-title">
                Export data is everywhere – and deals fall through the cracks
              </h1>
              <p className="problem-subtitle">
                RFQs, quotations, and POs live across email, WhatsApp,
                spreadsheets, and PDFs. Every hand-off is a chance to miss an
                order, mis-quote a price, or lose the latest version.
              </p>
              <p className="problem-description">
                Every day, export teams juggle:
              </p>
            </div>
          </div>
        </div>

        {/* Multiple Images */}
        <div className="row mt-5">
          <div className="col-12">
            <div
              className="problem-images-container"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <img
                src={problemImage}
                alt="Problem Solution"
                className="problem-image"
              />
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="row mt-5 problem-features">
          {featureCards.map((card, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4">
              <div
                className="problem-feature-card"
                data-aos="fade-up"
                data-aos-delay={700 + index * 100}
              >
                <div className="feature-icon-placeholder">
                  <div className="feature-icon-circle">{card.icon}</div>
                </div>
                <h3 className="feature-card-title">{card.title}</h3>
                <p className="feature-card-description">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Result Text */}
        <div className="row mt-4">
          <div className="col-lg-8 col-md-10 mx-auto">
            <p
              className="problem-result-text"
              data-aos="fade-up"
              data-aos-delay="1000"
            >
              The result? Slow replies, order backlogs, and revenue
              leakage—especially when key people are busy, on holiday, or have
              left the company.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
