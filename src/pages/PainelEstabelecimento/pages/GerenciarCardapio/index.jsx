import React from 'react';

import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import Menu from '../../components/Menu';
import ListaCardapio from './ListaCardapio';

export default function GerenciarCardapio() {
    return (
        <div className="hold-transition sidebar-mini">
            <div className="wrapper">
                <Header />
                <Menu />
                <ListaCardapio />
                <Footer />
            </div>
        </div>
    );
}
