import membershipLevels from '../../../utils/membershipLevels';
import React from 'react'; // Added missing import for React

const UserProfile = ({ user }) => {
  const royalPoint = user?.royalPoint || 0
  const max = membershipLevels[membershipLevels.length - 1].value
  const percent = Math.min((royalPoint / max) * 100, 100)
  const currentLevel = membershipLevels
    .slice()
    .reverse()
    .find((level) => royalPoint >= level.value)

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 4px 24px #0001',
        padding: 40,
        width: '380px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 18 }}>
              {user?.fullName || user?.username}
            </div>
          </div>
        </div>
      </div>
      <hr className="border-gray-200" style={{ margin: '24px 0' }} />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          fontWeight: 500,
          fontSize: 16,
          justifyContent: 'space-between',
        }}
      >
        <span>Tổng điểm thành viên</span>
        <span style={{ marginLeft: 8, color: '#f60', fontWeight: 700 }}>
          {royalPoint}{' '}
          <span style={{ fontSize: 20, marginLeft: 4 }}>
            {currentLevel?.icon}
          </span>
        </span>
      </div>
      <div style={{ margin: '40px 0 16px 0', position: 'relative', height: 90 }}>
        <div
          style={{
            position: 'absolute',
            top: 32,
            left: 0,
            right: 0,
            height: 6,
            background: '#e0e0e0',
            borderRadius: 3,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 32,
            left: 0,
            height: 6,
            background: '#f60',
            borderRadius: 3,
            width: `${percent}%`,
            zIndex: 1,
          }}
        />

        <div
          style={{
            position: 'absolute',
            left: `calc(${percent}% - 13px)`,
            top: 4,
            zIndex: 2,
            transition: 'left 0.3s',
          }}
        >
          <span style={{ fontSize: 16, color: '#FFD700', filter: 'drop-shadow(0 4px 8px #0003)' }}>⭐</span>
        </div>
        {/* Các mốc dưới thanh: tách icon và chữ thành 2 div tuyệt đối riêng biệt */}
        {membershipLevels.map((m) => (
          <React.Fragment key={m.value}>
            {/* Icon */}
            <div
              style={{
                position: 'absolute',
                left: `${(m.value / max) * 100}%`,
                top: 32,
                transform: 'translateX(-50%)',
                fontSize: 24,
                textAlign: 'center',
              }}
            >
              {m.icon}
            </div>
            {/* Chữ */}
            <div
              style={{
                position: 'absolute',
                left: `${(m.value / max) * 100}%`,
                top: 60,
                transform: 'translateX(-50%)',
                textAlign: 'center',
                minWidth: 60,
                fontSize: 13,
                color: '#888',
                fontWeight: 400,
                lineHeight: 1.2,
              }}
            >
              <div>{m.value.toLocaleString()} điểm</div>
              <div style={{ fontWeight: 600 }}>{m.name}</div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default UserProfile
