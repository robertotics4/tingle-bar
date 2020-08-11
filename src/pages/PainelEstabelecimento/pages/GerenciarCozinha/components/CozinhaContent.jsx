import React from 'react';

import Pedido from './Pedido';

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
                    <Pedido />
                    <Pedido />
                    <Pedido />
                    <Pedido />
                    <Pedido />


                </div>
            </section>
            {/* /.content */}
        </div>
    );
}
