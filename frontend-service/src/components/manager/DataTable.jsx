const DataTable = ({ columns, data, title, onAdd, onEdit, onDelete }) => {
    const getStatusClass = (status) => {
        switch (status) {
            case 'Hoạt động':
            case 'Đang chiếu':
            case 'Còn hàng':
                return 'bg-green-100 text-green-800';
            case 'Bảo trì':
            case 'Sắp chiếu':
            case 'Sắp hết':
                return 'bg-yellow-100 text-yellow-800';
            case 'Đã chiếu':
            case 'Hết hàng':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="p-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                    <button onClick={onAdd} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                        Thêm mới
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                {columns.map(col => <th key={col.key} scope="col" className="px-6 py-3">{col.label}</th>)}
                                <th scope="col" className="px-6 py-3 text-right">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                                    {columns.map(col => (
                                        <td key={col.key} className="px-6 py-4">
                                            {col.key === 'status' ? (
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(item[col.key])}`}>
                                                    {item[col.key]}
                                                </span>
                                            ) : (
                                                item[col.key]
                                            )}
                                        </td>
                                    ))}
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => onEdit(item)} className="font-medium text-blue-600 hover:underline mr-4">Sửa</button>
                                        <button onClick={() => onDelete(item)} className="font-medium text-red-600 hover:underline">Xóa</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-700">
                        Hiển thị 1 đến {data.length} của {data.length} mục
                    </span>
                    <div className="inline-flex mt-2 xs:mt-0">
                        <button className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900">
                            Trước
                        </button>
                        <button className="px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900">
                            Sau
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DataTable;