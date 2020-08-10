import db from 'lib/db'
import { Arrays } from 'utils'

const AMOUNT = 30

export default async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const photosRef = await db.photos.get()
  const photosDocs = photosRef.docs

  Arrays.shuffleArray(photosDocs)

  const photos = photosDocs
    .slice(0, AMOUNT)
    .map((doc) => {
      const photo = doc.data()

      return {
        id: doc.id,
        url: `https://images.unsplash.com/photo-${photo.stockId}?w=1280&q=60`,
        author: photo.author,
      }
    })

  res.status(200).json(photos)
}
