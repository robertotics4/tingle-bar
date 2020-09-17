import React, { useState, useEffect } from 'react';

import Pedido from './Pedido';
import api from '../../../../../services/api';

export default function CozinhaContent() {
    const [estabelecimento, setEstabelecimento] = useState(null);
    const [contas, setContas] = useState([]);

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

    async function getContas() {
        try {
            const response = await api.get(`/ContaDetalhe/GetByEstabelecimento?idEstabelecimento=${estabelecimento.id_Estabelecimento}&is_cozinha=1&status_conta=1&status_item=1`);
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

    return (
        <div className="content-wrapper">

            {/* Content Header (Page header) */}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Cozinha</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="/painelEstabelecimento">Home</a></li>
                                <li className="breadcrumb-item active">Cozinha</li>
                            </ol>
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
