import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import Swal from 'sweetalert2';

import '../../../styles/Menu.css';
import api from '../../../services/api';

import AuthEstabelecimentoContext from '../../../contexts/auth-estabelecimento';

const baseURL = 'https://www.papya.com.br';

export default function Menu() {
    const [estabelecimento, setEstabelecimento] = useState(null);
    const { signOut } = useContext(AuthEstabelecimentoContext);

    const history = useHistory();

    useEffect(() => {
        async function loadStoragedData() {
            const storagedEstabelecimento = localStorage.getItem('@TBAuth:estabelecimento');

            if (storagedEstabelecimento) {
                setEstabelecimento(JSON.parse(storagedEstabelecimento));
            }
        }
        loadStoragedData();
    }, []);

    useEffect(() => { }, [estabelecimento]);

    function handleLogout() {
        signOut();
        history.push('/');
    }

    async function handleSelectImage() {
        const { value: file } = await Swal.fire({
            title: 'Selecione uma imagem',
            imageUrl: baseURL + estabelecimento.imagem,
            imageAlt: 'Imagem do estabelecimento',
            input: 'file',
            inputAttributes: {
                'accept': 'image/png, image/jpeg, image/jpg',
                'aria-label': 'Envie a imagem do estabelecimento'
            },
            inputValidator: value => {
                return new Promise(resolve => {
                    if (value) {
                        resolve()
                    } else {
                        resolve('Você precisa selecionar uma imagem');
                    }
                });
            },
            showCancelButton: true,
            confirmButtonText: 'Salvar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
        });

        if (file) {
            const data = new FormData();

            data.append("idEstabelecimento", estabelecimento.id_Estabelecimento);
            data.append("files", file);

            try {
                const response = await api.post('/ImageEstabelecimento', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.status === 201 || response.status === 200) {
                    console.log(response);

                    const updatedEstabelecimento = {
                        ...estabelecimento,
                        imagem: response.data
                    }

                    setEstabelecimento(updatedEstabelecimento);

                    const reader = new FileReader();

                    reader.onload = (e) => {
                        Swal.fire({
                            title: 'Imagem atualizada com sucesso!',
                            imageUrl: e.target.result,
                            imageAlt: 'imagem atualizada do estabelecimento'
                        });
                    }
                    reader.readAsDataURL(file);
                }
            } catch (err) {
                Swal.fire('Erro!', 'Falha ao cadastrar item', 'error');
            }
        }
    }

    return (
        <aside className="menu-content main-sidebar sidebar-dark-primary elevation-4">
            {/* Brand Logo */}
            <a href="#" className="brand-link logo">
                {estabelecimento ?
                    <>
                        <Image
                            className="img-item"
                            src={baseURL + estabelecimento.imagem}
                            onClick={handleSelectImage}
                            fluid
                        />
                    </>
                    : null
                }
            </a>
            {/* Sidebar */}
            <div className="sidebar">
                {/* Sidebar user panel (optional) */}
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="info">
                        {estabelecimento ?
                            <>
                                <a href="/#" className="d-block"><strong>{estabelecimento.nome.toUpperCase()}</strong></a>
                                <a href="/#" className="d-block"><strong>CNPJ: {estabelecimento.cnpj}</strong></a>
                            </>
                            : null
                        }
                    </div>
                </div>
                {/* Sidebar Menu */}
                <nav className="mt-2">

                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

                        <li className="nav-item">
                            <a href="/gerenciarFuncionarios" className="nav-link">
                                <i className="fas fa-users nav-icon"></i>
                                <p>Funcionários</p>
                            </a>
                        </li>

                        <li className="nav-item">
                            <a href="/gerenciarMesas" className="nav-link">
                                <i className="fas fa-table nav-icon" />
                                <p>Mesas</p>
                            </a>
                        </li>

                        <li className="nav-item">
                            <a href="/gerenciarCardapio" className="nav-link">
                                <i className="fas fa-hamburger nav-icon"></i>
                                <p>Cardápio</p>
                            </a>
                        </li>

                        <li className="nav-item">
                            <a href="/gerenciarPromocoes" className="nav-link">
                                <i className="fas fa-percentage nav-icon"></i>
                                <p>Promoções</p>
                            </a>
                        </li>

                        <li className="nav-item">
                            <a href="/gerenciarCozinha" className="nav-link">
                                <i className="fas fa-utensils nav-icon"></i>
                                <p>Cozinha</p>
                            </a>
                        </li>

                        <li className="nav-item">
                            <a href="/gerenciarPedidos" className="nav-link">
                                <i className="fas fa-tasks nav-icon"></i>
                                <p>Pedidos</p>
                            </a>
                        </li>

                        <li className="nav-item">
                            <a onClick={handleLogout} className="nav-link">
                                <i className="fas fa-sign-out-alt nav-icon"></i>
                                <p className="text" color="red">Sair</p>
                            </a>
                        </li>

                    </ul>
                </nav>
                {/* /.sidebar-menu */}
            </div>
            {/* /.sidebar */}
        </aside>
    );
}
