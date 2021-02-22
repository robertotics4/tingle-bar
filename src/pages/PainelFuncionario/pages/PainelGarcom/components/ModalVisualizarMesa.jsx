import React from 'react';
import { Modal } from 'react-bootstrap';
import '../styles/ModalVisualizarMesa.css';
import TabelaItens from './TabelaItens';

export default function ModalVisualizarMesa(props) {
    const handleClose = () => {
        props.atualizarItens();
        props.setShowModal(false);
    } 

    return (
        <>
            <Modal
                show={props.showModal}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title><strong>{props.conta.desc_mesa.toUpperCase()} - CONTA Nº {props.conta.num_conta}</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ padding: '0px' }}>
                    
                    <TabelaItens conta={props.conta} atualizarItens={props.atualizarItens} />

                </Modal.Body>
            </Modal>
        </>
    );
}
