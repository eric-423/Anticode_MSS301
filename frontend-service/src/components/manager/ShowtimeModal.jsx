import React, { useState, useEffect } from 'react';
import { getAllMovies } from '../../utils/api';

const ShowtimeModal = ({ isOpen, onClose, onSubmit, showtime = null, isEditing = false, cinemaHallId, existingShowtimes = [] }) => {
    const [form, setForm] = useState({
        startTime: '',
        movieId: '',
    });
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        if (isOpen) {
            getAllMovies().then(res => setMovies(res.data.data.content));
        }
    }, [isOpen]);

    useEffect(() => {
        if (showtime && isEditing) {
            setForm({
                startTime: showtime.startTime || '',
                movieId: showtime.movieId || '',
            });
        } else {
            setForm({
                startTime: '',
                movieId: '',
            });
        }
    }, [showtime, isEditing]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedMovie = movies.find(movie => movie.id === parseInt(form.movieId));
        if (!selectedMovie) {
            alert("Vui lòng chọn phim!");
            return;
        }

        const startTime = new Date(form.startTime);
        if (startTime < new Date()) {
            alert("Thời gian bắt đầu không được ở quá khứ!");
            return;
        }

        const durationInMinutes = selectedMovie.duration;
        const endTime = new Date(startTime.getTime() + durationInMinutes * 60000);

        const showtimesToCheck = isEditing
            ? existingShowtimes.filter(st => st.id !== showtime.id)
            : existingShowtimes;

        for (const existing of showtimesToCheck) {
            const existingStartTime = new Date(existing.startTime);
            const existingEndTime = new Date(existing.endTime);

            if (startTime < existingEndTime && endTime > existingStartTime) {
                alert('Suất chiếu bị trùng lặp với một suất chiếu khác trong cùng phòng chiếu!');
                return;
            }
        }

        const formattedEndTime = endTime.toISOString().slice(0, 16);

        onSubmit({
            ...form,
            endTime: formattedEndTime
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">
                        {isEditing ? 'Sửa suất chiếu' : 'Thêm suất chiếu mới'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phim
                        </label>
                        <select
                            name="movieId"
                            value={form.movieId}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            <option value="">Chọn phim</option>
                            {movies.map(movie => (
                                <option key={movie.id} value={movie.id}>{movie.title}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Thời gian bắt đầu
                        </label>
                        <input
                            type="datetime-local"
                            name="startTime"
                            value={form.startTime}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>


                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                            {isEditing ? 'Cập nhật' : 'Thêm'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ShowtimeModal;