import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

const PainelFuncionario = () => (
    <h1>Painel Funcionário</h1>
);

const FuncionarioRoutes = () => (
    <Router>
        <Switch>
            <Route path="/painel-funcionario" component={PainelFuncionario} />
        </Switch>
    </Router>
);

export default FuncionarioRoutes;