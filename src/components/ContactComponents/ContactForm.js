import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Partners.css";
import axios from "axios";
import SuccessModal from "../SuccessModal";
import { FiSend, FiMessageCircle } from "react-icons/fi";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/api/contacts", formData)
      .then((response) => {
        console.log(response.data);
        setShowSuccessModal(true);

        // Clear the form after successful submission
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          company: "",
          message: "",
        });
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        alert("Submission failed. Please try again.");
      });
  };

  return (
    <section>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-7">
            <div
              className="modern-card"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {/* Card Header */}
              <div className="card-header position-relative">
                <div className="header-background-shapes">
                  <div className="shape shape-1"></div>
                  <div className="shape shape-2"></div>
                  <div className="shape shape-3"></div>
                </div>
                <div className="header-icon">
                  <FiSend size={40} />
                </div>
                <h3 className="card-title mb-2 text-center w-100">
                  Contact Form
                </h3>
                <p className="card-subtitle mb-0">We'd love to hear from you</p>
              </div>

              {/* Card Body */}
              <div className="card-body position-relative">
                <div className="corner-accent top-right"></div>
                <div className="corner-accent bottom-left"></div>

                <form onSubmit={handleSubmit}>
                  {/* Name Row */}
                  <div className="row mb-3">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <input
                        type="text"
                        className="form-control form-control-modern"
                        placeholder="First Name*"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control form-control-modern"
                        placeholder="Last Name*"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control form-control-modern"
                      placeholder="Email*"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Phone and Company */}
                  <div className="row mb-3">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <input
                        type="tel"
                        className="form-control form-control-modern"
                        placeholder="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control form-control-modern"
                        placeholder="Company*"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mb-4">
                    <textarea
                      className="form-control form-control-modern"
                      placeholder="Your Message*"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      style={{ resize: "vertical" }}
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-primary btn-modern w-100"
                  >
                    <FiSend className="me-2" />
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <SuccessModal
          show={showSuccessModal}
          handleClose={() => setShowSuccessModal(false)}
        />
      </div>
    </section>
  );
};

export default ContactForm;
