import React from 'react';

import { GeralProvider } from './contexts/geral';
import { AuthEstabelecimentoProvider } from './contexts/auth-estabelecimento';
import { AuthFuncionarioProvider } from './contexts/auth-funcionario';


import Routes from './routes';

export default function App() {
  return (
    <GeralProvider>
      <AuthEstabelecimentoProvider>
        <AuthFuncionarioProvider>
          <Routes />
        </AuthFuncionarioProvider>
      </AuthEstabelecimentoProvider>
    </GeralProvider>
  );
}
