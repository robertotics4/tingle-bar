import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { Modal } from 'react-bootstrap';

import '../../../../components/Loading';

import api from '../../../../services/api';
import { currencyMask, numberPositiveMask } from '../../../../utils/masks';

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
    }, []);

    const handleClose = () => props.setShowModal(false);

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
        handleClose();
        props.setLoadingVisible(true);

        const data = new FormData();

        data.append("titulo", dados.titulo);
        data.append("descricao", dados.descricao);
        data.append("valor", getFloatFromCurrency(valores.valor));
        data.append("tempo_estimado_min", dados.tempoEstimadoMin);
        data.append("tempo_estimado_max", dados.tempoEstimadoMax);
        data.append("categoria", dados.categoria);
        data.append("estabelecimento", props.idEstabelecimento);
        data.append("iscozinha", valores.isCozinha ? 1 : 0);
        data.append("iscardapio", valores.isCardapio ? 1 : 0);
        data.append("files", valores.imagem);

        try {
            const response = await api.post('/Cardapio', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 201 || response.status === 200) {
                Swal.fire('Sucesso!', 'Item cadastrado com sucesso!', 'success');
            }
        } catch (err) {
            Swal.fire('Erro!', 'Falha ao cadastrar item', 'error');
        } finally {
            handleClose();
            props.atualizarItens();
            props.setLoadingVisible(false);
        }
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setValores({ ...valores, [name]: value });
    }

    function handleChangeValor(event) {
        const { value } = event.target;
        setValores({ ...valores, valor: currencyMask(value) });
    }

    function handleChangeImagem(e) {
        setValores({ ...valores, imagem: e.target.files[0] });
    }

    function handleChangePositive(e) {
        const { name, value } = e.target;
        setValores({ ...valores, [name]: numberPositiveMask(value) });
    }

    function getFloatFromCurrency(currencyValue) {
        currencyValue = currencyValue.replace(/[.]/g, '');
        currencyValue = currencyValue.replace(',', '.');
        return parseFloat(currencyValue).toFixed(2);
    }

    return (
        <>
            <Modal
                show={props.showModal}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Cadastro de item no Cardápio</Modal.Title>
                </Modal.Header>

                <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Body>
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
                                <textarea
                                    name="descricao"
                                    rows="2"
                                    maxLength="255"
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

                            <div className="row">
                                <div className="col-sm-12 col-md-6 col-lg-6">
                                    <div className="form-group">
                                        <label htmlFor="valorItemCardapio">Valor</label>
                                        <input
                                            name="valor"
                                            type="text"
                                            placeholder="Valor em reais"
                                            className={errors.valor ? "form-control is-invalid" : "form-control"}
                                            id="valorItemCardapio"
                                            value={valores.valor || ''}
                                            onChange={handleChangeValor}
                                            ref={register({
                                                required: {
                                                    value: "Required",
                                                    message: "O valor é obrigatório"
                                                },
                                            })}
                                        />
                                        <span className="error invalid-feedback">{errors.valorItemCardapio && errors.valorItemCardapio.message}</span>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-6">
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
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-12 col-md-6 col-lg-6">
                                    <div className="form-group">
                                        <label htmlFor="tempoEstimadoMin">Tempo estimado mínimo (minutos)</label>
                                        <input
                                            name="tempoEstimadoMin"
                                            type="text"
                                            className={errors.tempoEstimadoMin ? "form-control is-invalid" : "form-control"}
                                            id="tempoEstimadoMin"
                                            placeholder="Tempo mínimo em minutos"
                                            value={valores.tempoEstimadoMin || ''}
                                            onChange={handleChangePositive}
                                            ref={register({
                                                required: {
                                                    value: "Required",
                                                    message: "O tempo estimado min é obrigatório"
                                                },
                                            })}
                                        />
                                        <span className="error invalid-feedback">{errors.tempoEstimadoMin && errors.tempoEstimadoMin.message}</span>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-6">
                                    <div className="form-group">
                                        <label htmlFor="tempoEstimadoMax">Tempo estimado máximo (minutos)</label>
                                        <input
                                            name="tempoEstimadoMax"
                                            type="text"
                                            className={errors.tempoEstimadoMax ? "form-control is-invalid" : "form-control"}
                                            id="tempoEstimadoMax"
                                            placeholder="Tempo máximo em minutos"
                                            value={valores.tempoEstimadoMax || ''}
                                            onChange={handleChangePositive}
                                            ref={register({
                                                required: {
                                                    value: "Required",
                                                    message: "O tempo estimado max é obrigatório"
                                                },
                                            })}
                                        />
                                        <span className="error invalid-feedback">{errors.tempoEstimadoMax && errors.tempoEstimadoMax.message}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="imagemItemCardapio">Imagem do item</label>
                                <input
                                    name="imagem"
                                    type="file"
                                    accept="image/png, image/jpeg, image/jpg"
                                    className={errors.imagem ? "form-control-file is-invalid" : "form-control-file"}
                                    id="imagemItemCardapio"
                                    onChange={handleChangeImagem}
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
                    </Modal.Body>

                    <Modal.Footer>
                        <button type="submit" className="btn btn-primary">Cadastrar</button>
                        <button type="button" className="btn btn-secondary ml-3" onClick={handleClose}>Cancelar</button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}