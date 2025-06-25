import React from "react";

const tabs = [
  { key: "profile", label: "Thông Tin Cá Nhân" },
  { key: "history", label: "Lịch Sử Giao Dịch" },
  { key: "notification", label: "Thông Báo" },
  { key: "gift", label: "Quà Tặng" },
  { key: "policy", label: "Chính Sách" },
];

const TabNavigation = ({ tab, setTab }) => {
  return (
    <div style={{ display: 'flex', borderBottom: '1px solid #ddd', marginBottom: 24 }}>
      {tabs.map((t) => (
        <div
          key={t.key}
          onClick={() => setTab(t.key)}
          style={{
            padding: '12px 24px',
            cursor: 'pointer',
            borderBottom: tab === t.key ? '2px solid #1976d2' : '2px solid transparent',
            color: tab === t.key ? '#1976d2' : '#888',
            fontWeight: tab === t.key ? 600 : 400,
            fontSize: 16,
          }}
        >
          {t.label}
        </div>
      ))}
    </div>
  );
};

export default TabNavigation; 