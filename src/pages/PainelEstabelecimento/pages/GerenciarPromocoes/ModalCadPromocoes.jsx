import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { Modal } from 'react-bootstrap';
import Select from 'react-select';

import './styles/ModalCadPromocoes.css';

import '../../../../components/Loading';

import api from '../../../../services/api';
import Loading from '../../../../components/Loading';

export default function ModalCadPromocoes(props) {
    const [valores, setValores] = useState({});
    const [cardapio, setCardapio] = useState([]);
    const [itens, setItens] = useState([]);
    const [itemSelecionado, setItemSelecionado] = useState(null);
    const [itensAdicionados, setItensAdicionados] = useState([]);
    const [isLoadingVisible, setLoadingVisible] = useState(false);

    const { register, handleSubmit, errors } = useForm();

    useEffect(() => {
        getCardapio();
        getItens();
    }, []);

    useEffect(() => {
        getItens();
    }, [cardapio]);

    const onSubmit = data => {
        //  
        // cadastrarItem(data);
    };

    const handleClose = () => props.setShowModal(false);

    async function getCardapio() {
        try {
            const response = await api.get('/Cardapio/' + props.idEstabelecimento);
            setCardapio(response.data);

        } catch (err) {
            console.log(err.response);
        }
    }

    async function cadastrarItem(dados) {
        setLoadingVisible(true);

        const data = new FormData();

        // data.append("titulo", dados.titulo);
        // data.append("descricao", dados.descricao);
        // data.append("valor", getFloatFromCurrency(valores.valor));
        // data.append("tempo_estimado_min", dados.tempoEstimadoMin);
        // data.append("tempo_estimado_max", dados.tempoEstimadoMax);
        // data.append("categoria", dados.categoria);
        // data.append("estabelecimento", props.idEstabelecimento);
        // data.append("iscozinha", valores.isCozinha ? 1 : 0);
        // data.append("iscardapio", valores.isCardapio ? 1 : 0);
        // data.append("files", valores.imagem);

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
            if (err.response.status === 401 || err.response.status === 400) {
                Swal.fire('Erro!', 'Falha ao cadastrar item', 'error');
            }
        } finally {
            setLoadingVisible(false);
            props.atualizarItens();
            handleClose();
        }
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setValores({ ...valores, [name]: value });
        console.log(value);
    }

    function handleChangeImagem(e) {
        setValores({ ...valores, imagem: e.target.files[0] });
    }

    function getItens() {
        let itens = [];

        if (cardapio) {
            cardapio.map(categoria => {
                categoria.itens.map(item => {
                    itens.push(item);
                });
            });

            setItens(itens);
        }
    };

    function handleChangeItem(event) {
        setItemSelecionado(event.target.value);
    }

    function adicionarItem() {
        if (itemSelecionado && valores.quantidade) {
            setItensAdicionados([...itensAdicionados, { id: itemSelecionado, quantidade: valores.quantidade }]);
        }
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
                    <Modal.Title>Cadastro de Promoções</Modal.Title>
                </Modal.Header>

                <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Body>
                        <div className="card-body">

                            <div className="form-group">
                                <label htmlFor="descricao">Descrição da promoção</label>
                                <input
                                    name="descricao"
                                    type="text"
                                    className={errors.descricao ? "form-control is-invalid" : "form-control"}
                                    id="descricao"
                                    placeholder="Descrição"
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
                                <div className="col-sm-12 col-md-6 col-lg-4">
                                    <div className="form-group">
                                        <label htmlFor="dataInicio">Início da promoção</label>
                                        <input
                                            name="dataInicio"
                                            type="date"
                                            className={errors.dataInicio ? "form-control is-invalid" : "form-control"}
                                            id="dataInicio"
                                            placeholder="Data de início da promoção"
                                            onChange={handleChange}
                                            ref={register({
                                                required: {
                                                    value: "Required",
                                                    message: "A data de início é obrigatória"
                                                },
                                            })}
                                        />
                                        <span className="error invalid-feedback">{errors.dataInicio && errors.dataInicio.message}</span>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-4">
                                    <div className="form-group">
                                        <label htmlFor="validade">Validade (em dias)</label>
                                        <input
                                            name="validade"
                                            type="number"
                                            min="0"
                                            placeholder="Validade em dias"
                                            className={errors.validade ? "form-control is-invalid" : "form-control"}
                                            id="validade"
                                            onChange={handleChange}
                                            ref={register({
                                                required: {
                                                    value: "Required",
                                                    message: "A validade é obrigatória"
                                                },
                                            })}
                                        />
                                        <span className="error invalid-feedback">{errors.validade && errors.validade.message}</span>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-4">
                                    <div className="form-group">
                                        <label htmlFor="desconto">Desconto (%)</label>
                                        <input
                                            name="desconto"
                                            type="number"
                                            min="0"
                                            max="100"
                                            placeholder="Desconto em %"
                                            className={errors.desconto ? "form-control is-invalid" : "form-control"}
                                            id="desconto"
                                            onChange={handleChange}
                                            ref={register({
                                                required: {
                                                    value: "Required",
                                                    message: "O desconto é obrigatório"
                                                },
                                            })}
                                        />
                                        <span className="error invalid-feedback">{errors.desconto && errors.desconto.message}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="imagem">Imagem da promoção</label>
                                <input
                                    name="imagem"
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    className={errors.imagem ? "form-control-file is-invalid" : "form-control-file"}
                                    id="imagem"
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


                            <div className="selecao-itens">
                                <label htmlFor="selecaoItens">Seleção de itens</label>
                                <div className="row">
                                    <div className="col-sm-12 col-md-8 col-lg-8">
                                        <div className="form-group">
                                            <select
                                                defaultValue=""
                                                name="selecionarItem"
                                                className="form-control"
                                                onChange={handleChangeItem}
                                            >
                                                <option disabled value="">Selecione</option>
                                                {itens.map(item => <option key={item.codigo_item} value={item.codigo_item}>{item.titulo}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-2 col-lg-2">
                                        <div className="form-group">
                                            <input
                                                name="quantidade"
                                                type="number"
                                                min="0"
                                                placeholder="Qtd"
                                                className="form-control"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-2 col-lg-2">
                                        <div className="form-group">
                                            <button type="button" className="form-control btn btn-success btn-sm" onClick={adicionarItem}>
                                                <i className="fas fa-plus-circle mr-2"></i>
                                                    Add
                                        </button>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-group">
                                            <ul className="lista-itens">
                                                {itensAdicionados.map(item => {
                                                    return (
                                                        <li key={item.id} className="item">
                                                            <span>{item.id}</span>
                                                            <span>x{item.quantidade}</span>
                                                            <i className="fas fa-times btn-excluir"></i>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    </div>


                                </div>
                            </div>


                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <button type="submit" className="btn btn-primary">Cadastrar</button>
                        <button type="button" className="btn btn-secondary ml-3" onClick={handleClose}>Cancelar</button>
                    </Modal.Footer>
                </form>
            </Modal>

            {isLoadingVisible ? <Loading /> : null}
        </>
    );
}