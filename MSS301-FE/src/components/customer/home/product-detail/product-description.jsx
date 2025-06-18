import React from 'react';
import PropTypes from 'prop-types';


const ProductDescription = ({ description }) => {
    return (
        <div className="mt-8 sm:mt-10 ">
            <h2 className="text-base font-bold mb-4 sm:mb-6 uppercase border-l-4 border-blue-800 pl-3 flex items-center" aria-label="Mô tả sản phẩm">
                Mô tả sản phẩm
            </h2>

            <div className="prose max-w-none text-sm"
                style={{ lineHeight: '1.5' }}
            >
                <h4 className="mt-5">Thông tin sản phẩm</h4>
                <p>{description}</p>
            </div>
        </div>
    );
};



export default ProductDescription;
ProductDescription.propTypes = {
    description: PropTypes.string.isRequired
};