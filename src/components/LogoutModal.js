import React from 'react';

const LogoutModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>Confirm Logout</h4>
        <p>Are you sure you want to log out?</p>
        <button className="btn btn-danger" onClick={onConfirm}>Yes, Logout</button>
        <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default LogoutModal;
