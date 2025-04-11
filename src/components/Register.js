// Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/auth/register', formData)
      .then(response => {
        localStorage.setItem('token', response.data.token);
        setIsAuthenticated(true);
        navigate('/');
      })
      .catch(error => {
        console.error('Registration error:', error);
        alert('Registration failed');
      });
  };

  return (
    <div className="col-md-6 offset-md-3">
      <h1>Register</h1>
      <br/>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input type="text" name="username" className="form-control" placeholder="Username" value={formData.username} onChange={handleChange} required/>
        </div>
        <div className="mb-3">
          <input type="password" name="password" className="form-control" placeholder="Password" value={formData.password} onChange={handleChange} required/>
        </div>
        <div className="mb-3">
          <input type="email" name="email" className="form-control" placeholder="Email" value={formData.email} onChange={handleChange} required/>
        </div>
        <div className="mb-3">
          <input type="text" name="firstName" className="form-control" placeholder="First Name" value={formData.firstName} onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <input type="text" name="lastName" className="form-control" placeholder="Last Name" value={formData.lastName} onChange={handleChange}/>
        </div>
        <button type="submit" className="btn btn-secondary">Register</button>
      </form>
    </div>
  );
};

export default Register;
 