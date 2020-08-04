import React, { useState, createContext, useEffect } from 'react';

const GeralContext = createContext();

export const GeralProvider = ({ children }) => {
    const [tipoUsuario, setTipoUsuario] = useState(null);
    const [isLoadingVisible, setLoadingVisible] = useState(false);

    useEffect(() => {
        function loadStoragedData() {
            const storagedTipoUsuario = localStorage.getItem('@TBAuth:tipoUsuario');

            if (storagedTipoUsuario) {
                setTipoUsuario(storagedTipoUsuario);
            }
        }

        loadStoragedData();
    }, []);

    return (
        <GeralContext.Provider value={{ tipoUsuario, setTipoUsuario, isLoadingVisible, setLoadingVisible }}>
            {children}
        </GeralContext.Provider>
    )
};

export default GeralContext;