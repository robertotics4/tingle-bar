import React, { useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

import AuthFuncionarioContext from '../contexts/auth-funcionario';
import { phoneMask } from '../utils/masks';

export default function FormLoginFuncionario(props) {
    const [valores, setValores] = useState({});
    const { signIn, setEstabelecimentoFuncionario } = useContext(AuthFuncionarioContext);
    const { register, handleSubmit, errors } = useForm();
    const history = useHistory();

    const onSubmit = data => {
        setValores(data);
        loginFuncionario(data);
    };

    async function loginFuncionario(credentials) {
        props.setLoadingVisible(true);

        const response = await signIn(credentials);

        if (response.status === 200 || response.status === 201) {
            const listaEstabelecimentos = response.data.listaEstab;

            if (listaEstabelecimentos.length !== 0) {
                const { value } = await Swal.fire({
                    title: 'Selecione o Estabelecimento',
                    input: 'select',
                    inputOptions: listaEstabelecimentos.map(estabelecimento => estabelecimento.nomeEstabelecimento),
                    inputPlaceholder: 'Selecione',
                    inputValidator: value => {
                        return new Promise((resolve) => {
                            if (value) {
                                resolve();
                            } else {
                                resolve('Você precisa selecionar um estabelecimento');
                            }
                        });
                    }
                });

                setEstabelecimentoFuncionario(listaEstabelecimentos[value]);
            }

            setEstabelecimentoFuncionario(listaEstabelecimentos.pop());
        } else if (response.status === 401) {
            Swal.fire({
                title: 'Erro!',
                text: 'Usuário ou senha inválidos',
                icon: 'error',
                confirmButtonText: 'Voltar'
            });
        } else {
            Swal.fire({
                title: 'Erro!',
                text: 'Falha ao efetuar login.',
                icon: 'error',
                confirmButtonText: 'Voltar'
            });
        }

        props.setLoadingVisible(false);
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setValores({ ...valores, [name]: value });
    }

    function handleChangeTelefone(event) {
        const { name, value } = event.target;
        setValores({ ...valores, [name]: phoneMask(value) });
    }

    return (
        <div className="card">
            <div className="card-body login-card-body">
                <p className="login-box-msg">Login de Funcionário</p>

                <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>

                    <div className="input-group mb-3">
                        <input
                            value={valores.telefone || ''}
                            type="text"
                            className={errors.telefone ? "form-control is-invalid" : "form-control"}
                            placeholder="Telefone"
                            name="telefone"
                            onChange={handleChangeTelefone}
                            ref={register({
                                required: {
                                    value: "Required",
                                    message: "O telefone é obrigatório"
                                },
                                pattern: {
                                    value: /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/,
                                    message: "Telefone inválido"
                                }
                            })}
                        />
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <span className="fas fa-user" />
                            </div>
                        </div>
                        <span className="error invalid-feedback">{errors.telefone && errors.telefone.message}</span>
                    </div>

                    <div className="input-group mb-3">
                        <input
                            type="password"
                            className={errors.senha ? "form-control is-invalid" : "form-control"}
                            placeholder="Senha"
                            name="senha"
                            onChange={handleChange}
                            ref={register({
                                required: {
                                    value: "Required",
                                    message: "A senha é obrigatória"
                                },
                                pattern: {
                                    value: /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, // Mínimo de oito caracteres, pelo menos uma letra e um número
                                    message: "Mínimo de oito caracteres, com pelo menos uma letra e um número"
                                }
                            })}
                        />
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <span className="fas fa-lock" />
                            </div>
                        </div>
                        <span className="error invalid-feedback">{errors.senha && errors.senha.message}</span>
                    </div>

                    <div className="row">
                        <div className="input-group mb-3 col-md-12">
                            <button type="submit" className="btn btn-primary btn-block">Acessar</button>
                        </div>
                        {/* /.col */}
                    </div>
                </form>

                <p className="mb-1">
                    <a href="/#">Esqueci minha senha</a>
                </p>
            </div>
            {/* /.login-card-body */}
        </div>
    );
}
