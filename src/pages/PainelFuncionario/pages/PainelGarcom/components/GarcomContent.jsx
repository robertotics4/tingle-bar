import React, { useState, useEffect } from 'react';

import Mesa from './Mesa';
import api from '../../../../../services/api';

import '../styles/GarcomContent.css';

import ModalFecharConta from './ModalFecharConta';
import ModalVisualizarMesa from './ModalVisualizarMesa';

export default function GarcomContent() {
    const [estabelecimento, setEstabelecimento] = useState(null);
    const [contas, setContas] = useState([]);
    const [isGarcom, setIsGarcom] = useState('');
    const [modalFechar, setModalFechar] = useState(false);
    const [modalVisualizar, setModalVisualizar] = useState(false);
    const [contaSelecionada, setContaSelecionada] = useState(null);

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
    }, [isGarcom]);

    useEffect(() => { 
        console.log('render');
    }, [contas]);

    async function getContas() {
        try {
            const response = await api.get(`/ContaDetalhe/GetByEstabelecimento?idEstabelecimento=${estabelecimento.iD_ESTABELECIMENTO}&idFuncionario=${isGarcom}&status_conta=1`);
            const { contas } = response.data;
            setContas(contas);
            return response.data;
        } catch (err) {
            return err.response;
        }
    }

    function onRadioChange(event) {
        const { value } = event.target;

        value === '' ? setIsGarcom(value) : setIsGarcom(Number(estabelecimento.id));
    }

    function onClickFechar(conta) {
        setContaSelecionada(conta);
        setModalFechar(true);
    }

    function onClickVisualizar(conta) {
        setContaSelecionada(conta);
        setModalVisualizar(true);
    }

    return (
        <div className="content-wrapper">

            {/* Content Header (Page header) */}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Monitor de Garçom</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="/#">Garçom</a></li>
                                <li className="breadcrumb-item active">Monitor de Garçom</li>
                            </ol>
                        </div>
                    </div>

                    <div className="row mb-2 ml-0">
                        <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <div className="custom-control custom-radio">
                                <input
                                    className="custom-control-input"
                                    type="radio" id="radioTodas"
                                    name="customRadio"
                                    value=""
                                    onChange={onRadioChange}
                                    defaultChecked
                                />
                                <label htmlFor="radioTodas" className="custom-control-label">Todas as mesas</label>
                            </div>
                            <div className="custom-control custom-radio ml-3 mr-3">
                                <input
                                    className="custom-control-input"
                                    type="radio"
                                    id="radioApenasGarcom"
                                    name="customRadio"
                                    value="1"
                                    onChange={onRadioChange}
                                />
                                <label htmlFor="radioApenasGarcom" className="custom-control-label">Apenas mesas do garçom</label>
                            </div>
                        </div>

                    </div>

                </div>{/* /.container-fluid */}
            </section>

            {/* Main content */}
            <section className="content">
                <div className="container-fluid">

                    <div className="row garcom-content">
                        {contas
                            ? contas.map(conta => (
                                <Mesa
                                    className="col-sm-12 col-md-4 col-lg-3"
                                    key={conta.num_conta}
                                    conta={conta}
                                    onClickFechar={() => onClickFechar(conta)}
                                    onClickVisualizar={() => onClickVisualizar(conta)}
                                />
                            ))
                            : null
                        }
                    </div>

                </div>
            </section>
            {/* /.content */}


            {modalFechar
                ? <ModalFecharConta
                    showModal={modalFechar}
                    setShowModal={setModalFechar}
                    conta={contaSelecionada}
                    atualizarItens={getContas}
                />
                : null
            }

            {modalVisualizar
                ? <ModalVisualizarMesa
                    showModal={modalVisualizar}
                    setShowModal={setModalVisualizar}
                    conta={contaSelecionada}
                    atualizarItens={getContas}
                />
                : null
            }
        </div>
    );
}