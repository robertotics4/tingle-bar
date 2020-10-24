import React, { useState, useEffect } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import * as SignalR from '@aspnet/signalr';
import Loading from '../../components/Loading';
import Swal from 'sweetalert2';
import FormLoginEstabelecimento from '../../components/FormLoginEstabelecimento';
import FormLoginFuncionario from '../../components/FormLoginFuncionario';

export default function LoginEstabelecimento() {
    const [key, setKey] = useState('estabelecimento');
    const [isLoadingVisible, setLoadingVisible] = useState(false);

    useEffect(() => { configureSocketConnection();}, [isLoadingVisible]);

    function configureSocketConnection() {
        const connection = new SignalR.HubConnectionBuilder()
            .withUrl("https://www.papya.com.br/pushhub")
            .build();

        connection.on("ReceiveMessage", (user, message) => {
            const msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            const encodedMsg = user + " - " + msg;
            Swal.fire('Mensagem', encodedMsg, 'info');
                        
            console.log('pedro'+navigator.serviceWorker.controller)
            if (navigator.serviceWorker.controller) {
                console.log("Sendingage to service worker");
                navigator.serviceWorker.controller.postMessage({
                    "command": "oneWayCommunication",
                    "message": encodedMsg,
                    "title":"Pedidos"
                });}
              
            
  
        });

        connection.start().then(() => {
           // alert("SignalR Conectado");
        }).catch(function (err) {
            return console.error(err.toString());
        });
    }

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
        </div>
    );
}