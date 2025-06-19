import React from "react";

const TransactionHistory = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <div style={{ textAlign: 'center', color: '#888', marginTop: 30 }}>
        Lưu ý: chỉ hiển thị 20 giao dịch gần nhất
      </div>
    );
  }
  return (
    <div>
    </div>
  );
};

export default TransactionHistory; 