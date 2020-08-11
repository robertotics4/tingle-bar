import React from 'react';

import Pedido from './Pedido';

const listaPedidos = [
    {
        numeroPedido: 1,
        mesa: 1,
        atendente: 'Roberto',
        itens: [
            {
                produto: 'Batata frita',
                quantidade: null,
                porcao: 'grande'
            },
            {
                produto: 'Refri',
                quantidade: 1,
                porcao: 'lata'
            },
        ],
        tempoEspera: 15
    },
    {
        numeroPedido: 2,
        mesa: 1,
        atendente: 'Pedro',
        itens: [
            {
                produto: 'Batata frita',
                quantidade: null,
                porcao: 'grande'
            },
            {
                produto: 'Refri',
                quantidade: 1,
                porcao: 'lata'
            },
        ],
        tempoEspera: 15
    },
    {
        numeroPedido: 3,
        mesa: 1,
        atendente: 'Roberto',
        itens: [
            {
                produto: 'Batata frita',
                quantidade: null,
                porcao: 'grande'
            },
            {
                produto: 'Refri',
                quantidade: 1,
                porcao: 'lata'
            },
        ],
        tempoEspera: 15
    },
    {
        numeroPedido: 4,
        mesa: 1,
        atendente: 'Humberto',
        itens: [
            {
                produto: 'Batata frita',
                quantidade: null,
                porcao: 'grande'
            },
            {
                produto: 'Refri',
                quantidade: 1,
                porcao: 'lata'
            },
        ],
        tempoEspera: 15
    },
];

export default function CozinhaContent() {
    return (
        <div className="content-wrapper">

            {/* Content Header (Page header) */}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Monitor de Preparo</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Cozinha</a></li>
                                <li className="breadcrumb-item active">Monitor de preparo</li>
                            </ol>
                        </div>
                    </div>
                </div>{/* /.container-fluid */}
            </section>

            {/* Main content */}
            <section className="content">
                <div className="container-fluid">

                    <Pedido />

                </div>
            </section>
            {/* /.content */}
        </div>
    );
}
