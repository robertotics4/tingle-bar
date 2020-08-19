import React from 'react';

import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import Menu from '../../components/Menu';
import ListaFuncionarios from './ListaFuncionarios';

export default function GerenciarFuncionarios() {
    return (
        <div className="hold-transition sidebar-mini">
            <div className="wrapper">
                <Header />
                <Menu />
                <ListaFuncionarios />
                <Footer />
            </div>
        </div>
    );
}
