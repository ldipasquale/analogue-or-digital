import { useEffect } from 'react'
import Head from 'next/head'
import { withTranslation } from 'react-i18next'
import firebase from 'firebase/app'
import 'firebase/analytics'

import '../i18n'

import 'stylesheets/index.sass'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

function loadAnalytics() {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_MEASUREMENT_ID,
    })
  }

  firebase.analytics()
}

const App = ({ Component, pageProps }) => { // eslint-disable-line react/prop-types
  useEffect(loadAnalytics, [])

  return (
    <>
      <Head>
        <title>¿analógico o digital?</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="mask-icon" href="/favicon.svg" color="#5579F8" />
        <link rel="icon" href="/favicon.png" />
        <meta name="description" content="¿y si no es como parece?" />
        <meta name="keywords" content="analogico, digital, fotografia" />
        <meta property="og:title" content="¿analógico o digital?" />
        <meta property="og:site_name" content="¿analógico o digital?" />
        <meta property="og:description" content="¿y si no es como parece?" />
        <meta property="og:image" content="https://analogico-o-digital.vercel.app/logo.jpg" />
        <meta property="og:url" content="https://analogico-o-digital.vercel.app" />
        <meta name="twitter:card" content="https://analogico-o-digital.vercel.app/logo.jpg" />
        <meta name="twitter:image:alt" content="¿y si no es como parece?" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/apple-touch-icon-167x167.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png" />
      </Head>

      <Component {...pageProps} />
    </>
  )
}

export default withTranslation()(App)
