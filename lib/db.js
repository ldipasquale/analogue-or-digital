import firebase from '@firebase/app' // eslint-disable-line import/no-extraneous-dependencies
import '@firebase/firestore' // eslint-disable-line import/no-extraneous-dependencies

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

  firebase.analytics()
} catch (error) {
  if (!/already exists/.test(error.message)) {
    console.error('Firebase initialization error', error.stack)
  }
}

const db = firebase.firestore()

export default {
  photos: db.collection('photos'),
}
