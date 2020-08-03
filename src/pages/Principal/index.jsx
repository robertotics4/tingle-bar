import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';
import GeralContext from '../../contexts/geral';

export default function LoginEstabelecimento() {
    const { tipoUsuario, setTipoUsuario } = useContext(GeralContext);

    const history = useHistory();

    return (
        <div className="hold-transition login-page">
            <div className="login-box">

                <div className="login-logo">
                    <b>Tingle</b>Bar
                </div>

                <div className="col-md-12">
                    <div className="card card-default">
                        <div className="card-header">
                            <h3 className="card-title">Selecione o tipo de usuário</h3>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">

                            <button
                                name="funcionario"
                                type="button"
                                className="btn btn-block bg-gradient-secondary btn-lg text-left"
                                onClick={() => {
                                    if (tipoUsuario === 'funcionario')
                                        history.push('/painel-funcionario');
                                    else {
                                        setTipoUsuario('funcionario');
                                        history.push('/loginFuncionario');
                                    }
                                }}
                            >
                                <h5><b>Funcionário</b></h5>
                                <p className="btn-perfil-descricao">Presto serviços a um estabelecimento</p>
                            </button>

                            <button
                                name="estabelecimento"
                                type="button"
                                className="btn btn-block bg-gradient-secondary btn-lg text-left mt-3"
                                onClick={() => {
                                    if (tipoUsuario === 'estabelecimento')
                                        history.push('/painel-estabelecimento');
                                    else {
                                        setTipoUsuario('estabelecimento');
                                        history.push('/loginEstabelecimento');
                                    }
                                }}
                            >
                                <h5><b>Estabelecimento</b></h5>
                                <p className="btn-perfil-descricao">Quero gerenciar o meu estabelecimento</p>
                            </button>

                        </div>
                        {/* /.card-body */}
                    </div>
                    {/* /.card */}
                </div>

            </div>
            {/* /.login-box */}
        </div>
    );
}