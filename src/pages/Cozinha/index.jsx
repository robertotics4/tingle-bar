import React from 'react';

import Header from '../../components/Header';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';
import CozinhaContent from './CozinhaContent';

export default function Cozinha() {
    return (
        <div>
            <Header />
            <Menu />
            <CozinhaContent />
            <Footer />
        </div>
    );
}
