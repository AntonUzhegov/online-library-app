import { useContext } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

function AdminPage(): React.ReactElement {
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
      
      <Link to="/profile" style={{
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
        ← Назад в профиль
      </Link>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 20px 40px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{
            display: 'inline-block',
            position: 'relative'
          }}>
            <h1 style={{
              fontSize: '52px',
              color: '#0d47a1',
              margin: 0,
              fontWeight: '700',
              letterSpacing: '-1px',
              position: 'relative',
              display: 'inline-block',
              paddingBottom: '20px'
            }}>
              Админ панель
            </h1>
            <div style={{
              position: 'absolute',
              bottom: '0',
              left: '15%',
              width: '70%',
              height: '5px',
              background: 'linear-gradient(90deg, #1976d2, #64b5f6, #1976d2)',
              borderRadius: '3px'
            }} />
          </div>
          <p style={{
            fontSize: '18px',
            color: '#1565c0',
            marginTop: '28px',
            opacity: 0.85,
            fontWeight: '500'
          }}>
            Управление библиотекой
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px'
        }}>
          <Link to="/admin/books" style={{ textDecoration: 'none' }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              border: '1px solid rgba(0,0,0,0.05)',
              textAlign: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)'
              e.currentTarget.style.boxShadow = '0 20px 35px rgba(0,0,0,0.12)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.08)'
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                backgroundColor: '#e3f2fd',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1976d2" strokeWidth="1.5">
                  <path d="M4 6h16v12H4z" />
                  <path d="M8 6v12" />
                  <path d="M16 6v12" />
                  <path d="M12 6v12" />
                </svg>
              </div>
              <h3 style={{ fontSize: '24px', color: '#0d47a1', marginBottom: '12px', fontWeight: '600' }}>Управление книгами</h3>
              <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '24px' }}>Добавление, редактирование и удаление книг из каталога</p>
              <div style={{
                display: 'inline-block',
                padding: '8px 20px',
                backgroundColor: '#e3f2fd',
                borderRadius: '30px',
                color: '#1976d2',
                fontSize: '13px',
                fontWeight: '500'
              }}>
                Перейти →
              </div>
            </div>
          </Link>

          <Link to="/admin/users" style={{ textDecoration: 'none' }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              border: '1px solid rgba(0,0,0,0.05)',
              textAlign: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)'
              e.currentTarget.style.boxShadow = '0 20px 35px rgba(0,0,0,0.12)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.08)'
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                backgroundColor: '#e8f5e9',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="1.5">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M5 18v2c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-2" />
                  <path d="M5 18c0-3.3 2.7-6 6-6h2c3.3 0 6 2.7 6 6" />
                </svg>
              </div>
              <h3 style={{ fontSize: '24px', color: '#0d47a1', marginBottom: '12px', fontWeight: '600' }}>Управление пользователями</h3>
              <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '24px' }}>Просмотр, блокировка и управление ролями пользователей</p>
              <div style={{
                display: 'inline-block',
                padding: '8px 20px',
                backgroundColor: '#e8f5e9',
                borderRadius: '30px',
                color: '#2e7d32',
                fontSize: '13px',
                fontWeight: '500'
              }}>
                Перейти →
              </div>
            </div>
          </Link>

          <Link to="/admin/stats" style={{ textDecoration: 'none' }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              border: '1px solid rgba(0,0,0,0.05)',
              textAlign: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)'
              e.currentTarget.style.boxShadow = '0 20px 35px rgba(0,0,0,0.12)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.08)'
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                backgroundColor: '#fff3e0',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#e65100" strokeWidth="1.5">
                  <path d="M3 3v18h18" />
                  <path d="M18 7l-4 5-3-3-4 5" />
                </svg>
              </div>
              <h3 style={{ fontSize: '24px', color: '#0d47a1', marginBottom: '12px', fontWeight: '600' }}>Статистика</h3>
              <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '24px' }}>Просмотр активности, популярные книги и отчёты</p>
              <div style={{
                display: 'inline-block',
                padding: '8px 20px',
                backgroundColor: '#fff3e0',
                borderRadius: '30px',
                color: '#e65100',
                fontSize: '13px',
                fontWeight: '500'
              }}>
                Перейти →
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AdminPage