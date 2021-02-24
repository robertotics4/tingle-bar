import React, { useState, useEffect } from 'react';
import Loading from '../../../components/Loading';  
import Swal from 'sweetalert2';
import { AppConfiguration } from "read-appsettings-json";
import axios from 'axios';
import { ToastContainer, toast, Flip } from 'react-toastify';
import { Modal, ResponsiveEmbed } from 'react-bootstrap';
import '../../../styles/ModalPush.css';
import { promised } from 'q';
import { promises } from 'fs';
import api from '../../../services/api';

export default function PushRegistry() {
    //const [key, setKey] = useState('estabelecimento');
    
    //Teste
    const [estabelecimento, setEstabelecimento] = useState(null);
    const [subscVisible, setsubscVisible] = useState("");
    const [swreg, setswreg] = useState(null);
    const [client, setClient] = useState("");
    const [endpoint, setendpoint] = useState("");
    const [p256dh, setp256dh] = useState(null);
    const [auth, setauth] = useState(null);
    const [notificacao, setNotificacao] = useState([])
    const [cadastroExiste, setCadastroExiste] = useState(false)
    const [funcionario, setFuncionario] = useState(null);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    useEffect(() => {
        pegarDadosProcessados();
        registrarServiceWork();
    }, []);

    

    // useEffect(() => {
    //     registrarServiceWork();
    // }, [cadastroExiste]);

    
    //console.log(typeof(auth));
    //console.log(auth);

    // useEffect(() => {
    //     registrarServiceWork();
    // },[cadastroExiste])

     //######## Configuracoes de PUSH #########

     async function pegarDadosProcessados() {
        let v;
        try {
            v = await loadStoragedData();
        } catch(e) {
            v = null;
        }
        let validou = await validarCadastro(v);
        //console.log(validou);
        //registrarServiceWork(validou);
      }

      async function loadStoragedData() {
        //const storagedFuncionario = localStorage.getItem('@TBAuth:funcionario');
        const vendpoint = localStorage.getItem('@TBAuth:endPoint');
        const vp256dh = localStorage.getItem('@TBAuth:p256dh');
        const vauth = localStorage.getItem('@TBAuth:auth');
        const storagedEstabelecimento = localStorage.getItem('@TBAuth:estabelecimento');
        
            if (storagedEstabelecimento) {
                //setFuncionario(JSON.parse(storagedFuncionario));
                setEstabelecimento(JSON.parse(storagedEstabelecimento));
            }
            setendpoint(vendpoint);
            setp256dh(vp256dh);
            setauth(vauth);
            return JSON.parse(storagedEstabelecimento)
    }
     
     async function validarCadastro(dados) {
        try {
            if(dados !=null){
                const response =  await api.get(`/Notificacao/${dados.iD_ESTABELECIMENTO}/${dados.id}` ,{
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                //console.log(response.data);
                if (response.data && response.data.existe==1) {
                    //alert('Setou como true');
                    setCadastroExiste(true);
                    return true;
                  }else{
                    //alert('Setou como false');
                    handleShow();
                    setCadastroExiste(false);
                    return false;
                  }
            }else{
                console.log('Estabelecimemto vazio');
            }
        } catch (err) {
          alert(err);
        }
      } 

      async function registrarServiceWork(){
        //alert('aqui');
        if ('serviceWorker' in navigator) {
            window.addEventListener("load", () => {
                navigator.serviceWorker.register("../service-worker-papya.js")
                .then((reg) => {
                    setswreg(reg);
                    if (Notification.permission === "granted")
                    {
                        //alert('granted');
                        setsubscVisible("granted");
                        getSubscription(reg);
                        //console.log(validacao);
                        // if(cadastroExiste==false)
                        // {
                        //     alert('mostrar popoup');
                        //     //handleShow();
                        // }
                    } else if (Notification.permission === "blocked" || Notification.permission === "denied" ) {
                        //setsubscVisible("blocked");
                        showPushNotifications();
                    } 
                    else {
                        setsubscVisible("giveaccess");
                        requestNotificationAccess(reg);
                    }
                });

            });
        } else {
            alert('Bloquado');
            setsubscVisible("blocked");
        }
    }


     async function CadastrarNotificacao() {
         if(estabelecimento)
         {
            // console.log(estabelecimento.id);
            // console.log(estabelecimento.iD_ESTABELECIMENTO);
            // console.log(endpoint);
            // console.log(p256dh);

            try {
                const payload = {
                    "fkestabelecimento": estabelecimento.iD_ESTABELECIMENTO,
                    "client": estabelecimento.id,
                    "endPoint": endpoint,
                    "p256dh": p256dh,
                    "auth": auth
                }
              const response = await api.post('/Notificacao', payload );
              
              if (response.data) {
                setNotificacao(response.data);
              }
            } catch (err) {
                console.log(err.message);
            }
            handleClose();
        }
      }
        

        async function requestNotificationAccess(reg) {
            await Notification.requestPermission(function (status) {
                if (status == "granted") {
                    setsubscVisible("granted");
                    getSubscription(reg);
                } else {
                    setsubscVisible("blocked");
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
                        console.log(sub);
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
            // setendpoint(sub.endpoint);
            // setp256dh(arrayBufferToBase64(sub.getKey("p256dh")));
            // setauth(arrayBufferToBase64(sub.getKey("auth")));
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

        function showPushNotifications() {
            const toastConfig = {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Flip
                //onClick : () => requestNotificationAccess(swreg)
            }
            //if(tipo=="Block"){
                toast.info('Seu browser não suporta notificação push, ou você precisa permitir notificações.', { ...toastConfig, toastId: 'toast-novos' });
            //}else{
            //    toast.info('O Papya solicita autorização para enviar notificação push.', { ...toastConfig, toastId: 'toast-novos' });
            //}
        }

        
        
    //######## Configuracoes de PUSH #########

    return (
        <div>
            <input id="endpoint" name="endpoint"  value={endpoint}  placeholder="Endpoint" hidden /><br />
            <input id="p256dh" name="p256dh" value={p256dh} placeholder="p256dh" hidden /><br />
            <input id="auth" name="auth" value={auth} placeholder="auth" hidden /><br />
            
            {/* <button onClick={()=> handleShow()}>mostrar modal</button> */}
            {/* <div className="login-box">
                <div className="login-logo">
                    <a href="/#"><b>Tingle</b>Bar</a>
                </div>
            </div>
        

            <div className="card-body p-0">
                <table className="table table-striped projects">
                <thead>
                    <tr>
                        <th style={{ width: '20%' }}>Estabelecimento</th>
                        <th style={{ width: '20%' }}>Clien</th>
                        <th style={{ width: '20%' }}>Endpoint</th>
                        <th style={{ width: '20%' }}>Chave 1</th>
                        <th style={{ width: '20%' }}>Auth</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>

                <tbody>

                {notificacao.map((item, index) => {
                        return <tr key={item.id}>
                            <td>{item.fkestabelecimento}</td>
                            <td>{item.client}</td>
                            <td>{item.endPoint}</td>
                            <td>{item.p256dh}</td>
                            <td>{item.auth}</td>
                        </tr>
                    })}

                </tbody>
            </table>
            </div> */}
            

           
            {/* {modal? */}
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Notificação</Modal.Title>
            </Modal.Header>
            <Modal.Body>Você precisa autorizar para receber as notificações de pedidos </Modal.Body>
            <Modal.Footer>
              <button variant="secondary" onClick={handleClose}>
                Fechar
              </button>
              <button variant="primary" onClick={()=>CadastrarNotificacao()}>
                Permitir
              </button>
            </Modal.Footer>
          </Modal>
            {/* :null
            } */}

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