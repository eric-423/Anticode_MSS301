import React from 'react'
import ProductCard from '../product-card/ProductCard'
import './ProductList.css'

const productsData = [
  {
    id: 1,
    imageUrl:
      'https://cdn.galaxycine.vn/media/2025/4/18/02-sold-out-premiere-e-voucher_1744962700255.jpg',
    title: 'ATVNCG The Movie - Premiere E-Voucher',
    price: 220000,
    soldOut: true,
  },
  {
    id: 2,
    imageUrl:
      'https://cdn.galaxycine.vn/media/2025/4/18/02-sold-out-premiere-e-voucher_1744962700255.jpg',
    title: 'ATVNCG - KHIÊN LỬA Lightstick Set',
    price: 600000,
    soldOut: false,
  },
  {
    id: 3,
    imageUrl:
      'https://cdn.galaxycine.vn/media/2025/4/18/02-sold-out-premiere-e-voucher_1744962700255.jpg',
    title: 'ATVNCG – Blindbox Kakachain - Dây đeo điện thoại Ảnh Tài',
    price: 150000,
    soldOut: false,
  },
  {
    id: 4,
    imageUrl:
      'https://cdn.galaxycine.vn/media/2025/4/18/02-sold-out-premiere-e-voucher_1744962700255.jpg',
    title: 'ATVNCG - Blindbox Kakadoll Ver.2 - Set 6 hộp ngẫu nhiên',
    price: 1800000,
    soldOut: false,
  },
]

const ProductList = () => {
  return (
    <div className="product-list">
      {productsData.map((product) => (
        <ProductCard
          key={product.id}
          imageUrl={product.imageUrl}
          title={product.title}
          price={product.price}
          soldOut={product.soldOut}
          specialText={product.specialText}
        />
      ))}
    </div>
  )
}

export default ProductList
