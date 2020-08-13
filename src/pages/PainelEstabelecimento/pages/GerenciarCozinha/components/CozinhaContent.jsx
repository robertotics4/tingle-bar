import React, { useState, useEffect } from 'react';

import Pedido from './Pedido';
import api from '../../../../../services/api';

export default function CozinhaContent() {
    const [estabelecimento, setEstabelecimento] = useState(null);
    const [contas, setContas] = useState([]);

    console.log(contas);

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
            const response = await api.get(`/ContaDetalhe/GetByEstabelecimento?idEstabelecimento=${estabelecimento.id_Estabelecimento}&is_cozinha=1&status_conta=1`);
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
            {
                contas.map((conta, contaIndex) => {
                    conta.usuarios.map((usuario, usuarioIndex) => {
                        usuario.pedidos.map((pedido, pedidoIndex) => {
                            pedidos.push(<Pedido key={pedido.pedido_id} conta={conta} usuario={usuario} pedido={pedido} />);
                        })
                    })
                })
            }
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
                            <h1>Monitor de Preparo</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Cozinha</a></li>
                                <li className="breadcrumb-item active">Monitor de preparo</li>
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
