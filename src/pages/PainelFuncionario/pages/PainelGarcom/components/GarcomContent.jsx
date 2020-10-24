import React, { useState, useEffect, useCallback } from 'react';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import * as SignalR from '@aspnet/signalr';


import Mesa from './Mesa';
import api from '../../../../../services/api';
import ModalFecharConta from './ModalFecharConta';
import ModalVisualizarMesa from './ModalVisualizarMesa';
import Loading from '../../../../../components/Loading';

const TEMPO_LIMITE = 10;

export default function GarcomContent() {
    const [estabelecimento, setEstabelecimento] = useState(null);
    const [contas, setContas] = useState([]);
    const [isGarcom, setIsGarcom] = useState('');
    const [modalFechar, setModalFechar] = useState(false);
    const [modalVisualizar, setModalVisualizar] = useState(false);
    const [contaSelecionada, setContaSelecionada] = useState(null);
    const [loadingVisible, setLoadingVisible] = useState(false);
    const [segundosPassados, setSegundosPassados] = useState(0);

    useEffect(() => {
        configureSocketConnection();

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
        if (segundosPassados === TEMPO_LIMITE) {
            setSegundosPassados(0);
            getContas();
        }

        const interval = setInterval(passouSegundo, 1000);

        return () => {
            clearInterval(interval);
        }
    });

    useEffect(() => {
        getContas();
    }, [estabelecimento, isGarcom]);

    function configureSocketConnection() {
        const connection = new SignalR.HubConnectionBuilder()
            .withUrl("https://www.papya.com.br/pushhub")
            .build();

        connection.on("ReceiveMessage", (user, message) => {
            const msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            const encodedMsg = user + " - " + msg;
            //Swal.fire('Mensagem', encodedMsg, 'info');
             
            
            if (navigator.serviceWorker.controller) {
                console.log("Sendingage to service worker");
                navigator.serviceWorker.controller.postMessage({
                    "command": "oneWayCommunication",
                    "message": encodedMsg,
                    "title":"Pedidos"
                });}
              
            
  
        });

        connection.start().then(() => {
            alert("SignalR Conectado");
        }).catch(function (err) {
            return console.error(err.toString());
        });
    }

    function showPushNotifications() {
        if (contas) {
            const toastConfig = {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Flip,
            }

            var pedidosProntos = 0;
            var pedidosSolicitados = 0;

            contas.forEach(conta => {
                conta.usuarios.forEach(usuario => {
                    usuario.pedidos.forEach(pedido => {
                        pedido.itens.forEach(item => {
                            if (item.item_status === 'Pedido pronto') {
                                pedidosProntos += 1;
                            } else if (item.item_status === 'Solicitado' && !item.item_is_cozinha) {
                                pedidosSolicitados += 1;
                            }
                        });
                    });
                });
            });

            if (pedidosProntos > 0) {
                toast.warn(`Existem ${pedidosProntos} 'pedidos prontos' na cozinha`, { ...toastConfig, toastId: 'toast-prontos' });
            }

            if (pedidosSolicitados > 0) {
                toast.info(`Existem ${pedidosSolicitados} 'pedidos novos'`, { ...toastConfig, toastId: 'toast-novos' });
            }
        }
    }

    async function getContas() {
        setLoadingVisible(true);

        try {
            const response = await api.get(`/ContaDetalhe/GetByEstabelecimento?idEstabelecimento=${estabelecimento.iD_ESTABELECIMENTO}&idFuncionario=${isGarcom}&status_conta=1`);
            const { contas } = response.data;
            setContas(contas);
            return response.data;
        } catch (err) {
            return err.response;
        } finally {
            setLoadingVisible(false);
            showPushNotifications();
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

        if (!existeItens(conta)) {
            Swal.fire('Erro!', 'Não existem pedidos abertos', 'warning');
        } else {
            setModalVisualizar(true);
        }
    }

    function existeItens(conta) {
        var existe = false;

        conta.usuarios.forEach(usuario => {
            usuario.pedidos.forEach(pedido => {
                if (pedido.itens.length > 0) {
                    existe = true;
                }
            });
        });

        return existe;
    }

    const passouSegundo = useCallback(() => {
        setSegundosPassados(segundosPassados + 1);
    }, [segundosPassados]);

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

            {loadingVisible ? <Loading showModal={loadingVisible} /> : null}

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}