import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import Painel from './../pages/Painel/Painel';

const FuncionarioRoutes = () => (
    <Router>
        <Switch>
            <Route path="/painel" component={Painel} />
        </Switch>
    </Router>
);

export default FuncionarioRoutes;