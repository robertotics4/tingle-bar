import React, { useContext } from 'react';

import GeralContext from '../contexts/geral';
import AuthEstabelecimentoContext from '../contexts/auth-estabelecimento';
import AuthFuncionarioContext from '../contexts/auth-funcionario';

import AuthFuncionarioRoutes from './auth-funcionario.routes';
import AuthEstabelecimentoRoutes from './auth-estabelecimento.routes';

import EstabelecimentoRoutes from './estabelecimento.routes';
import FuncionarioRoutes from './funcionario.routes';

const Routes = () => {
    const { tipoUsuario } = useContext(GeralContext);
    const { signedEstabelecimento } = useContext(AuthEstabelecimentoContext);
    const { signedFuncionario } = useContext(AuthFuncionarioContext);

    if (tipoUsuario === 'estabelecimento')
        return signedEstabelecimento ? <EstabelecimentoRoutes /> : <AuthEstabelecimentoRoutes />

    return signedFuncionario ? <FuncionarioRoutes /> : <AuthFuncionarioRoutes />
};

export default Routes;