import React from 'react'
import Header from "../../../components/customer/header/Header";
import ProductDetail from "../../../components/customer/home/product-detail/product-detail";
import ProductDescription from "../../../components/customer/home/product-detail/product-description";



const ProductDetailPage = () => {

    const productData = {
        name: 'ATVNCG - Blindbox Kakadoll Ver.2',
        price: '300.000 ₫',
        images: 'https://cdn.galaxycine.vn/media/2025/4/16/kakadoll-anh-dai-dien-2_1744787848604.jpg',
        description: "\"Xú túi mè\" Kakadoll ngay tại Galaxy Cinema. Còn do dự, người khác xé ra sít rịt mất!Hộp mù Kakadoll gồm phiên bản chibi của 12 Anh Tài và 1 Secret được lựa chọn ngẫu nhiên. Kakadoll được thiết kế mô phỏng theo ngoại hình và trang phục của các Anh Tài trong các tiết mục được công diễn của chương trình ATVNCG."
    };

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