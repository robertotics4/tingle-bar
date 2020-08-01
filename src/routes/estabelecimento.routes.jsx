import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import Painel from './../pages/Painel/Painel';

const EstabelecimentoRoutes = () => {
    console.log('PAINEL ESTABELECIMENTO');

    return <Router>
        <Switch>
            <Route path="/painel-estabelecimento" component={<h1>Painel estabelecimento</h1>} />
        </Switch>
    </Router>
};

export default EstabelecimentoRoutes;