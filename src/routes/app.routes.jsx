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
import GerenciarFuncionarios from '../pages/PainelEstabelecimento/pages/GerenciarFuncionarios';
import GerenciarMesas from '../pages/PainelEstabelecimento/pages/GerenciarMesas';
import GerenciarCardapio from '../pages/PainelEstabelecimento/pages/GerenciarCardapio';
import GerenciarPromocoes from '../pages/PainelEstabelecimento/pages/GerenciarPromocoes';
import GerenciarCozinha from '../pages/PainelEstabelecimento/pages/GerenciarCozinha';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const storagedToken = localStorage.getItem('@TBAuth:token');

    return (
        <Route
            {...rest}
            render={() => storagedToken
                ? <Component {...rest} />
                : <Redirect to="/" />
            }
        />
    );
};

const AppRoutes = () => (
    <Router>
        <Switch>
            <Route path="/" component={LoginEstabelecimento} exact />
            <Route path="/cadastroEstabelecimento" component={CadastroEstabelecimento} />
            <PrivateRoute path="/painelEstabelecimento" component={PainelEstabelecimento} />
            <PrivateRoute path="/gerenciarFuncionarios" component={GerenciarFuncionarios} />
            <PrivateRoute path="/gerenciarMesas" component={GerenciarMesas} />
            <PrivateRoute path="/gerenciarCardapio" component={GerenciarCardapio} />
            <PrivateRoute path="/gerenciarPromocoes" component={GerenciarPromocoes} />
            <PrivateRoute path="/gerenciarCozinha" component={GerenciarCozinha} />
        </Switch>
    </Router>
);

export default AppRoutes;