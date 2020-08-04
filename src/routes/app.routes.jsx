import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import LoginEstabelecimento from '../pages/LoginEstabelecimento';
import CadastroEstabelecimento from '../pages/CadastroEstabelecimento';
import PainelEstabelecimento from '../pages/PainelEstabelecimento';

const AppRoutes = () => (
    <Router>
        <Switch>
            <Route path="/" component={LoginEstabelecimento} exact />
            <Route path="/cadastroEstabelecimento" component={CadastroEstabelecimento} />
            <Route path="/painelEstabelecimento" component={PainelEstabelecimento} />
        </Switch>
    </Router>
);

export default AppRoutes;