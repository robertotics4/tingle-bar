import React, { useState, createContext, useEffect } from 'react';

import api from '../services/api';
import Loading from '../components/Loading';

const AuthContext = createContext();

export const AuthEstabelecimentoProvider = ({ children }) => {
    const [estabelecimento, setEstabelecimento] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        function loadStoragedData() {
            const storagedEstabelecimento = localStorage.getItem('@TBAuth:estabelecimento');
            const storagedToken = localStorage.getItem('@TBAuth:token');

            if (storagedEstabelecimento && storagedToken) {
                setEstabelecimento(JSON.parse(storagedEstabelecimento));
                setLoading(false);
            }
        }

        loadStoragedData();
    }, []);

    async function signIn(credentials) {
        try {
            const payload = {
                "Cnpj": credentials.cnpj,
                "Senha": credentials.senha
            }

            const response = await api.post('/api/loginestabelecimento', payload);

            const { accessToken } = response.data;
            delete response.data.accessToken;

            setEstabelecimento(response.data);
            localStorage.setItem('@TBAuth:estabelecimento', JSON.stringify(response.data));
            localStorage.setItem('@TBAuth:token', accessToken);

            return response;
        } catch (err) {
            return err.response;
        }
    }

    function signOut() {
        localStorage.clear();
        setEstabelecimento(null);
    }

    return (
        <AuthContext.Provider value={{ signed: !!estabelecimento, estabelecimento, signIn, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext;