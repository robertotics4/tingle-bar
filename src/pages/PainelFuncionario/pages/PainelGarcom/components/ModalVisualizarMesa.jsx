import React from 'react';
import { Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import api from '../../../../../services/api';

import '../styles/ModalVisualizarMesa.css';
import BadgeStatus from './BadgeStatus';

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
                            <td><BadgeStatus status={item.item_status} /></td>
                            <td>{usuario.nome_usuario}</td>
                            <td>{currencyFormatter.format(item.item_VALOR)}</td>
                            <td>
                                {item.item_status === 'Pedido pronto'
                                    ? <button type="button" className="btn btn-success" onClick={() => handleEntregar(item)}>
                                        <i className="fas fa-check"></i>
                                    </button>
                                    : null
                                }
                            </td>
                        </tr>
                    );
                });
            });
        });

        return lista;
    }

    async function handleEntregar(item) {
        Swal.fire({
            title: 'Deseja entregar o item?',
            text: "O item será entregue",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Entregar'
        }).then(async result => {
            if (result.value) {
                try {
                    const payload = {
                        "id": item.item_id,
                        "fk_status_id": 5
                    }

                    const response = await api.post('/PedidoItem', payload);

                    if (response.status === 201 || response.status === 200) {
                        props.atualizarItens();
                        Swal.fire('Sucesso!', 'Pedido entregue com sucesso!', 'success');
                    }
                } catch (err) {
                    Swal.fire('Erro!', 'Falha ao entregar item', 'error');
                }
            }
        });
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
                                    <th>Status</th>
                                    <th>Cliente</th>
                                    <th>Valor Unit.</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {listarItens()}
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
