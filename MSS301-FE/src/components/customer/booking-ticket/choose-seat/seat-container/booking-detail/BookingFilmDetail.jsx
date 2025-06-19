import React from 'react'
import PropTypes from 'prop-types'


const BookingFilmDetail = ({ item }) => {

    const data = [
        {
            title: "Mưa Lửa - Anh Trai Vượt Ngàn Chông Gai Movie",
            startTime: "19:00",
            endTime: "22:00",
            date: "25/12/2023",
            posterUrl: "https://cdn.galaxycine.vn/media/2025/5/1/mua-lua---anh-trai-vuot-ngan-chong-gai-movie-2_1746078168404.jpg",
            hall: 'RAP 6',
            price: 100000,
        }

    ];

    return (
        <div>
            <div className="h-[6px] bg-primary rounded-t-lg"
                style={{
                    background: "rgb(245, 128, 32)",
                }}
            ></div>


            <div className="gap-2 bg-white p-4 rounded-lg shadow-md">
                <div className='flex item-start gap-2'>
                    <img
                        className="w-[133px] h-[200px] rounded"
                        src={data[0].posterUrl}
                        alt="Film Poster"
                    />


                    <div className="flex-1 col-span-2 md:col-span-1 row-span-1 xl:col-span-2" >
                        <h3 className="text-[17px] font-semibold text-[#4A4A4A] mb-2">{data[0].title}</h3>
                        <p className="text-sm inline-block">2D Phụ Đề</p>
                        <span> - </span>
                        <div className="xl:mt-2 ml-2 xl:ml-0 inline-block">
                            <span className="inline-flex items-center justify-center w-[38px] h-7 rounded text-sm text-center"
                                style={{
                                    color: 'white',
                                    background: "rgb(245, 128, 32)",
                                }}
                            >K</span>
                        </div>
                    </div>
                </div>

                <div className="xl:mt-5 text-sm xl:text-base flex gap-2">
                    <p className='font-semibold'>Galaxy Nha Van Hoa Sinh Vien</p>
                    <span> - </span>
                    <span className="text-sm xl:text-base">{data[0].hall}</span>
                </div>

                <div className="xl:mt-2 text-sm xl:text-base flex gap-2 align-center" >
                    <p>Suất: </p>
                    <p className='font-semibold'>17:15</p>
                    <span> - </span>
                    <p >thứ năm, {data[0].date}</p>
                </div>

                <div className="my-5 border-t border-grey-60 border-dashed xl:block hidden"></div>

                <div className="xl:flex hidden justify-between col-span-3 px-3">
                    <strong className="font-semibold">Tổng cộng</strong>
                    <span className="inline-block font-semibold text-primary"
                        style={{
                            color: 'rgb(245, 128, 32)',
                        }}
                    >
                        {(data[0].price).toLocaleString()} ₫

                    </span>
                </div>

            </div>

            <div className="mt-8 xl:flex hidden justify-between">
                <button className="w-1/2 mr-2 py-2 text-primary">
                    <span style={{
                        color:
                            'rgb(245, 128, 32)',
                        cursor: "pointer",
                    }}>
                        Quay lại
                    </span>
                </button>

                <button className="w-1/2 ml-2 py-2 text-white border rounded-md"
                    style={{
                        cursor: "pointer",
                        background: "rgb(245, 128, 32)",

                    }}
                >
                    <span>Tiếp tục</span>
                </button>
            </div>

        </div >
    )
}

BookingFilmDetail.propTypes = {}

export default BookingFilmDetail