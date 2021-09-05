import PropTypes from 'prop-types'
import classnames from 'classnames'

import './Button.scss'

export const BUTTON_VARIENTS = {
  PRIMARY: 'PRIMARY',
  SECONDARY: 'SECONDARY',
  LINK: 'LINK'
}

function Button (props) {
  const { className, label, varient, disabled, ...otherProps } = props

  return (
    <button
      className={classnames('s-button', className, {
        's-button-primary': varient === BUTTON_VARIENTS.PRIMARY,
        's-button-secondary': varient === BUTTON_VARIENTS.SECONDARY,
        's-button-link': varient === BUTTON_VARIENTS.LINK
      })}
      disabled={disabled}
      {...otherProps}
    >
      {label}
    </button>
  )
}

Button.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  varient: PropTypes.oneOf(['PRIMARY', 'SECONDARY', 'LINK']),
  disabled: PropTypes.bool
}
Button.defaultProps = {
  varient: 'PRIMARY',
  disabled: false
}

export default Button
