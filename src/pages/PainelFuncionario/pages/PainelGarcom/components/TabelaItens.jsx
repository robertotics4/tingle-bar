import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import api from '../../../../../services/api';

import BadgeStatus from './BadgeStatus';

export default function TabelaItens(props) {
    const [linhas, setLinhas] = useState([]);
    const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

    useEffect(() => {
        carregarTabela();
    }, []);

    function carregarTabela() {
        const usuarios = props.conta.usuarios;

        usuarios.map(usuario => {
            usuario.pedidos.map(pedido => {
                pedido.itens.map((item, index) => {
                    setLinhas(oldLinhas => [...oldLinhas,
                    <tr key={item.item_id}>
                        <td>{item.item_qtd}</td>
                        <td>{item.titulo}</td>
                        <td><BadgeStatus status={item.item_status} /></td>
                        <td>{usuario.nome_usuario}</td>
                        <td>{currencyFormatter.format(item.item_VALOR)}</td>
                        <td>
                            {item.item_status === 'Pedido pronto' || !item.item_is_cozinha
                                ? <button type="button" className="btn btn-success" onClick={() => handleEntregar(item, index)}>
                                    <i className="fas fa-check"></i>
                                </button>
                                : null
                            }
                        </td>
                    </tr>
                    ]);
                });
            });
        });
    }

    function setItemEntregue(id) {
        linhas.map(linha => {
            console.log(linha.toString());
        });
    }

    async function handleEntregar(item, index) {
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

                    const response = await api.post('/PedidoItem', payload);
                    props.atualizarItens();
                    setItemEntregue(item.item_id);
                    Swal.fire('Sucesso!', 'Pedido entregue com sucesso!', 'success');
                } catch (err) {
                    Swal.fire('Erro!', 'Falha ao entregar item', 'error');
                }
            }
        });
    }

    return (
        <div className="table-responsive p-0">
            <table className="table table-striped table-valign-middle">
                <thead>
                    <tr>
                        <th>Qtd</th>
                        <th>Produto</th>
                        <th>Status</th>
                        <th>Cliente</th>
                        <th>Valor Unit.</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {linhas}
                </tbody>
            </table>
        </div>
    );
}
