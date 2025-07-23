import React, { useState, useEffect } from 'react';

const ProductModal = ({ isOpen, onClose, onSubmit, product = null, isEditing = false }) => {
  const [form, setForm] = useState({
    name: '',
    price: '',
    size: '',
    productImageUrl: '',
    available: 0
  });

  useEffect(() => {
    if (product && isEditing) {
      console.log('Editing product:', product);
      setForm({
        name: product.name || '',
        price: product.price || '',
        size: product.size || '',
        productImageUrl: product.productImageUrl || '',
        available: 1
      });
    } else {
      setForm({
        name: '',
        price: '',
        size: '',
        productImageUrl: '',
        available: 1
      });
    }
  }, [product, isEditing]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      price: parseFloat(form.price),
      available: 1,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {isEditing ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm *</label>
            <input type="text" name="name" value={form.name} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Giá *</label>
            <input type="number" name="price" value={form.price} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
            <select name="size" value={form.size} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md">
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hình ảnh</label>
            <input type="url" name="productImageUrl" value={form.productImageUrl} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">Hủy</button>
            <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">{isEditing ? 'Cập nhật' : 'Thêm'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
