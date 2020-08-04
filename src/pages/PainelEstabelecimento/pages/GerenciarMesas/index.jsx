import React from 'react';

import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import Menu from '../../components/Menu';
import ListaMesas from './ListaMesas';

export default function GerenciarMesas() {
    return (
        <div>
            <Header />
            <Menu />
            <ListaMesas />
            <Footer />
        </div>
    );
}
