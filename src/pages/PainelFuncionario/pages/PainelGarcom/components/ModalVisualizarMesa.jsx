import React from 'react';
import { Modal } from 'react-bootstrap';

import '../styles/ModalVisualizarMesa.css';

export default function ModalVisualizarMesa(props) {
    const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    const handleClose = () => props.setShowModal(false);

    function listarItens() {
        const usuarios = props.conta.usuarios;
        let lista = [];

        usuarios.map(usuario => {
            usuario.pedidos.map(pedido => {
                pedido.itens.map(item => {
                    lista.push(
                        <tr key={item.item_id}>
                            <td>{item.item_qtd}</td>
                            <td>{item.titulo}</td>
                            <td>{usuario.nome_usuario}</td>
                            <td>{currencyFormatter.format(item.item_VALOR)}</td>
                            <td>{currencyFormatter.format(item.item_qtd * item.item_VALOR)}</td>
                        </tr>
                    );
                });
            });
            if (usuarios.length > 1) {
                lista.push(
                    <tr className="table-danger text-right" key={usuario.id_usuario_conta}>
                        <td colSpan="5"><strong>SUBTOTAL: {currencyFormatter.format(usuario.valor_conta_usuario)}</strong></td>
                    </tr>
                );
            }
        });

        return lista;
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
                    <div className="table-responsive p-0">
                        <table className="table table-striped table-valign-middle">
                            <thead>
                                <tr>
                                    <th>Qtd</th>
                                    <th>Produto</th>
                                    <th>Cliente</th>
                                    <th>Valor Unit.</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listarItens()}
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>

                <Modal.Footer className="footer-content">
                    <div>
                        <span className="texto-total">TOTAL A PAGAR: {currencyFormatter.format(props.conta.valor_total_conta)}</span>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}