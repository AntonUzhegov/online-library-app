import { Link } from 'react-router-dom'
import AuthLayout from '../components/auth/AuthLayout'
import Input from '../components/common/Input'
import { useLogin } from '../hooks/useLogin'
import { COLORS, BORDER_RADIUS, SPACING, FONTS, TRANSITIONS, SHADOWS } from '../styles/constants'

function LoginPage(): React.ReactElement {
  const { username, setUsername, password, setPassword, error, loading, handleSubmit } = useLogin()

  return (
    <AuthLayout title="Добро пожаловать!" subtitle="Войдите в свою библиотеку">
      
      {error && (
        <div style={{
          backgroundColor: COLORS.dangerBg,
          color: COLORS.danger,
          padding: SPACING.md,
          borderRadius: BORDER_RADIUS.medium,
          marginBottom: SPACING.xxxl,
          fontSize: FONTS.size.base,
          fontWeight: FONTS.weight.medium,
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          label="Логин"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="ivan_ivanov"
          required
        />

        <Input
          type="password"
          label="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: SPACING.lg,
            background: COLORS.primaryGradient,
            color: COLORS.textWhite,
            border: 'none',
            borderRadius: BORDER_RADIUS.pill,
            fontSize: FONTS.size.xl,
            fontWeight: FONTS.weight.bold,
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: TRANSITIONS.normal,
            marginBottom: SPACING.xxl,
            boxShadow: SHADOWS.primary,
            opacity: loading ? 0.7 : 1
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = SHADOWS.primaryHover
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = SHADOWS.primary
            }
          }}
        >
          {loading ? 'Загрузка...' : 'Войти'}
        </button>
      </form>

      <div style={{ 
        borderTop: `1px solid ${COLORS.border}`, 
        paddingTop: SPACING.xl,
        marginTop: SPACING.sm
      }}>
        <p style={{ color: COLORS.textSecondary, fontSize: FONTS.size.base }}>
          Нет аккаунта?{' '}
          <Link to="/register" style={{
            color: COLORS.primary,
            textDecoration: 'none',
            fontWeight: FONTS.weight.bold,
            transition: TRANSITIONS.fast
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = COLORS.primaryLight}
          onMouseLeave={(e) => e.currentTarget.style.color = COLORS.primary}>
            Зарегистрироваться
          </Link>
        </p>
      </div>

    </AuthLayout>
  )
}

export default LoginPage