import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import ProductCard from './ProductCard'

import pizzaList from 'mock-data/products/pizza.json'

const actionBtnLabel = 'Choose'
const onActionBtnClick = jest.fn()
const testProps = {
  ...pizzaList.products[0],
  actionBtnLabel,
  onActionBtnClick
}

test('renders correctly', () => {
  const { baseElement } = render(<ProductCard {...testProps} />)

  expect(baseElement).toMatchSnapshot()
})

test('handle click event correctly', () => {
  render(<ProductCard {...testProps} />)

  const button = screen.getByText(actionBtnLabel)
  userEvent.click(button)

  expect(onActionBtnClick).toBeCalled()
})
