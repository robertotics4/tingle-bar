import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import Login from '../pages/Login/Login';
import Main from '../pages/Main/Main';

const PagesRoot = () => (
    <Router>
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" component={Main} exact />
        </Switch>
    </Router>
);

export default PagesRoot;