const membershipLevels = [
  { name: '', value: 1, icon: '🥇' },
  { name: 'GOLD', value: 100, icon: '⭐' },
  { name: 'PLATINUM', value: 1000, icon: '🏆' },
]

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
      <div style={{ margin: '24px 0 8px 0', position: 'relative', height: 40 }}>
        <div
          style={{
            position: 'absolute',
            top: 18,
            left: 0,
            right: 0,
            height: 4,
            background: '#e0e0e0',
            borderRadius: 2,
          }}
        />
        {membershipLevels.map((m) => (
          <div
            key={m.value}
            style={{
              position: 'absolute',
              left: `${(m.value / max) * 100}%`,
              top: 0,
              transform: 'translateX(-50%)',
            }}
          >
            <div style={{ fontSize: 24, marginLeft: 20 }}>{m.icon}</div>
            <div
              style={{
                width: 70,
                fontSize: 12,
                color: '#888',
                textAlign: 'center',
              }}
            >
              {
                m.value > 1 ? m.value.toLocaleString() + " điểm" : ''
              }

            </div>
            <div
              style={{
                width: 70,
                fontSize: 12,
                color: '#888',
                textAlign: 'center',
              }}
            >
              {m.name}
            </div>
          </div>
        ))}
        <div
          style={{
            position: 'absolute',
            top: 18,
            left: 0,
            height: 4,
            background: '#f60',
            borderRadius: 2,
            width: `${percent}%`,
          }}
        />
      </div>
    </div>
  )
}

export default UserProfile
