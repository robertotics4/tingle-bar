import React, { useEffect, useState } from 'react';

import '../styles/Mesa.css';

export default function Mesa(props) {
    const [pedidosAbertos, setPedidosAbertos] = useState(0);
    const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

    useEffect(() => {
        getPedidosAbertos();
    }, []);

    function getPedidosAbertos() {
        let contador = 0;

        props.conta.usuarios.map(usuario => {
            usuario.pedidos.map(pedido => {
                pedido.itens.map(item => {
                    if (item.item_status === 'Solicitado') {
                        contador += 1;
                    }
                });
            });
        });

        setPedidosAbertos(contador);
    }

    return (
        <div className="card card-mesa" style={{ width: '18rem' }}>
            <div className="card-body p-3">
                <div className="cabecalho-mesa">
                    <h5 className="card-title mr-2"><strong>{props.conta.desc_mesa.toUpperCase()}</strong></h5>
                    <h4><span className="badge badge-danger">{pedidosAbertos}</span></h4>
                </div>

            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <div className="txt-comprimido">
                        <i className="fas fa-id-badge mr-2 icone-mesa"></i>
                        <span className="card-text">Atendente: {props.conta.garcom}</span>
                    </div>
                </li>
                <li className="list-group-item">
                    <div className="txt-comprimido">
                        <i className="fas fa-smile mr-2 icone-mesa"></i>
                        <span className="card-text">Cliente: {props.conta.usuarios[0].nome_usuario}</span>
                    </div>
                </li>
                <li className="list-group-item">
                    <i className="fas fa-file-invoice-dollar mr-2 icone-mesa"></i>
                    <span className="card-text">Valor atual: {currencyFormatter.format(props.conta.valor_total_conta)}</span>
                </li>
            </ul>

            <button type="button" className="btn-fechar" onClick={props.onClick}>
                <i className="fas fa-dollar-sign mr-2"></i>
                Fechar conta
            </button>

        </div>
    );
}
