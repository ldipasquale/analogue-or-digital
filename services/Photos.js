import fetch from 'unfetch'

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
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ type }),
  })

  return response.json()
}

export default {
  get,
  vote,
}
