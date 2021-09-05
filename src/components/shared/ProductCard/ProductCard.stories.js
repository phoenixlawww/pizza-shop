import ProductCard from './ProductCard'

import pizzaList from 'mock-data/products/pizza.json'

export default {
  component: ProductCard,
  title: 'Shared/ProductCard',
  args: {
    ...pizzaList.products[0],
    actionBtnLabel: 'Choose',
    onActionBtnClick: () => alert('clicked')
  },
  decorators: [
    (Story) => {
      return (
        <div style={{ maxWidth: 300 }}>
          <Story />
        </div>
      )
    }
  ]
}

const Template = (args) => <ProductCard {...args} />

export const Normal = Template.bind({})
Normal.args = {}

export const NoImage = Template.bind({})
NoImage.args = {
  image: ''
}
