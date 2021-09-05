import { useRef } from 'react'

import Button from 'components/shared/Button'
import ProductModal from './ProductModal'

import ShopContext from 'contexts/ShopContext'

import pizzaList from 'mock-data/products/pizza.json'
import pizzaOptions from 'mock-data/products/pizza/options.json'

export default {
  component: ProductModal,
  title: 'Shared/ProductModal',
  args: {
    defaultShow: true,
    product: pizzaList.products[0],
    productOptions: pizzaOptions.options
  },
  decorators: [
    (Story) => (
      <ShopContext.Provider
        value={{
          dispatch: (action) => {
            alert(JSON.stringify(action))
          }
        }}
      >
        <Story />
      </ShopContext.Provider>
    )
  ]
}

const Template = (args) => {
  const modalRef = useRef()

  return (
    <>
      <Button
        label="Open"
        onClick={() => {
          modalRef.current.show()
        }}
      />
      <ProductModal {...args} ref={modalRef} />
    </>
  )
}

export const Normal = Template.bind({})
Normal.args = {}
