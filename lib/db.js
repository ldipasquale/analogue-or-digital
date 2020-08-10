import firebase from 'firebase/app'
import 'firebase/firestore'

try {
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_MEASUREMENT_ID,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  })
} catch (error) {
  if (!/already exists/.test(error.message)) {
    console.error('Firebase initialization error', error.stack)
  }
}

const db = firebase.firestore()

export default {
  photos: db.collection('photos'),
}
