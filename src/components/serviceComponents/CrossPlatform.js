import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/custom.css";
import "./CrossPlatform.css";
import { FaSync } from "react-icons/fa";
import crossplatform from "./image/CrossPlatform.png";

const CrossPlatform = () => {
  const featureCards = [
    {
      title: "AI Product Match",
      description:
        "Deep-Bridge looks at each buyer's region, channel, and past orders to suggest the best SKUs and price band—so every offer feels tailored, not generic.",
    },
    {
      title: "Offers & Quotations Automation",
      description:
        "Turn RFQs into ready-to-send quotations in minutes. AI reads emails and files, fills in product and pricing details, and drafts emails for your approval.",
    },
    {
      title: "Buyer & Deal Intelligence",
      description:
        "See the full story for each buyer—what they opened, what they ordered, and where each deal stands—so reps stay consistent on pricing, margins, and follow-ups.",
    },
  ];

  return (
    <section className="cross-platform-section">
      <div className="container">
        {/* Section Label and Heading */}
        <div className="row mb-5">
          <div className="col-12 text-center">
            <p
              className="cross-platform-label"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              AI assistant in action
            </p>
            <h2
              className="cross-platform-title text-center"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Three ways AI upgrades your daily work
            </h2>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="row">
          {featureCards.map((card, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4">
              <div
                className="cross-platform-feature-card"
                data-aos="fade-up"
                data-aos-delay={300 + index * 100}
              >
                <h3 className="cross-platform-feature-title">{card.title}</h3>
                <p className="cross-platform-feature-description">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="row align-items-center mt-5">
          {/* Left Side - Text Content */}
          <div className="col-lg-6 col-md-12 mb-5 mb-lg-0">
            <div
              className="cross-platform-content"
              data-aos="fade-right"
              data-aos-delay="600"
            >
              {/* Heading */}
              <p className="cross-platform-label">
                Your AI assistant, wherever you work
              </p>
              <h2 className="cross-platform-title">
                Have your own AI driven assistant
              </h2>
              <p className="cross-platform-subtitle">
                On tablet or phone, you can give Deep-Bridge tasks in plain
                language. Review deals, send quotations, and check on
                buyers—without opening a single spreadsheet.
              </p>

              {/* Feature List */}
              <ul className="cross-platform-features">
                <li data-aos="fade-right" data-aos-delay="700">
                  <strong>Review and prioritise deals</strong>
                  <br />
                  "Show me all open quotations over $50,000 this week."
                </li>
                <li data-aos="fade-right" data-aos-delay="800">
                  <strong>Send and adjust offers on the fly</strong>
                  <br />
                  "Send SuperStore the same quotation as last time, 5% lower and
                  valid for 14 days."
                </li>
                <li data-aos="fade-right" data-aos-delay="900">
                  <strong>Ask real questions, get real answers</strong>
                  <br />
                  "Did we receive the PO from Store Super for SKU 1101?" "Who
                  are the best buyers to promote our new cordless vacuum to?"
                </li>
              </ul>
            </div>
          </div>

          {/* Right Side - Devices */}
          <div className="col-lg-6 col-md-12">
            <div
              className="devices-container"
              data-aos="fade-left"
              data-aos-delay="400"
            >
              {/* Cross Platform Image */}
              <img
                src={crossplatform}
                alt="Cross Platform Devices"
                className="crossplatform-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CrossPlatform;
