// Service Worker de Firebase Cloud Messaging para la app web.
//
// Cuando la app está en segundo plano o cerrada, el SDK muestra
// automáticamente la notificación si el mensaje trae el campo "notification"
// (por eso NO se llama a showNotification dentro de onBackgroundMessage, ya
// que provocaría notificaciones duplicadas).

importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyCnZ42nbyZLLNLk097L71P4P9EZs491EAg',
  authDomain: 'recursostic-18bb8.firebaseapp.com',
  projectId: 'recursostic-18bb8',
  storageBucket: 'recursostic-18bb8.firebasestorage.app',
  messagingSenderId: '353355509945',
  appId: '1:353355509945:web:4de77525a432b731682b68',
});

const messaging = firebase.messaging();

// Solo registro en consola: el SDK se encarga de mostrar la notificación.
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Mensaje en segundo plano:', payload);
});

// Al tocar la notificación, enfocar la pestaña de la app o abrirla.
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if ('focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(self.registration.scope);
        }
      }),
  );
});
