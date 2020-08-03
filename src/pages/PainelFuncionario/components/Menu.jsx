import React, { useContext } from 'react';
import {useHistory} from 'react-router-dom';

import AuthEstabelecimentoContext from '../../../contexts/auth-estabelecimento';

import '../../../styles/Menu.css';
import logo from '../../../assets/logo.png';

export default function Menu() {
    const { signOut } = useContext(AuthEstabelecimentoContext);
    const history = useHistory();

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
                        <a href="#" className="d-block">Usuário: <strong>{}</strong></a>
                        <a href="#" className="d-block">Matrícula: <strong>{}</strong></a>
                    </div>
                </div>
                {/* Sidebar Menu */}
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li className="nav-item has-treeview menu-open">
                            <ul className="nav nav-treeview">

                                <li className="nav-item">
                                    <a href="#" className="nav-link active">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Mesas</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Cardápio</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Funcionários</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Promoções</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Cozinha</p>
                                    </a>
                                </li>

                                <li className="nav-item has-treeview">
                                    <a href="#" className="nav-link">
                                        <i className="nav-icon far fa-plus-square" />
                                        <p>
                                            Mesas
                                <i className="fas fa-angle-left right" />
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <a href="pages/examples/login.html" className="nav-link">
                                                <i className="far fa-circle nav-icon" />
                                                <p>Cadastro de mesas</p>
                                            </a>
                                        </li>
                                    </ul>
                                </li>


                            </ul>
                        </li>

                        <li className="nav-item">
                            <a onClick={handleLogout} className="nav-link">

                                <svg className="nav-icon bi bi-power" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M5.578 4.437a5 5 0 1 0 4.922.044l.5-.866a6 6 0 1 1-5.908-.053l.486.875z" />
                                    <path fillRule="evenodd" d="M7.5 8V1h1v7h-1z" />
                                </svg>

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
