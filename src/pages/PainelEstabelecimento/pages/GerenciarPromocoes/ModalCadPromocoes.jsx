import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { Modal } from 'react-bootstrap';

import './styles/ModalCadPromocoes.css';

import '../../../../components/Loading';
import { numberPositiveMask } from '../../../../utils/masks';
import api from '../../../../services/api';

export default function ModalCadPromocoes(props) {
    const [valores, setValores] = useState({});
    const [cardapio, setCardapio] = useState([]);
    const [itens, setItens] = useState([]);
    const [itemSelecionado, setItemSelecionado] = useState(null);
    const [itensAdicionados, setItensAdicionados] = useState([]);

    const { register, handleSubmit, errors } = useForm();

    useEffect(() => {
        getCardapio();
        getItens();
    }, []);

    useEffect(() => {
        getItens();
    }, [cardapio]);

    const onSubmit = data => {
        cadastrarPromocao(data);
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

    async function cadastrarPromocao(dados) {
        handleClose();
        props.setLoadingVisible(true);

        const lista = [];
        const data = new FormData();
        let idPromocao = undefined;
        let payload = null;

        itensAdicionados.map(async i => {
            payload = {
                "DESCRICAO": dados.descricao,
                "DATA_VIGENCIA": dados.dataInicio.toString(),
                "VALIDADE": dados.validade,
                "ID_ESTABELECIMENTO": props.idEstabelecimento,
                "DESCONTO": dados.desconto / 100,
                "CODIGO_ITEM": i.obj.codigo_item,
                "QTD_ITEM": i.quantidade
            };

            lista.push(payload);
        });

        try {
            const response = await api.post('/promocoes', lista, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            Swal.fire('Sucesso!', 'Promoção cadastrada com sucesso!', 'success');

            idPromocao = response.data.idPromocao;

            if (idPromocao) {
                data.append("idPromocao", idPromocao);
                data.append("files", valores.imagem);

                try {
                    await api.post('/promocoes/PostImagem', data, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                } catch (err) {
                    Swal.fire('Erro!', 'Falha ao cadastrar a imagem da promoção', 'error');
                }
            }
        } catch (err) {
            Swal.fire('Erro!', 'Falha ao cadastrar promoção', 'error');
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

    function handleChangeImagem(e) {
        setValores({ ...valores, imagem: e.target.files[0] });
    }

    function handleChangePositive(e) {
        const { name, value } = e.target;
        setValores({ ...valores, [name]: numberPositiveMask(value) });
    }

    function getItens() {
        let itens = [];

        if (cardapio) {
            cardapio.map(obj => {
                itens.push(obj);
            });

            setItens(itens);
        }
    };

    function handleChangeItem(event) {
        setItemSelecionado(JSON.parse(event.target.value));
    }

    function adicionarItem() {
        if (itemSelecionado && valores.quantidade) {
            const item = { obj: itemSelecionado, quantidade: valores.quantidade };
            let existe = false;

            itensAdicionados.map(i => {
                if (i.obj.codigo_item === item.obj.codigo_item) {
                    existe = true;
                }
            });

            if (!existe) {
                setItensAdicionados([...itensAdicionados, item]);
            }
        }
    }

    function removerItem(index) {
        itensAdicionados.splice(index, 1);
        setItensAdicionados([...itensAdicionados]);
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
                                            type="text"
                                            placeholder="Validade em dias"
                                            className={errors.validade ? "form-control is-invalid" : "form-control"}
                                            id="validade"
                                            value={valores.validade || ''}
                                            onChange={handleChangePositive}
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
                                            type="text"
                                            max="100"
                                            placeholder="Desconto em %"
                                            className={errors.desconto ? "form-control is-invalid" : "form-control"}
                                            id="desconto"
                                            value={valores.desconto || ''}
                                            onChange={handleChangePositive}
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

                                            {itens.map((obj, objIndex) => {
                                                return <optgroup key={objIndex} label={obj.categoria}>
                                                    {obj.itens.map(objItem => (
                                                        <option key={objItem.codigo_item} value={JSON.stringify(objItem)}>{objItem.titulo}</option>
                                                    ))}
                                                </optgroup>
                                            })}

                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-2 col-lg-2">
                                    <div className="form-group">
                                        <input
                                            name="quantidade"
                                            type="text"
                                            placeholder="Qtd"
                                            className="form-control"
                                            value={valores.quantidade || ''}
                                            onChange={handleChangePositive}
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
                                        <div className="itens-adicionados">
                                            {itensAdicionados.map((item, index) => {
                                                return (
                                                    <div key={item.obj.codigo_item} className="item-adicionado">
                                                        <strong>{item.obj.titulo}</strong>&nbsp;({item.quantidade})
                                                        <button type="button" className="close ml-2" onClick={() => (removerItem(index))}>
                                                            <span aria-hidden="true">×</span>
                                                        </button>
                                                    </div>
                                                );
                                            })}
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
        </>
    );
}