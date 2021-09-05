import ShopContext from 'contexts/ShopContext'

import OrderPanel from 'components/view/OrderPanel'

import useShopReducer from './useShopReducer'

function App () {
  const { state, dispatch } = useShopReducer()

  return (
    <ShopContext.Provider value={{ state, dispatch }}>
      <OrderPanel />
    </ShopContext.Provider>
  )
}

export default App
