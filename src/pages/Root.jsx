import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import Principal from './Principal';
import LoginEstabelecimento from './LoginEstabelecimento';

const PagesRoot = () => (
    <Router>
        <Switch>
            <Route path="/" component={Principal} exact />
            <Route path="/loginEstabelecimento" component={LoginEstabelecimento} />
        </Switch>
    </Router>
);

export default PagesRoot;