import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';

import AuthEstabelecimentoContext from '../../../../contexts/auth-estabelecimento';
import GeralContext from '../../../../contexts/geral';

import api from '../../../../services/api';
import ModalCardCardapio from './ModalCadCardapio';

export default function ListaFuncionarios() {
    const { estabelecimento } = useContext(AuthEstabelecimentoContext);
    const [isModalVisible, setModalVisible] = useState(false);


    useEffect(() => {

    }, []);

    useEffect(() => {
    }, [estabelecimento]);

    async function handleCadastrar() {
        setModalVisible(true);
    }

    return (
        <div className="content-wrapper">

            {/* Content Header (Page header) */}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Cardápio</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Cardápio</li>
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
                            <h3 className="card-title">Lista de itens do Cardápio</h3>
                            <div className="card-tools">
                                <button className="btn btn-success btn-sm" onClick={handleCadastrar}>
                                    <i className="fas fa-user-plus mr-2"></i>
                                                    Novo
                                </button>
                            </div>
                        </div>
                        <div className="card-body p-0">
                            <table className="table table-striped projects">
                                <thead>
                                    <tr>
                                        <th style={{ width: '5%' }}>
                                            ID
                                        </th>
                                        <th style={{ width: '20%' }}>
                                            Título
                                        </th>
                                        <th style={{ width: '15%' }}>
                                            Categoria
                                        </th>
                                        <th style={{ width: '30%' }}>
                                            Descrição
                                        </th>
                                        <th style={{ width: '10%' }}>
                                            Valor
                                        </th>
                                        <th style={{ width: '20%' }}></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>01</td>
                                        <td><a>Nome do item</a></td>
                                        <td><a>Categoria do item</a></td>
                                        <td><a>Descrição do item</a></td>
                                        <td><a>R$ 0.00</a></td>
                                        <td className="project-actions text-right">
                                            <button className="btn btn-primary btn-sm ml-3">
                                                <i className="fas fa-eye mr-2"></i>
                                                    Visualizar
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
            {isModalVisible ? <ModalCardCardapio /> : null}

        </div>
    );
}
