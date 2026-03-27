import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/custom.css";
import "./ServiceHero.css";
import dashboardImage from "./image/dashboard.png";

const ServiceHero = () => {
  const keyPoints = [
    {
      title: "See the best offer for every buyer",
      description:
        "AI Product Match suggests SKUs, price bands, and factories based on region, channel, past orders, and certifications.",
    },
    {
      title: "Track every quotation in one place",
      description:
        "The Offers & Quotations Tracker shows which deals are sent, opened, counter-offered, won, or lost—so follow-ups never slip.",
    },
    {
      title: "Cut manual work, not relationships",
      description:
        "Deep-Bridge drafts emails and WhatsApp messages using your templates and pricing rules, freeing your team to focus on negotiation and customer trust.",
    },
  ];

  return (
    <section className="service-hero">
      <div className="service-hero-background"></div>
      <div className="container">
        {/* Title and Image Row */}

        <div className="row align-items-center">
          {/* Left Side - Text Content */}

          <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
            <p
              className="cross-platform-label text-left"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              Deep-Bridge Services
            </p>
            <div
              className="service-hero-content"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <h1 className="service-hero-title">
                An AI sales desk built for exporters
              </h1>
              <p className="service-hero-description">
                Deep-Bridge connects your buyers, products, and quotations in
                one live workspace. AI recommends the right SKUs and prices for
                each customer, drafts offers, and keeps every deal on track.
              </p>
            </div>
          </div>

          {/* Right Side - UI Preview */}
          <div className="col-lg-6 col-md-12">
            <div
              className="service-hero-preview"
              data-aos="fade-left"
              data-aos-delay="400"
            >
              <div className="preview-image-wrapper">
                <img
                  src={dashboardImage}
                  alt="Dashboard Preview"
                  className="preview-image"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Key Points Cards Row */}
        <div className="row mt-5">
          {keyPoints.map((point, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4">
              <div
                className="service-hero-key-card"
                data-aos="fade-up"
                data-aos-delay={500 + index * 100}
              >
                <h3 className="service-hero-key-card-title">{point.title}</h3>
                <p className="service-hero-key-card-description">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
