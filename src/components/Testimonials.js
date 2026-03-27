import React, { useState } from "react";
import { FaCheckCircle, FaRocket } from "react-icons/fa";
import { IoSparklesSharp } from "react-icons/io5";

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      quote:
        "Deep-Bridge connects traditional businesses to the future of AI, ensuring seamless communication, smart automation, and business growth.\n✅ No AI knowledge required – We handle the setup for you.\n✅ AI-powered communication automation (WeChat, WhatsApp, Outlook).\n✅ Automated follow-ups based on conversation history.\n✅ Personalized AI-driven recommendations.\n✅ AI-powered reporting and predictive insights.",
    },
  ];

  return (
    <div className="modern-card h-100 d-flex flex-column">
      {/* Card Header */}
      <div className="card-header position-relative flex-shrink-0">
        <div className="header-background-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        <div className="header-icon">
          <IoSparklesSharp size={40} />
        </div>
        <h3 className="card-title mb-2 text-center w-100">
          Why Choose Deep-Bridge
        </h3>
        <p className="card-subtitle mb-0">Your AI-Powered Solution</p>
      </div>

      {/* Card Body */}
      <div className="card-body position-relative flex-grow-1 d-flex flex-column">
        <div className="corner-accent top-right"></div>
        <div className="corner-accent bottom-left"></div>

        <div className="testimonial-content">
          <blockquote className="mb-0">
            <p
              className="mb-0 lh-lg text-start"
              style={{
                fontSize: "1rem",
                color: "#4a5568",
                lineHeight: "1.7",
              }}
            >
              {testimonials[currentSlide].quote
                .split("\n")
                .map((line, index) => {
                  if (line.trim() === "") return null;
                  const isCheckmark = line.startsWith("✅");
                  const isRocket = line.startsWith("🚀");
                  const cleanLine = line.replace(/^[🚀✅]\s*/, "");

                  return (
                    <React.Fragment key={index}>
                      <div className="d-flex align-items-start mb-3">
                        {isCheckmark && (
                          <FaCheckCircle
                            className="me-2 mt-1"
                            style={{ color: "#1a92da", flexShrink: 0 }}
                          />
                        )}
                        {isRocket && (
                          <FaRocket
                            className="me-2 mt-1"
                            style={{ color: "#1a92da", flexShrink: 0 }}
                          />
                        )}
                        <span>{cleanLine}</span>
                      </div>
                    </React.Fragment>
                  );
                })}
            </p>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
