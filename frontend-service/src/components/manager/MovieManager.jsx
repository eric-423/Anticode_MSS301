import React, { useEffect, useState } from 'react';
import DataTable from './DataTable';
import MovieModal from './MovieModal';
import { getAllMovies, createMovie, updateMovie, deleteMovie } from '../../utils/api';

const columns = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Tên phim' },
    { key: 'synopsis', label: 'Tóm tắt' },
    { key: 'duration', label: 'Thời lượng (phút)' },
    { key: 'ageRanging', label: 'Độ tuổi' },
    { key: 'status', label: 'Trạng thái' },
    { key: 'imageUrl', label: 'Hình ảnh' },
    { key: 'trailerUrl', label: 'Trailer' }
];

const MovieManager = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingMovie, setEditingMovie] = useState(null);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    const fetchMovies = async (pageParam = page, sizeParam = size) => {
        setLoading(true);
        setError(null);
        try {
            const response = await getAllMovies({ page: pageParam, size: sizeParam });
            console.log('Movies fetched:', response);
            const movies = response.data.data?.content || response.data.data || [];
            setData(movies);
            setTotalPages(response.data.data?.totalPages || 1);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách phim:', error);
            setError('Không thể tải danh sách phim');
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setEditingMovie(null);
        setShowModal(true);
    };

    const handleEdit = (movie) => {
        setEditingMovie(movie);
        setShowModal(true);
    };

    const handleDelete = async (movie) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa phim "${movie.title}"?`)) {
            try {
                await deleteMovie(movie.id);
                await fetchMovies();
            } catch (error) {
                console.error('Lỗi khi xóa phim:', error);
                setError('Không thể xóa phim');
            }
        }
    };

    const handleSubmit = async (movieData) => {
        try {
            if (editingMovie) {
                await updateMovie(editingMovie.id, movieData);
            } else {
                await createMovie(movieData);
            }
            setShowModal(false);
            await fetchMovies();
        } catch (error) {
            console.error('Lỗi khi lưu phim:', error);
            setError('Không thể lưu phim');
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingMovie(null);
    };

    useEffect(() => {
        fetchMovies(page, size);
    }, [page, size]);

    // Format data for display
    const formatMovieData = (movies) => {
        return movies.map(movie => ({
            ...movie,
            status: formatStatus(movie.status),
            duration: `${movie.duration} phút`,
            ageRanging: movie.ageRanging ? `${movie.ageRanging}+` : 'Tất cả',
            imageUrl: movie.imageUrl,
            trailerUrl: movie.trailerUrl,
        }));
    };

    const formatStatus = (status) => {
        switch (status) {
            case 'COMING_SOON':
                return 'Sắp chiếu';
            case 'NOW_SHOWING':
                return 'Đang chiếu';
            case 'NOT_SHOWING':
                return 'Không chiếu';
            default:
                return status;
        }
    };

    // Thêm hàm chuyển trang
    const handlePrevPage = () => {
        if (page > 0) setPage(page - 1);
    };
    const handleNextPage = () => {
        if (page < totalPages - 1) setPage(page + 1);
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
        <>
            <DataTable
                columns={columns}
                data={formatMovieData(data)}
                title="Quản lý phim"
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
                page={page}
                totalPages={totalPages}
                onPrevPage={handlePrevPage}
                onNextPage={handleNextPage}
            />

            {error && (
                <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md z-50">
                    {error}
                </div>
            )}

            <MovieModal
                isOpen={showModal}
                onClose={closeModal}
                onSubmit={handleSubmit}
                movie={editingMovie}
                isEditing={!!editingMovie}
            />
        </>
    );
};

export default MovieManager;
