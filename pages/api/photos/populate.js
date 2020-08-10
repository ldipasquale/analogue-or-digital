import db from 'lib/db'
import { Types } from 'eternal'
import newRawPhotos from 'data/photos'

const RANDOM_TOP_VOTES = 4

export default async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  let createdPhotos = 0

  const photosRef = await db.photos.get()
  const photoStockIds = photosRef.docs.map((doc) => doc.data().stockId)

  const newPhotos = [
    ...newRawPhotos.analogue.map(photo => ({
      ...photo,
      type: Types.ANALOGUE,
    })),
    ...newRawPhotos.digital.map(photo => ({
      ...photo,
      type: Types.DIGITAL,
    })),
  ]

  for (var i = 0; i < newPhotos.length; i++) {
    const newPhoto = newPhotos[i]

    if (photoStockIds.includes(newPhoto.id)) {
      continue
    }

    try {
      await db.photos.add({
        stockId: newPhoto.id,
        author: newPhoto.author,
        type: newPhoto.type,
        digitalVotes: Math.floor(Math.random() * RANDOM_TOP_VOTES) + 1,
        analogueVotes: Math.floor(Math.random() * RANDOM_TOP_VOTES) + 1,
      })

      createdPhotos += 1
    } catch (error) {
      console.log('error with', newPhoto)
    }
  }

  res.status(200).send(`${createdPhotos} were created`)
}
