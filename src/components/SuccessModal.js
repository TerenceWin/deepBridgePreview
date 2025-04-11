import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const SuccessModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Success!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>You will receive an email soon.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SuccessModal;
