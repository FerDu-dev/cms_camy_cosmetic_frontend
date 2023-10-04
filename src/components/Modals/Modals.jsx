
import React from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';


export const ModalNotLogin = ({ showModal, handleClose }) => (
    <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Alerta</Modal.Title>
        </Modal.Header>
        <Modal.Body>Por favor, primero debe iniciar sesión</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Cerrar
            </Button>
        </Modal.Footer>
    </Modal>
);


