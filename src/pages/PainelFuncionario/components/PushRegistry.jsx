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


export default function PushRegistry() {
    //const [key, setKey] = useState('estabelecimento');
    
    //Teste
    const [estabelecimento, setEstabelecimento] = useState(null);
    const [subscVisible, setsubscVisible] = useState("");
    const [swreg, setswreg] = useState(null);
    const [client, setClient] = useState("");
    const [endpoint, setendpoint] = useState("");
    const [p256dh, setp256dh] = useState("");
    const [auth, setauth] = useState("");
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
        const storagedEstabelecimento = localStorage.getItem('@TBAuth:estabelecimento');

            if (storagedEstabelecimento) {
                //setFuncionario(JSON.parse(storagedFuncionario));
                setEstabelecimento(JSON.parse(storagedEstabelecimento));
            }
            return JSON.parse(storagedEstabelecimento)
    }
     
     async function validarCadastro(dados) {
        try {
            if(dados !=null){
                const response =  await axios.get(`https://www.papya.com.br/api/Notificacao/${dados.iD_ESTABELECIMENTO}/${dados.id}` ,{
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
                    //else {
                    //     setsubscVisible("giveaccess");
                    // }
                });

            });
        } else {
            setsubscVisible("blocked");
        }
    }


     async function CadastrarNotificacao() {
         if(estabelecimento)
         {
            // console.log(funcionario.id);
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
              const response = await axios.post('https://www.papya.com.br/api/Notificacao', payload );
              
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