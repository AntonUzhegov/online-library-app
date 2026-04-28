import { useContext } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

function AdminBooksPage(): React.ReactElement {
  const { user } = useContext(AuthContext)

  if (!user || user.role !== 'ROLE_ADMIN') {
    return <Navigate to="/" />
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdef5 100%)',
      fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif"
    }}>
      
      <Link to="/admin" style={{
        position: 'absolute',
        top: '30px',
        left: '30px',
        backgroundColor: '#1976d2',
        color: 'white',
        textDecoration: 'none',
        padding: '10px 20px',
        borderRadius: '30px',
        fontSize: '16px',
        fontWeight: '500',
        transition: '0.3s',
        zIndex: 10,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#1565c0'
        e.currentTarget.style.transform = 'translateX(-3px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#1976d2'
        e.currentTarget.style.transform = 'translateX(0)'
      }}>
        ← Назад в админ панель
      </Link>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 20px 40px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{
            fontSize: '42px',
            color: '#0d47a1',
            marginBottom: '12px',
            fontWeight: '700'
          }}>
            Управление книгами
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#1565c0'
          }}>
            Добавление, редактирование и удаление книг
          </p>
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '60px',
          textAlign: 'center',
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            fontSize: '64px',
            marginBottom: '20px'
          }}></div>
          <h2 style={{
            fontSize: '24px',
            color: '#0d47a1',
            marginBottom: '12px'
          }}>
            Страница в разработке
          </h2>
          <p style={{ color: '#666' }}>
            Функционал управления книгами будет добавлен позже
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminBooksPage