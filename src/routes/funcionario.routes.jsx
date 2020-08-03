import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import PainelFuncionario from '../pages/PainelFuncionario';

const FuncionarioRoutes = () => (
    <Router>
        <Switch>
            <Route path="/painel-funcionario" component={PainelFuncionario} />
        </Switch>
    </Router>
);

export default FuncionarioRoutes;