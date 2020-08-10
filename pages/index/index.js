import { useState } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { withTranslation } from 'react-i18next'

import ProgressiveImage from 'react-progressive-image'

import { Types } from 'eternal'
import { Button, Spinner } from 'components'
import { Photos } from 'services'
import usePhotos from 'lib/usePhotos'

import styles from './styles.module.sass'

const typesList = Object.values(Types)

const SEEING_RESULTS_DURATION = 2000

const Home = ({ t }) => {
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
            alt={t`images_error__title`}
            className={styles.errorMessageImage}
          />

          <div className={styles.errorMessageTitle}>{t`images_error__title`}</div>
          <div>{t`images_error__description`}</div>
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
                    alt={t`title`}
                  />
                )}
              </ProgressiveImage>

              <div className={styles.credits}>
                <div>
                  {t`photo_credits__taken`}
                  <a
                    href={`https://unsplash.com/@${currentImage.author.username}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {currentImage.author.name}
                  </a>
                  {t`photo_credits__in`}
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

Home.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation()(Home)
