import React, { useState, useEffect } from 'react';

import api from '../../../services/api';

export default function CadFuncionario() {
    const [valores, setValores] = useState({});
    const [tiposFuncionario, setTiposFuncionario] = useState([]);
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        getTiposFuncionario();
    }, []);

    async function getTiposFuncionario() {
        try {
            const response = await api.get('/tipofuncionario');
            setTiposFuncionario(response.data);
            return response.data;
        } catch (err) {
            return err.response;
        }
    }

    return (
        <div className="card card-primary">
            <div className="card-header">
                <h3 className="card-title">Cadastro de funcionário</h3>
            </div>

            <form role="form">
                <div className="card-body">

                    <div className="form-group">
                        <label htmlFor="nomeUsuario">Nome do usuário</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nomeUsuario"
                            placeholder="Nome do usuário"
                            disabled
                        />
                    </div>

                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="nascimentoUsuario">Data de nascimento</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nascimentoUsuario"
                                    placeholder="Data de nascimento"
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="cpf">CPF</label>
                                <input type="text"
                                    className="form-control"
                                    id="cpf"
                                    placeholder="CPF do usuário"
                                    disabled
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="emailUsuario">E-mail do usuário</label>
                        <input
                            type="email"
                            className="form-control"
                            id="emailUsuario"
                            placeholder="E-mail do usuário"
                            disabled
                        />
                    </div>

                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="telefoneUsuario">Telefone do usuário</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="telefoneUsuario"
                                    placeholder="Telefone do usuário"
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="form-group">
                                <div>
                                    <label htmlfor="tipoFuncionario">Tipo de funcionário</label>
                                    <select className="custom-select">
                                        {tiposFuncionario.map((item, index) => {
                                            return <option key={item.id}>{item.descricao}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                {/* /.card-body */}

                <div className="card-footer">
                    <button type="submit" className="btn btn-primary">Localizar Usuário</button>
                    <button type="submit" className="btn btn-success ml-3" disabled>Cadastrar como funcionário</button>
                </div>

            </form>

        </div>
    );
}
