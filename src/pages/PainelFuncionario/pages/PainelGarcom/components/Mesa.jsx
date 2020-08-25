import React from 'react';

import '../styles/Mesa.css';

export default function Mesa(props) {
    return (
        <div className="card-mesa">
            <div className="cabecalho-mesa">
                <h4>{props.conta.desc_mesa}</h4>
            </div>

            <div className="content-mesa">
                <div>
                    <i className="fas fa-id-badge mr-2"></i>
                    <span>Atendente: {props.conta.garcom}</span>
                </div>
                <div>
                    <i className="fas fa-smile mr-2"></i>
                    <span>Cliente: {props.conta.usuarios[0].nome_usuario}</span>
                </div>
                <div>
                    <i className="fas fa-file-invoice-dollar mr-2"></i>
                    <span>Valor atual: R% 00,00</span>
                </div>
            </div>

        </div>
    );
}
