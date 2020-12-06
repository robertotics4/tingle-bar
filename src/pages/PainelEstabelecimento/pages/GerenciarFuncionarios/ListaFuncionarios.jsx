import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';

import GeralContext from '../../../../contexts/geral';

import api from '../../../../services/api';
import Loading from '../../../../components/Loading';
import { cpfMask } from '../../../../utils/masks';

export default function ListaFuncionarios() {
    const [funcionarios, setFuncionarios] = useState([]);
    const [estabelecimento, setEstabelecimento] = useState([]);
    const [tiposFuncionario, setTiposFuncionario] = useState([]);
    const { isLoadingVisible } = useContext(GeralContext);

    useEffect(() => {
        async function loadStoragedData() {
            const storagedEstabelecimento = localStorage.getItem('@TBAuth:estabelecimento');

            if (storagedEstabelecimento) {
                setEstabelecimento(JSON.parse(storagedEstabelecimento));
            }
        }

        loadStoragedData();
        getTiposFuncionario();
    }, []);

    useEffect(() => {
        getFuncionarios();
    }, [estabelecimento]);

    async function getFuncionarios() {
        if (estabelecimento) {
            try {
                const response = await api.get('/Funcionario?idEstabelecimento=' + estabelecimento.id_Estabelecimento);
                setFuncionarios(response.data);
                return response.data;
            } catch (err) {
                return err.response;
            }
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

        try {
            const response = await api.post('/Funcionario', payload);

            if (response.status === 201 || response.status === 200) {
                console.log(response.status)
                Swal.fire('Sucesso!', 'Funcionário cadastrado com sucesso!', 'success');
                getFuncionarios();
            }

        } catch (err) {
            if (err.response.status === 401 || err.response.status === 400) {
                Swal.fire('Erro!', 'Falha ao cadastrar o funcionário', 'error')
            }
            if (err.response.status === 406 ) {
                Swal.fire('Informação!', 'Funcionário já cadastrado no estabelecimento', 'warning')
            }
        }
    }

    async function handleCadastrar() {
        Swal.mixin({
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
                input: 'text',
                inputPlaceholder: 'Digite o CPF',
                onOpen: () => {
                    const input = Swal.getInput();
                    input.oninput = (event) => {
                        event.target.value = cpfMask(event.target.value);
                    }
                }
            }
        ]).then(async result => {
            if (result.value) {
                try {
                    const cpf = (result.value[0])
                    const pesquisaUsuario = await getUsuario(cpf);

                    if (pesquisaUsuario.cpf) {
                        Swal.fire({
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
                            if (result.value) {
                                const idTipoFuncionario = tiposFuncionario[result.value].id;
                                cadastrarFuncionario(pesquisaUsuario.id, idTipoFuncionario);
                            }
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

    async function deletarFuncionario(item) {
        Swal.fire({
            title: 'Deseja deletar o funcionário?',
            text: "Após deletar não será possivel recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Deletar'
        }).then(async result => {
            if (result.value) {
                try {
                    const response = await api.delete('/Funcionario/' + item.id_funcionario);

                    if (response.status === 201 || response.status === 200) {
                        Swal.fire('Sucesso!', 'Funcionário deletado com sucesso!', 'success');
                        getFuncionarios();
                    }
                } catch (err) {
                    Swal.fire('Erro!', 'Falha ao deletar o funcionário', 'error');
                }
            }
        })
    }

    return (
        <div className="content-wrapper">

            {/* Content Header (Page header) */}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Funcionários</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="/painelEstabelecimento">Home</a></li>
                                <li className="breadcrumb-item active">Funcionários</li>
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
                                <button className="btn btn-success btn-sm" onClick={handleCadastrar}>
                                    <i className="fas fa-user-plus mr-2"></i>
                                                    Novo funcionário
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

                                    {funcionarios.map((item, index) => {
                                        return <tr key={item.id_funcionario}>
                                            <td name="idFuncionario">{item.id_funcionario}</td>
                                            <td>
                                                <span>{item.nome}</span>
                                                <br />
                                                {/* <small>Created 01.01.2019</small> */}
                                            </td>
                                            <td>
                                                <span>{item.descricao}</span>
                                            </td>

                                            <td className="project-actions text-right">
                                                <button className="btn btn-danger btn-sm ml-3" onClick={() => deletarFuncionario(item)}>
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
            {isLoadingVisible ? <Loading shoModal={isLoadingVisible} /> : null}

        </div>
    );
}
