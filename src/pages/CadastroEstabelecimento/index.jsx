import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';

import './CadastroEstabelecimento.css';
import Loading from '../../components/Loading';

import api from '../../services/api';

export default function CadastroEstabelecimento() {
    const [valores, setValores] = useState({});
    const [tiposEstabelecimento, setTiposEstabelecimento] = useState([]);
    const [isLoadingVisible, setLoadingVisible] = useState(false);

    const { register, handleSubmit, errors, watch } = useForm();

    const onSubmit = data => {
        setValores(data);
        console.log(valores);
        cadastrarEstabelecimento();
    };

    useEffect(() => { }, [isLoadingVisible]);

    useEffect(() => {
        async function getTiposEstabelecimento() {
            try {
                const { data } = await api.get('/api/tipoestabelecimento');
                setTiposEstabelecimento(data.tipoestabelecimento);
            } catch (err) {
                console.log({ err });
            }
        }

        getTiposEstabelecimento();
    }, []);

    function handleChange(event) {
        const { name, value } = event.target;
        setValores({ ...valores, [name]: value });
    }

    async function cadastrarEstabelecimento() {
        setLoadingVisible(true);
        let resposta = null;

        const payload = {
            "Nome": valores.nome,
            "Cnpj": valores.cnpj,
            "Endereco": valores.endereco,
            "Numero": valores.numero,
            "Latitude": valores.latitude,
            "Longitude": valores.longitude,
            "IdTipoEstabelecimento": valores.tipoEstabelecimento,
            "Imagem": "/uploads/default.png",
            "Distancia_km": "0",
            "Senha": valores.senha
        }

        try {
            resposta = await api.post('/api/estabelecimento', payload);

            if (resposta.status === 200 || resposta.status === 201) {
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Cadastro efetuado com sucesso!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

                setValores({});
            }

        } catch (err) {
            Swal.fire({
                title: 'Erro!',
                text: 'Falha ao efetuar cadastro.',
                icon: 'error',
                confirmButtonText: 'Voltar'
            });
        } finally {
            setLoadingVisible(false);
        }
    }

    return (
        <div className="hold-transition register-page">
            <div className="register-box">
                <div className="register-logo">
                    <a href="../../index2.html"><b>Tingle</b>Bar</a>
                </div>

                <div className="card">
                    <div className="card-body register-card-body">
                        <p className="login-box-msg">Cadastrar novo estabelecimento</p>

                        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>

                            <div className="row">
                                <div className="mb-3 col-md-12">
                                    <input
                                        name="nome"
                                        placeholder="Nome do estabelecimento"
                                        className={errors.nome ? "form-control is-invalid" : "form-control"}
                                        type="text"
                                        onChange={handleChange}
                                        ref={register({
                                            required: {
                                                value: "Required",
                                                message: "O nome do estabelecimento é obrigatório"
                                            },
                                        })}
                                    />
                                    <span className="error invalid-feedback">{errors.nome && errors.nome.message}</span>
                                </div>
                            </div>

                            <div className="row">
                                <div className="mb-3 col-md-10">
                                    <input
                                        name="endereco"
                                        placeholder="Endereço"
                                        className={errors.endereco ? "form-control is-invalid" : "form-control"}
                                        type="text"
                                        onChange={handleChange}
                                        ref={register({
                                            required: {
                                                value: "Required",
                                                message: "O endereço é obrigatório"
                                            }
                                        })}
                                    />
                                    <span className="error invalid-feedback">{errors.endereco && errors.endereco.message}</span>
                                </div>
                                <div className="mb-3 col-md-2">
                                    <input
                                        name="numero"
                                        placeholder="Nº"
                                        className={errors.numero ? "form-control is-invalid" : "form-control"}
                                        type="text"
                                        onChange={handleChange}
                                        ref={register({
                                            required: {
                                                value: "Required",
                                                message: "O número é obrigatório"
                                            },
                                            maxLength: {
                                                value: 5,
                                                message: "Limite de 5 caracteres"
                                            }
                                        })}
                                    />
                                    <span className="error invalid-feedback">{errors.numero && errors.numero.message}</span>
                                </div>
                            </div>

                            <div className="row">
                                <div className="mb-3 col-md-12">
                                    <input
                                        type="text"
                                        placeholder="CNPJ"
                                        className={errors.cnpj ? "form-control is-invalid" : "form-control"}
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
                                    <span className="error invalid-feedback">{errors.cnpj && errors.cnpj.message}</span>
                                </div>
                            </div>

                            <div className="row">
                                <div className="mb-3 col-md-12">
                                    <select
                                        className={errors.tipoEstabelecimento ? "form-control is-invalid" : "form-control"}
                                        onChange={handleChange}
                                        name="tipoEstabelecimento"
                                        ref={register({
                                            required: {
                                                value: "Required",
                                                message: "O tipo de estabelecimento é obrigatório"
                                            },
                                        })}
                                    >
                                        <option key={0} value={""}>Tipo de estabelecimento</option>

                                        {tiposEstabelecimento.map((tipoEstabelecimento, index) => (
                                            <option key={tipoEstabelecimento.id} value={tipoEstabelecimento.id}>{tipoEstabelecimento.descricao}</option>
                                        ))}
                                    </select>
                                    <span className="error invalid-feedback">{errors.tipoEstabelecimento && errors.tipoEstabelecimento.message}</span>
                                </div>
                            </div>

                            <div className="row">
                                <div className="mb-3 col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Latitude"
                                        name="latitude"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3 col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Longitude"
                                        name="longitude"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="mb-3 col-md-12">
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
                                    <span className="error invalid-feedback">{errors.senha && errors.senha.message}</span>
                                </div>
                            </div>

                            <div className="row">
                                <div className="mb-3 col-md-12">
                                    <input
                                        type="password"
                                        className={errors.repeticaoSenha ? "form-control is-invalid" : "form-control"}
                                        placeholder="Redigite a senha"
                                        name="repeticaoSenha"
                                        onChange={handleChange}
                                        ref={register({
                                            required: {
                                                value: "Required",
                                                message: "A repetição de senha é obrigatória"
                                            },
                                            validate: value => value === watch('senha') || "As senhas não coincidem"
                                        })}
                                    />
                                    <span className="error invalid-feedback">{errors.repeticaoSenha && errors.repeticaoSenha.message}</span>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-12">
                                    <div className="icheck-primary">
                                        <input
                                            className={errors.aceitaTermos ? "" : ""}
                                            type="checkbox"
                                            defaultChecked={false}
                                            name="aceitaTermos"
                                            defaultValue
                                            ref={register({
                                                required: {
                                                    value: "Required",
                                                    message: "Aceite os termos para continuar"
                                                },
                                            })}
                                        />
                                        <label htmlFor="agreeTerms">
                                            &nbsp;&nbsp;Eu aceito todos os <a href="#">termos de uso</a>
                                        </label>
                                        <span className="error invalid-feedback" style={{ display: "inline" }}><br />{errors.aceitaTermos && errors.aceitaTermos.message}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="mb-2 col-12">
                                    <button type="submit" className="btn btn-primary btn-block">Cadastrar</button>
                                </div>
                            </div>

                        </form>

                        <a href="login.html" className="text-center">Já tenho uma conta de acesso</a>
                    </div>
                    {/* /.form-box */}
                </div>{/* /.card */}
            </div>
            {/* /.register-box */}

            {isLoadingVisible ? <Loading /> : null}
        </div>
    );
}