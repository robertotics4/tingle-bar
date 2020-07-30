import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';

import api from '../../services/api';
import Loading from '../../components/Loading';

export default function LoginEstabelecimento() {
    const [valores, setValores] = useState({});
    const [isLoadingVisible, setLoadingVisible] = useState(false);

    const { register, handleSubmit, errors, watch } = useForm();

    useEffect(() => { }, [isLoadingVisible]);

    const onSubmit = data => {
        setValores(data);
        console.log(valores);
        loginEstabelecimento();
    };

    function handleChange(event) {
        const { name, value } = event.target;
        setValores({ ...valores, [name]: value });
    }

    async function loginEstabelecimento() {
        setLoadingVisible(true);
        let resposta = null;

        const payload = {
            "Cnpj": valores.cnpj,
            "Senha": valores.senha
        }

        try {
            resposta = await api.post('/api/loginestabelecimento', payload);

            if (resposta.status === 200 || resposta.status === 201) {
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Login efetuado com sucesso',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

                setValores({});
            }

        } catch (err) {
            Swal.fire({
                title: 'Erro!',
                text: 'Falha ao efetuar login.',
                icon: 'error',
                confirmButtonText: 'Voltar'
            });
        } finally {
            setLoadingVisible(false);
        }
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
                        <p className="login-box-msg">Insira suas credenciais para iniciar</p>

                        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>

                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className={errors.cnpj ? "form-control is-invalid" : "form-control"}
                                    placeholder="CNPJ"
                                    name="cnpj"
                                    onChange={handleChange}
                                    ref={register({
                                        required: {
                                            value: "Required",
                                            message: "O CNPJ é obrigatório"
                                        },
                                        pattern: {
                                            value: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
                                            message: "CNPJ inválido"
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

            {isLoadingVisible ? <Loading /> : null}
        </div>
    );
}