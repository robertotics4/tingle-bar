import React from 'react';

export default function ListaMenu(props) {

    function configMenu() {
        let component = null;

        if(props.tipoFuncionario) {
            switch (props.tipoFuncionario.descricao) {
                case 'Garçom':
                    component = (
                        <li className="nav-item">
                            <a href="/painelGarcom" className="nav-link active">
                                <i className="fas fa-concierge-bell nav-icon" />
                                <p>Mesas</p>
                            </a>
                        </li>
                    );
                    break;
                case 'Cozinheiro':
                    component = (
                        <li className="nav-item">
                            <a href="/painelCozinheiro" className="nav-link">
                                <i className="fas fa-utensils nav-icon"></i>
                                <p>Cozinha</p>
                            </a>
                        </li>
                    );
                    break;
                case 'Gerente':
                    component = (
                        <li className="nav-item">
                            <a href="/painelGerente" className="nav-link">
                                <i className="fas fa-user-cog nav-icon" />
                                <p>Gerente</p>
                            </a>
                        </li>
                    );
                    break;
            }
        }

        return component;
    }

    return (
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <li className="nav-item has-treeview menu-open">
                <ul className="nav nav-treeview">

                    {configMenu()}

                </ul>
            </li>

            <li className="nav-item">
                <a onClick={props.handleLogout} className="nav-link">

                    <svg className="nav-icon bi bi-power" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M5.578 4.437a5 5 0 1 0 4.922.044l.5-.866a6 6 0 1 1-5.908-.053l.486.875z" />
                        <path fillRule="evenodd" d="M7.5 8V1h1v7h-1z" />
                    </svg>

                    <p className="text" color="red">Sair</p>
                </a>
            </li>
        </ul>
    );
}
