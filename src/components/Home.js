import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = ({ isAuthenticated, setIsAuthenticated }) => {
  const [records, setRecords] = useState([]);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      axios.get('http://localhost:8000/api/records', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        setRecords(response.data);
      })
      .catch(error => {
        console.error('Error fetching records:', error);
      });
    }
  }, [isAuthenticated]);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/auth/login', loginData)
      .then(response => {
        localStorage.setItem('token', response.data.token);
        setIsAuthenticated(true);
        navigate('/');
      })
      .catch(error => {
        console.error('Login error:', error);
        alert('Invalid credentials');
      });
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h1>Records</h1>
          <table className="table table-striped table-hover table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>Zipcode</th>
                <th>Created At</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              {records.map(record => (
                <tr key={record.id}>
                  <td>{record.first_name} {record.last_name}</td>
                  <td>{record.email}</td>
                  <td>{record.phone}</td>
                  <td>{record.address}</td>
                  <td>{record.city}</td>
                  <td>{record.state}</td>
                  <td>{record.zipcode}</td>
                  <td>{new Date(record.created_at).toLocaleString()}</td>
                  <td><Link to={`/record/${record.id}`}>{record.id}</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="col-md-6 offset-md-3">
          <h1>Login</h1>
          <br />
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-3">
              <input 
                type="text" 
                name="username"
                className="form-control" 
                placeholder="Username" 
                value={loginData.username}
                onChange={handleLoginChange}
                required 
              />
            </div>
            <div className="mb-3">
              <input 
                type="password" 
                name="password"
                className="form-control" 
                placeholder="Password" 
                value={loginData.password}
                onChange={handleLoginChange}
                required 
              />
            </div>
            <button type="submit" className="btn btn-secondary">Login</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
