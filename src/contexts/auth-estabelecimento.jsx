import React, { useState, useContext, createContext, useEffect } from 'react';

import api from '../services/api';
import GeralContext from './geral';

const AuthContext = createContext();

export const AuthEstabelecimentoProvider = ({ children }) => {
    const [estabelecimento, setEstabelecimento] = useState(null);
    const { setTipoUsuario } = useContext(GeralContext);

    useEffect(() => {
        function loadStoragedData() {
            const storagedEstabelecimento = localStorage.getItem('@TBAuth:estabelecimento');
            const storagedToken = localStorage.getItem('@TBAuth:token');

            if (storagedEstabelecimento && storagedToken) {
                setEstabelecimento(JSON.parse(storagedEstabelecimento));
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
            localStorage.setItem('@TBAuth:tipoUsuario', 'estabelecimento');

            return response;
        } catch (err) {
            return err.response;
        }
    }

    function signOut() {
        localStorage.clear();
        setTipoUsuario(null);
        setEstabelecimento(null);
    }

    return (
        <AuthContext.Provider value={{ signedEstabelecimento: !!estabelecimento, estabelecimento, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext;