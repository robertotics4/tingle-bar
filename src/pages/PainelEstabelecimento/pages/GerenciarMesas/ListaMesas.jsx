import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import api from '../../../../services/api';

export default function ListaMesas() {
    const [estabelecimento, setEstabelecimento] = useState(null);
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
    }, []);

    useEffect(() => {
        getMesas();
    }, [estabelecimento]);

    async function getMesas() {
        try {
            const response = await api.get('/Mesa?idEstabelecimento=' + estabelecimento.id_Estabelecimento);
            setMesas(response.data);
        } catch (err) {
            return err.response;
        }
    }

    async function alterarMesas(item) {
        const { value } = Swal.fire({
            title: 'Digite a descrição da mesa',
            input: 'text',
            inputPlaceholder: 'Descrição da mesa',
            inputValidator: (value) => {
                if (!value) {
                    return 'Favor digitar a Descrição da mesa!'
                }
            },
            showCancelButton: true
        }).then(async result => {
            if (result.value) {
                const payload = {
                    "id": item.id,
                    "Descricao": result.value,
                    "fk_id_estabelecimento": estabelecimento.id_Estabelecimento
                }
                try {
                    const response = await api.put('/Mesa', payload)
                    if (response.status === 201 || response.status === 200) {
                        Swal.fire('Sucesso!', 'Mesa alterada com sucesso!', 'success')
                        getMesas();
                    }
                } catch (err) {
                    if (err.response.status === 401 || err.response.status === 400) {
                        Swal.fire('Erro!', 'Falha ao alterar mesa', 'error')
                    }
                }
            }
        })
    }

    async function cadastrarMesas() {
        const { value } = Swal.fire({
            title: 'Digite a descrição da mesa',
            input: 'text',
            inputPlaceholder: 'Descrição da mesa',
            inputValidator: (value) => {
                if (!value) {
                    return 'Favor digitar a Descrição da mesa!'
                }
            },
            showCancelButton: true
        }).then(async result => {
            if (result.value) {
                const payload = {
                    "Descricao": result.value,
                    "fk_id_estabelecimento": estabelecimento.id_Estabelecimento
                }
                try {
                    const response = await api.post('/Mesa', payload);

                    if (response.status === 201 || response.status === 200) {
                        Swal.fire('Sucesso!', 'Mesa cadastrada com sucesso!', 'success')
                        getMesas();
                    }
                } catch (err) {
                    if (err.response.status === 401 || err.response.status === 400) {
                        Swal.fire('Erro!', 'Falha ao cadastrar mesa', 'error')
                    }
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
                            <h3 className="card-title">Lista de Mesas</h3>
                            <div className="card-tools">
                                <button className="btn btn-success btn-sm" onClick={cadastrarMesas}>
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
                                    </tr>
                                </thead>

                                <tbody>

                                    {mesas.map((item, index) => {
                                        return <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.descricao}</td>

                                            <td className="project-actions text-right">

                                                <button className="btn btn-info btn-sm ml-3" onClick={() => alterarMesas(item)}>
                                                    <i className="fas fa-pencil-alt mr-2"></i>
                                                    Editar
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