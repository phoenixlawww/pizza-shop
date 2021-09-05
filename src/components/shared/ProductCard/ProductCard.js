import PropTypes from 'prop-types'
import classnames from 'classnames'

import formatCurrency from 'utils/number/formatCurrency'

import Button, { BUTTON_VARIENTS } from 'components/shared/Button'

import './ProductCard.scss'

function ProductCard (props) {
  const {
    className,
    name,
    image,
    unitPrice,
    actionBtnLabel,
    onActionBtnClick
  } = props

  return (
    <div className={classnames('s-product-card', className)}>
      <div className="product-img-wrapper">
        {image && <img src={`${process.env.PUBLIC_URL}/${image}`} alt="" />}
      </div>
      <h4 className="product-name">{`${name} - $${formatCurrency(
        unitPrice
      )}`}</h4>
      <Button
        className="action-btn"
        label={actionBtnLabel}
        varient={BUTTON_VARIENTS.PRIMARY}
        onClick={(e) => {
          onActionBtnClick && onActionBtnClick()
        }}
      />
    </div>
  )
}

ProductCard.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  unitPrice: PropTypes.number.isRequired,
  actionBtnLabel: PropTypes.string,
  onActionBtnClick: PropTypes.func
}

ProductCard.defaultProps = {}

export default ProductCard
