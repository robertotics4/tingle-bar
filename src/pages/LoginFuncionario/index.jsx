import React, { useState, useEffect, useContext } from 'react'
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import InputMask from 'react-input-mask';

import Loading from '../../components/Loading';
import AuthFuncionarioContext from '../../contexts/auth-funcionario';

export default function LoginFuncionario() {
    const [valores, setValores] = useState({});
    const [isLoadingVisible, setLoadingVisible] = useState(false);
    const { signIn } = useContext(AuthFuncionarioContext);
    const { setEstabelecimentoFuncionario } = useContext(AuthFuncionarioContext);

    const history = useHistory();
    const { register, handleSubmit, errors } = useForm();

    useEffect(() => { }, [isLoadingVisible]);

    const onSubmit = data => {
        setValores(data);
        loginFuncionario(data);
    };

    function handleChange(event) {
        const { name, value } = event.target;
        setValores({ ...valores, [name]: value });
    }

    async function loginFuncionario(credentials) {
        setLoadingVisible(true);

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

        setLoadingVisible(false);
    }

    return (
        <div className="hold-transition login-page">
            <div className="login-box">
                <div className="login-logo">
                    <a href="../../index2.html"><b>Tingle</b>Bar</a>
                </div>
                {/* /.login-logo */}
                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Login de Funcionário</p>

                        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>

                            <div className="input-group mb-3">
                                <InputMask
                                    type="text"
                                    className={errors.cnpj ? "form-control is-invalid" : "form-control"}
                                    placeholder="Telefone"
                                    name="telefone"
                                    onChange={handleChange}
                                    mask="(99) 99999-9999"
                                    ref={register({
                                        required: {
                                            value: "Required",
                                            message: "O Telefone é obrigatório"
                                        }
                                    })}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user" />
                                    </div>
                                </div>
                                <span className="error invalid-feedback">{errors.cnpj && errors.cnpj.message}</span>
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
                                            //value: /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, // Mínimo de oito caracteres, pelo menos uma letra e um número
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
                            <a href="forgot-password.html">Esqueci minha senha</a>
                        </p>
                        <p className="mb-0">
                            <a href="register.html" className="text-center">Cadastrar um novo funcionario</a>
                        </p>
                    </div>
                    {/* /.login-card-body */}
                </div>
            </div>
            {/* /.login-box */}

            {isLoadingVisible ? <Loading /> : null}
        </div>
    );

}