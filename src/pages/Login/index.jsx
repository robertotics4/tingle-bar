import React, { useState, useEffect } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import * as SignalR from '@aspnet/signalr';
import Loading from '../../components/Loading';
import Swal from 'sweetalert2';
import FormLoginEstabelecimento from '../../components/FormLoginEstabelecimento';
import FormLoginFuncionario from '../../components/FormLoginFuncionario';
import { AppConfiguration } from "read-appsettings-json";
import axios from 'axios';


export default function LoginEstabelecimento(props) {
    const [key, setKey] = useState('estabelecimento');
    const [isLoadingVisible, setLoadingVisible] = useState(false);
    //Teste
    const [subscVisible, setsubscVisible] = useState("");
    const [swreg, setswreg] = useState(null);

    const [nome, setNome] = useState("");
    const [endpoint, setendpoint] = useState("");
    const [p256dh, setp256dh] = useState("");
    const [auth, setauth] = useState("");
    const [notificacao, setNotificacao] = useState([]);
    const [notificacaoSelecionada, setnotificacaoSelecionada] = useState(null);

    function handleChangeNome(event) {
        setNome(event.target.value);
    }
    function handleNotificar(notificacao) {
        setnotificacaoSelecionada(notificacao);
        alert(notificacao.client);
        //setModalVisualizar(true);
    }
    
    
    //console.log(navigator.serviceWorker.controller)

    //useEffect(() => { configureSocketConnection();}, [isLoadingVisible]);

    // function configureSocketConnection() {
    //     const connection = new SignalR.HubConnectionBuilder()
    //         .withUrl("https://www.papya.com.br/pushhub")
    //         .build();

    //     connection.on("ReceiveMessage", (user, message) => {
    //         const msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    //         const encodedMsg = user + " - " + msg;
    //         //Swal.fire('Mensagem', encodedMsg, 'info');
            
    //             console.log("Sendingage to service worker");
    //             navigator.serviceWorker.controller.postMessage({
    //                 "command": "oneWayCommunication",
    //                 "message": encodedMsg,
    //                 "title":"Pedidos"
    //             });
    //     });

    //     connection.start().then(() => {
    //        // alert("SignalR Conectado");
    //     }).catch(function (err) {
    //         return console.error(err.toString());
    //     });
    // }

     //######## Configuracoes de PUSH #########

    async function cadastrarNotificacao() {
        try {
            const payload = {
                "fkestabelecimento": 38,
                "client": nome,
                "endPoint": endpoint,
                "p256dh": p256dh,
                "auth": auth
            }
            const response = await axios.post('https://www.papya.com.br/api/Notificacao', payload);
            if (response.data) {
                setNotificacao(response.data)
            }
        } catch (err)
        {
             console.log('Erro');
        }
      }

      async function getNotificacao() {
        try {
            let idEstabelecimento = 38;
          const response = await axios.get(`https://www.papya.com.br/api/Notificacao?idEstabelecimento=${idEstabelecimento}` ,{
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
          if (response.data) {
            console.log(response.data);
            setNotificacao(response.data);
          }
        } catch (err) {
          alert(err);
        }
      }
        
     
        if ('serviceWorker' in navigator) {
            window.addEventListener("load", () => {
                navigator.serviceWorker.register("../service-worker-papya.js")
                .then((reg) => {
                    setswreg(reg);
                    if (Notification.permission === "granted")
                    {   
                        //setsubscVisible("granted");
                        //console.log(AppConfiguration.Setting().VAPID.publicKey);
                        //alert(subscVisible);
                        //$("#form").show();
                        getSubscription(reg);
                    } else if (Notification.permission === "blocked" || Notification.permission === "denied" ) {
                        //setsubscVisible("blocked");
                        //$("#NoSupport").show();
                    } else {
                        //setsubscVisible("giveaccess");
                        //$("#GiveAccess").show();
                        //$("#PromptForAccessBtn").click(() => requestNotificationAccess(reg));
                        //this.btnPrompt.click(() => requestNotificationAccess(reg));
                    }
                });

            });
        } else {
            //setsubscVisible("blocked");
            //$("#NoSupport").show();
        }

        async function requestNotificationAccess(reg) {
            //alert('chamou');
            await Notification.requestPermission(function (status) {
                //$("#GiveAccess").hide();
                //alert(status);
                if (status == "granted") {
                    setsubscVisible("granted");
                    //$("#form").show();
                    getSubscription(reg);
                } else {
                    setsubscVisible("blocked");
                    //$("#NoSupport").show();
                }
            });
        }
        function getSubscription(reg)
        {
            reg.pushManager.getSubscription().then(function (sub) {
                if (sub === null) {
                    reg.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: AppConfiguration.Setting().VAPID.publicKey
                    }).then(function (sub) {
                        fillSubscribeFields(sub);
                    }).catch(function (e) {
                        console.error("Unable to subscribe to push", e);
                    });
                } else {
                    fillSubscribeFields(sub);
                }
            });
        }
        function fillSubscribeFields(sub) {
            setendpoint(sub.endpoint);
            setp256dh(arrayBufferToBase64(sub.getKey("p256dh")));
            setauth(arrayBufferToBase64(sub.getKey("auth")));
        }
        function arrayBufferToBase64(buffer) {
            var binary = '';
            var bytes = new Uint8Array(buffer);
            var len = bytes.byteLength;
            for (var i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            return window.btoa(binary);
        }
    //######## Configuracoes de PUSH #########

    //getNotificacao();
    localStorage.setItem('@TBAuth:endPoint', endpoint);
    localStorage.setItem('@TBAuth:p256dh', p256dh);
    localStorage.setItem('@TBAuth:auth', auth);
    //console.log(endpoint);

    return (
        <div className="hold-transition login-page">
            <div className="login-box">
                <div className="login-logo">
                    <a href="/#"><b>Tingle</b>Bar</a>
                </div>
                {/* /.login-logo */}

                <Tabs
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                >
                    <Tab eventKey="estabelecimento" title="Estabelecimento">
                        <FormLoginEstabelecimento setLoadingVisible={setLoadingVisible}/>
                    </Tab>
                    <Tab eventKey="funcionario" title="Funcionário">
                        <FormLoginFuncionario setLoadingVisible={setLoadingVisible} />
                    </Tab>
                </Tabs>

            </div>
            {/* /.login-box */}

            {isLoadingVisible ? <Loading showModal={isLoadingVisible} /> : null}
            


            {/* @*FORMULARIO DADOS DE PUSH*@ */}
            {/* className={subscVisible ? "showDiv" : "hideDiv"} */}
            {/* <h1>Subscribe to Push Notifications</h1> */}
            <div id="GiveAccess" style={subscVisible=="giveaccess"? {visibility: "visible"}:{visibility: "hidden"}}>
                Give access to making notifications:
                <button id="PromptForAccessBtn" onClick={() => requestNotificationAccess(swreg)}>Prompt
                </button>
            </div>
            <div id="NoSupport" style={subscVisible=="blocked"? {visibility: "visible"}:{visibility: "hidden"}}>
                Your browser does not support Push Notifications or you have blocked notifications
            </div>
            <div id="form"  style={subscVisible=="granted"? {visibility: "visible"}:{visibility: "hidden"}} >
                <label>SEU NOME É: </label>
                <input id="nome" name="client" value={nome} placeholder="Nome" onChange={handleChangeNome} /><br />
                <input id="endpoint" name="endpoint"  value={endpoint}  placeholder="Endpoint" readOnly /><br />
                <input id="p256dh" name="p256dh" value={p256dh} placeholder="p256dh" readOnly /><br />
                <input id="auth" name="auth" value={auth} placeholder="auth" readOnly /><br />

                <button onClick={() => cadastrarNotificacao()} >Subscribe</button>
            </div>

        </div>

    );
}