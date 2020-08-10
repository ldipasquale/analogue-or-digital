import { useState } from 'react'
import cx from 'classnames'

import ProgressiveImage from 'react-progressive-image'

import { Types } from 'eternal'
import { Button, Spinner } from 'components'
import { Photos } from 'services'
import usePhotos from 'lib/usePhotos'

import styles from './styles.module.sass'

const typesList = Object.values(Types)

const SEEING_RESULTS_DURATION = 2000

export default function Home() {
  const { images, error, isFetching, onFetch } = usePhotos()

  const [selectedOption, setSelectedOption] = useState()
  const [results, setResults] = useState()
  const [imageNumber, setImageNumber] = useState(0)

  const currentImage = images?.[imageNumber]

  async function handleSelectOption(newSelectedOption) {
    if (currentImage === undefined || selectedOption !== undefined) {
      return
    }

    setSelectedOption(newSelectedOption)

    const newResults = await Photos.vote(currentImage.id, newSelectedOption)
    setResults(newResults)

    setTimeout(async () => {
      if (images.length === imageNumber + 1) {
        await onFetch()

        return
      }

      setImageNumber((oldImageNumber) => oldImageNumber + 1)
      setResults(undefined)
      setSelectedOption(undefined)
    }, SEEING_RESULTS_DURATION)
  }

  return (
    <div className={styles.container}>
      {error ? (
        <div className={styles.errorMessage}>
          <img
            src="/photographer.svg"
            alt="Hubo un error al cargar las imágenes"
            className={styles.errorMessageImage}
          />

          <div className={styles.errorMessageTitle}>¡Hubo un error al cargar las imágenes!</div>
          <div>Intenta de nuevo por favor. ¡Gracias!</div>
        </div>
      ) : (
        <>
          {isFetching ? (
            <Spinner className={styles.spinner} />
          ) : (
            <>
              <ProgressiveImage src={currentImage.url}>
                {(src, loading) => loading ? (
                  <Spinner className={styles.spinner} />
                ) : (
                  <img
                    src={src}
                    className={styles.background}
                    alt="¿Analógico o digital?"
                  />
                )}
              </ProgressiveImage>

              <div className={styles.credits}>
                <div>
                  {'foto de '}
                  <a
                    href={`https://unsplash.com/@${currentImage.author.username}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {currentImage.author.name}
                  </a>
                  {' en '}
                  <a
                    href="https://unsplash.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    unsplash
                  </a>
                </div>
              </div>
            </>
          )}

          <div
            className={cx({
              [styles.options]: true,
              [styles.loadingOptions]: isFetching,
            })}
          >
            {typesList.map((type) => (
              <div
                key={type}
                className={styles.option}
              >
                <Button
                  loading={selectedOption !== undefined && results === undefined}
                  theme={type}
                  selected={selectedOption === type}
                  {...results !== undefined && results[type]}
                  {...!isFetching && {
                    onClick: () => handleSelectOption(type),
                  }}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
