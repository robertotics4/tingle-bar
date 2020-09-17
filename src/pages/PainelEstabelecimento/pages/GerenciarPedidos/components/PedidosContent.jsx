import React, { useState, useEffect } from 'react';

import Pedido from './Pedido';
import api from '../../../../../services/api';

export default function PedidosContent() {
    const [estabelecimento, setEstabelecimento] = useState(null);
    const [contas, setContas] = useState([]);
    const [isCozinha, setIsCozinha] = useState('');

    useEffect(() => {
        async function loadStoragedData() {
            const storagedEstabelecimento = localStorage.getItem('@TBAuth:estabelecimento');

            if (storagedEstabelecimento) {
                setEstabelecimento(JSON.parse(storagedEstabelecimento));
            }
        }

        loadStoragedData();
        getContas();
    }, []);

    useEffect(() => {
        getContas();
    }, [estabelecimento]);

    useEffect(() => {
        getContas();
    }, [isCozinha]);

    async function getContas() {
        try {
            const response = await api.get(`/ContaDetalhe/GetByEstabelecimento?idEstabelecimento=${estabelecimento.id_Estabelecimento}&is_cozinha=${isCozinha}&status_conta=1&status_item=1`);
            const { contas } = response.data;
            setContas(contas);
            return response.data;
        } catch (err) {
            return err.response;
        }
    }

    function pedidosCozinha() {
        let pedidos = [];

        if (contas) {
            contas.forEach(conta => {
                conta.usuarios.forEach(usuario => {
                    usuario.pedidos.forEach(pedido => {
                        pedidos.push(<Pedido key={pedido.pedido_id} conta={conta} usuario={usuario} pedido={pedido} atualizarLista={getContas} />);
                    });
                });
            });
        }

        return pedidos;
    }

    function onRadioChange(event) {
        const { value } = event.target;

        value === '' ? setIsCozinha(value) : setIsCozinha(Number(event.target.value));
    }

    return (
        <div className="content-wrapper">

            {/* Content Header (Page header) */}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Monitor de Gerente</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Pedidos</a></li>
                                <li className="breadcrumb-item active">Monitor de Pedidos</li>
                            </ol>
                        </div>
                    </div>

                    <div className="row mb-2 ml-0">
                        <div className="form-group" style={{ display: 'flex', flexDirection: 'row' }}>
                            <div className="custom-control custom-radio">
                                <input
                                    className="custom-control-input"
                                    type="radio" id="radioTodos"
                                    name="customRadio"
                                    value=""
                                    onChange={onRadioChange}
                                    defaultChecked
                                />
                                <label htmlFor="radioTodos" className="custom-control-label">Todos</label>
                            </div>
                            <div className="custom-control custom-radio ml-3">
                                <input
                                    className="custom-control-input"
                                    type="radio"
                                    id="radioApenasCozinha"
                                    name="customRadio"
                                    value="1"
                                    onChange={onRadioChange}
                                />
                                <label htmlFor="radioApenasCozinha" className="custom-control-label">Apenas itens de cozinha</label>
                            </div>
                            <div className="custom-control custom-radio ml-3">
                                <input
                                    className="custom-control-input"
                                    type="radio"
                                    id="radioApenasImediatos"
                                    name="customRadio"
                                    value="0"
                                    onChange={onRadioChange}
                                />
                                <label htmlFor="radioApenasImediatos" className="custom-control-label">Apenas itens de entrega imediata</label>
                            </div>
                        </div>
                    </div>

                </div>{/* /.container-fluid */}
            </section>

            {/* Main content */}
            <section className="content">
                <div className="container-fluid">

                    {pedidosCozinha()}

                </div>
            </section>
            {/* /.content */}
        </div>
    );
}
