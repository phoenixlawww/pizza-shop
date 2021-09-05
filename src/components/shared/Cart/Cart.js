import PropTypes from 'prop-types'
import classnames from 'classnames'

import formatCurrency from 'utils/number/formatCurrency'

import Button, { BUTTON_VARIENTS } from 'components/shared/Button'

import './Cart.scss'
import { useContext } from 'react'
import ShopContext from 'contexts/ShopContext'
import useCartAmount from './useCartAmount'

function Cart (props) {
  const { className } = props

  const {
    state: { cartItems },
    dispatch
  } = useContext(ShopContext)

  const cartAmount = useCartAmount()

  return (
    <div className={classnames('s-cart', className)}>
      {cartItems.length === 0 ? (
        <div className="cart-empty">No Items in your basket</div>
      ) : (
        <div className="cart-items">
          {cartItems.map((item, index) => {
            const { name, unitPrice, options, quantity } = item

            return (
              <div className="cart-item" key={index}>
                <div
                  className="item-delete-btn"
                  onClick={(e) => {
                    dispatch({
                      type: 'REMOVE_PRODUCT_FROM_CART',
                      item
                    })
                  }}
                />
                <div className="item-detail-container">
                  <div className="item-name">{`${quantity} x ${name}`}</div>
                  <div className="item-options">
                    {options.map((option) => option.shortName).join(', ')}
                  </div>
                </div>
                <div className="total-item-amount">{`$${formatCurrency(
                  unitPrice * quantity
                )}`}</div>
              </div>
            )
          })}
        </div>
      )}

      <div className="cart-total">
        <div>Total</div>
        <div className="cart-amount">{`$${formatCurrency(cartAmount)}`}</div>
      </div>

      <Button
        label={'Checkout'}
        varient={BUTTON_VARIENTS.PRIMARY}
        disabled={cartItems.length === 0}
        onClick={() => alert('TODO checkout')}
      />
    </div>
  )
}

Cart.propTypes = {
  className: PropTypes.string
}

Cart.defaultProps = {}

export default Cart
