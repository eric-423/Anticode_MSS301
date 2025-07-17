import React, { useEffect, useState } from 'react';
import AdminDataTable from './AdminDataTable';
import sampleData from './sampleData';
import { getAllAccounts, softDeleteAccount, reactivateAccount } from '../../utils/api';

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'fullName', label: 'Tên' },
  { key: 'email', label: 'Email' },
  { key: 'phoneNumber', label: 'Số điện thoại' },
  { key: 'roleName', label: 'Vai trò' },
  { key: 'active', label: 'Trạng thái' },
];

const PAGE_SIZE = 10;

const AccountManager = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);

  const fetchAccounts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllAccounts();
      console.log('response', response);
      
      setData(response.data.data || response.data || []);
      // setData(sampleData.accountsData);
    } catch (error) {
      setError('Không thể tải danh sách tài khoản');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleAction = async (account) => {
    console.log('account', account);
    
    try {
      if (account.active) {
        await softDeleteAccount(account.id);
      } else {
        await reactivateAccount(account.id);
      }
      fetchAccounts();
    } catch (error) {
      setError('Thao tác thất bại');
    }
  };

  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const paginatedData = data.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const handlePrevPage = () => {
    if (page > 0) setPage(page - 1);
  };
  const handleNextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  return (
    <>
      <AdminDataTable
        columns={columns}
        data={paginatedData}
        title="Quản lý tài khoản"
        onAction={handleAction}
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
    </>
  );
};

export default AccountManager;
