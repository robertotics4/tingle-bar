import React from 'react';

import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import Menu from '../../components/Menu';
import ListaCardapio from './ListaCardapio';

export default function GerenciarCardapio() {
    return (
        <div>
            <Header />
            <Menu />
            <ListaCardapio />
            <Footer />
        </div>
    );
}
