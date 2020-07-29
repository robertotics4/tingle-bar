import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";

import './CadEstabelecimento.css';

import api from '../../services/api';

function valoresIniciais() {
    return {
        nome: '',
        cnpj: '',
        endereco: '',
        numero: '',
        latitude: '',
        longitude: '',
        tipoEstabelecimento: '',
        senha: '',
    };
}

export default function CadEstabelecimento() {
    const [valores, setValores] = useState(valoresIniciais);
    const [tiposEstabelecimento, setTiposEstabelecimento] = useState([]);

    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => {
        console.log(data);
    };

    useEffect(() => {
        async function getTiposEstabelecimento() {
            try {
                const tiposEstabelecimento = await api.get('/tipoestabelecimento');
                setTiposEstabelecimento(tiposEstabelecimento);
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

    async function handleCadastrar() {
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
            const resposta = await api.post('/estabelecimento', payload);
            console.log({ resposta });
        } catch (err) {
            console.log({ err });
        }
    }

    return (
        <div>
            <section className="testimonial py-5" id="testimonial">
                <div className="container">
                    <div className="row ">
                        <div className="col-md-4 py-5 bg-primary text-white text-center ">
                            <div className=" ">
                                <div className="card-body">
                                    <img src="http://www.ansonika.com/mavia/img/registration_bg.svg" style={{ width: '30%' }} />
                                    <h2 className="py-3">Cadastro de estabelecimento</h2>
                                    <p>Tation argumentum et usu, dicit viderer evertitur te has. Eu dictas concludaturque usu, facete detracto patrioque an per, lucilius pertinacia eu vel.
                                </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-8 py-5 border">
                            <h4 className="pb-4">Insira os dados do seu estabelecimento</h4>

                            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>

                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <input
                                            id="nomeEstabelecimento"
                                            name="nome"
                                            placeholder="Nome do estabelecimento"
                                            className="form-control"
                                            type="text"
                                            onChange={handleChange}
                                            ref={register({
                                                required: {
                                                    value: "Required",
                                                    message: "O nome do estabelecimento é obrigatório"
                                                }
                                            })}
                                        />
                                        <p className="text-validation-error">{errors.nome && errors.nome.message}</p>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-10">
                                        <input
                                            id="enderecoEstabelecimento"
                                            name="endereco"
                                            placeholder="Endereço do estabelecimento"
                                            className="form-control"
                                            type="text"
                                            onChange={handleChange}
                                            ref={register({
                                                required: {
                                                    value: "Required",
                                                    message: "O endereço é obrigatório"
                                                }
                                            })}
                                        />
                                        <p className="text-validation-error">{errors.endereco && errors.endereco.message}</p>
                                    </div>

                                    <div className="form-group col-md-2">
                                        <input
                                            id="numeroEstabelecimento"
                                            name="numero"
                                            placeholder="Número"
                                            className="form-control"
                                            type="number"
                                            onChange={handleChange}
                                            ref={register({
                                                required: {
                                                    value: "Required",
                                                    message: "O número é obrigatório"
                                                },
                                                maxLength: {
                                                    value: 5,
                                                    message: "O número máximo de caracteres é '5'"
                                                }
                                            })}
                                        />
                                        <p className="text-validation-error">{errors.numero && errors.numero.message}</p>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <input
                                            type="cnpj"
                                            className="form-control"
                                            id="inputCnpj" placeholder="CNPJ"
                                            name="cnpj"
                                            onChange={handleChange}
                                            ref={register({
                                                required: {
                                                    value: "Required",
                                                    message: "O CNPJ é obrigatório"
                                                },
                                                pattern: {
                                                    value: /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/,
                                                    message: "CNPJ inválido"
                                                }
                                            })}
                                        />
                                        <p className="text-validation-error">{errors.cnpj && errors.cnpj.message}</p>
                                    </div>

                                    <div className="form-group col-md-6">
                                        <select
                                            id="tipoEstabelecimento"
                                            className="form-control"
                                            onChange={handleChange}
                                            name="tipoEstabelecimento"
                                            ref={register({
                                                required: {
                                                    value: "Required",
                                                    message: "O tipo de estabelecimento é obrigatório"
                                                },
                                            })}
                                        >
                                            <option value="">Tipo de estabelecimento</option>
                                            <option value={1}>Bar</option>
                                            <option value={2}>Restaurante</option>
                                            <option value={3}>Lanchonete</option>
                                        </select>
                                        <p className="text-validation-error">{errors.tipoEstabelecimento && errors.tipoEstabelecimento.message}</p>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group  col-md-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="latitudeEstabelecimento"
                                            placeholder="Latitude"
                                            name="latitude"
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group  col-md-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="longitudeEstabelecimento"
                                            placeholder="Longitude"
                                            name="longitude"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group  col-md-12">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="senhaEstabelecimento"
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
                                        <p className="text-validation-error">{errors.senha && errors.senha.message}</p>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <div className="form-group">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    defaultValue
                                                    id="aceitaTermos"
                                                    checked={valores.aceitaTermos}
                                                    name="aceitaTermos"
                                                    ref={register({
                                                        required: {
                                                            value: "Required",
                                                            message: "Aceite os termos para continuar"
                                                        },
                                                    })}
                                                />
                                                <label className="form-check-label" htmlFor="invalidCheck2">
                                                    <small>Aceito os termos de condições de uso.</small>
                                                </label>
                                                <p className="text-validation-error">{errors.aceitaTermos && errors.aceitaTermos.message}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <button type="submit" className="btn btn-dark btn-lg">Cadastrar</button>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
