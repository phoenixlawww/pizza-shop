import { render } from '@testing-library/react'

import ProductModal from './ProductModal'

import pizzaList from 'mock-data/products/pizza.json'
import pizzaOptions from 'mock-data/products/pizza/options.json'

const testProps = {
  defaultShow: true,
  product: pizzaList.products[0],
  productOptions: pizzaOptions.options
}

test('renders correctly', () => {
  const { baseElement } = render(<ProductModal {...testProps} />)

  expect(baseElement).toMatchSnapshot()
})
