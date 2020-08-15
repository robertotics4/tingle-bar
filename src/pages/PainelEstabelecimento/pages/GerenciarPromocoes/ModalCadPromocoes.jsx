import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { Modal } from 'react-bootstrap';
import { Multiselect } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css';

import './styles/ModalCadPromocoes.css';

import '../../../../components/Loading';

import api from '../../../../services/api';
import Loading from '../../../../components/Loading';

export default function ModalCadPromocoes(props) {
    const [valores, setValores] = useState({});
    const [cardapio, setCardapio] = useState([]);
    const [itens, setItens] = useState([]);
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


                            <div className="form-group">
                                <label htmlFor="selecaoItens">Seleção de itens</label>
                                <Multiselect
                                    placeholder="Selecione os itens"
                                    data={itens}
                                    textField='titulo'
                                    onSelect={item => {
                                        setItensAdicionados([...itensAdicionados, item]);
                                    }}
                                />
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