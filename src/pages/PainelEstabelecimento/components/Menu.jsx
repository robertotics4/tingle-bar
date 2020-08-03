import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AuthEstabelecimentoContext from '../../../contexts/auth-estabelecimento';

import '../../../styles/Menu.css';
import logo from '../../../assets/logo.png';

export default function Menu() {
    const { signOut, estabelecimento } = useContext(AuthEstabelecimentoContext);
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
                        <a href="#" className="d-block"><strong>{estabelecimento.nome.toUpperCase()}</strong></a>
                        <a href="#" className="d-block">CNPJ: <strong>{estabelecimento.cnpj}</strong></a>
                    </div>
                </div>
                {/* Sidebar Menu */}
                <nav className="mt-2">

                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li className="nav-item has-treeview">
                            <a href="#" className="nav-link">
                                <i className="fas fa-users nav-icon"></i>
                                <p>
                                    Funcionários
                            <i className="fas fa-angle-left right" />
                                </p>
                            </a>
                            <ul className="nav nav-treeview" style={{ display: 'none' }}>
                                <li className="nav-item">
                                    <a href="../mailbox/mailbox.html" className="nav-link">
                                        <i class="fas fa-user-plus nav-icon"></i>
                                        <p>Cadastrar funcionário</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="../mailbox/compose.html" className="nav-link">
                                        <i class="fas fa-list nav-icon"></i>
                                        <p>Gerenciar funcionários</p>
                                    </a>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <a onClick={handleLogout} className="nav-link">
                                <i class="fas fa-sign-out-alt nav-icon"></i>
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
