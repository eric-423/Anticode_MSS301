import React, { useState } from 'react'
import PropTypes from 'prop-types'

export default function ProductDetail({ productData }) {
  const [quantity, setQuantity] = useState(1)

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1))
  }

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1)
  }

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10)
    if (!isNaN(value) && value > 0) {
      setQuantity(value)
    } else if (event.target.value === '') {
      setQuantity(1)
    }
  }

  return (
    <div>
      <div>
        <div className="text-sm text-gray-500 mb-2">
          <a href="#" className="hover:underline">
            Trang chủ
          </a>{' '}
          /
          <a href="#" className="hover:underline">
            {' '}
            Sản phẩm
          </a>{' '}
          /<span className="text-gray-700"> {productData.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 max-w-6xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="mb-4 w-full justify-end flex">
              <img
                src={productData.productImageUrl}
                alt="Hộp sản phẩm chính"
                className="h-auto object-cover rounded-lg shadow-lg transition-all duration-300"
              />
            </div>

            <div className="thumbnail-container flex items-center justify-center w-full max-w-md gap-2">
              <div className="thumbnails overflow-hidden flex-1">
                <div className="flex gap-3 transition-transform duration-300 ease-in-out"></div>
              </div>
            </div>
          </div>

          <div className="product-details flex flex-col justify-center">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
              {productData.name}
            </h1>
            <p className="text-3xl lg:text-4xl font-medium text-orange-500 mb-6">
              {productData.price} ₫
            </p>

            <div className="quantity-section mb-6">
              <label
                htmlFor="quantity"
                className="block text-base font-medium text-gray-700 mb-2"
              >
                Số lượng
              </label>
              <div className="flex items-center border border-gray-300 rounded-md w-fit">
                <button
                  onClick={handleDecreaseQuantity}
                  className="quantity-btn px-4 py-2 text-xl hover:bg-gray-100 rounded-l-md"
                >
                  -
                </button>

                <input
                  type="text"
                  id="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-16 text-center border-l border-r border-gray-300 focus:outline-none h-full"
                  min="1"
                />

                <button
                  onClick={handleIncreaseQuantity}
                  className="quantity-btn px-4 py-2 text-xl hover:bg-gray-100 rounded-r-md"
                >
                  +
                </button>
              </div>
            </div>

            <div className="action-buttons flex flex-col sm:flex-row gap-4">
              <button className="btn w-full sm:w-auto flex-grow bg-orange-500 text-white font-semibold py-3 px-6 rounded-md hover:bg-orange-600 transition-colors duration-300">
                Mua ngay
              </button>

              <button
                className="btn w-full sm:w-auto flex-grow bg-white text-orange-500 border-2 border-orange-500 font-semibold py-3 px-6 rounded-md hover:bg-orange-50 transition-colors duration-300"
                style={{ border: '1px solid #f97316' }}
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

ProductDetail.propTypes = {
  productData: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string,
  }),
}
