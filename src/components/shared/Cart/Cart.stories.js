import Cart from './Cart'

import ShopContext from 'contexts/ShopContext'
import useShopReducer from 'components/view/App/useShopReducer'

import pizzaList from 'mock-data/products/pizza.json'
import pizzaOptions from 'mock-data/products/pizza/options.json'

export default {
  component: Cart,
  title: 'Shared/Cart',
  args: {},
  decorators: [
    (Story, { parameters }) => {
      const { state, dispatch } = useShopReducer({
        cartItems: parameters.cartItems
      })

      return (
        <ShopContext.Provider value={{ state, dispatch }}>
          <Story />
        </ShopContext.Provider>
      )
    },

    (Story) => {
      return (
        <div style={{ maxWidth: 300 }}>
          <Story />
        </div>
      )
    }
  ]
}

const Template = (args) => <Cart {...args} />

export const Normal = Template.bind({})
Normal.parameters = {
  cartItems: [
    {
      ...pizzaList.products[0],
      options: [
        pizzaOptions.options[0].subOptions[0],
        pizzaOptions.options[1].subOptions[0]
      ],
      quantity: 1
    },
    {
      ...pizzaList.products[1],
      options: [
        pizzaOptions.options[0].subOptions[1],
        pizzaOptions.options[0].subOptions[2],
        pizzaOptions.options[1].subOptions[1]
      ],
      quantity: 2
    }
  ]
}

export const EmptyCart = Template.bind({})
EmptyCart.parameters = {
  cartItems: []
}
