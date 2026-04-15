import { useState, useEffect, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import api from '../service/api'

function ProfilePage() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    const fetchProfile = async () => {
      try {
        const response = await api.get(`/users/me?username=${user.username}`)
        setProfile(response.data)
      } catch {
        setError('Ошибка загрузки профиля')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [user, navigate])

  const handleChangePassword = () => {
    alert('Функция смены пароля будет добавлена позже')
  }

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '70vh',
        fontSize: '18px',
        color: '#0a3b2a'
      }}>
        Загрузка...
      </div>
    )
  }

  if (error) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '70vh',
        color: 'red'
      }}>
        {error}
      </div>
    )
  }

  if (!profile) return null

  const infoItems = [
    { label: 'Логин', value: profile.username },
    { label: 'Email', value: profile.email },
    { label: 'Имя', value: profile.firstName || '—' },
    { label: 'Фамилия', value: profile.lastName || '—' },
    { 
      label: 'Дата регистрации', 
      value: profile.registrationDate 
        ? new Date(profile.registrationDate).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })
        : '—'
    }
  ]

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif"
    }}>
      
      <Link to="/" style={{
        position: 'absolute',
        top: '30px',
        left: '30px',
        backgroundColor: '#0f5c3e',
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
        e.target.style.backgroundColor = '#1a7a52'
        e.target.style.transform = 'translateX(-3px)'
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = '#0f5c3e'
        e.target.style.transform = 'translateX(0)'
      }}>
        ← Назад
      </Link>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px'
      }}>
        <div style={{
          maxWidth: '600px',
          width: '100%',
          backgroundColor: 'white',
          borderRadius: '30px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          
          <div style={{
            background: 'linear-gradient(135deg, #0a3b2a 0%, #1a6b4a 100%)',
            padding: '50px 40px',
            textAlign: 'center',
            color: 'white'
          }}>
            <div style={{
              fontSize: '72px',
              marginBottom: '15px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 15px'
            }}>
              {profile.username[0] ? profile.username[0].toUpperCase() : 'U'}
            </div>
            <h2 style={{
              fontSize: '28px',
              margin: '0',
              fontWeight: '600'
            }}>
              {profile.username}
            </h2>
          </div>

          <div style={{ padding: '35px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '16px',
              marginBottom: '35px'
            }}>
              {infoItems.map((item, index) => (
                <div key={index} style={{
                  backgroundColor: '#f8f9fa',
                  borderRadius: '16px',
                  padding: '16px',
                  transition: 'transform 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#888',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '8px'
                  }}>
                    {item.label}
                  </div>
                  <div style={{
                    fontSize: '16px',
                    color: '#1a1a1a',
                    fontWeight: '500'
                  }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={handleChangePassword}
              style={{
                width: '100%',
                marginBottom: '12px',
                padding: '14px',
                backgroundColor: 'transparent',
                color: '#0f5c3e',
                border: '2px solid #0f5c3e',
                borderRadius: '40px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#0f5c3e'
                e.target.style.color = 'white'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent'
                e.target.style.color = '#0f5c3e'
              }}
            >
              Сменить пароль
            </button>

            <button 
              onClick={logout}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: 'transparent',
                color: '#c0392b',
                border: '2px solid #c0392b',
                borderRadius: '40px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#c0392b'
                e.target.style.color = 'white'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent'
                e.target.style.color = '#c0392b'
              }}
            >
              Выйти из аккаунта
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage