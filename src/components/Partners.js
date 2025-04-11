import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/DeepBridgeFeature.css';

const Partners = () => {
  return (
    <section className="deep-bridge-feature">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Content */}
          <div className="col-lg-6 mb-4">
            <h2 className="feature-title">
              Revolutionizing Manufacturing with <span className="highlight">Deep-Bridge</span>
            </h2>
            <p className="lead">
              <span className="icon">💡</span> AI-Powered CRM for Traditional Businesses
            </p>
            <p>
            We understand the challenges manufacturers face—handling a high volume of customer inquiries, managing multiple communication channels, and keeping up with ever-changing demands. That’s why we built a custom AI-powered CRM that automates customer interactions, organizes workflows, and ensures no opportunity is lost in the process.
            </p>
            <ul className="feature-list">
              <li><span className="icon">✅</span> Automate customer interactions</li>
              <li><span className="icon">✅</span> Optimize workflows</li>
              <li><span className="icon">✅</span> Enhance sales tracking</li>
            </ul>
          </div>

          {/* Right Content - Card */}
          <div className="col-lg-6 " >
            <div className="card feature-card" >
              <div className="card-body">
                <h3 className="card-title">
                  <span className="icon">🚀</span> Stay Competitive in an AI-Driven World
                </h3>
                <p className="card-text">
                At Deep-Bridge, we empower manufacturers with AI-driven automation to streamline communication, optimize workflows, and accelerate decision-making.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
