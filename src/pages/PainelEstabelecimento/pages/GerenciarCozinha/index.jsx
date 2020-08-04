import React from 'react';

import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import Menu from '../../components/Menu';
import CozinhaContent from './components/CozinhaContent';

export default function GerenciarCozinha() {
    return (
        <div>
            <Header />
            <Menu />
            <CozinhaContent />
            <Footer />
        </div>
    );
}
