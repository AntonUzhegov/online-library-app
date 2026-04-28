import { useState, useEffect, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import api from '../service/api'

interface ProfileData {
  username: string
  email: string
  firstName: string | null
  lastName: string | null
  registrationDate: string | null
}

interface ErrorResponse {
  response?: {
    data?: {
      error?: string
    }
  }
}

function ProfilePage(): React.ReactNode {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false)
  const [oldPassword, setOldPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const [passwordSuccess, setPasswordSuccess] = useState<string>('')
  const [passwordLoading, setPasswordLoading] = useState<boolean>(false)

  if (!user) {
    navigate('/login')
    return null
  }

  useEffect(() => {
    const fetchProfile = async (): Promise<void> => {
      try {
        const response = await api.get('/users/me')
        setProfile(response.data as ProfileData)
      } catch {
        setError('Ошибка загрузки профиля')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleChangePassword = async (): Promise<void> => {
    setPasswordError('')
    setPasswordSuccess('')
    setPasswordLoading(true)

    if (newPassword !== confirmPassword) {
      setPasswordError('Пароли не совпадают')
      setPasswordLoading(false)
      return
    }

    if (newPassword.length < 6) {
      setPasswordError('Пароль должен быть не менее 6 символов')
      setPasswordLoading(false)
      return
    }

    try {
      await api.put('/users/change-password', {
        oldPassword,
        newPassword
      }, {
        params: { username: user?.username }
      })

      setPasswordSuccess('Пароль успешно изменён!')
      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')

      setTimeout(() => {
        setShowPasswordModal(false)
        setPasswordSuccess('')
      }, 1500)
    } catch (err: unknown) {
      const error = err as ErrorResponse
      setPasswordError(error.response?.data?.error || 'Ошибка смены пароля')
    } finally {
      setPasswordLoading(false)
    }
  }

  const handleLogout = (): void => {
    logout()
    window.location.href = '/'
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

  const infoItems: { label: string; value: string }[] = [
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
      onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
        e.currentTarget.style.backgroundColor = '#1a7a52'
        e.currentTarget.style.transform = 'translateX(-3px)'
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
        e.currentTarget.style.backgroundColor = '#0f5c3e'
        e.currentTarget.style.transform = 'translateX(0)'
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
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                  e.currentTarget.style.transform = 'translateY(-3px)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
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
                onClick={() => setShowPasswordModal(true)}
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
                onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.backgroundColor = '#0f5c3e'
                  e.currentTarget.style.color = 'white'
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = '#0f5c3e'
                }}
              >
                Сменить пароль
              </button>

              <button 
                onClick={handleLogout}
                style={{
                  width: '100%',
                  marginBottom: '12px',
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
                onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.backgroundColor = '#c0392b'
                  e.currentTarget.style.color = 'white'
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = '#c0392b'
                }}
              >
                Выйти из аккаунта
              </button>

              {user?.role === 'ROLE_ADMIN' && (
                <Link 
                  to="/admin" 
                  style={{
                    width: '100%',
                    padding: '14px',
                    backgroundColor: 'transparent',
                    color: '#3498db',
                    border: '2px solid #3498db',
                    borderRadius: '40px',
                    fontSize: '16px',
                    fontWeight: '600',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    display: 'block',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.currentTarget.style.backgroundColor = '#3498db'
                    e.currentTarget.style.color = 'white'
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = '#3498db'
                  }}
                >
                  Админ панель
                </Link>
              )}
          </div>
        </div>
      </div>
      {showPasswordModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }} onClick={() => setShowPasswordModal(false)}>
          
          <div style={{
            backgroundColor: 'white',
            borderRadius: '24px',
            padding: '32px',
            maxWidth: '400px',
            width: '90%',
            position: 'relative'
          }} onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
            
            <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#0a3b2a' }}>
              Смена пароля
            </h2>
            
            {passwordError && (
              <div style={{
                backgroundColor: '#fee2e2',
                color: '#c0392b',
                padding: '12px',
                borderRadius: '12px',
                marginBottom: '20px',
                fontSize: '14px'
              }}>
                {passwordError}
              </div>
            )}
            
            {passwordSuccess && (
              <div style={{
                backgroundColor: '#d1fae5',
                color: '#0f5c3e',
                padding: '12px',
                borderRadius: '12px',
                marginBottom: '20px',
                fontSize: '14px'
              }}>
                {passwordSuccess}
              </div>
            )}
            
            <input
              type="password"
              placeholder="Старый пароль"
              value={oldPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOldPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '15px',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
            
            <input
              type="password"
              placeholder="Новый пароль (минимум 6 символов)"
              value={newPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '15px',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
            
            <input
              type="password"
              placeholder="Подтвердите новый пароль"
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '20px',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleChangePassword}
                disabled={passwordLoading}
                style={{
                  flex: 1,
                  backgroundColor: passwordLoading ? '#ccc' : '#0f5c3e',
                  color: 'white',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '40px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: passwordLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                  if (!passwordLoading) {
                    e.currentTarget.style.backgroundColor = '#1a7a52'
                  }
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                  if (!passwordLoading) {
                    e.currentTarget.style.backgroundColor = '#0f5c3e'
                  }
                }}
              >
                {passwordLoading ? 'Сохранение...' : 'Сохранить'}
              </button>
              
              <button
                onClick={() => {
                  setShowPasswordModal(false)
                  setOldPassword('')
                  setNewPassword('')
                  setConfirmPassword('')
                  setPasswordError('')
                }}
                style={{
                  flex: 1,
                  backgroundColor: '#e0e0e0',
                  color: '#333',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '40px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.backgroundColor = '#ccc'
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.backgroundColor = '#e0e0e0'
                }}
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfilePage