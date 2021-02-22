
self.addEventListener('fetch', function (event) { });


self.addEventListener('push', function (e) {
    var body;

    if (e.data) {
        body = e.data.text();
    } else {
        body = "Standard Message";
    }

    var options = {
        body: body,
        icon: "images/icon-512x512.png",
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now()
        },
        actions: [
            {
                action: "explore", title: "Clique para ver os pedidos",
                icon: "images/icon-72x72.png"
            },
            {
                action: "close", title: "Ignorar",
                icon: "images/icon-72x72.png"
            },
        ]
    };
    e.waitUntil(
        self.registration.showNotification("Push Notification", options)
    );
});

self.addEventListener('notificationclick', function (e) {
    var notification = e.notification;
    var action = e.action;

    if (action === 'close') {
        notification.close();
    } else {
        // // Some actions
        try{
            var retorno = String(e.notification.data.url).replace("undefined","painelGarcom");
            //var url = retorno.replace("undefined","painelGarcom");


            clients.openWindow(retorno);
            notification.close();
        }catch (err){
            //clients.openWindow('https://www.papya.com.br/api/values');  
            notification.close();
        }
    }
});