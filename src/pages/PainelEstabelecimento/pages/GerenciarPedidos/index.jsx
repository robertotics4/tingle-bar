import React from 'react';

import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import Menu from '../../components/Menu';
import PedidosContent from './components/PedidosContent';

export default function GerenciarCozinha() {
    return (
        <div>
            <Header />
            <Menu />
            <PedidosContent />
            <Footer />
        </div>
    );
}
