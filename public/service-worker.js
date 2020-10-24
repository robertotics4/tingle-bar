/* global self */
/* eslint-disable */
var self = this;

var doCache = true;

var CACHE_NAME = "my-pwa-cache-v1";


self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (!cacheWhitelist.includes(key)) {
            console.log("Deleting cache: " + key);
            return caches.delete(key);
          }
        })
      )
    )
  );
});

self.addEventListener("install", function(event) {
  if (doCache) {
    event.waitUntil(
      caches.open(CACHE_NAME).then(function(cache) {
        fetch("manifest.json")
          .then(response => {
            response.json();
          })
          .then(assets => {
            //const urlsToCache = ["/", assets["main.js"]];
            cache.addAll(urlsToCache);
            console.log("cached");
          });
      })
    );
  }
});

self.addEventListener("fetch", function(event) {
  if (doCache) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  }
});
'use strict';

/* eslint-disable max-len */

const applicationServerPublicKey = 'BH8-hIchXKMI6AKSee8gD0hhPThRqaEhIEtMJwcTjEQhiOKdG-_2tTIO-6hOAK4kwg5M9Saedjxp4hVE-khhWxY';

/* eslint-enable max-len */

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}



self.addEventListener('push', function(event) {
  
  
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'PEDRO';
  const options = {
    body: 'Yay s.',
    icon: 'images/icon.png',
    badge: 'images/badge.png'
  };
  

  event.waitUntil(self.registration.showNotification(title, options));
});

//self.addEventListener('notificationclick', function(event) {
//  console.log('[Service Worker] Notification click Received.');

//  event.notification.close();

//  event.waitUntil(
//    clients.openWindow('https:pe.com')
//  );
//});

self.addEventListener('pushsubscriptionchange', function(event) {
  console.log('[Service Worker]: \'pushsubscriptionchange\' event fired.');
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  event.waitUntil(
    self.registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    })
    .then(function(newSubscription) {
      // TODO: Send to application server
      console.log('[Service Worker] New subscription: ', newSubscription);
    })
  );
});

self.addEventListener('message', function(event) {
  var data = event.data;

  if (data.command == "oneWayCommunication") {
      //console.log("Message the Page : ", data.message);
      console.log(data);
      const title = data.title;
      const options = {
        body: data.message,
        icon: 'images/icon.png',
        badge: 'images/badge.png'
      };
    
  event.waitUntil(self.registration.showNotification(title,options));
      
  } 
  self.addEventListener('notificationclick', function(event) {
    console.log('[Service Worker] Notification click Received.');
  
    event.notification.close();
  
    event.waitUntil(
      clients.openWindow('https://pedro.com')
    );
  });
});