import React, { useContext } from 'react';

import AuthEstabelecimentoContext from '../contexts/auth-estabelecimento';
import Loading from '../components/Loading';

import EstabelecimentoRoutes from './estabelecimento.routes';
import AuthEstabelecimentoRoutes from './auth-estabelecimento.routes';

const Routes = () => {
    const { signed, loading } = useContext(AuthEstabelecimentoContext);

    if (loading) {
        return <Loading />
    }

    return signed ? <EstabelecimentoRoutes /> : <AuthEstabelecimentoRoutes />
};

export default Routes;