import React from 'react';

import '../styles/Pedido.css';

export default function Pedido() {
    return (
        <div className="row">
            <div className="col-sm-12">
                <div className="card card-default">
                    <div className="card-header">
                        <h5 className="text-center">
                            <strong>PEDIDO Nº 1234 | MESA 1</strong>
                        </h5>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Qtd</th>
                                    <th scope="col">Produto</th>
                                    <th scope="col">Horário</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Hot-dog tradicional</td>
                                    <td>20:54:33</td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Suco de maracujá</td>
                                    <td>20:54:33</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="pedido-acoes mt-3">
                            <button className="btn btn-secondary col-sm-12 col-md-6 btn-imprimir">
                                <i className="fas fa-print"></i>
                                <span className="ml-2">IMPRIMIR PARA COZINHA</span>
                            </button>
                            <button className="btn btn-success col-sm-12 col-md-6 btn-finalizar">
                                <i className="fas fa-check-circle"></i>
                                <span className="ml-2">FINALIZAR PEDIDO</span>
                            </button>
                        </div>
                    </div>
                    {/* /.card-body */}
                </div>
                {/* /.card */}
            </div>

        </div>
    );
}
