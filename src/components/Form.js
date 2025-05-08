import React, { useState } from "react";
import axios from "axios";
import SuccessModal from "./SuccessModal"; // New component for confirmation
import countryList from "./countries/countryList";

const MyForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    whatsapp: "",
    company: "",
    emailConsent: false,
    promoConsent: false,
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
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
          country: "",
          whatsapp: "",
          company: "",
          emailConsent: false,
          promoConsent: false,
        });
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        alert("Submission failed");
      });
  };

  return (
    <div className="pt-5" id="Form">
      <div
        className="booking-form card shadow-sm p-4 w-75 m-auto mb-5"
        style={{ maxWidth: "700px" }}
      >
        <h2 className="text-center mb-2">Get in Touch with Deep-Bridge</h2>

        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="First Name*"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Last Name */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Last Name*"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email*"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Country, Prefix, WhatsApp */}
          <div className="mb-3 d-flex gap-2">
            <select
              className="form-select"
              style={{ width: "120px" }}
              name="country"
              value={formData.country}
              onChange={handleChange}
            >
              <option value="">Country</option>
              {countryList.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>

            <input
              type="tel"
              className="form-control"
              placeholder="phone number*"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              required
            />
          </div>

          {/* Company */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Company*"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email Consent */}

          <button type="submit" className="btn btn-primary w-100">
            Contact us
          </button>
        </form>

        <SuccessModal
          show={showSuccessModal}
          handleClose={() => setShowSuccessModal(false)}
        />
      </div>
    </div>
  );
};

export default MyForm;
