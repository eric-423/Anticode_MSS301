import sampleData from "./sampleData";
import DataTable from './DataTable';

const Cinemas = () => {
    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Tên rạp' },
        { key: 'address', label: 'Địa chỉ' },
        { key: 'rooms', label: 'Số phòng' },
        { key: 'status', label: 'Trạng thái' },
    ];
    return <DataTable
        columns={columns}
        data={sampleData.cinemasData}
        title="Danh sách Rạp chiếu"
        onAdd={() => alert('Chức năng Thêm rạp')}
        onEdit={(item) => alert(`Sửa rạp: ${item.name}`)}
        onDelete={(item) => alert(`Xóa rạp: ${item.name}`)}
    />;
};
export default Cinemas;