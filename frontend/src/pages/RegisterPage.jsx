import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthLayout from '../components/auth/AuthLayout'

function RegisterPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (password !== confirmPassword) {
      setError('Пароли не совпадают')
      return
    }

    if (password.length < 6) {
      setError('Пароль должен быть не менее 6 символов')
      return
    }

    if (username.length < 3) {
      setError('Логин должен быть не менее 3 символов')
      return
    }

    if (!email.includes('@')) {
      setError('Введите корректный email')
      return
    }

    if (firstName.length < 2) {
      setError('Имя должно быть не менее 2 символов')
      return
    }

    if (lastName.length < 2) {
      setError('Фамилия должна быть не менее 2 символов')
      return
    }

    setTimeout(() => {
      setSuccess('✅ Регистрация прошла успешно! Теперь войдите в систему.')
      
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    }, 500)
  }

  return (
    <AuthLayout title="Создать аккаунт" subtitle="Присоединяйтесь к нашей библиотеке">
      
      {error && (
        <div style={{
          backgroundColor: '#fee2e2',
          color: '#c0392b',
          padding: '14px',
          borderRadius: '16px',
          marginBottom: '28px',
          fontSize: '14px',
          fontWeight: '500',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}

      {success && (
        <div style={{
          backgroundColor: '#d1fae5',
          color: '#0f5c3e',
          padding: '14px',
          borderRadius: '16px',
          marginBottom: '28px',
          fontSize: '14px',
          fontWeight: '500',
          textAlign: 'center'
        }}>
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '22px', textAlign: 'left' }}>
          <label style={{
            display: 'block',
            marginBottom: '10px',
            color: '#1a1a1a',
            fontWeight: '600',
            fontSize: '14px',
            letterSpacing: '0.3px'
          }}>
            Логин 
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '14px 16px',
              border: '2px solid #e5e7eb',
              borderRadius: '16px',
              fontSize: '15px',
              transition: 'all 0.2s',
              outline: 'none',
              boxSizing: 'border-box',
              backgroundColor: '#fafafa'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#1a7a52'
              e.target.style.backgroundColor = 'white'
              e.target.style.boxShadow = '0 0 0 3px rgba(26,122,82,0.1)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e5e7eb'
              e.target.style.backgroundColor = '#fafafa'
              e.target.style.boxShadow = 'none'
            }}
            placeholder=""
          />
        </div>

        <div style={{ marginBottom: '22px', textAlign: 'left' }}>
          <label style={{
            display: 'block',
            marginBottom: '10px',
            color: '#1a1a1a',
            fontWeight: '600',
            fontSize: '14px',
            letterSpacing: '0.3px'
          }}>
            Email 
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '14px 16px',
              border: '2px solid #e5e7eb',
              borderRadius: '16px',
              fontSize: '15px',
              transition: 'all 0.2s',
              outline: 'none',
              boxSizing: 'border-box',
              backgroundColor: '#fafafa'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#1a7a52'
              e.target.style.backgroundColor = 'white'
              e.target.style.boxShadow = '0 0 0 3px rgba(26,122,82,0.1)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e5e7eb'
              e.target.style.backgroundColor = '#fafafa'
              e.target.style.boxShadow = 'none'
            }}
            placeholder=""
          />
        </div>

        <div style={{ marginBottom: '22px', textAlign: 'left' }}>
          <label style={{
            display: 'block',
            marginBottom: '10px',
            color: '#1a1a1a',
            fontWeight: '600',
            fontSize: '14px',
            letterSpacing: '0.3px'
          }}>
            Имя 
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '14px 16px',
              border: '2px solid #e5e7eb',
              borderRadius: '16px',
              fontSize: '15px',
              transition: 'all 0.2s',
              outline: 'none',
              boxSizing: 'border-box',
              backgroundColor: '#fafafa'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#1a7a52'
              e.target.style.backgroundColor = 'white'
              e.target.style.boxShadow = '0 0 0 3px rgba(26,122,82,0.1)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e5e7eb'
              e.target.style.backgroundColor = '#fafafa'
              e.target.style.boxShadow = 'none'
            }}
            placeholder=""
          />
        </div>

        <div style={{ marginBottom: '22px', textAlign: 'left' }}>
          <label style={{
            display: 'block',
            marginBottom: '10px',
            color: '#1a1a1a',
            fontWeight: '600',
            fontSize: '14px',
            letterSpacing: '0.3px'
          }}>
            Фамилия 
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '14px 16px',
              border: '2px solid #e5e7eb',
              borderRadius: '16px',
              fontSize: '15px',
              transition: 'all 0.2s',
              outline: 'none',
              boxSizing: 'border-box',
              backgroundColor: '#fafafa'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#1a7a52'
              e.target.style.backgroundColor = 'white'
              e.target.style.boxShadow = '0 0 0 3px rgba(26,122,82,0.1)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e5e7eb'
              e.target.style.backgroundColor = '#fafafa'
              e.target.style.boxShadow = 'none'
            }}
            placeholder=""
          />
        </div>

        <div style={{ marginBottom: '22px', textAlign: 'left' }}>
          <label style={{
            display: 'block',
            marginBottom: '10px',
            color: '#1a1a1a',
            fontWeight: '600',
            fontSize: '14px',
            letterSpacing: '0.3px'
          }}>
            Пароль 
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '14px 16px',
              border: '2px solid #e5e7eb',
              borderRadius: '16px',
              fontSize: '15px',
              transition: 'all 0.2s',
              outline: 'none',
              boxSizing: 'border-box',
              backgroundColor: '#fafafa'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#1a7a52'
              e.target.style.backgroundColor = 'white'
              e.target.style.boxShadow = '0 0 0 3px rgba(26,122,82,0.1)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e5e7eb'
              e.target.style.backgroundColor = '#fafafa'
              e.target.style.boxShadow = 'none'
            }}
            placeholder=""
          />
        </div>

        <div style={{ marginBottom: '28px', textAlign: 'left' }}>
          <label style={{
            display: 'block',
            marginBottom: '10px',
            color: '#1a1a1a',
            fontWeight: '600',
            fontSize: '14px',
            letterSpacing: '0.3px'
          }}>
            Подтверждение пароля 
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '14px 16px',
              border: '2px solid #e5e7eb',
              borderRadius: '16px',
              fontSize: '15px',
              transition: 'all 0.2s',
              outline: 'none',
              boxSizing: 'border-box',
              backgroundColor: '#fafafa'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#1a7a52'
              e.target.style.backgroundColor = 'white'
              e.target.style.boxShadow = '0 0 0 3px rgba(26,122,82,0.1)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e5e7eb'
              e.target.style.backgroundColor = '#fafafa'
              e.target.style.boxShadow = 'none'
            }}
            placeholder=""
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '15px',
            background: 'linear-gradient(135deg, #1a6b4a, #0f5c3e)',
            color: 'white',
            border: 'none',
            borderRadius: '40px',
            fontSize: '16px',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.3s',
            marginBottom: '24px',
            boxShadow: '0 4px 14px rgba(26,122,82,0.3)'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)'
            e.target.style.boxShadow = '0 8px 20px rgba(26,122,82,0.4)'
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)'
            e.target.style.boxShadow = '0 4px 14px rgba(26,122,82,0.3)'
          }}
        >
          Зарегистрироваться
        </button>
      </form>

      <div style={{ 
        borderTop: '1px solid #e5e7eb', 
        paddingTop: '20px',
        marginTop: '8px'
      }}>
        <p style={{ color: '#6b7280', fontSize: '14px' }}>
          Уже есть аккаунт?{' '}
          <Link to="/login" style={{
            color: '#1a7a52',
            textDecoration: 'none',
            fontWeight: '700',
            transition: '0.3s'
          }}
          onMouseEnter={(e) => e.target.style.color = '#0f5c3e'}
          onMouseLeave={(e) => e.target.style.color = '#1a7a52'}>
            Войти
          </Link>
        </p>
      </div>

    </AuthLayout>
  )
}

export default RegisterPage