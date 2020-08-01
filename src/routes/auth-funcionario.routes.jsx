import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import Principal from './../pages/Principal';
import LoginFuncionario from './../pages/LoginFuncionario';

const AuthFuncionarioRoutes = () => (
    <Router>
        <Switch>
            <Route path="/" component={Principal} exact />
            <Route path="/loginFuncionario" component={LoginFuncionario} />
        </Switch>
    </Router>
);

export default AuthFuncionarioRoutes;