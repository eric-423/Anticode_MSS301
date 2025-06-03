import React from 'react'
import './ProductCard.css'

const CartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-cart-plus-fill cart-svg-icon"
    viewBox="0 0 16 16"
  >
    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0" />
  </svg>
)

const ProductCard = ({ imageUrl, title, price, soldOut, specialText }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={imageUrl} alt={title} className="product-image" />
        {soldOut && <div className="sold-out-banner">SOLD OUT</div>}
        {specialText && <div className="special-text">{specialText}</div>}
        {title.includes('Kakadoll') && !soldOut && (
          <div className="view-details-overlay">
            <button className="view-details-button">👁️ Xem chi tiết</button>
          </div>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        <p className="product-price">{price.toLocaleString('vi-VN')} ₫</p>
      </div>
      <div className="product-actions">
        <button className="btn btn-buy-now">Mua ngay</button>
        <button className="btn btn-add-to-cart-new">
          <CartIcon />
          <span>
            Thêm vào giỏ <br /> hàng
          </span>
        </button>
      </div>
    </div>
  )
}

export default ProductCard
