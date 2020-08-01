import React, { useState, createContext, useEffect } from 'react';

import api from '../services/api';

const AuthContext = createContext();

export const AuthFuncionarioProvider = ({ children }) => {
    const [funcionario, setFuncionario] = useState(null);

    useEffect(() => {
        function loadStoragedData() {
            const storagedFuncionario = localStorage.getItem('@TBAuth:funcionario');
            const storagedToken = localStorage.getItem('@TBAuth:token');

            if (storagedFuncionario && storagedToken) {
                setFuncionario(JSON.parse(storagedFuncionario));
            }
        }

        loadStoragedData();
    }, []);

    async function signIn(credentials) {
        try {
            const payload = {
                "Telefone": credentials.telefone,
                "Senha": credentials.senha
            }

            const response = await api.post('/api/loginfuncionario', payload);

            const { accessToken } = response.data;
            delete response.data.accessToken;

            setFuncionario(response.data);
            localStorage.setItem('@TBAuth:funcionario', JSON.stringify(response.data));
            localStorage.setItem('@TBAuth:token', accessToken);

            return response;
        } catch (err) {
            return err.response;
        }
    }

    function signOut() {
        localStorage.clear();
        setFuncionario(null);
    }

    return (
        <AuthContext.Provider value={{ signedFuncionario: !!funcionario, funcionario, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext;