import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

import PainelEstabelecimento from '../pages/PainelEstabelecimento';

const EstabelecimentoRoutes = () => (
    <Router>
        <Switch>
            <Route path="/" component={PainelEstabelecimento} />
            <Route path="/painel-estabelecimento" component={PainelEstabelecimento} />
        </Switch>
    </Router>
);

export default EstabelecimentoRoutes;