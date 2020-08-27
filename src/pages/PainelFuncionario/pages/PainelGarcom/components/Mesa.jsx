import React from 'react';

import '../styles/Mesa.css';

export default function Mesa(props) {
    return (
        <div className="card card-mesa" style={{ width: '18rem' }}>
            <div className="card-body">
                <h5 className="card-title"><strong>{props.conta.desc_mesa.toUpperCase()}</strong></h5>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <i className="fas fa-id-badge mr-2 icone-mesa"></i>
                    <span className="card-text">Atendente: {props.conta.garcom}</span>
                </li>
                <li className="list-group-item">
                    <i className="fas fa-smile mr-2 icone-mesa"></i>
                    <span className="card-text">Cliente: {props.conta.usuarios[0].nome_usuario}</span>
                </li>
                <li className="list-group-item">
                    <i className="fas fa-file-invoice-dollar mr-2 icone-mesa"></i>
                    <span className="card-text">Valor atual: R% 00,00</span>
                </li>
            </ul>

        </div>


    );
}
