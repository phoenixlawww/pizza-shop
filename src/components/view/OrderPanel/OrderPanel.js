import { useContext, useEffect, useRef, useState } from 'react'

import pizzaList from 'mock-data/products/pizza.json'
import pizzaOptions from 'mock-data/products/pizza/options.json'

import ProductCard from 'components/shared/ProductCard'
import Cart from 'components/shared/Cart'
import './OrderPanel.scss'
import ShopContext from 'contexts/ShopContext'
import Button, { BUTTON_VARIENTS } from 'components/shared/Button'
import ProductModal from 'components/shared/ProductModal'

function OrderPanel (props) {
  const {
    state: { cartItems },
    dispatch
  } = useContext(ShopContext)

  const [isLoading, setIsLoading] = useState(true)
  const [productList, setProductList] = useState()
  const [optionList, setOptionList] = useState()

  const modalRef = useRef()
  const [modalProduct, setModalProduct] = useState()
  const [modalProductOption, setModalProductOption] = useState()

  useEffect(() => {
    // mock api loading behaviour
    const timeout = setTimeout(() => {
      setProductList(pizzaList.products)
      setOptionList(pizzaOptions.options)
      setIsLoading(false)
    }, 700)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <div className="order-panel">
      {isLoading ? (
        <div className="loading-screen">Loading</div>
      ) : (
        <div className="product-list">
          {productList.map((product, index) => {
            const { productCode, name, image, unitPrice } = product
            return (
              <ProductCard
                className="product-card"
                image={image}
                name={name}
                unitPrice={unitPrice}
                actionBtnLabel="Choose"
                onActionBtnClick={(e) => {
                  setModalProduct(product)
                  setModalProductOption(optionList)
                  modalRef.current.show()
                }}
                key={productCode}
              />
            )
          })}
          <ProductModal
            product={modalProduct}
            productOptions={modalProductOption}
            ref={modalRef}
          />
        </div>
      )}

      <div className="cart-wrapper">
        <Cart className="cart" />
        <Button
          className="empty-cart-btn"
          label="Empty Basket"
          varient={BUTTON_VARIENTS.LINK}
          onClick={(e) => {
            dispatch({
              type: 'EMPTY_CART'
            })
          }}
          disabled={cartItems.length === 0}
        />
      </div>
    </div>
  )
}

export default OrderPanel
