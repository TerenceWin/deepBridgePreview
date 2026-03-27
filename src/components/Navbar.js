import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Partners.css";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut, FiLogIn, FiMenu, FiX } from "react-icons/fi";
import logoCropped from "../images/logo-cropped.jpeg";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
    setIsOpen(false);
  };

  return (
    <nav className="navbar-modern navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link
          className="navbar-brand-modern navbar-brand fw-bold d-flex align-items-center"
          to="/"
          onClick={() => setIsOpen(false)}
        >
          <img
            src={logoCropped}
            alt="Deep-Bridge Logo"
            className="navbar-logo"
            style={{ height: "55px", width: "auto" }}
          />
        </Link>
        <button
          className="navbar-toggler-modern navbar-toggler"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={isOpen ? "true" : "false"}
          aria-label="Toggle navigation"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link-modern nav-link"
                to="/"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link-modern nav-link"
                to="/services"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link-modern nav-link"
                to="/contact"
                onClick={() => setIsOpen(false)}
              >
                About Us
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav mb-2 mb-lg-0">
            {isAuthenticated ? (
              <>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link-modern nav-link dropdown-toggle"
                    href="#!"
                    id="recordsDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Records
                  </a>
                  <ul
                    className="dropdown-menu-modern dropdown-menu"
                    aria-labelledby="recordsDropdown"
                  >
                    <li>
                      <Link
                        className="dropdown-item-modern dropdown-item"
                        to="/crm/home"
                        onClick={() => setIsOpen(false)}
                      >
                        View Records
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item-modern dropdown-item"
                        to="/crm/add-record"
                        onClick={() => setIsOpen(false)}
                      >
                        Add Record
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link-modern nav-link btn btn-link"
                    onClick={handleLogout}
                  >
                    <FiLogOut className="me-1" />
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link-modern nav-link"
                    to="/crm/login"
                    onClick={() => setIsOpen(false)}
                  >
                    <FiLogIn className="me-1" />
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
