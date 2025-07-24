import React, { useState, useEffect } from 'react';
import { getAllCinemaHalls } from '../../utils/api';


const unformatStatus = (status) => {
    switch (status) {
        case 'Sắp chiếu':
            return 'COMING_SOON';
        case 'Đang chiếu':
            return 'NOW_SHOWING';
        case 'Không chiếu':
            return 'NOT_SHOWING';
        default:
            return status;
    }
};

const MovieModal = ({ isOpen, onClose, onSubmit, movie = null, isEditing = false }) => {
    const [form, setForm] = useState({
        title: '',
        synopsis: '',
        duration: '',
        ageRanging: '',
        status: 'NOW_SHOWING',
        imageUrl: '',
        trailerUrl: ''
    });

    useEffect(() => {
        if (movie && isEditing) {
            setForm({
                id: movie.id || '',
                title: movie.title || '',
                synopsis: movie.synopsis || '',
                duration: movie.duration.replace(' phút', '') || '',
                ageRanging: movie.ageRanging === 'Tất cả' ? 0 : movie.ageRanging.replace('+', ''),
                status: movie.status || 'NOW_SHOWING',
                imageUrl: movie.imageUrl || '',
                trailerUrl: movie.trailerUrl || ''
            });
        } else {
            setForm({
                title: '',
                synopsis: '',
                duration: '',
                ageRanging: '',
                status: 'NOW_SHOWING',
                imageUrl: '',
                trailerUrl: ''
            });
        }
    }, [movie, isEditing]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
    e.preventDefault();

    const movieData = {
        ...form,
        id: movie?.id,
        status: unformatStatus(form.status),
        duration: parseInt(form.duration) || 0,
        ageRanging: parseInt(form.ageRanging) || 0,
    };

    onSubmit(movieData);
};


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">
                        {isEditing ? 'Sửa phim' : 'Thêm phim mới'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Các trường nhập movie */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tên phim *
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tóm tắt
                        </label>
                        <textarea
                            name="synopsis"
                            value={form.synopsis}
                            onChange={handleInputChange}
                            rows="3"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Thời lượng (phút) *
                            </label>
                            <input
                                type="number"
                                name="duration"
                                value={form.duration}
                                onChange={handleInputChange}
                                required
                                min="1"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Độ tuổi
                            </label>
                            <input
                                type="number"
                                name="ageRanging"
                                value={form.ageRanging}
                                onChange={handleInputChange}
                                min="0"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Trạng thái
                        </label>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            <option value="COMING_SOON">Sắp chiếu</option>
                            <option value="NOW_SHOWING">Đang chiếu</option>
                            <option value="NOT_SHOWING">Không chiếu</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            URL hình ảnh
                        </label>
                        <input
                            type="url"
                            name="imageUrl"
                            value={form.imageUrl}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            URL trailer
                        </label>
                        <input
                            type="url"
                            name="trailerUrl"
                            value={form.trailerUrl}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>

                    {/* Danh sách suất chiếu */}

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

export default MovieModal; 