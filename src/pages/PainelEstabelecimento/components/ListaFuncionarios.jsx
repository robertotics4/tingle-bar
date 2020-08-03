import React, { useState, useEffect } from 'react';

import api from '../../../services/api';

export default function ListaFuncionarios() {
    const [funcionarios, setFuncionarios] = useState([]);

    useEffect(() => {
        getFuncionarios();
    }, []);

    async function getFuncionarios() {
        try {
            const response = await api.get('/Funcionario?idEstabelecimento=13');
            setFuncionarios(response.data);
            return response.data;
        } catch (err) {
            return err.response;
        }
    }

    return (
        <div className="card">
            <div className="card-header">
                <h3 className="card-title">Lista de funcionários</h3>
                <div className="card-tools">
                    <button type="button" className="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                        <i className="fas fa-minus" /></button>
                    <button type="button" className="btn btn-tool" data-card-widget="remove" data-toggle="tooltip" title="Remove">
                        <i className="fas fa-times" /></button>
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

                        {funcionarios.map((item, index) => {
                            return <tr key={item.id_funcionario}>
                                <td>{item.id_funcionario}</td>
                                <td>
                                    <a>{item.nome}</a>
                                    <br />
                                    {/* <small>Created 01.01.2019</small> */}
                                </td>
                                <td>
                                    <a>{item.descricao}</a>
                                </td>

                                <td className="project-actions text-right">
                                    <button className="btn btn-success btn-sm">
                                        <i className="fas fa-user-plus mr-2"></i>
                                            Novo
                                        </button>
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
                        })}



                    </tbody>
                </table>
            </div>
            {/* /.card-body */}

        </div>
    );
}
