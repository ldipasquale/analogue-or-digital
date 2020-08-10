import firebase from 'firebase/app'
import db from 'lib/db'
import { Types } from 'eternal'

const typesList = Object.values(Types)

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  if (!typesList.includes(req.body?.type)) {
    return res.status(400).end()
  }

  const photoRef = db.photos.doc(req.query.id)

  let photoDoc = await photoRef.get()

  if (!photoDoc.exists) {
    return res.status(400).end()
  }

  await photoRef.update({
    [req.body.type === Types.ANALOGUE ? 'analogueVotes' : 'digitalVotes']: firebase.firestore.FieldValue.increment(1),
  })

  photoDoc = await photoRef.get()

  const photo = photoDoc.data()

  const analogueVotes = photo.analogueVotes || 0
  const digitalVotes = photo.digitalVotes || 0
  const totalVotes = analogueVotes + digitalVotes

  res.status(200).json({
    [Types.ANALOGUE]: {
      percentage: +((analogueVotes / totalVotes).toFixed(2)),
      isRight: photo.type === Types.ANALOGUE,
    },
    [Types.DIGITAL]: {
      percentage: +((digitalVotes / totalVotes).toFixed(2)),
      isRight: photo.type === Types.DIGITAL,
    },
  })
}
