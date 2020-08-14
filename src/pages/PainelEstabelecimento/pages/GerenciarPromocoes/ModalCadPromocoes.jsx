import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { Modal } from 'react-bootstrap';

import './styles/ModalCadPromocoes.css';

import '../../../../components/Loading';

import api from '../../../../services/api';
import Loading from '../../../../components/Loading';
import { currencyMask } from '../../../../utils/masks';

export default function ModalCadPromocoes(props) {
    const [valores, setValores] = useState({});
    const [cardapio, setCardapio] = useState([]);
    const [isLoadingVisible, setLoadingVisible] = useState(false);

    const { register, handleSubmit, errors } = useForm();

    useEffect(() => {
        getCardapio();
    }, []);

    useEffect(() => { }, [cardapio]);

    const onSubmit = data => {
        console.log(data);
        // cadastrarItem(data);
    };

    const handleClose = () => props.setShowModal(false);

    async function getCardapio() {
        try {
            const response = await api.get('/Cardapio/' + props.idEstabelecimento);
            setCardapio(response.data);
            return response.data;
        } catch (err) {
            return err.response;
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

    function handleChangeValor(event) {
        const { value } = event.target;
        setValores({ ...valores, valor: currencyMask(value) });
    }

    function handleChangeImagem(e) {
        setValores({ ...valores, imagem: e.target.files[0] });
    }

    function getFloatFromCurrency(currencyValue) {
        currencyValue = currencyValue.replace(/[.]/g, '');
        currencyValue = currencyValue.replace(',', '.');
        return parseFloat(currencyValue).toFixed(2);
    }

    function listarCardapio() {
        let lista = [];

        if (cardapio) {
            cardapio.map((categoria, indexCategoria) => {
                console.log(cardapio);
                categoria.itens.map((item, indexItem) => {
                    lista.push(
                        <tr key={item.codigo_item}>
                            <th scope="row">{item.titulo}</th>
                            <td>teste</td>
                            <td></td>
                            <td></td>
                        </tr>
                    );
                })
            })
        }

        return lista;
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
                                <div className="col">
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
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="validade">Validade da promoção (em dias)</label>
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
                                <div className="col">
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

                            <div className="card-body table-responsive p-0 itens-promocao">
                                <table className="table table-valign-middle">
                                    <thead>
                                        <tr>
                                            <th className="titulos-tabela">Título</th>
                                            <th className="titulos-tabela">Categoria</th>
                                            <th className="titulos-tabela">Quantidade</th>
                                            <th className="titulos-tabela"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listarCardapio()}
                                    </tbody>
                                </table>
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