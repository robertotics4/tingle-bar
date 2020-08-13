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
        <div className="row">
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
                                        <td>{item.item_prev_max}</td>
                                        <td><a className="text-muted"><i className="fas fa-eye" onClick={() => handleVisualizar(item)}></i></a></td>
                                    </tr>

                                })}

                            </tbody>
                        </table>

                        <div className="d-flex flex-row justify-content-end">
                            <button className="btn btn-success btn-finalizar col-sm-12 col-md-3 col-lg-3">
                                <i className="fas fa-check-circle"></i><span className="ml-2">FINALIZAR PEDIDO</span>
                            </button>
                        </div>
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
