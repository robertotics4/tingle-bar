import React from 'react';

import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import Menu from '../../components/Menu';
import ListaPromocoes from './ListaPromocoes';

export default function GerenciarPromocoes() {
    return (
        <div>
            <Header />
            <Menu />
            <ListaPromocoes />
            <Footer />
        </div>
    );
}
