import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import api from '../../../../../services/api';

import '../styles/ModalVisualizarMesa.css';

export default function ModalFecharConta(props) {
    const [meiosPagamento, setMeiosPagamento] = useState([]);
    const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    const handleClose = () => props.setShowModal(false);

    useEffect(() => {
        getMeiosPagamento();
    }, []);

    async function getMeiosPagamento() {
        try {
            const response = await api.get('/MeioPagamento');
            setMeiosPagamento(response.data);
            return response.data;
        } catch (err) {
            return err.response;
        }
    }

    async function fecharConta(a) {
        Swal.fire({
            title: 'Deseja fechar a conta?',
            text: "A conta será fechada",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Fechar'
        }).then(async result => {
            if (result.value) {
                try {
                    const response = await api.post("Conta/Fecharconta?idConta=" + a.num_conta + "&total=" + a.valor_total_conta);
                    if (response.status === 201 || response.status === 200) {
                        Swal.fire('Sucesso!', 'Conta Fechada com sucesso!', 'success');
                        props.atualizarItens();
                        handleClose(true);

                    }
                } catch (err) {
                    Swal.fire('Erro!', 'Falha ao fechar conta', 'error');
                }
            }
        });
    }

    async function fecharContaParcial(usuario) {
        Swal.mixin({
            input: 'text',
            confirmButtonText: 'Próximo',
            showCancelButton: true,
            progressSteps: ['1', '2']
        }).queue([
            {
                title: 'Valor',
                text: 'Informe o valor pago',
                inputValue: currencyFormatter.format(usuario.valor_conta_usuario),
                inputPlaceholder: 'R$',
                inputValidator: value => {
                    if (!value) {
                        return 'Favor digitar o valor!'
                    }
                },
            },
            {
                title: 'Forma de pagamento',
                text: 'Selecione a forma de pagamento',
                input: 'select',
                inputPlaceholder: 'Selecione',
                confirmButtonText: 'Confirmar',
                inputOptions: meiosPagamento.map(meioPagamento => meioPagamento.descricao),
                inputValidator: (value) => {
                    return new Promise((resolve) => {
                        if (value)
                            resolve()
                        else
                            resolve('Você precisa selecionar uma opção');
                    });
                }
            },
        ]).then(async result => {
            if (result.value) {
                const indiceMP = parseInt(result.value[1]);
                let total = result.value[0].replace('R$', '');
                total = parseFloat(total.replace(',', '.'));
                
                const payload = {
                    "idUsuarioConta": usuario.id_usuario_conta,
                    "total": total,
                    "meioPagamento": meiosPagamento[indiceMP].id_Meio_Pagamento
                }

                try {
                    const response = await api.post('/Conta/FecharcontaParcial', payload);

                    if (response.status === 201 || response.status === 200) {
                        Swal.fire('Sucesso!', 'Pagamento efetuado com sucesso!', 'success');
                    }
                } catch (err) {
                    if (err.response.status === 401 || err.response.status === 400) {
                        Swal.fire('Erro!', 'Falha no pagamento', 'error');
                    }
                }
            }
        });
    }

    function listarItens() {
        const usuarios = props.conta.usuarios;
        let lista = [];

        usuarios.forEach(usuario => {
            //if (usuarios.length > 1) {
            lista.push(
                <tr className="table-secondary" key={usuario.usuario_id}>
                    <td colSpan="3">
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <strong>{usuario.nome_usuario.toUpperCase()}</strong>
                            <button type="button" className="btn btn-success btn-sm" onClick={() => fecharContaParcial(usuario)}>
                                <strong>Receber</strong>
                                <i className="ml-2 fas fa-hand-holding-usd"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            );
            //}
            usuario.pedidos.forEach(pedido => {
                pedido.itens.forEach(item => {
                    lista.push(
                        <tr key={item.item_id}>
                            <td>{item.item_qtd} x {item.titulo}</td>
                            <td>{currencyFormatter.format(item.item_VALOR)}</td>
                            <td>{currencyFormatter.format(item.item_qtd * item.item_VALOR)}</td>
                        </tr>
                    );
                });
            });
            if (usuarios.length > 1) {
                lista.push(
                    <tr className="table-danger text-right" key={usuario.id_usuario_conta}>
                        <td colSpan="3"><strong>SUBTOTAL: {currencyFormatter.format(usuario.valor_conta_usuario)}</strong></td>
                    </tr>
                );
            }
        });

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
                enforceFocus={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title><strong>{props.conta.desc_mesa.toUpperCase()} - CONTA Nº {props.conta.num_conta}</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ padding: '0px' }}>
                    <div className="table-responsive p-0">
                        <table className="table table-valign-middle">
                            <thead>
                                <tr>
                                    <th>Produto</th>
                                    <th>Valor Unit.</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listarItens()}
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>

                <Modal.Footer className="footer-content">
                    <div className="footer">
                        <span className="texto-total">TOTAL A PAGAR: {currencyFormatter.format(props.conta.valor_total_conta)}</span>
                        <button className="btn btn-info btn-block" onClick={() => fecharConta(props.conta)}>
                            <i className="fas fa-file-invoice-dollar mr-2"  ></i>
                                                    Fechar Conta
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}
