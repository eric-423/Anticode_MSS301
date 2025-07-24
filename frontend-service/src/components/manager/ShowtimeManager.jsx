import React, { useEffect, useState } from 'react';
import DataTable from './DataTable';
import ShowtimeModal from './ShowtimeModal';
import { getAllCinemaHalls, getShowtimesByCinemaHall, createShowtime, updateShowtime, deleteShowtime } from '../../utils/api';

const columns = [
    { key: 'id', label: 'ID' },
    { key: 'startTime', label: 'Thời gian bắt đầu' },
    { key: 'endTime', label: 'Thời gian kết thúc' },
    { key: 'movie', label: 'Phim' },
];

const ShowtimeManager = () => {
    const [cinemaHalls, setCinemaHalls] = useState([]);
    const [selectedHall, setSelectedHall] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingShowtime, setEditingShowtime] = useState(null);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    const fetchCinemaHalls = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getAllCinemaHalls();
            console.log(response);
            
            setCinemaHalls(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách phòng chiếu:', error);
            setError('Không thể tải danh sách phòng chiếu');
        } finally {
            setLoading(false);
        }
    };

    const fetchShowtimes = async (hallId) => {
        console.log("hallId: "+hallId);
        
        setLoading(true);
        setError(null);
        try {
            const response = await getShowtimesByCinemaHall(hallId);
            console.log(response);
            
            const showtimes = response.data.data || [];
            const sortedShowtimes = showtimes.sort((a, b) => b.id - a.id);
            setData(sortedShowtimes);
            setTotalPages(response.data.data?.totalPages || 1);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách suất chiếu:', error);
            setError('Không thể tải danh sách suất chiếu');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCinemaHalls();
    }, []);

    useEffect(() => {
        if (selectedHall) {
            fetchShowtimes(selectedHall.id);
        }
    }, [selectedHall]);

    const handleHallClick = (hall) => {
        setSelectedHall(hall);
    };

    const handleAdd = () => {
        setEditingShowtime(null);
        setShowModal(true);
    };

    const handleEdit = (showtime) => {
        const originalShowtime = data.find(s => s.id === showtime.id);
        setEditingShowtime(originalShowtime);
        setShowModal(true);
    };


    const handleSubmit = async (showtimeData) => {
        try {
            if (editingShowtime) {
                await updateShowtime(editingShowtime.id, { ...showtimeData, cinemaHallId: selectedHall.id });
            } else {
                await createShowtime({ ...showtimeData, cinemaHallId: selectedHall.id });
            }
            setShowModal(false);
            await fetchShowtimes(selectedHall.id);
        } catch (error) {
            alert("Không thể lưu suất chiếu, kiểm tra lại")
            console.error('Lỗi khi lưu suất chiếu:', error);
            setError('Không thể lưu suất chiếu');
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingShowtime(null);
    };

    const formatShowtimeData = (showtimes) => {
        return showtimes.map(showtime => ({
            ...showtime,
            startTime: showtime.startTime ? showtime.startTime.replace('T', ' ').substring(0, 16) : '',
            endTime: showtime.endTime ? showtime.endTime.replace('T', ' ').substring(0, 16) : '',
            movie: showtime.movieTitle
        }));
    };

    if (loading) {
        return (
            <div className="p-8">
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <div className="flex justify-center items-center h-32">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Quản lý suất chiếu</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {cinemaHalls.map(hall => (
                    <div
                        key={hall.id}
                        className={`p-4 border rounded-lg cursor-pointer ${selectedHall?.id === hall.id ? 'bg-red-500 text-white' : 'bg-white'}`}
                        onClick={() => handleHallClick(hall)}
                    >
                        <h2 className="font-bold">{hall.hallName}</h2>
                        Hall name: <span>{hall.hallType.name}</span> <br></br>
                        Screen type: <span>{hall.scrrenType}</span>
                    </div>
                ))}
            </div>

            {selectedHall && (
                <>
                    <DataTable
                        columns={columns}
                        data={formatShowtimeData(data)}
                        title={`Suất chiếu cho ${selectedHall.hallName}`}
                        onAdd={handleAdd}
                        onEdit={handleEdit}
                    />

                    <ShowtimeModal
                        isOpen={showModal}
                        onClose={closeModal}
                        onSubmit={handleSubmit}
                        showtime={editingShowtime}
                        isEditing={!!editingShowtime}
                        cinemaHallId={selectedHall.id}
                        existingShowtimes={data}
                    />
                </>
            )}

            {error && (
                <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md z-50">
                    {error}
                </div>
            )}
        </div>
    );
};

export default ShowtimeManager;