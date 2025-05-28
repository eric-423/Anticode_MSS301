import React, { useEffect, useRef, useState } from "react";
import PromotionCard from "./promotion-card/PromotionCard";
import IMAGES from "../../../../utils/images";

const Promotions = () => {
  const [listPromotions, setListPromotions] = useState([
    {
      name: "Giá Vé U22 - Chỉ Từ 45k",
      images: IMAGES.giaveU22,
    },
    {
      name: "Bánh Phồng Dế Rec Rec – Snack Dế Giàu Đạm Nhiều Dinh Dưỡng",
      images: IMAGES.banhrecrecPromotions,
    },
    {
      name: "Trọn Vẹn Cảm Giác Điện Ảnh: Từ Rạp Phim Về Đến Nhà",
      images: IMAGES.brandGcxgpPromotions,
    },
    {
      name: "Vui Mua Sắm – Galaxy Mời Bắp Ngọt",
      images: IMAGES.Seven50Promotions,
    },
  ]);

  const [autoRunToggle, setAutoRunToggle] = useState(true);
  const containerSwipper = useRef(null);

  const handleScrollNext = async () => {
    let listPromotionsNew = [...listPromotions, ...listPromotions.slice(0, 4)]
    setListPromotions(listPromotionsNew);
    await new Promise(resolve => setTimeout(resolve, 500));
    await containerSwipper.current.scrollTo({
      left: 1248,
      behavior: "smooth",
    });
    await new Promise(resolve => setTimeout(resolve, 1000));
    setListPromotions([...listPromotionsNew.splice(4)]);
    await containerSwipper.current.scrollTo({
      left: 0,
      behavior: "auto",
    });
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      handleScrollNext();
      setAutoRunToggle((prev) => !prev);
    }, 5000);
    return () => {
      clearTimeout(timerId);
    };
  }, [autoRunToggle, handleScrollNext]);
  return (
    <div className="py-[48px] px-[16px] w-[1280px] mx-auto">
      <div className="flex items-center mb-10">
        <div className="w-[4px] h-[22px] bg-[rgb(3,78,162)] mr-2"></div>
        <h1 className="font-nunito-sans font-bold text-xl text-start text-[#4A4A4A] mr-10">
          TIN KHUYẾN MÃI
        </h1>
      </div>
      <div
        ref={containerSwipper}
        className="flex overflow-x-auto snap-x snap-mandatory w-full scroll-bar-hidden"
      >
        {listPromotions.map((item) => (
          <PromotionCard image={item.images} name={item.name} />
        ))}
      </div>
    </div>
  );
};

export default Promotions;
