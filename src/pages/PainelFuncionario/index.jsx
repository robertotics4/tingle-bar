import React from 'react';

import Header from '../../components/Header';
import Menu from './components/Menu';
import Footer from '../../components/Footer'
import Content from './components/Content';

export default function PainelFuncionario() {
    return (
        <div>
            <Header />
            <Menu />
            <Content />
            <Footer />
        </div>
    );
}
