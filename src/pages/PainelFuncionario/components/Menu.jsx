import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import AuthFuncionarioContext from '../../../contexts/auth-funcionario';

import '../../../styles/Menu.css';
import logo from '../../../assets/logo.svg';

import api from '../../../services/api';
import ListaMenu from './ListaMenu';

export default function Menu() {
    const [funcionario, setFuncionario] = useState(null);
    const [estabelecimento, setEstabelecimento] = useState(null);
    const [tiposFuncionario, setTiposFuncionario] = useState([]);
    const [tipoFuncionario, setTipoFuncionario] = useState(null);
    const { signOut } = useContext(AuthFuncionarioContext);

    const history = useHistory();

    useEffect(() => {
        async function loadStoragedData() {
            const storagedFuncionario = localStorage.getItem('@TBAuth:funcionario');
            const storagedEstabelecimento = localStorage.getItem('@TBAuth:estabelecimento');

            if (storagedFuncionario && storagedEstabelecimento) {
                setFuncionario(JSON.parse(storagedFuncionario));
                setEstabelecimento(JSON.parse(storagedEstabelecimento));
            }
        }

        loadStoragedData();
        getTiposFuncionario();
    }, []);

    useEffect(() => {
        getTiposFuncionario();
    }, [funcionario]);

    async function getTiposFuncionario() {
        try {
            const response = await api.get('/tipofuncionario');
            const tipos = response.data;

            setTiposFuncionario([...tipos]);

            tipos.forEach(tipo => {
                if (tipo.id === estabelecimento.iD_TIPOFUNCIONARIO) {
                    setTipoFuncionario(tipo);
                }
            });

            return response.data;
        } catch (err) {
            return err.response;
        }
    }

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
                        {funcionario && tipoFuncionario ?
                            <>
                                <a role="button" className="d-block"><strong>{funcionario.nome.toUpperCase()}</strong></a>
                                <a role="button" className="d-block"><strong>Tipo: {tipoFuncionario.descricao.toUpperCase()}</strong></a>
                                <a role="button" className="d-block"><strong>CPF: {funcionario.cpf}</strong></a>
                            </>
                            : null
                        }
                    </div>
                </div>
                {/* Sidebar Menu */}
                <nav className="mt-2">

                    <ListaMenu 
                        handleLogout={handleLogout}
                        tipoFuncionario={tipoFuncionario}
                    />

                </nav>
                {/* /.sidebar-menu */}
            </div>
            {/* /.sidebar */}
        </aside>
    );
}
