import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from "../../../components/customer/header/Header";
import ProductDetail from "../../../components/customer/home/product-detail/product-detail";
import ProductDescription from "../../../components/customer/home/product-detail/product-description";
import { getConcessionProductDetail } from "../../../utils/api";



const ProductDetailPage = () => {
    const { productId } = useParams()
    const [productData, setProductData] = useState(null)

    useEffect(() => {
        if (!productId) return
        getConcessionProductDetail(productId)
            .then(res => setProductData(res.data.data))
            .catch(err => console.error(err))
    }, [productId])

    if (!productData) return null

    return (
        <div className="">
            <Header />
            <div className="max-w-4xl mx-auto px-4 pb-12">
                <ProductDetail productData={productData} />
                <ProductDescription description={productData.description} />
            </div>
        </div>
    )
}

export default ProductDetailPage