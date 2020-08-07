import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import CurrencyInput from 'react-currency-input';
import Swal from 'sweetalert2';
import fs from 'fs';

import './styles/ModalCadCardapio.css';

import api from '../../../../services/api';

function initialState() {
    return {
        titulo: '',
        descricao: '',
        valor: '',
        categoria: '',
        tempoEstimadoMin: 0,
        tempoEstimadoMax: 0,
        imagem: null,
        isCozinha: false,
        isCardapio: true
    };
}

export default function ModalCadCardapio(props) {
    const [categorias, setCategorias] = useState([]);
    const [valores, setValores] = useState(initialState);

    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => {
        cadastrarItem(data);
    };

    useEffect(() => {
        getCategorias();
    }, [])

    async function getCategorias() {
        try {
            const response = await api.get('/categoria?idEstabelecimento=' + props.idEstabelecimento);
            setCategorias(response.data);
            return response.data;
        } catch (err) {
            return err.response;
        }
    }

    async function cadastrarItem(dados) {
        const formData = new FormData();

        formData.append("titulo", dados.titulo);
        formData.append("descricao", dados.descricao);
        formData.append("valor", valores.valor);
        formData.append("tempo_estimado_min", dados.tempoEstimadoMin);
        formData.append("tempo_estimado_max", dados.tempoEstimadoMax);
        formData.append("categoria", dados.categoria);
        formData.append("iscozinha", valores.isCozinha);
        formData.append("files", dados.imagem);
        formData.append("estabelecimento", props.idEstabelecimento);
        formData.append("iscardapio", valores.isCardapio);

        try {
            const response = await api.post('/Cardapio', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log({ response });

            if (response.status === 201 || response.status === 200) {
                Swal.fire('Sucesso!', 'Item cadastrado com sucesso!', 'success');
            }
        } catch (err) {
            if (err.response.status === 401 || err.response.status === 400) {
                Swal.fire('Erro!', 'Falha ao cadastrar item', 'error');
            }
        }
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setValores({ ...valores, [name]: value });
    }

    function handleChangeValor(event, maskedValue, floatValue) {
        setValores({ ...valores, valor: floatValue });
    }

    return (
        <div className="cad-cardapio-modal">
            <div className="card card-primary">
                <div className="card-header">
                    <h3 className="card-title">Cadastro de item no Cardápio</h3>
                </div>
                {/* /.card-header */}
                {/* form start */}

                <form autoComplete="off" encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
                    <div className="card-body">

                        <div className="form-group">
                            <label htmlFor="tituloItemCardapio">Título</label>
                            <input
                                name="titulo"
                                type="text"
                                className={errors.titulo ? "form-control is-invalid" : "form-control"}
                                id="tituloItemCardapio"
                                placeholder="Título do item"
                                onChange={handleChange}
                                ref={register({
                                    required: {
                                        value: "Required",
                                        message: "O título é obrigatório"
                                    },
                                })}
                            />
                            <span className="error invalid-feedback">{errors.titulo && errors.titulo.message}</span>
                        </div>

                        <div className="form-group">
                            <label htmlFor="descricaoItemCardapio">Descrição</label>
                            <input
                                name="descricao"
                                type="text"
                                className={errors.descricao ? "form-control is-invalid" : "form-control"}
                                id="descricaoItemCardapio"
                                placeholder="Descrição do item"
                                onChange={handleChange}
                                ref={register({
                                    required: {
                                        value: "Required",
                                        message: "A descrição é obrigatória"
                                    },
                                })}
                            />
                            <span className="error invalid-feedback">{errors.descricao && errors.descricao.message}</span>
                        </div>

                        <div className="form-group">
                            <label htmlFor="valorItemCardapio">Valor</label>
                            <CurrencyInput
                                name="valor"
                                type="text"
                                prefix="R$"
                                decimalSeparator=","
                                thousandSeparator="."
                                value={valores.valor}
                                className={errors.valor ? "form-control is-invalid" : "form-control"}
                                id="valorItemCardapio"
                                onChangeEvent={handleChangeValor}
                            // ref={register({
                            //     required: {
                            //         value: "Required",
                            //         message: "O valor é obrigatório"
                            //     },
                            // })}
                            />
                            <span className="error invalid-feedback">{errors.valorItemCardapio && errors.valorItemCardapio.message}</span>
                        </div>

                        <div className="form-group">
                            <label htmlFor="categoriaItemCardapio">Categoria</label>
                            <select
                                name="categoria"
                                className={errors.categoria ? "form-control is-invalid" : "form-control"}
                                id="categoriaItemCardapio"
                                ref={register({
                                    required: {
                                        value: "Required",
                                        message: "A categoria é obrigatória"
                                    },
                                })}
                            >
                                <option value="">Selecione</option>
                                {categorias.map((item, index) => (
                                    <option key={item.id} value={item.id}>{item.descricao}</option>
                                ))}
                            </select>
                            <span className="error invalid-feedback">{errors.categoria && errors.categoria.message}</span>
                        </div>

                        <div className="form-group">
                            <label htmlFor="descricaoItemCardapio">Tempo estimado mínimo</label>
                            <input
                                name="tempoEstimadoMin"
                                type="number"
                                className={errors.tempoEstimadoMin ? "form-control is-invalid" : "form-control"}
                                id="tempoEstimadoMin"
                                placeholder="Tempo mínimo estimado"
                                onChange={handleChange}
                                ref={register({
                                    required: {
                                        value: "Required",
                                        message: "O tempo estimado min é obrigatório"
                                    },
                                })}
                            />
                            <span className="error invalid-feedback">{errors.tempoEstimadoMin && errors.tempoEstimadoMin.message}</span>
                        </div>

                        <div className="form-group">
                            <label htmlFor="descricaoItemCardapio">Tempo estimado máximo</label>
                            <input
                                name="tempoEstimadoMax"
                                type="number"
                                className={errors.tempoEstimadoMax ? "form-control is-invalid" : "form-control"}
                                id="tempoEstimadoMax"
                                placeholder="Tempo mínimo máximo"
                                onChange={handleChange}
                                ref={register({
                                    required: {
                                        value: "Required",
                                        message: "O tempo estimado max é obrigatório"
                                    },
                                })}
                            />
                            <span className="error invalid-feedback">{errors.tempoEstimadoMax && errors.tempoEstimadoMax.message}</span>
                        </div>

                        <div className="form-group">
                            <label htmlFor="imagemItemCardapio">Imagem do item</label>
                            <input
                                name="imagem"
                                type="file"
                                accept=".jpg,.png"
                                className={errors.imagem ? "form-control-file is-invalid" : "form-control-file"}
                                id="imagemItemCardapio"
                                ref={register({
                                    required: {
                                        value: "Required",
                                        message: "A imagem é obrigatória"
                                    },
                                })}
                            />
                            <span className="error invalid-feedback">{errors.imagem && errors.imagem.message}</span>
                        </div>

                        <div className="form-check">
                            <input
                                name="isCozinha"
                                type="checkbox"
                                className="form-check-input"
                                id="itemCozinhaCardapio"
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="exampleCheck1">Item de cozinha ?</label>
                        </div>

                        <div className="form-check">
                            <input
                                name="isCardapio"
                                type="checkbox"
                                className="form-check-input"
                                id="isCardapio"
                                onChange={handleChange}
                                defaultChecked={true}
                            />
                            <label className="form-check-label" htmlFor="exampleCheck1">Incluir no cardápio ?</label>
                        </div>

                    </div>
                    {/* /.card-body */}
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary">Cadastrar</button>
                        <button type="submit" className="btn btn-secondary ml-3">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}