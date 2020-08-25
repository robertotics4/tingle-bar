import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

import Login from '../pages/Login';

import CadastroEstabelecimento from '../pages/CadastroEstabelecimento';
import PainelEstabelecimento from '../pages/PainelEstabelecimento';
import GerenciarFuncionarios from '../pages/PainelEstabelecimento/pages/GerenciarFuncionarios';
import GerenciarMesas from '../pages/PainelEstabelecimento/pages/GerenciarMesas';
import GerenciarCardapio from '../pages/PainelEstabelecimento/pages/GerenciarCardapio';
import GerenciarPromocoes from '../pages/PainelEstabelecimento/pages/GerenciarPromocoes';
import GerenciarCozinha from '../pages/PainelEstabelecimento/pages/GerenciarCozinha';

import PainelFuncinario from '../pages/PainelFuncionario';
import PainelCozinheiro from '../pages/PainelFuncionario/pages/PainelCozinheiro';
import PainelGerente from '../pages/PainelFuncionario/pages/PainelGerente';

const EstabelecimentoRoute = ({ component: Component, ...rest }) => {
    const storagedToken = localStorage.getItem('@TBAuth:token');
    const storagedTipoUsuario = localStorage.getItem('@TBAuth:tipoUsuario');

    return (
        <Route
            {...rest}
            render={() => storagedToken && storagedTipoUsuario === 'estabelecimento'
                ? <Component {...rest} />
                : <Redirect to="/" />
            }
        />
    );
};

const FuncionarioRoute = ({ component: Component, ...rest }) => {
    const storagedToken = localStorage.getItem('@TBAuth:token');
    const storagedTipoUsuario = localStorage.getItem('@TBAuth:tipoUsuario');

    return (
        <Route
            {...rest}
            render={() => storagedToken && storagedTipoUsuario === 'funcionario'
                ? <Component {...rest} />
                : <Redirect to="/" />
            }
        />
    );
};

const CozinheiroRoute = ({ component: Component, ...rest }) => {
    const storagedToken = localStorage.getItem('@TBAuth:token');
    const storagedTipoUsuario = localStorage.getItem('@TBAuth:tipoUsuario');
    const storagedFuncionario = JSON.parse(localStorage.getItem('@TBAuth:funcionario'));

    return (
        <Route
            {...rest}
            render={() => storagedToken && storagedTipoUsuario === 'funcionario' && storagedFuncionario.listaEstab[0].iD_TIPOFUNCIONARIO === 2
                ? <Component {...rest} />
                : <Redirect to="/" />
            }
        />
    );
};

const GerenteRoute = ({ component: Component, ...rest }) => {
    const storagedToken = localStorage.getItem('@TBAuth:token');
    const storagedTipoUsuario = localStorage.getItem('@TBAuth:tipoUsuario');
    const storagedFuncionario = JSON.parse(localStorage.getItem('@TBAuth:funcionario'));

    console.log(storagedFuncionario)

    return (
        <Route
            {...rest}
            render={() => storagedToken && storagedTipoUsuario === 'funcionario' && storagedFuncionario.listaEstab[0].iD_TIPOFUNCIONARIO === 3
                ? <Component {...rest} />
                : <Redirect to="/" />
            }
        />
    );
};

const AppRoutes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" component={Login} exact />
                <Route path="/cadastroEstabelecimento" component={CadastroEstabelecimento} />
                <EstabelecimentoRoute path="/painelEstabelecimento" component={PainelEstabelecimento} />
                <EstabelecimentoRoute path="/gerenciarFuncionarios" component={GerenciarFuncionarios} />
                <EstabelecimentoRoute path="/gerenciarMesas" component={GerenciarMesas} />
                <EstabelecimentoRoute path="/gerenciarCardapio" component={GerenciarCardapio} />
                <EstabelecimentoRoute path="/gerenciarPromocoes" component={GerenciarPromocoes} />
                <EstabelecimentoRoute path="/gerenciarCozinha" component={GerenciarCozinha} />

                <FuncionarioRoute path="/painelFuncionario" component={PainelFuncinario} />
                <CozinheiroRoute path="/painelCozinheiro" component={PainelCozinheiro} />
                <GerenteRoute path="/painelGerente" component={PainelGerente} />
            </Switch>
        </Router>
    );
};

export default AppRoutes;