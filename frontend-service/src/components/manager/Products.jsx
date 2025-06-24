import sampleData from "./sampleData";
import DataTable from "./DataTable";

const Products = () => {
    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Tên sản phẩm' },
        { key: 'category', label: 'Loại' },
        { key: 'price', label: 'Giá' },
        { key: 'stock', label: 'Tồn kho' },
        { key: 'status', label: 'Trạng thái' },
    ];
    return <DataTable
        columns={columns}
        data={sampleData.productsData}
        title="Danh sách Sản phẩm"
        onAdd={() => alert('Chức năng Thêm sản phẩm')}
        onEdit={(item) => alert(`Sửa sản phẩm: ${item.name}`)}
        onDelete={(item) => alert(`Xóa sản phẩm: ${item.name}`)}
    />;
};
export default Products;