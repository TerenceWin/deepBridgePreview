import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Contact from "./pages/Contact";
import Service from "./pages/Service";
import Home from "./components/Home";
import Register from "./components/Register";
import AddRecord from "./components/AddRecord";
import UpdateRecord from "./components/UpdateRecord";
import Record from "./components/Record";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration
      once: true, // whether animation should happen only once
    });
  }, []);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, []);

  // Disable browser scroll restoration
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Navbar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <Routes>
        {/* Landing page outside the container */}
        <Route path="/" element={<Landing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Service />} />

        {/* All other routes are wrapped in a container */}
        <Route
          path="/crm/home"
          element={
            <div className="container mt-4">
              <Home
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
              />
            </div>
          }
        />
        <Route
          path="/crm/register"
          element={
            <div className="container mt-4">
              <Register setIsAuthenticated={setIsAuthenticated} />
            </div>
          }
        />
        <Route
          path="/crm/login"
          element={
            <div className="container mt-4">
              <Home
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
              />
            </div>
          }
        />
        <Route
          path="/crm/add-record"
          element={
            <div className="container mt-4">
              <AddRecord />
            </div>
          }
        />
        <Route
          path="/crm/update-record/:id"
          element={
            <div className="container mt-4">
              <UpdateRecord />
            </div>
          }
        />
        <Route
          path="/record/:id"
          element={
            <div className="container mt-4">
              <Record />
            </div>
          }
        />
      </Routes>
    </>
  );
};

export default App;
