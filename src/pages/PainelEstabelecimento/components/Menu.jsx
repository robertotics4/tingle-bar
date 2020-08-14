import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import AuthEstabelecimentoContext from '../../../contexts/auth-estabelecimento';

import '../../../styles/Menu.css';
import logo from '../../../assets/logo.png';

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

    return (
        <aside className="menu-content main-sidebar sidebar-dark-primary elevation-4">
            {/* Brand Logo */}
            <a href="#" className="brand-link logo">
                <img src={logo} alt="Equatorial Logo" className="img-logo" style={{ opacity: '.8' }} />
            </a>
            {/* Sidebar */}
            <div className="sidebar">
                {/* Sidebar user panel (optional) */}
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="info">
                        {estabelecimento ?
                            <>
                                <a href="#" className="d-block"><strong>{estabelecimento.nome.toUpperCase()}</strong></a>
                                <a href="#" className="d-block"><strong>CNPJ: {estabelecimento.cnpj}</strong></a>
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
