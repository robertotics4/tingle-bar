import React from 'react';

import './styles.css';

export default function LoginEstabelecimento() {
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

                            <button type="button" className="btn btn-block bg-gradient-secondary btn-lg text-left">
                                <h5><b>Funcionário</b></h5>
                                <p className="btn-perfil-descricao">Presto serviços a um estabelecimento</p>
                            </button>
                            <button type="button" className="btn btn-block bg-gradient-secondary btn-lg text-left mt-3">
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