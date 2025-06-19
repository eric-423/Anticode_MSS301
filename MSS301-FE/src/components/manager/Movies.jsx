import sampleData from "./sampleData";
import React from 'react';
import DataTable from './DataTable';

const Movies = () => {
    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'title', label: 'Tên phim' },
        { key: 'genre', label: 'Thể loại' },
        { key: 'duration', label: 'Thời lượng' },
        { key: 'releaseDate', label: 'Ngày phát hành' },
        { key: 'status', label: 'Trạng thái' },
    ];
    return <DataTable
        columns={columns}
        data={sampleData.moviesData}
        title="Danh sách Phim"
        onAdd={() => alert('Chức năng Thêm phim')}
        onEdit={(item) => alert(`Sửa phim: ${item.title}`)}
        onDelete={(item) => alert(`Xóa phim: ${item.title}`)}
    />;
};
export default Movies;