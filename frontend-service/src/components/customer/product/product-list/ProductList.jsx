import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../product-card/ProductCard'
import { getConcessionProducts } from '../../../../utils/api'
import './ProductList.css'

const ProductList = () => {
  const [productsData, setProductsData] = useState([])

  useEffect(() => {
    getConcessionProducts({ page: 0, size: 10 })
      .then((res) => setProductsData(res.data.data?.content || []))
      .catch((err) => console.error(err))
  }, [])
  return (
    <div className="product-list">
      {productsData.map((product) => (
        <Link key={product.id} to={`/product/${product.id}`}>
          <ProductCard
            imageUrl={product.productImageUrl}
            title={product.name}
            price={product.price}
            soldOut={product.soldOut}
            specialText={product.specialText}
          />
        </Link>
      ))}
    </div>
  )
}

export default ProductList
