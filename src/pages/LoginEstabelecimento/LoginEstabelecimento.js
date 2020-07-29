import React from 'react';

export default function LoginEstabelecimento() {
    return (
        <div className="hold-transition login-page">
            <div className="login-box">
                <div className="login-logo">
                    <a href="../../index2.html"><b>Tingle</b>Bar</a>
                </div>
                {/* /.login-logo */}
                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Insira suas credenciais para iniciar</p>
                        <form action="../../index3.html" method="post">

                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="CNPJ" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user" />
                                    </div>
                                </div>
                            </div>

                            <div className="input-group mb-3">
                                <input type="password" className="form-control" placeholder="Senha" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-group mb-3 col-md-12">
                                    <button type="submit" className="btn btn-primary btn-block">Acessar</button>
                                </div>
                                {/* /.col */}
                            </div>
                        </form>

                        <p className="mb-1">
                            <a href="forgot-password.html">Esqueci minha senha</a>
                        </p>
                        <p className="mb-0">
                            <a href="register.html" className="text-center">Cadastrar um novo estabelecimento</a>
                        </p>
                    </div>
                    {/* /.login-card-body */}
                </div>
            </div>
            {/* /.login-box */}
        </div>

    );
}