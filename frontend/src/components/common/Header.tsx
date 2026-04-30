import { Link, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { COLORS, SHADOWS, BORDER_RADIUS, SPACING, FONTS, TRANSITIONS } from '../../styles/constants'

interface NavItem {
  path: string
  label: string
  requiresAuth?: boolean
}

function Header(): React.ReactElement {
  const { user } = useContext(AuthContext)
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  const navItems: NavItem[] = [
    { path: '/', label: 'Главная' },
    { path: '/catalog', label: 'Каталог' },
    { path: '/my-books', label: 'Мои книги', requiresAuth: true },
    { path: '/profile', label: 'Профиль', requiresAuth: true },
  ]

  const visibleNavItems = navItems.filter(item => {
    if (item.requiresAuth && !user) return false
    return true
  })

  const getLinkStyle = (path: string) => {
    const active = isActive(path)
    return {
      color: active ? COLORS.accent : COLORS.textWhite,
      textDecoration: 'none',
      fontSize: FONTS.size.xl,
      fontWeight: FONTS.weight.medium,
      padding: `${SPACING.sm} ${SPACING.xxl}`,
      borderRadius: BORDER_RADIUS.medium,
      transition: TRANSITIONS.normal,
      background: active 
        ? `rgba(255, 217, 102, 0.15)`
        : `rgba(255, 255, 255, 0.03)`,
      border: active
        ? `1px solid rgba(255, 217, 102, 0.5)`
        : `1px solid rgba(255, 255, 255, 0.1)`,
      backdropFilter: 'blur(5px)',
      letterSpacing: '0.3px',
      boxShadow: active ? SHADOWS.accent : 'none',
      whiteSpace: 'nowrap' as const,
    }
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (!isActive(path)) {
      e.currentTarget.style.background = 'rgba(255, 217, 102, 0.15)'
      e.currentTarget.style.border = '1px solid rgba(255, 217, 102, 0.5)'
      e.currentTarget.style.color = COLORS.accent
      e.currentTarget.style.transform = 'translateY(-2px)'
      e.currentTarget.style.boxShadow = SHADOWS.accent
    } else {
      e.currentTarget.style.transform = 'translateY(-2px)'
    }
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (!isActive(path)) {
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
      e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)'
      e.currentTarget.style.color = COLORS.textWhite
      e.currentTarget.style.boxShadow = 'none'
    }
    e.currentTarget.style.transform = 'translateY(0)'
  }

  return (
    <header style={{
      background: COLORS.primaryGradient,
      color: COLORS.textWhite,
      padding: `${SPACING.lg} 60px`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: SHADOWS.large,
      fontFamily: FONTS.family,
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{
        fontSize: FONTS.size.massive,
        fontWeight: FONTS.weight.bold,
        letterSpacing: '-0.5px',
        background: `linear-gradient(135deg, ${COLORS.textWhite}, ${COLORS.accent})`,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        cursor: 'default',
        whiteSpace: 'nowrap'
      }}>
        Online Library
      </div>

      <nav style={{ display: 'flex', gap: SPACING.md, alignItems: 'center' }}>
        {visibleNavItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={getLinkStyle(item.path)}
            onMouseEnter={(e) => handleMouseEnter(e, item.path)}
            onMouseLeave={(e) => handleMouseLeave(e, item.path)}
          >
            {item.label}
          </Link>
        ))}

        {!user && (
          <Link 
            to="/login" 
            style={{
              background: 'transparent',
              padding: `${SPACING.sm} ${SPACING.xxl}`,
              borderRadius: BORDER_RADIUS.pill,
              color: COLORS.accent,
              textDecoration: 'none',
              fontWeight: FONTS.weight.medium,
              fontSize: FONTS.size.base,
              transition: TRANSITIONS.fast,
              border: `1.5px solid ${COLORS.accent}`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = COLORS.accent
              e.currentTarget.style.color = COLORS.primaryDark
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = COLORS.accent
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Войти
          </Link>
        )}
      </nav>
    </header>
  )
}

export default Header