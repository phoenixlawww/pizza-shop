import { useReducer } from 'react'
import { findIndex, omit } from 'lodash'

const defaultState = {
  cartItems: []
}

function reducer (state, action) {
  const { type, ...payload } = action

  switch (action.type) {
    case 'ADD_PRODUCT_TO_CART': {
      const cartItems = [...state.cartItems]
      const product = payload.product

      const currentRecordIndex = findIndex(cartItems, {
        ...omit(product, ['quantity'])
      })

      if (currentRecordIndex !== -1) {
        const currentRecord = cartItems[currentRecordIndex]

        cartItems[currentRecordIndex] = {
          ...currentRecord,
          quantity: currentRecord.quantity + product.quantity
        }
      } else {
        cartItems.push(product)
      }

      return {
        ...state,
        cartItems
      }
    }
    case 'REMOVE_PRODUCT_FROM_CART': {
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item !== payload.item)
      }
    }
    case 'EMPTY_CART': {
      return {
        ...state,
        cartItems: []
      }
    }
    default: {
      return state
    }
  }
}

export default function useShopReducer (initialState) {
  const [state, dispatch] = useReducer(reducer, {
    ...defaultState,
    ...initialState
  })

  return { state, dispatch }
}
