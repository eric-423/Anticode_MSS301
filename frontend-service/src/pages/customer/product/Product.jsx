import React from 'react'
import ProductList from '../../../components/customer/product/product-list/ProductList'
import ProductNavigation from '../../../components/customer/product/product-navigation/ProductNavigation'
import Header from '../../../components/customer/header/Header'

const Product = () => {
  return (
    <>
      <Header />
      <ProductNavigation />
      <ProductList />
    </>
  )
}

export default Product
