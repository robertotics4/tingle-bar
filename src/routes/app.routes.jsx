import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

import LoginEstabelecimento from '../pages/LoginEstabelecimento';
import CadastroEstabelecimento from '../pages/CadastroEstabelecimento';
import PainelEstabelecimento from '../pages/PainelEstabelecimento';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const storagedToken = localStorage.getItem('@TBAuth:token');

    return (
        <Route
            {...rest}
            render={() => storagedToken
                ? <Component {...rest} />
                : <Redirect to="/" />}
        />
    );
};


const AppRoutes = () => (
    <Router>
        <Switch>
            <Route path="/" component={LoginEstabelecimento} exact />
            <Route path="/cadastroEstabelecimento" component={CadastroEstabelecimento} />
            <PrivateRoute path="/painelEstabelecimento" component={PainelEstabelecimento} />
        </Switch>
    </Router>
);

export default AppRoutes;