import React, { useState, useRef, useEffect } from "react";
import IMAGES from "../../../../../utils/images";

const FilmCard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const cardRef = useRef(null);

    // Đóng box khi click bên ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cardRef.current && !cardRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="h-[550px] relative" ref={cardRef}>
            {/* Poster phim */}
            <div
                onClick={() => setIsOpen(!isOpen)} // Toggle isOpen
                className="w-[280px] h-[420px] relative flex left-1/2 -translate-x-1/2 rounded-[10px] overflow-hidden cursor-pointer"
            >
                <img className="object-cover w-full h-full" src={IMAGES.thamTuKienPoster} alt="Poster" />

                {/* Rating */}
                <div className="bg-[rgba(0,0,0,0.4)] right-[-5px] absolute w-[100px] h-[24px] skew-x-[25deg] bottom-[40px]">
                    <div className="flex justify-end items-center gap-[20px] translate-y-[-2px]">
                        <img className="skew-x-[-25deg] w-[14px] h-[14px]" src={IMAGES.star} alt="star" />
                        <p className="skew-x-[-25deg] text-[18px] font-bold text-white mr-[10px]">9.5</p>
                    </div>
                </div>

                {/* Age */}
                <div className="w-[38px] h-[28px] bg-[rgb(245,128,32)] absolute flex justify-center items-center rounded-[5px] bottom-[5px] right-[5px]">
                    <span className="text-white font-bold font-nunito-sans">T16</span>
                </div>
            </div>

            {/* Box suất chiếu */}
            {isOpen && (
                <div className="absolute top-[440px] left-1/2 transform -translate-x-1/2 w-max bg-white p-4 rounded shadow-lg z-20">
                    <h4 className="mb-2 font-semibold text-gray-700">Suất chiếu:</h4>

                    <div className="grid grid-cols-2 items-center gap-4 mb-3">
                        <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">2D - Lồng tiếng</span>
                        <div className="flex flex-row gap-3">
                            <button className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-green-700 cursor-pointer">10:00</button>
                            <button className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-green-700 cursor-pointer">13:30</button>
                            <button className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-green-700 cursor-pointer">18:00</button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 items-center gap-4">
                        <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">2D - Phụ đề</span>
                        <div className="flex flex-row gap-3">
                            <button className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-green-700 cursor-pointer">12:00</button>
                            <button className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-green-700 cursor-pointer">14:30</button>
                            <button className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-green-700 cursor-pointer">22:00</button>
                        </div>
                    </div>
                </div>
            )}


            {/* Tên phim */}
            <div className="mt-2.5 text-center">
                <h3 className="line-clamp-2 font-semibold text-[16px] text-[#333333]">
                    Thám Tử Kiên: Kỳ Án Không Đầu
                </h3>
            </div>
        </div>
    );
};

export default FilmCard;
