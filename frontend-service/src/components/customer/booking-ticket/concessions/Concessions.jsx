import React, { useEffect, useState } from "react";
import ConcessionCard from "./concession-card/ConcessionCard";
import { getConcessionProducts } from "../../../../utils/api";

const Concessions = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getConcessionProducts();
        setProducts(response.data.data.content || []);
        console.log(response.data.data.content);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", err);
        setError("Không thể tải danh sách sản phẩm");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="col-span-2 bg-white rounded-[.375rem] font-nunito-sans mb-10 border-[1px] border-[rgb(237,242,249)] overflow-hidden">
        <div className="grid grid-cols-9 font-semibold text-[16px] text-[#777777] px-[25px] py-[15px] bg-[#F9F9F9] items-center">
          <div className="col-span-5">SẢN PHẨM</div>
          <div className="col-span-2 flex justify-center items-center">GIÁ TIỀN</div>
          <div className="col-span-2 flex justify-center items-center">SỐ LƯỢNG</div>
        </div>
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-span-2 bg-white rounded-[.375rem] font-nunito-sans mb-10 border-[1px] border-[rgb(237,242,249)] overflow-hidden">
        <div className="grid grid-cols-9 font-semibold text-[16px] text-[#777777] px-[25px] py-[15px] bg-[#F9F9F9] items-center">
          <div className="col-span-5">SẢN PHẨM</div>
          <div className="col-span-2 flex justify-center items-center">GIÁ TIỀN</div>
          <div className="col-span-2 flex justify-center items-center">SỐ LƯỢNG</div>
        </div>
        <div className="p-8 text-center">
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="col-span-2 bg-white rounded-[.375rem] font-nunito-sans mb-10 border-[1px] border-[rgb(237,242,249)] overflow-hidden">
      <div className="grid grid-cols-9 font-semibold text-[16px] text-[#777777] px-[25px] py-[15px] bg-[#F9F9F9] items-center">
        <div className="col-span-5">SẢN PHẨM</div>
        <div className="col-span-2 flex justify-center items-center">GIÁ TIỀN</div>
        <div className="col-span-2 flex justify-center items-center">SỐ LƯỢNG</div>
      </div>
      <div className="grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ConcessionCard key={product.id} product={product} />
          ))
        ) : (
          <div className="p-8 text-center text-gray-500">
            Không có sản phẩm nào
          </div>
        )}
      </div>
    </div>
  );
};

export default Concessions;
