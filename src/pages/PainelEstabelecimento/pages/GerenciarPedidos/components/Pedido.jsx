import React, { useState } from 'react';

import '../styles/Pedido.css';

import ModalVisualizarPedido from './ModalVisualizarPedido';

export default function Pedido(props) {
    const [showModalVisualizar, setModalVisualizar] = useState(false);
    const [itemSelecionado, setItemSelecionado] = useState(null);

    function handleVisualizar(item) {
        setItemSelecionado(item);
        setModalVisualizar(true);
    }

    return (
        <div className="row mb-3">
            <div className="col-sm-12">
                <div className="card card-default">
                    <div className="card-header">
                        <div className="info-header">
                            <div className="text-header">PEDIDO: <i>{props.pedido.pedido_id}</i></div>
                            <div className="text-header">MESA: <i>{props.conta.desc_mesa.toUpperCase()}</i></div>
                            <div className="text-header">GARÇOM: <i>{props.conta.garcom.toUpperCase()}</i></div>
                            <div className="text-header">USUÁRIO: <i>{props.usuario.nome_usuario}</i></div>
                            <div className="text-header">HORÁRIO: <i>{props.pedido.pedido_datahora}</i></div>
                        </div>
                    </div>

                    <div className="card-body table-responsive p-0">
                        <table className="table table-striped table-valign-middle">
                            <thead>
                                <tr>
                                    <th>Qtd</th>
                                    <th>Produto</th>
                                    <th>Categoria</th>
                                    <th>Status</th>
                                    <th>Previsão</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>

                                {props.pedido.itens.map((item, index) => {
                                    return <tr key={index}>
                                        <th scope="row">{item.item_qtd}</th>
                                        <td>{item.titulo}</td>
                                        <td>{item.categoria}</td>
                                        <td>{item.item_status}</td>
                                        <td>{item.item_prev_max}</td>
                                        <td style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                            <a href="#" className="text-muted">
                                                <i className="fas fa-eye" onClick={() => handleVisualizar(item)}></i>
                                            </a>
                                        </td>
                                    </tr>
                                })}

                            </tbody>
                        </table>

                    </div>
                </div>
            </div>

            {showModalVisualizar
                ? <ModalVisualizarPedido
                    showModal={showModalVisualizar}
                    setShowModal={setModalVisualizar}
                    item={itemSelecionado}
                />
                : null
            }
        </div>
    );
}
