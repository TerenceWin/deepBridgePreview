import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddRecord = () => {
  const [recordData, setRecordData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipcode: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setRecordData({ ...recordData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/records', recordData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        navigate('/');
      })
      .catch(error => {
        console.error('Error adding record:', error);
        alert('Failed to add record');
      });
  };

  return (
    <div className="col-md-6 offset-md-3">
      <h1>Add Record</h1>
      <br />
      <form onSubmit={handleSubmit}>
        {/* (Form fields as shown below) */}
        <div className="mb-3">
          <input type="text" name="first_name" className="form-control" placeholder="First Name" value={recordData.first_name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input type="text" name="last_name" className="form-control" placeholder="Last Name" value={recordData.last_name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input type="email" name="email" className="form-control" placeholder="Email" value={recordData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input type="text" name="phone" className="form-control" placeholder="Phone" value={recordData.phone} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input type="text" name="address" className="form-control" placeholder="Address" value={recordData.address} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input type="text" name="city" className="form-control" placeholder="City" value={recordData.city} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input type="text" name="state" className="form-control" placeholder="State" value={recordData.state} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input type="text" name="zipcode" className="form-control" placeholder="Zipcode" value={recordData.zipcode} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-secondary">Add Record</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/')}>Back</button>
      </form>
    </div>
  );
};

export default AddRecord;
