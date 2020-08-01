import React, { useState, createContext } from 'react';

const GeralContext = createContext();

export const GeralProvider = ({ children }) => {
    const [tipoUsuario, setTipoUsuario] = useState(null);

    return (
        <GeralContext.Provider value={{ tipoUsuario, setTipoUsuario }}>
            {children}
        </GeralContext.Provider>
    )
};

export default GeralContext;