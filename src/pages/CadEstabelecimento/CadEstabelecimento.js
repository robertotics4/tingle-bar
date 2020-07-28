import React from 'react';

import Header from '../../components/Header';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';
import CadEstabelecimentoContent from './CadEstabelecimentoContent';

export default function CadEstabelecimento() {
    return (
        <div>
            <Header />
            <Menu />
            <CadEstabelecimentoContent />
            <Footer />
        </div>
    );
}
