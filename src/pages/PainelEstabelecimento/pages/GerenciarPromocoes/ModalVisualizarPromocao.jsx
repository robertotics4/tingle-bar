import React from 'react';
import { Modal, Image } from 'react-bootstrap';

import './styles/ModalVisualizarPromocao.css';

const baseURL = 'http://52.45.128.89';

export default function ModalVisualizarPromocao(props) {
    const handleClose = () => props.setShowModal(false);
    const dateFormatter = new Intl.DateTimeFormat('pt-BR');

    function getValidade() {
        const dataAtual = new Date();
        const dataValida = dataAtual.setDate(dataAtual.getDate() + props.promocao.validade);
        return dateFormatter.format(dataValida);
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
                <Modal.Body>
                    <div className="card-body">
                        <div className="content-item">
                            <Image className="img-item" src={baseURL + props.promocao.imagem_promocao} fluid />
                            <h4 className="mt-3"><strong>{props.promocao.descricao}</strong></h4>
                            <p className="texto-item">Promoção válida até <strong>{getValidade()}</strong></p>
                            <h4 className="mt-3"><strong>Itens da promoção:</strong></h4>

                            <ul>
                                {props.promocao
                                    ? props.promocao.itens.map(item => {
                                    return <li key={item.codigo_item} className="texto-item">{item.titulo} - {item.qtd_item} itens</li>
                                    })
                                    : null
                                }
                            </ul>

                            <p className="valor-item">Desconto de {props.promocao.desconto * 100} %</p>
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