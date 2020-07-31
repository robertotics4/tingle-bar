import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import Principal from './Principal';
import Painel from './Painel/Painel';

const PagesRoot = () => (
    <Router>
        <Switch>
            <Route path="/" component={Principal} />
        </Switch>
    </Router>
);

export default PagesRoot;