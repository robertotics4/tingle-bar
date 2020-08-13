import React from 'react';

import '../styles/Pedido.css';

export default function Pedido(props) {
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
                    {/* /.card-header */}
                    {/* <div className="card-body">
                        <table className="table">
                            <thead className="tabela-cabecalho">
                                <tr>
                                    <th scope="col">Qtd</th>
                                    <th scope="col">Produto</th>
                                    <th scope="col">Categoria</th>
                                    <th scope="col">Previsão</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody className="tabela-corpo">
                                {props.pedido.itens.map((item, index) => {
                                    return <tr key={index}>
                                        <th scope="row">{item.item_qtd}</th>
                                        <td>{item.titulo}</td>
                                        <td>{item.categoria}</td>
                                        <td>{item.item_prev_max}</td>
                                        <td><button className="btn btn-light btn-sm btn-block"><i className="fas fa-eye"></i><span className="ml-2">Detalhes</span></button></td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                        <div className="mt-3">
                            <button className="btn btn-success btn-block">
                                <i className="fas fa-check-circle"></i>
                                <span className="ml-2">FINALIZAR PEDIDO</span>
                            </button>
                        </div>
                    </div> */}
                    {/* /.card-body */}



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
                                        <td><a className="text-muted"><i className="fas fa-eye" onClick={() => {alert('ahay')}}></i></a></td>
                                    </tr>
                       
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>
                {/* /.card */}
            </div>

        </div>
    );
}
