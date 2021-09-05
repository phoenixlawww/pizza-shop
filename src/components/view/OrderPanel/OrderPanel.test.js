/* eslint-disable react/prop-types */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'

import ShopContext from 'contexts/ShopContext'
import useShopReducer from 'components/view/App/useShopReducer'

import OrderPanel from './OrderPanel'

import pizzaList from 'mock-data/products/pizza.json'
import pizzaOptions from 'mock-data/products/pizza/options.json'

const actionBtnLabel = 'Choose'
const onActionBtnClick = jest.fn()
const testProps = {
  ...pizzaList.products[0],
  actionBtnLabel,
  onActionBtnClick
}

function OrderPanelWithContext (props) {
  const { defaultValue = {} } = props
  const { state, dispatch } = useShopReducer(defaultValue)

  return (
    <ShopContext.Provider value={{ state, dispatch }}>
      <OrderPanel {...testProps} />
    </ShopContext.Provider>
  )
}

test('renders correctly', () => {
  const { baseElement } = render(<OrderPanelWithContext />)

  expect(baseElement).toMatchSnapshot()
})

test('renders list correctly', () => {
  jest.useFakeTimers()

  const { baseElement } = render(<OrderPanelWithContext />)

  act(() => {
    jest.runAllTimers()
  })

  expect(baseElement).toMatchSnapshot()
})

test('add product into basket successfully', async () => {
  jest.useFakeTimers()

  const { baseElement } = render(<OrderPanelWithContext />)

  act(() => {
    jest.runAllTimers()
  })

  expect(screen.getByText('No Items in your basket')).toBeInTheDocument()

  const productCard = baseElement.querySelector('.product-card .action-btn')
  userEvent.click(productCard)

  const productModal = baseElement.querySelector('.s-product-modal')
  expect(productModal).toBeInTheDocument()

  const topping = productModal.querySelector('input[value="topping-1"]')
  expect(topping).toBeInTheDocument()

  const size = productModal.querySelector('input[value="size-s"]')
  expect(size).toBeInTheDocument()

  const AddToBasketBtn = screen.getByText('Add To Basket')
  expect(AddToBasketBtn).toBeDisabled()

  await act(async () => {
    userEvent.click(topping)
  })

  expect(AddToBasketBtn).toBeDisabled()

  await act(async () => {
    userEvent.click(size)
  })

  expect(AddToBasketBtn).not.toBeDisabled()

  await act(async () => {
    userEvent.click(AddToBasketBtn)
  })

  expect(productModal).not.toBeInTheDocument()

  expect(screen.getByText('1 x Pizza A')).toBeInTheDocument()
})

test('remove product from basket successfully', async () => {
  jest.useFakeTimers()

  const { baseElement } = render(
    <OrderPanelWithContext
      defaultValue={{
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
      }}
    />
  )

  act(() => {
    jest.runAllTimers()
  })

  expect(screen.getByText('1 x Pizza A')).toBeInTheDocument()

  const removeProductBtn = baseElement.querySelector('.item-delete-btn')

  await act(async () => {
    userEvent.click(removeProductBtn)
  })

  expect(screen.getByText('No Items in your basket')).toBeInTheDocument()
})

test('empty basket successfully', async () => {
  jest.useFakeTimers()

  render(
    <OrderPanelWithContext
      defaultValue={{
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
      }}
    />
  )

  act(() => {
    jest.runAllTimers()
  })

  expect(screen.getByText('1 x Pizza A')).toBeInTheDocument()

  const emptyBasketBtn = screen.getByText('Empty Basket')

  await act(async () => {
    userEvent.click(emptyBasketBtn)
  })

  expect(screen.getByText('No Items in your basket')).toBeInTheDocument()
})
