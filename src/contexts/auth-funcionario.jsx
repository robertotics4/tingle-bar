import React, { useState, useContext, createContext, useEffect } from 'react';

import api from '../services/api';
import GeralContext from './geral';

const AuthContext = createContext();

export const AuthFuncionarioProvider = ({ children }) => {
    const [funcionario, setFuncionario] = useState(null);
    const [estabelecimento, setEstabelecimento] = useState(null);
    const { setTipoUsuario } = useContext(GeralContext);

    useEffect(() => {
        function loadStoragedData() {
            const storagedFuncionario = localStorage.getItem('@TBAuth:funcionario');
            const storagedToken = localStorage.getItem('@TBAuth:token');
            const storagedEstabelecimento = localStorage.getItem('@TBAuth:estabelecimento');

            if (storagedFuncionario && storagedToken && storagedEstabelecimento) {
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

            const response = await api.post('/loginfuncionario', payload);

            const { accessToken } = response.data;
            delete response.data.accessToken;

            setFuncionario(response.data);
            localStorage.setItem('@TBAuth:funcionario', JSON.stringify(response.data));
            localStorage.setItem('@TBAuth:token', accessToken);
            localStorage.setItem('@TBAuth:tipoUsuario', 'funcionario');

            return response;
        } catch (err) {
            return err.response;
        }
    }

    function signOut() {
        localStorage.clear();
        setTipoUsuario(null);
        setFuncionario(null);
    }

    function setEstabelecimentoFuncionario(data) {
        setEstabelecimento(data);
        localStorage.setItem('@TBAuth:estabelecimento', JSON.stringify(data));
    }

    return (
        <AuthContext.Provider value={{ signedFuncionario: !!funcionario, funcionario, signIn, signOut, estabelecimento, setEstabelecimentoFuncionario }}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext;