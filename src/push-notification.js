import firebase from 'firebase/app';
import 'firebase/auth';        // for authentication
import 'firebase/storage';     // for storage
import 'firebase/database';    // for realtime database
import 'firebase/firestore';   // for cloud firestore
import 'firebase/messaging';   // for cloud messaging
import 'firebase/functions';   // for cloud functions

export const initializeFirebase = () => {
  firebase.initializeApp({
    apiKey: "AIzaSyALWoUjP9yeOVFDYNplV3DhJI2MAXT3y-Q",
    authDomain: "tingle-b756c.firebaseapp.com",
    projectId: "tingle-b756c",
    storageBucket: "tingle-b756c.appspot.com",
    messagingSenderId: "47831952678",
    appId: "1:47831952678:web:66ff3b30be5e65696c65e7",
    measurementId: "G-TBRHHG1V2G"
  });

  askForPermissioToReceiveNotifications();
  // use other service worker
  // navigator.serviceWorker
  //   .register('/my-sw.js')
  //   .then((registration) => {
  //     firebase.messaging().useServiceWorker(registration);
  //   });
}

export const askForPermissioToReceiveNotifications = async () => {
  try {

    const messaging = firebase.messaging();

    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('user token: ', token);

    return token;
  } catch (error) {
    console.error(error);
  }
}
