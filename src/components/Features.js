import React from 'react';
import Testimonials from './Testimonials'; // Import Testimonials component
import robo1 from '../images/1.png'
import robo2 from '../images/2.png'
import robo3 from '../images/3.png'

const Features = () => {
  const features = [
    {
      icon: robo1,
      title: "Faster and more accurate customer response times",
      description: "Enhance customer satisfaction by reducing wait times and improving response accuracy using AI-driven automation and smart routing."
    },
    {
      icon: robo2,
      title: "AI-powered email, WhatsApp, and WeChat automation",
      description: "Automate and personalize communication across multiple channels with AI, ensuring timely and relevant interactions with customers."
    },
    {
      icon: robo3,
      title: "Workflow optimization and predictive insights",
      description: "Streamline operations and improve efficiency by leveraging AI-powered automation and data-driven predictions to make informed business decisions."
    }
  ];

  return (
    <section className="features py-5" style={{backgroundColor:'#f4f4f4'}}>
      <div className="container">
      <h2 className="h2 text-center mb-4">Bridging deeper connections for your business.</h2>
        <div className="row">
          <div className="col-lg-6">
            {features.map((feature, index) => (
              <div key={index} className="feature-item d-flex align-items-start mb-5">
                <div className="feature-icon me-4">
                  <img src={feature.icon || "/placeholder.svg"} alt="" width="80" height="80" />
                </div>
                <div className="feature-content">
                  <h3 className="h5 mb-3">{feature.title}</h3>
                  <p className="text-muted">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="col-lg-6" style={{marginBottom:'30px'}}>
            <Testimonials />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;