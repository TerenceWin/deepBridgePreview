import React, { useState } from 'react';

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const testimonials = [
    {
      quote: "🚀 Deep-Bridge connects traditional businesses to the future of AI, ensuring seamless communication, smart automation, and business growth.\n✅ No AI knowledge required – We handle the setup for you.\n✅ AI-powered communication automation (WeChat, WhatsApp, Outlook).\n✅ Automated follow-ups based on conversation history.\n✅ Personalized AI-driven recommendations.\n✅ AI-powered reporting and predictive insights.",
    },
  ];

  return (
    <div className="testimonials card shadow-sm" style={{minHeight:"100%"}}>
      <div className="card-body p-4">
        
        
        <div className="testimonial-content text-center">
          <blockquote className="mb-4">
          <p className="mb-0 lh-lg text-start font-italic" style={{ fontSize: "18px", fontStyle: "italic", fontWeight: "normal" }}>
              {testimonials[currentSlide].quote.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
          </blockquote>
          <div className="testimonial-author">
            <p className="fw-bold mb-1">{testimonials[currentSlide].author}</p>
            <p className="text-muted small">{testimonials[currentSlide].position}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
