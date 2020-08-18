import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import api from '../../../../services/api';
import Loading from '../../../../components/Loading';

import ModalCadPromocoes from './ModalCadPromocoes';

export default function ListaPromocoes() {
    const [showModal, setShowModal] = useState(false);
    const [estabelecimento, setEstabelecimento] = useState(null);
    const [promocoes, setPromocoes] = useState([]);
    const [isLoadingVisible, setLoadingVisible] = useState(false);

    useEffect(() => {
        async function loadStoragedData() {
            const storagedEstabelecimento = localStorage.getItem('@TBAuth:estabelecimento');

            if (storagedEstabelecimento) {
                setEstabelecimento(JSON.parse(storagedEstabelecimento));
            }
        }
        loadStoragedData();
        getPromocoes();
    }, []);

    useEffect(() => {
        getPromocoes();
    }, [estabelecimento]);

    async function getPromocoes() {
        try {
            const response = await api.get('/promocoes?qtdLista=10&idestabelecimento=1');
            setPromocoes(response.data.promocoes);

        } catch (err) {
            return err.response;
        }
    }

    function handleCadastrar() {
        setShowModal(true);
    }

    // async function deletarMesas(item) {
    //     Swal.fire({
    //         html: `<h3>Deseja excluir a mesa <strong>${item.descricao}</strong>?</h3>`,
    //         text: "Após deletar não será possivel recuperar!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#d33',
    //         cancelButtonColor: '#3085d6',
    //         confirmButtonText: 'Deletar'
    //     }).then(async result => {
    //         if (result.value) {
    //             try {
    //                 const response = await api.delete('/mesa/' + item.id);

    //                 if (response.status === 201 || response.status === 200) {
    //                     Swal.fire('Sucesso!', 'Mesa deletada com sucesso!', 'success');
    //                     getMesas();
    //                 }
    //             } catch (err) {
    //                 if (err.response.status === 401 || err.response.status === 400) {
    //                     Swal.fire('Erro!', 'Falha ao deletar a mesa', 'error');
    //                 }
    //             }
    //         }
    //     })
    // }

    return (
        <div className="content-wrapper">

            {/* Content Header (Page header) */}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Promoções</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Promoções</li>
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
                            <h3 className="card-title">Lista de Promoções</h3>
                            <div className="card-tools">
                                <button className="btn btn-success btn-sm" onClick={handleCadastrar}>
                                    <i className="fas fa-percentage mr-2"></i>
                                                    Nova promoção
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
                                        <th style={{ width: '30%' }}>
                                            Nome
                                        </th>
                                        <th style={{ width: '10%' }}>
                                            Validade
                                        </th>
                                        <th style={{ width: '20%' }}>
                                            Quantidade de Itens
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {promocoes.map((item, index) => {
                                        return <tr key={item.id_promocao}>
                                            <td>{item.id_promocao}</td>
                                            <td>{item.descricao}</td>
                                            <td>{item.validade}</td>
                                            <td>{item.itens.length}</td>

                                            <td className="project-actions text-right">
                                                <button className="btn btn-secondary btn-sm ml-3" onClick={() => { }}>
                                                    <i className="fas fa-qrcode mr-2"></i>
                                                        QRCode
                                                    </button>
                                                <button className="btn btn-info btn-sm ml-3" onClick={() => { }}>
                                                    <i className="fas fa-pencil-alt mr-2"></i>
                                                        Editar
                                                    </button>
                                                <button className="btn btn-danger btn-sm ml-3" onClick={() => { }}>
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

            {showModal
                ? <ModalCadPromocoes
                    idEstabelecimento={estabelecimento.id_Estabelecimento}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    atualizarItens={getPromocoes}
                    setLoadingVisible={setLoadingVisible}
                />
                : null
            }

            {isLoadingVisible ? <Loading showModal={isLoadingVisible} /> : null}
        </div>
    );
}
