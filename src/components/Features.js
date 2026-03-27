import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Testimonials from "./Testimonials";
import { FaClock, FaChartLine, FaRobot } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";

const Features = () => {
  const features = [
    {
      icon: FaClock,
      title: "Faster responses to RFQs and enquiries",
      description:
        "Reduce waiting time for your buyers by letting an AI sales agent draft replies and quotations in seconds, using your products, prices, and rules.",
    },
    {
      icon: FiMessageCircle,
      title: "AI-powered email and WhatsApp assistant",
      description:
        "Give tasks to Deep-Bridge and let it handle day-to-day conversations across channels—so every buyer gets timely, consistent communication without extra effort from your team.",
    },
    {
      icon: FaChartLine,
      title: "Smarter workflows and clearer priorities",
      description:
        "Cut through noise in inboxes and chats. Deep-Bridge highlights which buyers and offers need attention next, helping your team focus on the deals that actually move the needle.",
    },
  ];

  return (
    <section className="deep-bridge-feature py-5">
      <div className="container my-5">
        <div
          className="text-center mb-5"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <h2 className="feature-title display-5 fw-bold mb-3">
            Bridging deeper connections for your{" "}
            <span className="highlight-gradient">business</span>
          </h2>
          <p className="lead text-muted">
            <FaRobot className="me-2" style={{ color: "#1a92da" }} />
            Powerful AI support for your sales team
          </p>
        </div>

        <div className="row align-items-stretch">
          {/* Features Column */}
          <div className="col-lg-6 mb-5 mb-lg-0 d-flex flex-column">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="modern-card feature-card-modern mb-4"
                  data-aos="fade-right"
                  data-aos-delay={200 + index * 100}
                >
                  <div className="card-body position-relative">
                    <div className="corner-accent top-right"></div>
                    <div className="corner-accent bottom-left"></div>

                    <div className="d-flex align-items-start">
                      <div className="feature-icon-wrapper me-4">
                        <IconComponent
                          className="feature-icon"
                          style={{ color: "#1a92da" }}
                        />
                      </div>
                      <div className="feature-content flex-grow-1">
                        <h3
                          className="h5 mb-3"
                          style={{ color: "#2d3748", fontWeight: "600" }}
                        >
                          {feature.title}
                        </h3>
                        <p className="card-text mb-0">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Testimonials Column */}
          <div className="col-lg-6 d-flex align-items-stretch">
            <div
              className="w-100 d-flex"
              data-aos="fade-left"
              data-aos-delay="400"
            >
              <Testimonials />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
