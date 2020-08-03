import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import Principal from './../pages/Principal';

const AppRoutes = () => (
    <Router>
        <Switch>
            <Route path="/" component={Principal} />
        </Switch>
    </Router>
);

export default AppRoutes;