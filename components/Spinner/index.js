import PropTypes from 'prop-types'
import cx from 'classnames'
import Loader from 'react-loader-spinner'

import { Colors, Spacings } from 'stylesheets'

const Spinner = ({ color, size, className }) => (
  <div
    className={cx({
      [className]: className !== null,
    })}
  >
    <Loader
      type="Oval"
      color={color}
      height={size}
      width={size}
    />
  </div>
)

Spinner.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
}

Spinner.defaultProps = {
  color: Colors.WHITE,
  size: Spacings.XENORMOUS,
  className: null,
}

export default Spinner
