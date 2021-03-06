import React from 'react';

import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import Menu from '../../components/Menu';
import GerenteContent from './components/GerenteContent';

export default function GerenciarCozinha() {
    return (
        <div>
            <Header />
            <Menu />
            <GerenteContent />
            <Footer />
        </div>
    );
}
