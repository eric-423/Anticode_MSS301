import { useEffect } from "react";

const AdminDataTable = ({
    columns, data, title, onDelete,
    page = 0, totalPages = 1, onPrevPage, onNextPage
}) => {
    const getStatusClass = (status) => {
        switch (status) {
            case 'Hoạt động':
                return 'bg-green-100 text-green-800';
            case 'Bị khóa':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const renderCell = (item, col) => {
        if (col.key === 'status') {
            return (
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(item[col.key])}`}>
                    {item[col.key]}
                </span>
            );
        }
        return item[col.key];
    };

    return (
        <div className="p-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-700">{title}</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                {columns.map(col => (
                                    <th key={col.key} className="px-6 py-3 text-left text-medium font-medium text-gray-500 uppercase tracking-wider">
                                        {col.label}
                                    </th>
                                ))}
                                <th className="px-6 py-3 text-right text-medium font-medium text-gray-500 uppercase tracking-wider">
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                                    {columns.map(col => (
                                        <td key={col.key} className="px-6 py-4">
                                            {renderCell(item, col)}
                                        </td>
                                    ))}
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => onDelete(item)} className="font-medium text-red-600 hover:underline">Xóa</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {data.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        Không có dữ liệu để hiển thị
                    </div>
                )}
                {totalPages > 1 && (
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={onPrevPage}
                            disabled={page === 0}
                            className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Trước
                        </button>
                        <span className="text-sm text-gray-700">
                            Trang {page + 1} / {totalPages}
                        </span>
                        <button
                            onClick={onNextPage}
                            disabled={page === totalPages - 1}
                            className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Sau
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDataTable; 