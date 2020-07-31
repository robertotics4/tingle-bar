import React from 'react';

import { AuthEstabelecimentoProvider} from './contexts/auth-estabelecimento';

import Routes from './routes';

export default function App() {
  return (
    <AuthEstabelecimentoProvider>
      <Routes />
    </AuthEstabelecimentoProvider>
  );
}
