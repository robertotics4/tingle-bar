import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import api from '../../../../services/api';
import ModalCadCardapio from './ModalCadCardapio';
import ModalEditarCardapio from './ModalEditarCardapio';
import ModalVisualizar from './ModalVisualizar';
import Loading from '../../../../components/Loading';

import './styles/ListaCardapio.css';

export default function ListaFuncionarios() {
    const [showModal, setShowModal] = useState(false);
    const [showModalEditar, setShowModalEditar] = useState(false);
    const [showModalVisualizar, setModalVisualizar] = useState(false);
    const [itemSelecionado, setItemSelecionado] = useState(null);
    const [categoriaItem, setCategoriaItem] = useState(null);
    const [estabelecimento, setEstabelecimento] = useState(null);
    const [cardapio, setCardapio] = useState([]);
    const [isLoadingVisible, setLoadingVisible] = useState(false);

    const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

    useEffect(() => {
        async function loadStoragedData() {
            const storagedEstabelecimento = localStorage.getItem('@TBAuth:estabelecimento');

            if (storagedEstabelecimento) {
                setEstabelecimento(JSON.parse(storagedEstabelecimento));
            }
        }

        loadStoragedData();
        getCardapio();
    }, []);

    useEffect(() => {
        getCardapio();
    }, [estabelecimento]);

    async function getCardapio() {
        try {
            const response = await api.get('/Cardapio/' + estabelecimento.id_Estabelecimento);
            setCardapio(response.data);
            return response.data;
        } catch (err) {
            return err.response;
        }
    }

    async function handleCadastrar() {
        setShowModal(true);
    }

    async function handleEditar(item, categoria) {
        setItemSelecionado(item);
        setCategoriaItem(categoria);
        setShowModalEditar(true);
    }

    async function handleVisualizar(item, categoria) {
        setItemSelecionado(item);
        setCategoriaItem(categoria);
        setModalVisualizar(true);
    }

    async function deletarItem(item) {
        Swal.fire({
            title: 'Deseja deletar o item?',
            text: "Após deletar não será possivel recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Deletar'
        }).then(async result => {
            if (result.value) {
                try {
                    const response = await api.delete('/cardapio/' + item.codigo_item);

                    if (response.status === 201 || response.status === 200) {
                        Swal.fire('Sucesso!', 'Item deletado com sucesso!', 'success');
                        getCardapio();
                    }
                } catch (err) {
                    if (err.response.status === 401 || err.response.status === 400) {
                        Swal.fire('Erro!', 'Falha ao deletar o item', 'error');
                    }
                }
            }
        })
    }

    function ItensCardapio() {
        let rows = [];

        if (cardapio) {
            cardapio.forEach(obj => {
                rows.push(obj.itens.map(item => {
                    return <tr key={item.codigo_item}>
                        <td>{item.codigo_item}</td>
                        <td><span>{item.titulo}</span></td>
                        <td><span>{obj.categoria}</span></td>
                        <td><span>{currencyFormatter.format(item.valor)}</span></td>
                        <td className="project-actions text-right container-buttons">
                            <button className="btn btn-secondary btn-sm action-button" onClick={() => handleVisualizar(item, obj.categoria)}>
                                <i className="fas fa-eye mr-2"></i>
                                Visualizar
                            </button>
                            <button className="btn btn-primary btn-sm action-button" onClick={() => handleEditar(item, obj.categoria)}>
                                <i className="fas fa-pencil-alt mr-2"></i>
                                Editar
                            </button>
                            <button className="btn btn-danger btn-sm action-button" onClick={() => deletarItem(item)}>
                                <i className="fas fa-trash mr-2"></i>
                                Deletar
                        </button>
                        </td>
                    </tr>
                }));
            });

            return rows;
        }

        return null;
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
                                <li className="breadcrumb-item"><a href="/painelEstabelecimento">Home</a></li>
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
                                    <i className="fas fa-hamburger mr-2"></i>
                                                    Novo item
                                </button>
                            </div>
                        </div>
                        <div className="card-body p-0">
                            <table className="table table-striped projects">
                                <thead>
                                    <tr>
                                        <th style={{ width: '10%' }}>ID</th>
                                        <th style={{ width: '30%' }}>Título</th>
                                        <th style={{ width: '20%' }}>Categoria</th>
                                        <th style={{ width: '10%' }}>Valor</th>
                                        <th style={{ width: '40%' }}></th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {ItensCardapio()}

                                </tbody>
                            </table>
                        </div>
                        {/* /.card-body */}

                    </div>

                </div>
            </section>

            {showModal
                ? <ModalCadCardapio
                    idEstabelecimento={estabelecimento.id_Estabelecimento}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    atualizarItens={getCardapio}
                    setLoadingVisible={setLoadingVisible}
                />
                : null
            }

            {showModalEditar
                ? <ModalEditarCardapio
                    idEstabelecimento={estabelecimento.id_Estabelecimento}
                    showModal={showModalEditar}
                    setShowModal={setShowModalEditar}
                    atualizarItens={getCardapio}
                    setLoadingVisible={setLoadingVisible}
                    item={itemSelecionado}
                    categoria={categoriaItem}
                />
                : null
            }

            {showModalVisualizar
                ? <ModalVisualizar
                    showModal={showModalVisualizar}
                    setShowModal={setModalVisualizar}
                    item={itemSelecionado}
                />
                : null
            }

            {isLoadingVisible ? <Loading showModal={isLoadingVisible} /> : null}
        </div>
    );
}
