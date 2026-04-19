import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import AuthLayout from '../components/auth/AuthLayout'
import api from '../service/api'

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
        const response = await api.post('/auth/login', { username, password })
        const { token } = response.data

        localStorage.setItem('token', token)

        const userResponse = await api.get('/users/me')
        login(userResponse.data)

        navigate('/')
    } catch (err) {
        setError(err.response?.data?.error || 'Ошибка входа')
    } finally {
        setLoading(false)
    }
}

  return (
    <AuthLayout title="Добро пожаловать!" subtitle="Войдите в свою библиотеку">
      
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
            placeholder="ivan_ivanov"
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
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '15px',
            background: 'linear-gradient(135deg, #1a6b4a, #0f5c3e)',
            color: 'white',
            border: 'none',
            borderRadius: '40px',
            fontSize: '16px',
            fontWeight: '700',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s',
            marginBottom: '24px',
            boxShadow: '0 4px 14px rgba(26,122,82,0.3)',
            opacity: loading ? 0.7 : 1
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 8px 20px rgba(26,122,82,0.4)'
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 4px 14px rgba(26,122,82,0.3)'
            }
          }}
        >
          {loading ? 'Загрузка...' : 'Войти'}
        </button>
      </form>

      <div style={{ 
        borderTop: '1px solid #e5e7eb', 
        paddingTop: '20px',
        marginTop: '8px'
      }}>
        <p style={{ color: '#6b7280', fontSize: '14px' }}>
          Нет аккаунта?{' '}
          <Link to="/register" style={{
            color: '#1a7a52',
            textDecoration: 'none',
            fontWeight: '700',
            transition: '0.3s'
          }}
          onMouseEnter={(e) => e.target.style.color = '#0f5c3e'}
          onMouseLeave={(e) => e.target.style.color = '#1a7a52'}>
            Зарегистрироваться
          </Link>
        </p>
      </div>

    </AuthLayout>
  )
}

export default LoginPage