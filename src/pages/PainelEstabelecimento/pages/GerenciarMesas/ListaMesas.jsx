import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import QRCode from 'qrcode';

import api from '../../../../services/api';

export default function ListaMesas() {
    const [estabelecimento, setEstabelecimento] = useState(null);
    const [funcionarios, setFuncionarios] = useState([]);
    const [mesas, setMesas] = useState([]);

    useEffect(() => {
        async function loadStoragedData() {
            const storagedEstabelecimento = localStorage.getItem('@TBAuth:estabelecimento');

            if (storagedEstabelecimento) {
                setEstabelecimento(JSON.parse(storagedEstabelecimento));
            }
        }
        loadStoragedData();
        getMesas();
        getFuncionarios();
    }, []);

    useEffect(() => {
        getMesas();
        getFuncionarios();
    }, [estabelecimento]);

    async function getMesas() {
        try {
            const response = await api.get('/Mesa?idEstabelecimento=' + estabelecimento.id_Estabelecimento);
            setMesas(response.data);
        } catch (err) {
            return err.response;
        }
    }

    async function getFuncionarios() {
        try {
            const response = await api.get('/Funcionario?idEstabelecimento=' + estabelecimento.id_Estabelecimento);
            setFuncionarios(response.data);
            return response.data;
        } catch (err) {
            return err.response;
        }
    }



    async function deletarMesas(item) {
        Swal.fire({
            html: `<h3>Deseja excluir a mesa <strong>${item.descricao}</strong>?</h3>`,
            text: "Após deletar não será possivel recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Deletar'
        }).then(async result => {
            if (result.value) {
                try {
                    if (item.id_funcionario_mesa !== null) {

                        const response = await api.delete('/FuncionarioMesa/' + item.id_funcionario_mesa);

                        if (response.status === 201 || response.status === 200) {
                            const response = await api.delete('/mesa/' + item.id);

                            if (response.status === 201 || response.status === 200) {
                                Swal.fire('Sucesso!', 'Mesa deletada com sucesso!', 'success');
                                getMesas();
                            }
                        }

                    }
                    else {
                        const response = await api.delete('/mesa/' + item.id);

                        if (response.status === 201 || response.status === 200) {
                            Swal.fire('Sucesso!', 'Mesa deletada com sucesso!', 'success');
                            getMesas();
                        }
                    }


                } catch (err) {
                    if (err.response.status === 401 || err.response.status === 400) {
                        Swal.fire('Erro!', 'Falha ao deletar a mesa', 'error');
                    }
                }
            }
        })
    }

    async function alterarMesas(item) {

        Swal.mixin({
            input: 'text',
            confirmButtonText: 'Próximo',
            showCancelButton: true,
            progressSteps: ['1', '2']
        }).queue([
            {
                title: 'Descrição da mesa',
                text: 'Informe a descrição da mesa',
                inputPlaceholder: 'Descrição',
                inputValue: item.descricao,
                inputValidator: value => {
                    if (!value) {
                        return 'Favor digitar a Descrição da mesa!'
                    }
                },
            },
            {
                title: 'Vincular funcionário',
                text: 'Vincule um funcionário à mesa',
                input: 'select',
                inputPlaceholder: item.nome_funcionario,
                confirmButtonText: 'Confirmar',
                inputOptions: configSelect().map(funcionario => funcionario.nome)
            },
        ]).then(async result => {
            if (result.value) {
                let idFuncionario = undefined;

                if (Number(result.value[1]) !== 0) {
                    idFuncionario = funcionarios[result.value[1] - 1].id_funcionario;
                } else {
                    idFuncionario = null
                }

                if (item.id_funcionario_mesa !== null && item.fk_Id_funcionario !== idFuncionario) {
                    await api.delete('/FuncionarioMesa/' + item.id_funcionario_mesa);
                }

                const payloadCadastraFuncionario = {
                    "fk_Id_funcionario": idFuncionario !== 0 ? idFuncionario : '',
                    "fk_Id_mesa": item.id
                }

                const payload = {
                    "id": item.id,
                    "Descricao": result.value[0],
                    "fk_id_estabelecimento": estabelecimento.id_Estabelecimento
                }
                try {
                    const response = await api.put('/Mesa', payload);

                    if (response.status === 201 || response.status === 200) {
                        if (Number(result.value[1]) !== 0 && item.fk_Id_funcionario !== idFuncionario) {
                            const response = await api.post('/FuncionarioMesa', payloadCadastraFuncionario);
                            if (response.status === 201 || response.status === 200) {
                                Swal.fire('Sucesso!', 'Mesa alterada com sucesso!', 'success');
                                getMesas();
                            }
                        } else {
                            Swal.fire('Sucesso!', 'Mesa alterada com sucesso!', 'success');
                            getMesas();
                        }

                    }
                } catch (err) {
                    if (err.response.status === 401 || err.response.status === 400) {
                        Swal.fire('Erro!', 'Falha ao alterar mesa', 'error');
                    }
                }
            }
        })
    }

    function configSelect() {
        let lista = [];

        lista.push({
            "id_funcionario": 0,
            "cpf": "",
            "nome": "----------------------",
            "sobrenome": null,
            "telefone": null,
            "imagem": "",
            "id_tipo_funcionario": 0,
            "descricao": ""
        });

        funcionarios.forEach(funcionario => {
            lista.push(funcionario);
        });

        return lista;
    }

    async function cadastrarMesas() {
        Swal.mixin({
            input: 'text',
            confirmButtonText: 'Próximo',
            showCancelButton: true,
            progressSteps: ['1', '2']
        }).queue([
            {
                title: 'Descrição da mesa',
                text: 'Informe a descrição da mesa',
                inputPlaceholder: 'Descrição',
                inputValidator: value => {
                    if (!value) {
                        return 'Favor digitar a Descrição da mesa!'
                    }
                },
            },
            {
                title: 'Vincular funcionário',
                text: 'Vincule um funcionário à mesa',
                input: 'select',
                inputPlaceholder: 'Selecione',
                confirmButtonText: 'Confirmar',
                inputOptions: configSelect().map(funcionario => funcionario.nome),
                inputValidator: (value) => {
                    return new Promise((resolve) => {
                        if (value)
                            resolve()
                        else
                            resolve('Você precisa selecionar uma opção');
                    });
                }
            },
        ]).then(async result => {
            if (result.value) {
                let idFuncionario = undefined;

                if (Number(result.value[1]) !== 0) {
                    idFuncionario = funcionarios[result.value[1] - 1].id_funcionario;
                }

                const payload = {
                    "Descricao": result.value[0],
                    "fk_id_estabelecimento": estabelecimento.id_Estabelecimento,
                    "fk_id_funcionario": idFuncionario !== 0 ? idFuncionario : ''
                }
                try {
                    const response = await api.post('/Mesa', payload);

                    if (response.status === 201 || response.status === 200) {
                        Swal.fire('Sucesso!', 'Mesa cadastrada com sucesso!', 'success');
                        getMesas();
                    }
                } catch (err) {
                    if (err.response.status === 401 || err.response.status === 400) {
                        Swal.fire('Erro!', 'Falha ao cadastrar mesa', 'error');
                    }
                }
            }
        })
    }

    const generateQR = async item => {
        const text = JSON.stringify({ "idMesa": item.id, "idUsuario": 0, "publico": 0, "flagAbrirConta": "X" });
        let qrCode = null;

        try {
            qrCode = await QRCode.toDataURL(text);

            Swal.fire({
                title: `QRCode - Mesa ${item.id}`,
                text: 'QRCode gerado para abertura de conta',
                imageUrl: qrCode,
                imageAlt: 'QRCode',
            });
        } catch (err) {
            Swal.fire('Erro!', 'Falha ao cadastrar mesagerar o QRCode', 'error');
        }
    }

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
                                <li className="breadcrumb-item"><a href="/painelEstabelecimento">Home</a></li>
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
                            <h3 className="card-title">Lista de Mesas</h3>
                            <div className="card-tools">
                                <button className="btn btn-success btn-sm" onClick={cadastrarMesas}>
                                    <i className="fas fa-table mr-2"></i>
                                                    Nova Mesa
                                </button>
                            </div>
                        </div>
                        <div className="card-body p-0">
                            <table className="table table-striped projects">
                                <thead>
                                    <tr>
                                        <th style={{ width: '10%' }}>ID</th>
                                        <th style={{ width: '30%' }}>Nome</th>
                                        <th style={{ width: '30%' }}>Funcionário</th>
                                        <th style={{ width: '40%' }}></th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {mesas.map((item, index) => {
                                        return <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.descricao}</td>
                                            <td>{item.nome_funcionario}</td>

                                            <td className="project-actions text-right">
                                                <button className="btn btn-secondary btn-sm ml-3" onClick={() => generateQR(item)}>
                                                    <i className="fas fa-qrcode mr-2"></i>
                                                    QRCode
                                                </button>
                                                <button className="btn btn-info btn-sm ml-3" onClick={() => alterarMesas(item)}>
                                                    <i className="fas fa-pencil-alt mr-2"></i>
                                                    Editar
                                                </button>
                                                <button className="btn btn-danger btn-sm ml-3" onClick={() => deletarMesas(item)}>
                                                    <i className="fas fa-trash mr-2"></i>
                                                    Deletar
                                                </button>

                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}