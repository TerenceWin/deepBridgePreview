import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/VissionMission.css'; // We'll create this file for custom styles

function VisionMission() {
  return (
    <section className="container my-5">
      <div className="row g-4">
        {/* Vision Section */}
        <div className="col-md-4">
          <div className="vision-mission-card">
            <h2 className="card-title">
              <span className="icon">🌟</span> Our Vision
            </h2>
            <p className="card-text fw-bold">
              "Empowering traditional businesses with AI-driven efficiency."
            </p>
            <p className="card-text">
              We aim to bridge the gap between traditional industries and the power of AI, enabling businesses to stay competitive in an evolving digital landscape.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="col-md-8">
          <div className="vision-mission-card">
            <h2 className="card-title">
              <span className="icon">🎯</span> Our Mission
            </h2>
            <p className="card-text fw-bold">
              "Revolutionizing traditional B2B industries by providing AI-powered automation that enhances communication, 
              streamlines operations, and drives business growth."
            </p>

            {/* Table for better structure */}
            <div className="table-responsive">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td><strong>AI Without Complexity</strong></td>
                    <td>We deliver AI solutions that require no technical expertise, making adoption seamless.</td>
                  </tr>
                  <tr>
                    <td><strong>Faster Decision-Making</strong></td>
                    <td>We optimize workflows, automate interactions, and generate predictive insights to help businesses stay ahead.</td>
                  </tr>
                  <tr>
                    <td><strong>Competitive Edge</strong></td>
                    <td>We empower businesses to operate smarter, scale faster, and thrive in a digital-first world.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VisionMission;
