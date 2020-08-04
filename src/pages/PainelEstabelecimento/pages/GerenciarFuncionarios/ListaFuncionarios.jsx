import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';

import AuthEstabelecimentoContext from '../../../../contexts/auth-estabelecimento';

import api from '../../../../services/api';

export default function ListaFuncionarios() {
    const [funcionarios, setFuncionarios] = useState([]);
    const [tiposFuncionario, setTiposFuncionario] = useState([]);
    const { estabelecimento } = useContext(AuthEstabelecimentoContext);

    useEffect(() => {
        getTiposFuncionario();
    }, []);

    useEffect(() => {
        getFuncionarios();
    }, [estabelecimento]);

    async function getFuncionarios () {
        try {
            const response = await api.get('/Funcionario?idEstabelecimento=' + estabelecimento.id_Estabelecimento);
            setFuncionarios(response.data);
            return response.data;
        } catch (err) {
            return err.response;
        }
    }

    async function getTiposFuncionario() {
        try {
            const response = await api.get('/tipofuncionario');
            setTiposFuncionario(response.data);
            return response.data;
        } catch (err) {
            return err.response;
        }
    }

    async function getUsuario(cpf) {
        try {
            const response = await api.get('/usuario/GetByCpf?Cpf=' + cpf);
            return response.data;
        } catch (err) {
            return err.response;
        }
    }

    async function cadastrarFuncionario(idUsuario, idTipoFuncionario) {
        const payload = {
            "id_usuario": idUsuario,
            "id_estabelecimento": estabelecimento.id_Estabelecimento,
            "id_tipofuncionario": idTipoFuncionario
        }

        // try {
        //     const response = await api.post('/Funcionario', payload);

        //     if (response.status === 201 || response.status === 200) {
        //         Swal.fire('Sucesso!', 'Funcionário cadastrado com sucesso!', 'success')
        //     }

        // } catch (err) {
        //     console.log({ err });
        //     if (err.response.status === 401 || err.response.status === 400) {
        //         Swal.fire('Erro!', 'Falha ao cadastrar o funcionário', 'error')
        //     }
        // }
    }

    async function handleCadastrar() {
        Swal.mixin({
            input: 'text',
            confirmButtonText: 'Pesquisar',
            showCancelButton: true,
            progressSteps: ['1'],
            inputValidator: value => {
                return new Promise(resolve => {
                    if (value) {
                        resolve()
                    } else {
                        resolve('CPF inválido');
                    }
                });
            }
        }).queue([
            {
                title: 'Pesquisar Usuário',
                text: 'Digite o CPF'
            }
        ]).then(async result => {
            if (result.value) {
                try {
                    const cpf = (result.value[0])
                    const pesquisaUsuario = await getUsuario(cpf);

                    if (pesquisaUsuario.cpf) {
                        const { value } = Swal.fire({
                            title: 'Cadastrar Funcionário',
                            html: `Nome: ${pesquisaUsuario.nome}
                                    <pre>cpf: ${pesquisaUsuario.cpf}</pre>`,
                            input: 'select',
                            inputOptions: tiposFuncionario.map(item => item.descricao),
                            inputPlaceholder: 'Selecione a função',
                            confirmButtonText: 'Cadastrar',
                            showCancelButton: true,
                            inputValidator: (value) => {
                                return new Promise((resolve) => {
                                    if (value)
                                        resolve()
                                    else
                                        resolve('Você precisa selecionar uma função');
                                });
                            }
                        }).then(result => {
                            const idTipoFuncionario = tiposFuncionario[result.value].id;
                            cadastrarFuncionario(pesquisaUsuario.id, idTipoFuncionario);
                        });
                    } else {
                        Swal.fire('CPF não localizado', 'Tente novamente', 'error');
                    }
                } catch (err) {
                    Swal.fire('CPF não localizado', 'Tente novamente', 'error');
                }
            }
        });
    }

    return (
        <div className="content-wrapper">

            {/* Content Header (Page header) */}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Tela principal</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Principal</li>
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
                                                <button className="btn btn-success btn-sm" onClick={handleCadastrar}>
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



                </div>
            </section>
            {/* /.content */}

        </div>
    );
}
