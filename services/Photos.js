import fetch from 'unfetch'
import firebase from 'firebase/app'
import 'firebase/analytics'

async function get() {
  const response = await fetch('/api/photos', {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return response.json()
}

async function vote(id, type) {
  const response = await fetch(`/api/photos/${id}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ type }),
  })

  firebase.analytics().logEvent('vote', {
    id,
    type,
  })

  return response.json()
}

export default {
  get,
  vote,
}
