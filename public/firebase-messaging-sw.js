importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

firebase.initializeApp({
    messagingSenderId: '47831952678' // troque pelo seu sender id 
    
});

const messaging = firebase.messaging();

self.addEventListener('push', function(event) {
    console.log(event)
    var promise = self.registration.showNotification('Push notification!');
    console.log('entrou')
    event.waitUntil(promise);
  });


