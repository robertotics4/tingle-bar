import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import InputMask from 'react-input-mask';

import api from '../../services/api';
import Loading from '../../components/Loading';

export default function LoginFuncionario() {
    const [valores, setValores] = useState({});
    const [isLoadingVisible, setLoadingVisible] = useState(false);

    const { register, handleSubmit, errors } = useForm();

    useEffect(() => { }, [isLoadingVisible]);

    const onSubmit = data => {
        setValores(data);
        loginFuncionario();
    };

    function handleChange(event) {
        const { name, value } = event.target;
        setValores({ ...valores, [name]: value });
    }

    async function loginFuncionario() {
        setLoadingVisible(true);
        let resposta = null;

        const payload = {
            "Telefone": valores.telefone,
            "Senha": valores.senha
        }

        try {
            resposta = await api.post('/api/loginfuncionario', payload);

            if (resposta.status === 200 || resposta.status === 201) {
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Login efetuado com sucesso',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

                setValores({});
                console.log(resposta.data);
                SelecionaEstabelecimento(resposta.data)
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

    function SelecionaEstabelecimento(data) {

        if (data.listaEstab.length >= 1) {

            console.log('mais de um');


        };
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
                                    mask="(99)999999999"
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