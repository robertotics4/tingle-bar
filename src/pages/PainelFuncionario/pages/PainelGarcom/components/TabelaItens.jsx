import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import api from '../../../../../services/api';

import BadgeStatus from './BadgeStatus';

export default function TabelaItens(props) {
    const [itens, setItens] = useState([]);
    const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

    useEffect(() => {
        carregarItens();
    }, []);

    useEffect(() => { }, [itens]);

    function carregarItens() {
        const usuarios = props.conta.usuarios;

        usuarios.forEach(usuario => {
            usuario.pedidos.forEach(pedido => {
                pedido.itens.forEach(item => {
                    item.usuario = usuario.nome_usuario;
                    setItens(oldItens => [...oldItens, item]);
                });
            });
        });
    }

    async function handleEntregar(item) {
        Swal.fire({
            title: 'Deseja entregar o item?',
            text: "O item será entregue",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Entregar'
        }).then(async result => {
            if (result.value) {
                try {
                    const payload = {
                        "id": item.item_id,
                        "fk_status_id": 5
                    }

                    await api.post('/PedidoItem', payload);

                    itens.forEach(i => {
                        if (i.item_id === item.item_id) {
                            i.item_status = 'Entregue';
                        }
                    });

                    props.atualizarItens();

                    Swal.fire('Sucesso!', 'Pedido entregue com sucesso!', 'success');
                } catch (err) {
                    Swal.fire('Erro!', 'Falha ao entregar item', 'error');
                }
            }
        });
    }


    let it = itens.filter(item => item.item_is_cozinha && item.item_status === 'Pedido pronto' || !item.item_is_cozinha && item.item_status !== 'Entregue');

    function listarItens() {
        const usuarios = props.conta.usuarios;
        let lista = [];

        usuarios.forEach(usuario => {
            if (usuarios.length > 1) {
                usuario.pedidos.forEach(pedido => {
                    pedido.itens.forEach(item => {
                        if (item.item_status === 'Pedido pronto') {
                            lista.push(
                                <tr className="table-secondary" key={usuario.cpf_usuario}>
                                    <td colSpan="5">
                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <strong>{usuario.nome_usuario.toUpperCase()}</strong>

                                        </div>
                                    </td>
                                </tr>
                            )
                        };
                    });
                });
            }

            usuario.pedidos.forEach(pedido => {
                const itens = pedido.itens.filter(it => it.item_is_cozinha && it.item_status === 'Pedido pronto' || !it.item_is_cozinha && it.item_status !== 'Entregue')

                itens.forEach(item => {
                    lista.push(
                        <tr key={item.item_id}>
                            <td>{item.item_qtd}</td>
                            <td>{item.titulo}</td>
                            <td><BadgeStatus status={item.item_status} /></td>
                            <td>{currencyFormatter.format(item.item_VALOR_DESCONTO)}</td>
                            <td>
                                {item.item_is_cozinha && item.item_status === 'Pedido pronto' ?
                                    <button type="button" className="btn btn-success" onClick={() => handleEntregar(item)}>
                                        <i className="fas fa-check"></i>
                                    </button>
                                    : !item.item_is_cozinha && item.item_status !== 'Entregue' ?
                                        <button type="button" className="btn btn-success" onClick={() => handleEntregar(item)}>
                                            <i className="fas fa-check"></i>
                                        </button>
                                        : null
                                }
                            </td>
                        </tr>
                    );
                });
            });
        });

        return lista;
    }
    return (

        <div className="table-responsive p-0">
            <table className="table table-striped table-valign-middle">
                <thead>
                    <tr>
                        <th>Qtd</th>
                        <th>Produto</th>
                        <th>Status</th>
                        <th>Valor Unit.</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    {listarItens()}
                </tbody>
            </table>
        </div>
    );
}