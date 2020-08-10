import { useState, useEffect } from 'react'
import { Photos } from 'services'

export default function() {
  const [images, setImages] = useState()
  const [error, setError] = useState()

  async function fetchImages() {
    setImages(undefined)

    const newImages = await Photos.get()
    setImages(newImages)
  }

  useEffect(() => {
    try {
      fetchImages()
      setError(undefined)
    } catch(error) {
      setError(error)
    }
  }, [])

  return {
    images,
    error,
    isFetching: images === undefined && error === undefined,
    onFetch: fetchImages,
  }
}