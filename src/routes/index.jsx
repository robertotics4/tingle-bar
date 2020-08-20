import React, { useContext } from 'react';

import GeralContext from '../contexts/geral';
import AuthEstabelecimentoContext from '../contexts/auth-estabelecimento';
import AuthFuncionarioContext from '../contexts/auth-funcionario';

import AppRoutes from './app.routes';

const Routes = () => {
    // const { tipoUsuario } = useContext(GeralContext);
    // const { signedEstabelecimento } = useContext(AuthEstabelecimentoContext);
    // const { signedFuncionario, estabelecimento } = useContext(AuthFuncionarioContext);

    // if (!tipoUsuario)
    //     return <AppRoutes />;
    // else {
    //     if (tipoUsuario === 'estabelecimento')
    //         return signedEstabelecimento ? <EstabelecimentoRoutes /> : <AuthEstabelecimentoRoutes />;

    //     return signedFuncionario && estabelecimento ? <FuncionarioRoutes /> : <AuthFuncionarioRoutes />
    // }

    return <AppRoutes />
};

export default Routes;