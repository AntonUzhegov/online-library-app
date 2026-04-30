import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { COLORS, SHADOWS, BORDER_RADIUS, FONTS, SPACING, TRANSITIONS } from '../../styles/constants'

interface AuthLayoutProps {
  children: ReactNode
  title: string
  subtitle: string
}

function AuthLayout({ children, title, subtitle }: AuthLayoutProps): React.ReactElement {
  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      margin: 0,
      padding: 0,
      backgroundColor: COLORS.background,
      fontFamily: FONTS.family,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Link to="/" style={{
        position: 'absolute',
        top: '30px',
        left: '30px',
        backgroundColor: COLORS.primary,
        color: COLORS.textWhite,
        textDecoration: 'none',
        padding: `${SPACING.sm} ${SPACING.xl}`,
        borderRadius: BORDER_RADIUS.pill,
        fontSize: FONTS.size.xl,
        fontWeight: FONTS.weight.medium,
        transition: TRANSITIONS.fast,
        zIndex: 10
      }}
      onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => e.currentTarget.style.backgroundColor = COLORS.primaryLight}
      onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => e.currentTarget.style.backgroundColor = COLORS.primary}>
        ← Назад
      </Link>

      <div style={{
        backgroundColor: COLORS.cardBg,
        borderRadius: BORDER_RADIUS.pill,
        boxShadow: SHADOWS.xlarge,
        maxWidth: '480px',
        width: '90%',
        padding: SPACING.huge,
        textAlign: 'center'
      }}>
        
        <div style={{ marginBottom: SPACING.xxxl }}>
          <h1 style={{
            fontSize: FONTS.size.giant,
            color: COLORS.primary,
            marginBottom: SPACING.sm,
            fontWeight: FONTS.weight.semibold
          }}>
            {title}
          </h1>
          <p style={{ color: COLORS.textSecondary, fontSize: FONTS.size.xl }}>
            {subtitle}
          </p>
        </div>

        {children}

      </div>
    </div>
  )
}

export default AuthLayout