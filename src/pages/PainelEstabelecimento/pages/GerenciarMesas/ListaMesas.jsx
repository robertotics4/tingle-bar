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



                    <div className="card card-info">
                        <div className="card-header">
                            <h3 className="card-title">Lista de Mesas</h3>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                                    <i className="fas fa-minus" /></button>
                            </div>
                        </div>
                        <div className="card-body p-0">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Número</th>
                                        <th>Status</th>
                                        <th />
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Functional-requirements.docx</td>
                                        <td>49.8005 kb</td>
                                        <td className="text-right py-0 align-middle">
                                            <div className="btn-group btn-group-sm">
                                                <a href="#" className="btn btn-info"><i className="fas fa-eye" /></a>
                                                <a href="#" className="btn btn-danger"><i className="fas fa-trash" /></a>
                                            </div>
                                        </td>
                                    </tr><tr>
                                        <td>UAT.pdf</td>
                                        <td>28.4883 kb</td>
                                        <td className="text-right py-0 align-middle">
                                            <div className="btn-group btn-group-sm">
                                                <a href="#" className="btn btn-info"><i className="fas fa-eye" /></a>
                                                <a href="#" className="btn btn-danger"><i className="fas fa-trash" /></a>
                                            </div>
                                        </td>
                                    </tr><tr>
                                        <td>Email-from-flatbal.mln</td>
                                        <td>57.9003 kb</td>
                                        <td className="text-right py-0 align-middle">
                                            <div className="btn-group btn-group-sm">
                                                <a href="#" className="btn btn-info"><i className="fas fa-eye" /></a>
                                                <a href="#" className="btn btn-danger"><i className="fas fa-trash" /></a>
                                            </div>
                                        </td>
                                    </tr><tr>
                                        <td>Logo.png</td>
                                        <td>50.5190 kb</td>
                                        <td className="text-right py-0 align-middle">
                                            <div className="btn-group btn-group-sm">
                                                <a href="#" className="btn btn-info"><i className="fas fa-eye" /></a>
                                                <a href="#" className="btn btn-danger"><i className="fas fa-trash" /></a>
                                            </div>
                                        </td>
                                    </tr><tr>
                                        <td>Contract-10_12_2014.docx</td>
                                        <td>44.9715 kb</td>
                                        <td className="text-right py-0 align-middle">
                                            <div className="btn-group btn-group-sm">
                                                <a href="#" className="btn btn-info"><i className="fas fa-eye" /></a>
                                                <a href="#" className="btn btn-danger"><i className="fas fa-trash" /></a>
                                            </div>
                                        </td>
                                    </tr></tbody>
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
