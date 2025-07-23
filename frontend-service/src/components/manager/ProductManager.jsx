import React, { useEffect, useState } from 'react';
import DataTable from './DataTable';
import ProductModal from './ProductModal';
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../utils/api';

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Sản phẩm' },
  { key: 'price', label: 'Giá' },
  { key: 'size', label: 'Size' },
  { key: 'productImageUrl', label: 'Hình ảnh' },
  { key: 'status', label: 'Trạng thái' }
];

const ProductManager = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async (pageParam = page, sizeParam = size) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllProducts({ page: pageParam, size: sizeParam });
      const products = response.data.data?.content || response.data.data || [];
      setData(products);
      setTotalPages(response.data.data?.totalPages || 1);
    } catch (error) {
      setError('Không thể tải danh sách sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page, size);
    // eslint-disable-next-line
  }, [page, size]);

  const handleAdd = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const handleEdit = (product) => {
    const originalProduct = data.find(p => p.id === product.id);
    setEditingProduct(originalProduct);
    setShowModal(true);
  };

  const handleDelete = async (product) => {
    const productToUpdate = data.find((p) => p.id === product.id);

    if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${product.name}"?`)) {
      try {
        if (productToUpdate) {
          const updatedProduct = { ...productToUpdate, available: 0 };
          await updateProduct(productToUpdate.id, updatedProduct);
          
          // Update local state to reflect the change immediately
          setData(prevData => prevData.map(p => p.id === product.id ? updatedProduct : p));

        } else {
          setError("Không thể tìm thấy sản phẩm để xóa.");
        }
      } catch (error) {
        alert('Không thể xóa sản phẩm');
        setError('Không thể xóa sản phẩm');
      }
    }
  };

  const handleSubmit = async (productData) => {
    try {
      setShowModal(false);
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
        const updatedProductInState = { ...editingProduct, ...productData };
        setData(prevData =>
          prevData.map(p => (p.id === editingProduct.id ? updatedProductInState : p))
        );
        setEditingProduct(null);
      } else {
        await createProduct(productData);
        await fetchProducts();
      }
    } catch (error) {
      alert('Không thể lưu sản phẩm');
      setError('Không thể lưu sản phẩm');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handlePrevPage = () => {
    if (page > 0) setPage(page - 1);
  };
  const handleNextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const formattedData = data.map(product => {    
    return {
      ...product,
      status: product.available == 1 ? 'Còn hàng' : 'Hết hàng',
    };
  });

  return (
    <>
      <DataTable
        columns={columns}
        data={formattedData}
        title="Quản lý sản phẩm"
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
      <ProductModal
        isOpen={showModal}
        onClose={closeModal}
        onSubmit={handleSubmit}
        product={editingProduct}
        isEditing={!!editingProduct}
      />
    </>
  );
};

export default ProductManager;
