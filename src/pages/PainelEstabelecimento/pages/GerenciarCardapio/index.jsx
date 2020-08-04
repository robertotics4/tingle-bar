import React from 'react';

import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import Menu from '../../components/Menu';
import Content from '../../components/Content';

export default function GerenciarCardapio() {
    return (
        <div>
            <Header />
            <Menu />
            <Content />
            <Footer />
        </div>
    );
}
