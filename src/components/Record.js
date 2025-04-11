import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Record = () => {
  const { id } = useParams(); // gets the dynamic "id" from the URL
  const [record, setRecord] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/records/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        setRecord(response.data);
      })
      .catch(error => {
        console.error('Error fetching record:', error);
      });
  }, [id]);

  if (!record) return <div>Loading...</div>;

  return (
    <div className="col-md-6 offset-md-3">
      <h1>Record Details</h1>
      <p><strong>Name:</strong> {record.first_name} {record.last_name}</p>
      <p><strong>Email:</strong> {record.email}</p>
      <p><strong>Phone:</strong> {record.phone}</p>
      <p><strong>Address:</strong> {record.address}</p>
      <p><strong>City:</strong> {record.city}</p>
      <p><strong>State:</strong> {record.state}</p>
      <p><strong>Zipcode:</strong> {record.zipcode}</p>
      <p><strong>Created At:</strong> {new Date(record.created_at).toLocaleString()}</p>
      <Link to={`/crm/update-record/${record.id}`} className="btn btn-secondary">Edit Record</Link>
    </div>
  );
};

export default Record;
