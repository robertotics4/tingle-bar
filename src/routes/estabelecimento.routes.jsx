import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

const PainelEstabelecimento = () => (
    <h1>Painel Funcionário</h1>
);

const EstabelecimentoRoutes = () => (
    <Router>
        <Switch>
            <Route path="/" component={PainelEstabelecimento} />
        </Switch>
    </Router>
);

export default EstabelecimentoRoutes;