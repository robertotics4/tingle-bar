import React from 'react';

import AuthEstabelecimentoContext from './../../contexts/auth-estabelecimento';

import Header from '../../components/Header';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';
import PainelContent from './PainelContent';

export default function Painel() {
    return (
        <div>
            <Header />
            <Menu />
            <PainelContent />
            <Footer />
        </div>
    );
}
