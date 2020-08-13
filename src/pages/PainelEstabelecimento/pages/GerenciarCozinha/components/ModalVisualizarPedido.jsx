import React from 'react';
import { Modal, Image } from 'react-bootstrap';

import '../styles/ModalVisualizarPedido.css';

const baseURL = 'http://52.45.128.89';

export default function ModalVisualizarPedido(props) {
    const dateFormater = new Intl.DateTimeFormat('pt-BR');
    const handleClose = () => props.setShowModal(false);

    return (
        <>
            <Modal
                show={props.showModal}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <div className="card-body">
                        <div className="content-item">
                            <Image className="img-item" src={baseURL + props.item.item_imagem} fluid />
                            <h4 className="mt-3"><strong>{props.item.titulo}</strong></h4>
                            <p className="texto-item">{props.item.descricao}</p>
                            <p className="texto-item">Categoria: {props.item.categoria}</p>
                            <p className="texto-item">Quantidade: {props.item.item_qtd}</p>
                            <p className="texto-item">Prazo máximo para entrega: {props.item.item_prev_max}</p>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={handleClose}>Fechar</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}