import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import Principal from './../pages/Principal';
import LoginEstabelecimento from './../pages/LoginEstabelecimento';

const AuthEstabelecimentoRoutes = () => (
    <Router>
        <Switch>
            <Route path="/" component={Principal} exact />
            <Route path="/loginEstabelecimento" component={LoginEstabelecimento} />
        </Switch>
    </Router>
);

export default AuthEstabelecimentoRoutes;