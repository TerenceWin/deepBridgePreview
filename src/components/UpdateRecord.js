import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateRecord = () => {
  const { id } = useParams(); // Extract the record ID from the URL
  const navigate = useNavigate();
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

  useEffect(() => {
    axios.get(`http://localhost:8000/api/records/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        setRecordData(response.data);
      })
      .catch(error => {
        console.error('Error fetching record:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    setRecordData({ ...recordData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8000/api/records/${id}`, recordData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        navigate('/');
      })
      .catch(error => {
        console.error('Error updating record:', error);
        alert('Failed to update record');
      });
  };

  return (
    <div className="col-md-6 offset-md-3">
      <h1>Update Record</h1>
      <br />
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-secondary">Update Record</button>
      </form>
    </div>
  );
};

export default UpdateRecord;
