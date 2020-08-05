import React, { useState } from 'react';
import { useForm } from "react-hook-form";

import './styles/ModalCadCardapio.css';

export default function ModalCadCardapio() {
    const [valores, setValores] = useState({});

    const { register, handleSubmit, errors } = useForm();

    const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

    const onSubmit = data => {
        setValores(data);
        console.log(valores);
    };

    function handleChange(event) {
        const { name, value } = event.target;
        setValores({ ...valores, [name]: value });
    }

    return (
        <div className="cad-cardapio-modal">
            <div className="card card-primary">
                <div className="card-header">
                    <h3 className="card-title">Cadastro de item no Cardápio</h3>
                </div>
                {/* /.card-header */}
                {/* form start */}

                <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>

                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="idItemCardapio">ID</label>
                            <input
                                name="idItemCardapio"
                                type="text"
                                className={errors.idItemCardapio ? "form-control is-invalid" : "form-control"}
                                id="idItemCardapio"
                                placeholder="ID"
                                onChange={handleChange}
                                ref={register({
                                    required: {
                                        value: "Required",
                                        message: "O ID é obrigatório"
                                    }
                                })}
                            />
                            <span className="error invalid-feedback">{errors.idItemCardapio && errors.idItemCardapio.message}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="tituloItemCardapio">Título</label>
                            <input
                                name="tituloItemCardapio"
                                type="text"
                                className={errors.tituloItemCardapio ? "form-control is-invalid" : "form-control"}
                                id="tituloItemCardapio"
                                placeholder="Título do item"
                                ref={register({
                                    required: {
                                        value: "Required",
                                        message: "O título é obrigatório"
                                    },
                                })}
                            />
                            <span className="error invalid-feedback">{errors.tituloItemCardapio && errors.tituloItemCardapio.message}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="descricaoItemCardapio">Descrição</label>
                            <input
                                name="descricaoItemCardapio"
                                type="text"
                                className={errors.descricaoItemCardapio ? "form-control is-invalid" : "form-control"}
                                id="descricaoItemCardapio"
                                placeholder="Descrição do item"
                                ref={register({
                                    required: {
                                        value: "Required",
                                        message: "A descrição é obrigatória"
                                    },
                                })}
                            />
                            <span className="error invalid-feedback">{errors.descricaoItemCardapio && errors.descricaoItemCardapio.message}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="valorItemCardapio">Valor</label>
                            <input
                                name="valorItemCardapio"
                                placeholder="R$ 00.00"
                                type="text"
                                className={errors.valorItemCardapio ? "form-control is-invalid" : "form-control"}
                                id="valorItemCardapio"
                                placeholder="Valor do item"
                                mask="R$ 99999.99"
                                ref={register({
                                    required: {
                                        value: "Required",
                                        message: "O valor é obrigatório"
                                    },
                                })}
                            />
                            <span className="error invalid-feedback">{errors.valorItemCardapio && errors.valorItemCardapio.message}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="categoriaItemCardapio">Categoria</label>
                            <select
                                name="categoriaItemCardapio"
                                className={errors.categoriaItemCardapio ? "form-control is-invalid" : "form-control"}
                                id="categoriaItemCardapio"
                                ref={register({
                                    required: {
                                        value: "Required",
                                        message: "A categoria é obrigatória"
                                    },
                                })}
                            >
                                <option value="">Selecione</option>
                                <option>Categoria 1</option>
                                <option>Categoria 2</option>
                                <option>Categoria 3</option>
                            </select>
                            <span className="error invalid-feedback">{errors.categoriaItemCardapio && errors.categoriaItemCardapio.message}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="imagemItemCardapio">Imagem do item</label>
                            <div className="input-group">
                                <div className="custom-file">
                                    <input
                                        name="imagemItemCardapio"
                                        type="file"
                                        className={errors.imagemItemCardapio ? "custom-file-input is-invalid" : "custom-file-input"}
                                        id="imagemItemCardapio"
                                        ref={register({
                                            required: {
                                                value: "Required",
                                                message: "A imagem é obrigatória"
                                            },
                                        })}
                                    />
                                    <label className="custom-file-label" htmlFor="exampleInputFile">Selecione a imagem</label>
                                </div>
                            </div>
                            <span className="error invalid-feedback">{errors.imagemItemCardapio && errors.imagemItemCardapio.message}</span>
                        </div>
                        <div className="form-check">
                            <input
                                name="itemCozinhaCardapio"
                                type="checkbox"
                                className="form-check-input"
                                id="itemCozinhaCardapio"
                            />
                            <label className="form-check-label" htmlFor="exampleCheck1">Item de cozinha ?</label>
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