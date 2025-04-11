import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">Deep-bridge</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={isOpen ? "true" : "false"}
          aria-label="Toggle navigation"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {isAuthenticated ? (
              <>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#!"
                    id="recordsDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Records
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="recordsDropdown">
                    <li>
                      <Link className="dropdown-item" to="/crm/home">View Records</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/crm/add-record">Add Record</Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link text-white" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/crm/register">Register</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/crm/login">Login</Link>
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
