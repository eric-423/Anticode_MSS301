import React from "react";

const UserProfile = ({ user, spending }) => {
  const { year, total, milestones } = spending;
  const max = milestones[milestones.length - 1].value;
  const percent = Math.min((total / max) * 100, 100);


  return (
    <div
      style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px #0001', padding: 40, width: '380px' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ width: 70, height: 70, borderRadius: '50%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, marginBottom: 8 }}>
            {user.avatar ? <img src={user.avatar} alt="avatar" style={{ width: '100%', height: '100%', borderRadius: '50%' }} /> : <span role="img" aria-label="avatar">📷</span>}
          </div>

          <div>
            <div style={{ fontWeight: 600, fontSize: 18 }}>{user.name}</div>
            <div style={{ color: '#888', fontSize: 14, margin: '4px 0' }}>🎖️ {user.stars} Stars</div>
          </div>
        </div>


      </div>


      <hr className="border-gray-200" style={{ margin: '24px 0' }} />

      <div style={{ display: 'flex', alignItems: 'center', fontWeight: 500, fontSize: 16, justifyContent: 'space-between' }}>
        <span>Tổng chi tiêu {year}</span>
        <span style={{ marginLeft: 8, color: '#f60', fontWeight: 700 }}>{total.toLocaleString()} đ</span>
      </div>

      <div style={{ margin: '24px 0 8px 0', position: 'relative', height: 40 }}>
        <div style={{ position: 'absolute', top: 18, left: 0, right: 0, height: 4, background: '#e0e0e0', borderRadius: 2 }} />

        {
          milestones.map((m) => (

            <div key={m.value} style={{ position: 'absolute', left: `${(m.value / max) * 100}%`, top: 0, transform: 'translateX(-50%)' }}>

              <div style={{ fontSize: 24, marginLeft: 20 }}>{m.icon}</div>

              <div style={{ width: 70, fontSize: 12, color: '#888', textAlign: 'center' }}>{m.value.toLocaleString()} đ</div>

            </div>

          ))
        }
        <div style={{ position: 'absolute', top: 18, left: 0, height: 4, background: '#f60', borderRadius: 2, width: `${percent}%` }} />

      </div>

    </div >
  );
};

export default UserProfile; 