import React, { useEffect } from 'react';
import { Modal, Image } from 'react-bootstrap';

import './styles/ModalVisualizar.css';

const baseURL = 'http://52.45.128.89';

export default function ModalCadCardapio(props) {
    const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    const handleClose = () => props.setShowModal(false);

    console.log(props.item);

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
                            <Image className="img-item" src={baseURL + props.item.imagem} fluid />
                            <h4 className="mt-3"><strong>{props.item.titulo}</strong></h4>
                            <p className="texto-item">{props.item.item}</p>
                            <p className="texto-item">
                                Preparo: {props.item.tempo_estimado_min}{props.item.tempo_estimado_max ? ` a ${props.item.tempo_estimado_max}` : ''} minutos
                            </p>
                            <p className="valor-item">{currencyFormatter.format(props.item.valor)}</p>
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