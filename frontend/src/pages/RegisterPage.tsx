import { Link } from 'react-router-dom'
import AuthLayout from '../components/auth/AuthLayout'
import Input from '../components/common/Input'
import { useRegister } from '../hooks/useRegister'
import { COLORS, BORDER_RADIUS, SPACING, FONTS, TRANSITIONS, SHADOWS } from '../styles/constants'

function RegisterPage(): React.ReactElement {
  const {
    username,
    setUsername,
    email,
    setEmail,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    success,
    loading,
    handleSubmit,
  } = useRegister()

  return (
    <AuthLayout title="Создать аккаунт" subtitle="Присоединяйтесь к нашей библиотеке">
      
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

      {success && (
        <div style={{
          backgroundColor: '#d1fae5',
          color: COLORS.primary,
          padding: SPACING.md,
          borderRadius: BORDER_RADIUS.medium,
          marginBottom: SPACING.xxxl,
          fontSize: FONTS.size.base,
          fontWeight: FONTS.weight.medium,
          textAlign: 'center'
        }}>
          {success}
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
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ivanov@example.com"
          required
        />

        <Input
          type="text"
          label="Имя"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Иван"
          required
        />

        <Input
          type="text"
          label="Фамилия"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Иванов"
          required
        />

        <Input
          type="password"
          label="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="минимум 6 символов"
          required
        />

        <Input
          type="password"
          label="Подтверждение пароля"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="повторите пароль"
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
          {loading ? 'Загрузка...' : 'Зарегистрироваться'}
        </button>
      </form>

      <div style={{ 
        borderTop: `1px solid ${COLORS.border}`, 
        paddingTop: SPACING.xl,
        marginTop: SPACING.sm
      }}>
        <p style={{ color: COLORS.textSecondary, fontSize: FONTS.size.base }}>
          Уже есть аккаунт?{' '}
          <Link to="/login" style={{
            color: COLORS.primary,
            textDecoration: 'none',
            fontWeight: FONTS.weight.bold,
            transition: TRANSITIONS.fast
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = COLORS.primaryLight}
          onMouseLeave={(e) => e.currentTarget.style.color = COLORS.primary}>
            Войти
          </Link>
        </p>
      </div>

    </AuthLayout>
  )
}

export default RegisterPage