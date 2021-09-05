import OrderPanel from './OrderPanel'

import ShopContext from 'contexts/ShopContext'
import useShopReducer from 'components/view/App/useShopReducer'

export default {
  component: OrderPanel,
  title: 'View/OrderPanel',
  parameters: {
    layout: 'fullscreen'
  },
  args: {},
  decorators: [
    (Story) => {
      const { state, dispatch } = useShopReducer()

      return (
        <ShopContext.Provider value={{ state, dispatch }}>
          <Story />
        </ShopContext.Provider>
      )
    }
  ]
}

const Template = (args) => <OrderPanel {...args} />

export const Normal = Template.bind({})
Normal.args = {}
