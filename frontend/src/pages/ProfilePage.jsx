import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function ProfilePage() {
  const { user } = useContext(AuthContext)

  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '70vh',
      fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif",
      textAlign: 'center',
      padding: '40px'
    }}>
      <div>
        <h1 style={{ fontSize: '48px', color: '#0a3b2a', marginBottom: '20px' }}>
          👤 Профиль пользователя
        </h1>
        <p style={{ fontSize: '18px', color: '#666', marginBottom: '10px' }}>
          Здесь будет информация о пользователе
        </p>
        <p style={{ fontSize: '14px', color: '#999' }}>
          (страница в разработке)
        </p>
        <div style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '16px',
          textAlign: 'left',
          maxWidth: '300px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          <p><strong>Логин:</strong> {user.username}</p>
          <p><strong>Роль:</strong> {user.role === 'admin' ? 'Администратор' : 'Читатель'}</p>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage