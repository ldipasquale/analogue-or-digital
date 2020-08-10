import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import { Types } from 'eternal'

import Spinner from '../Spinner'

import styles from './styles.module.sass'

const typesList = Object.values(Types)

const AMOUNT_OF_IMAGES = 5

const Button = ({ theme, loading, selected, isRight, percentage, onClick }) => {
  const [imageNumber, setImageNumber] = useState()

  useEffect(() => {
    if (!loading && isRight === null) {
      setImageNumber(Math.floor(Math.random() * AMOUNT_OF_IMAGES) + 1)
    }
  }, [loading, isRight])

  return (
    <div
      className={cx({
        [styles.container]: true,
        [styles[`${theme}Container`]]: true,
        [styles.resultContainer]: loading || isRight !== null,
        [styles.selectedContainer]: selected,
        [styles.clickableContainer]: onClick !== null,
      })}
      onClick={onClick}
    >
      {loading ? (
        <Spinner />
      ) : isRight !== null ? (
        <>
          <img
            src={`/${isRight ? 'tick' : 'cross'}.svg`}
            alt={`Esta opción era la ${isRight ? 'correcta' : 'incorrecta'}`}
            className={styles.resultIcon}
          />

          <div className={styles.percentage}>
            {`${(percentage * 100).toFixed(2)}%`}
          </div>
        </>
      ) : imageNumber !== undefined && (
        <img
          src={`/${theme}/${imageNumber}.svg`}
          alt={theme}
          className={styles.buttonIcon}
        />
      )}
    </div>
  )
}

Button.propTypes = {
  theme: PropTypes.oneOf(typesList).isRequired,
  loading: PropTypes.bool,
  selected: PropTypes.bool,
  isRight: PropTypes.bool,
  percentage: PropTypes.number,
  onClick: PropTypes.func,
}

Button.defaultProps = {
  loading: false,
  selected: false,
  isRight: null,
  percentage: -1,
  onClick: null,
}

export default Button
