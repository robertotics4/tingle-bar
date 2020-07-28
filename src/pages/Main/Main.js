import React from 'react';

import Header from '../../components/Header';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';
import MainContent from './MainContent';

export default function Main() {
    return (
        <div>
            <Header />
            <Menu />
            <MainContent />
            <Footer />
        </div>
    );
}
