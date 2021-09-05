import React, { useContext, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { find, isArray } from 'lodash'
import ReactModal from 'react-modal'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import ShopContext from 'contexts/ShopContext'

import Button, { BUTTON_VARIENTS } from 'components/shared/Button'

import './ProductModal.scss'

const ProductModal = React.forwardRef((props, ref) => {
  const { defaultShow, product, productOptions } = props

  const { dispatch } = useContext(ShopContext)

  const [isShow, setIsShow] = useState(defaultShow)

  const show = () => {
    setIsShow(true)
  }
  const hide = () => {
    setIsShow(false)
  }

  useImperativeHandle(ref, () => ({
    show,
    hide
  }))

  const schema = yup.object().shape(
    (() => {
      if (!productOptions) {
        return {}
      }

      return productOptions.reduce((objectSchema, option) => {
        const { category, allowMultiple } = option

        objectSchema[category] = allowMultiple
          ? yup.array().nullable(true)
          : yup.string().required()

        return objectSchema
      }, {})
    })()
  )

  const defaultValues = (() => {
    if (!productOptions) {
      return {}
    }

    return productOptions.reduce((objectSchema, option) => {
      const { category, allowMultiple } = option

      objectSchema[category] = allowMultiple ? [] : null

      return objectSchema
    }, {})
  })()

  const { formState, register, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema)
  })

  const onSubmit = (data) => {
    const selectedOptions = []

    Object.keys(data).forEach((category) => {
      const selections = isArray(data[category])
        ? data[category]
        : [data[category]]

      const subOptions =
        find(productOptions, {
          category
        })?.subOptions || []

      selections.forEach((selection) => {
        if (selection) {
          selectedOptions.push(find(subOptions, { code: selection }))
        }
      })
    })

    dispatch({
      type: 'ADD_PRODUCT_TO_CART',
      product: {
        ...product,
        options: selectedOptions,
        quantity: 1
      }
    })

    setIsShow(false)
    reset()
  }

  if (!product || !productOptions) {
    return null
  }

  return (
    <ReactModal
      isOpen={isShow}
      // appElement={document.getElementById('root')}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: 'rgba(0,0,0,0.2)'
        },
        content: {
          height: 'fit-content',
          maxWidth: 600,
          margin: '0 auto'
        }
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="s-product-modal">
          <div className="product-options">
            {productOptions.map((option, index) => {
              const { category, allowMultiple, subOptions } = option

              return (
                <div className="product-option" key={category}>
                  <h5>{category}</h5>
                  <div
                    className={classnames('product-sub-option-list', {
                      multiple: allowMultiple,
                      single: !allowMultiple
                    })}
                  >
                    {subOptions.map((subOption, index) => {
                      const { code, name } = subOption

                      if (allowMultiple) {
                        return (
                          <div className="product-sub-option" key={index}>
                            <input
                              id={code}
                              type="checkbox"
                              // name={category}
                              value={code}
                              {...register(category)}
                            />
                            <label htmlFor={code}>{name}</label>
                          </div>
                        )
                      } else {
                        return (
                          <div className="product-sub-option" key={index}>
                            <input
                              id={code}
                              type="radio"
                              // name={category}
                              value={code}
                              {...register(category)}
                            />
                            <label htmlFor={code}>{name}</label>
                          </div>
                        )
                      }
                    })}
                  </div>
                </div>
              )
            })}
          </div>
          <div className="action-buttons">
            <Button
              className="action-btn"
              label={'Add To Basket'}
              varient={BUTTON_VARIENTS.PRIMARY}
              disabled={!formState.isValid}
              type="submit"
            />
            <Button
              className="action-btn"
              label={'Cancel'}
              varient={BUTTON_VARIENTS.SECONDARY}
              onClick={(e) => {
                setIsShow(false)
                reset()
              }}
            />
          </div>
        </div>
      </form>
    </ReactModal>
  )
})

ProductModal.displayName = 'ProductModal'

ProductModal.propTypes = {
  defaultShow: PropTypes.bool,
  product: PropTypes.object,
  productOptions: PropTypes.array
}
ProductModal.defaultProps = {
  defaultShow: false
}

export default ProductModal
