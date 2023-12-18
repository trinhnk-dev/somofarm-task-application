// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js')
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js')

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: 'AIzaSyDKF3MhWbAJYgVlce_y7czrvuddJqLjEeY',
  authDomain: 'somotaskmanagement.firebaseapp.com',
  projectId: 'somotaskmanagement',
  storageBucket: 'somotaskmanagement.appspot.com',
  messagingSenderId: '1062982681444',
  appId: '1:1062982681444:web:51219532d79c7ab0d37071',
  measurementId: 'G-WMJMD9Q5SJ',
}

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig)

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload)

  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
  }

  // eslint-disable-next-line no-restricted-globals
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  )
})
