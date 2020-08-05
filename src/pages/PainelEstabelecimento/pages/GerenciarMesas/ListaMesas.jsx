import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';

import AuthEstabelecimentoContext from '../../../../contexts/auth-estabelecimento';
import GeralContext from '../../../../contexts/geral';

import api from '../../../../services/api';
import Loading from '../../../../components/Loading';

export default function ListaFuncionarios() {
    const { estabelecimento } = useContext(AuthEstabelecimentoContext);
    const { isLoadingVisible, setLoadingVisible } = useContext(GeralContext);

    return (
        <div className="content-wrapper">

            {/* Content Header (Page header) */}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Mesas</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Mesas</li>
                            </ol>
                        </div>
                    </div>
                </div>{/* /.container-fluid */}
            </section>

            {/* Main content */}
            <section className="content">
                <div className="container-fluid">




                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Lista de funcionários</h3>
                            <div className="card-tools">
                                <button className="btn btn-success btn-sm">
                                    <i className="fas fa-user-plus mr-2"></i>
                                                    Novo
                                </button>
                            </div>
                        </div>
                        <div className="card-body p-0">
                            <table className="table table-striped projects">
                                <thead>
                                    <tr>
                                        <th style={{ width: '10%' }}>
                                            ID
                                        </th>
                                        <th style={{ width: '40%' }}>
                                            Nome
                                        </th>
                                        <th style={{ width: '20%' }}>
                                            Tipo
                                        </th>
                                        <th style={{ width: '30%' }}>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>
                                            <a>Mesa 01</a>
                                            <br />
                                            {/* <small>Created 01.01.2019</small> */}
                                        </td>
                                        <td>
                                            <a>Mesa redondaa nova</a>
                                        </td>

                                        <td className="project-actions text-right">
                                            <button className="btn btn-primary btn-sm ml-3">
                                                <i className="fas fa-eye mr-2"></i>
                                                    Visualizar
                                                </button>
                                            <button className="btn btn-info btn-sm ml-3">
                                                <i className="fas fa-pencil-alt mr-2"></i>
                                                    Editar
                                                </button>
                                            <button className="btn btn-danger btn-sm ml-3">
                                                <i className="fas fa-trash mr-2"></i>
                                                    Deletar
                                                </button>
                                        </td>
                                    </tr>



                                </tbody>
                            </table>
                        </div>
                        {/* /.card-body */}

                    </div>




                </div>
            </section>
            {/* /.content */}
            {isLoadingVisible ? <Loading /> : null}

        </div>
    );
}
