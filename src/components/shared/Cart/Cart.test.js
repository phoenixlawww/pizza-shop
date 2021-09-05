import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import ShopContext from 'contexts/ShopContext'

import Cart from './Cart'

import pizzaList from 'mock-data/products/pizza.json'
import pizzaOptions from 'mock-data/products/pizza/options.json'

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <ShopContext.Provider {...providerProps}>{ui}</ShopContext.Provider>,
    renderOptions
  )
}

test('renders empty cart correctly', () => {
  const { baseElement } = render(
    <ShopContext.Provider
      value={{
        state: { cartItems: [] }
      }}
    >
      <Cart />
    </ShopContext.Provider>
  )

  expect(baseElement).toMatchSnapshot()
})

test('renders cart item correctly', () => {
  const { baseElement } = render(
    <ShopContext.Provider
      value={{
        state: {
          cartItems: [
            {
              ...pizzaList.products[0],
              options: [
                pizzaOptions.options[0].subOptions[0],
                pizzaOptions.options[1].subOptions[0]
              ],
              quantity: 1
            }
          ]
        }
      }}
    >
      <Cart />
    </ShopContext.Provider>
  )

  expect(baseElement).toMatchSnapshot()
})

test('calculate total correctly', () => {
  customRender(<Cart />, {
    providerProps: {
      value: {
        state: {
          cartItems: [
            {
              ...pizzaList.products[0],
              options: [pizzaOptions.options[1].subOptions[0]],
              quantity: 2
            },
            {
              ...pizzaList.products[1],
              options: [pizzaOptions.options[1].subOptions[0]],
              quantity: 1
            }
          ]
        }
      }
    }
  })

  expect(screen.getByText('$297')).toBeInTheDocument()
})

test('call dispatch successfully', () => {
  const dispatch = jest.fn()

  const { container } = customRender(<Cart />, {
    providerProps: {
      value: {
        state: {
          cartItems: [
            {
              ...pizzaList.products[0],
              options: [pizzaOptions.options[1].subOptions[0]],
              quantity: 1
            }
          ]
        },
        dispatch
      }
    }
  })

  userEvent.click(container.querySelector('.item-delete-btn'))
  expect(dispatch).toBeCalled()
})
