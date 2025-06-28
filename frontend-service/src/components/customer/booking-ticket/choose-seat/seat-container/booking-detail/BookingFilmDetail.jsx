import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getMovieDetail, getShowtimeById } from '../../../../../../utils/api';
import { getSeatNamesByShowtime, getSeatsByShowtime } from '../../../../../../utils/seatStorage';
import PropTypes from 'prop-types';

const BookingFilmDetail = ({ item }) => {
    console.log(item);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const url = new URL(window.location.href);
    const pathParts = url.pathname.split('/');
    const movieId = pathParts[pathParts.length - 1];
    const showtimeId = url.searchParams.get('showtimeId');
    const [movie, setMovie] = useState(null);
    const [showtime, setShowtime] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isUploadEnabled, setIsUploadEnabled] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const [currentShowtimeSeats, setCurrentShowtimeSeats] = useState([]);

    useEffect(() => {
        setCurrentShowtimeSeats(getSeatNamesByShowtime(parseInt(showtimeId)));
    }, [showtimeId]);

    useEffect(() => {
        const handleSeatChange = () => {
            setCurrentShowtimeSeats(getSeatNamesByShowtime(parseInt(showtimeId)));
        };

        window.addEventListener('seatSelectionChange', handleSeatChange);

        return () => {
            window.removeEventListener('seatSelectionChange', handleSeatChange);
        };
    }, [showtimeId]);


    useEffect(() => {
        getMovieDetail(movieId)
            .then((res) => {
                setMovie(res.data.data);
            })
            .catch((err) => {
                console.error(err);
            });

        getShowtimeById(showtimeId)
            .then((res) => {
                setShowtime(res.data.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [movieId, showtimeId]);

    // Tính tổng tiền cho showtime hiện tại
    const calculateCurrentShowtimeTotal = () => {
        if (!showtimeId) return 0;

        const currentShowtimeSeats = getSeatsByShowtime(parseInt(showtimeId));
        return currentShowtimeSeats.reduce((total, seat) => total + (seat.price || 0), 0);
    };

    useEffect(() => {
        const updateTotalPrice = () => {
            const price = calculateCurrentShowtimeTotal();
            setTotalPrice(price);
        };

        updateTotalPrice();

        const handleStorageChange = () => {
            updateTotalPrice();
        };

        window.addEventListener('storage', handleStorageChange);

        window.addEventListener('seatSelectionChange', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('seatSelectionChange', handleStorageChange);
        };
    }, [showtimeId]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
    };

    const handleContinue = () => {
        const currentSeats = getSeatsByShowtime(parseInt(showtimeId));

        if (currentSeats.length === 0) {
            alert('Vui lòng chọn ít nhất một chỗ ngồi trước khi tiếp tục!');
            return;
        }

        localStorage.setItem('currentShowtimeId', showtimeId);

        navigate('/concessions');
    };

    const handleBack = () => {
        navigate(-1);
    };

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
                        src={movie ? movie.imageUrl : data[0].posterUrl}
                        alt="Film Poster"
                    />

                    <div className="flex-1 col-span-2 md:col-span-1 row-span-1 xl:col-span-2" >
                        <h3 className="text-[17px] font-semibold text-[#4A4A4A] mb-2">{movie?.title}</h3>
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
                    <span className="text-sm xl:text-base">{showtime?.cinemaHall.hallName}</span>
                </div>

                <div className="xl:mt-2 text-sm xl:text-base flex gap-2 align-center" >
                    <p>Suất: </p>
                    <p className='font-semibold'>
                        {new Date(showtime?.startTime).toLocaleTimeString('vi-VN', {
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </p>

                    <span> - </span>

                    <p>
                        {new Date(showtime?.startTime).toLocaleDateString('vi-VN', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                        })}
                    </p>
                </div>

                <div className="xl:mt-2 text-sm xl:text-base flex gap-2 align-center" >
                    <p>Ghế Đã Chọn: </p>
                    <p className='font-semibold text-orange-600'>
                        {currentShowtimeSeats.join(', ')}
                    </p>
                </div>



                <div className="xl:mt-4 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="enableUpload"
                            className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded "
                            onChange={(e) => setIsUploadEnabled(e.target.checked)}
                        />
                        <label htmlFor="enableUpload" className="text-sm font-medium text-[#4A4A4A]">
                            Ưu Đãi Sinh Viên
                        </label>
                    </div>

                    <div className={`transition-all duration-300 flex-1 ${isUploadEnabled ? 'opacity-100' : 'opacity-50'}`}>
                        <input
                            type="file"
                            id="imageUpload"
                            accept="image/*"
                            className={`block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 ${!isUploadEnabled ? 'pointer-events-none' : ''}`}
                            onChange={handleImageUpload}
                            disabled={!isUploadEnabled}
                        />
                        {selectedImage && (
                            <div className="mt-2">
                                <img
                                    src={selectedImage}
                                    alt="Preview"
                                    className="w-20 h-20 object-cover rounded-lg border"
                                />
                            </div>
                        )}
                    </div>
                </div>




                <div className="my-5 border-t border-grey-60 border-dashed xl:block hidden"></div>

                <div className="xl:flex hidden justify-between col-span-3 px-3">
                    <strong className="font-semibold">Tổng cộng</strong>
                    <span className="inline-block font-semibold text-primary"
                        style={{
                            color: 'rgb(245, 128, 32)',
                        }}
                    >
                        {totalPrice.toLocaleString('vi-VN')} ₫
                    </span>
                </div>
            </div>

            <div className="mt-8 xl:flex hidden justify-between">
                <button
                    className="w-1/2 mr-2 py-2 text-primary"
                    onClick={handleBack}
                >
                    <span style={{
                        color: 'rgb(245, 128, 32)',
                        cursor: "pointer",
                    }}>
                        Quay lại
                    </span>
                </button>

                <button
                    className="w-1/2 ml-2 py-2 text-white border rounded-md"
                    style={{
                        cursor: "pointer",
                        background: "rgb(245, 128, 32)",
                    }}
                    onClick={handleContinue}
                >
                    <span>Tiếp tục</span>
                </button>
            </div>
        </div>
    )
}

BookingFilmDetail.propTypes = {
    item: PropTypes.object.isRequired,
}

export default BookingFilmDetail