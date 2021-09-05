import ShopContext from 'contexts/ShopContext'
import { useContext, useEffect, useState } from 'react'

const calculateAmount = (cartItems) =>
  cartItems.reduce((amount, cartItem) => {
    const { unitPrice, quantity } = cartItem

    return amount + unitPrice * quantity
  }, 0)

export default function useCartAmount () {
  const {
    state: { cartItems }
  } = useContext(ShopContext)

  const [cartAmount, setCartAmount] = useState(calculateAmount(cartItems))

  useEffect(() => {
    setCartAmount(calculateAmount(cartItems))
  }, [cartItems])

  return cartAmount
}
