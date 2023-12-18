import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import { authServices } from 'services/authServices'

const firebaseConfig = {
  apiKey: 'AIzaSyDKF3MhWbAJYgVlce_y7czrvuddJqLjEeY',
  authDomain: 'somotaskmanagement.firebaseapp.com',
  projectId: 'somotaskmanagement',
  storageBucket: 'somotaskmanagement.appspot.com',
  messagingSenderId: '1062982681444',
  appId: '1:1062982681444:web:51219532d79c7ab0d37071',
  measurementId: 'G-WMJMD9Q5SJ',
}

export const firebase = initializeApp(firebaseConfig)
const messaging = getMessaging()

export const requestForToken = () => {
  if (authServices.getRole() === 'Manager') {
    getToken(messaging, {
      vapidKey:
        'BMtIB-3Lg6nNAH9Pc4Nm8hn--Ht7G1nUAVhUGt4R8AUiQ25ftoYj8Kp9WuzKMoAIqqGewapkl_BbERweTkZvXi4',
    })
      .then((currentToken) => {
        if (currentToken) {
          localStorage.setItem('connectionId', currentToken)
        } else {
          console.log(
            'No registration token available. Request permission to generate one.'
          )
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err)
      })
  }
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload)
    })
  })
