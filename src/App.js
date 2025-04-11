import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Home from './components/Home';
import Register from './components/Register';
import AddRecord from './components/AddRecord';
import UpdateRecord from './components/UpdateRecord';
import Record from './components/Record';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('token'));
  }, []);

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        {/* Landing page outside the container */}
        <Route path="/" element={<Landing />} />

        {/* All other routes are wrapped in a container */}
        <Route
          path="/crm/home"
          element={
            <div className="container mt-4">
              <Home isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
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
              <Home isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
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
