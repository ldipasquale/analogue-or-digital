import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/analytics'

try {
  firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_MESSAGING_APP_ID,
    measurementId: process.env.FIREBASE_MESSAGING_MEASUREMENT_ID,
  })
} catch (error) {
  if (!/already exists/.test(error.message)) {
    console.error('Firebase initialization error', error.stack)
  }
}

if (typeof window !== 'undefined') {
  firebase.analytics()
}

const db = firebase.firestore()

export default {
  photos: db.collection('photos'),
}
